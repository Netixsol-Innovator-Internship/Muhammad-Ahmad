import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    MessageBody,
    ConnectedSocket,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

interface CommentPayload {
    text: string;
    user: string;
    timestamp?: string;
}

@WebSocketGateway({
    cors: {
        origin: process.env.CLIENT_URL || 'http://localhost:3000',
        methods: ['GET', 'POST'],
        credentials: true,
    },
})
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;
    private logger: Logger = new Logger('AppGateway');

    handleConnection(client: Socket) {
        this.logger.log(`Client connected: ${client.id}`);
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }

    @SubscribeMessage('newComment')
    handleNewComment(
        @MessageBody() payload: CommentPayload,
        @ConnectedSocket() client: Socket,
    ) {
        try {
            // Basic validation
            if (!payload.text || typeof payload.text !== 'string') {
                client.emit('error', { message: 'Invalid comment text' });
                return;
            }

            if (!payload.user || typeof payload.user !== 'string') {
                client.emit('error', { message: 'Invalid username' });
                return;
            }

            // Trim and validate length
            const trimmedText = payload.text.trim();
            const trimmedUser = payload.user.trim();

            if (trimmedText.length === 0) {
                client.emit('error', { message: 'Comment cannot be empty' });
                return;
            }

            if (trimmedText.length > 500) {
                client.emit('error', { message: 'Comment too long' });
                return;
            }

            if (trimmedUser.length > 30) {
                client.emit('error', { message: 'Username too long' });
                return;
            }

            // Create sanitized comment
            const comment: CommentPayload = {
                text: trimmedText,
                user: trimmedUser,
                timestamp: new Date().toISOString(),
            };

            this.logger.log(`New comment from ${comment.user}: ${comment.text.substring(0, 50)}...`);
            
            // Broadcast to all clients
            this.server.emit('commentAdded', comment);
        } catch (error) {
            this.logger.error('Error handling new comment:', error);
            client.emit('error', { message: 'Failed to process comment' });
        }
    }
}
