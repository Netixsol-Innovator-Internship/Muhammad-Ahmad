import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    MessageBody,
    ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
    cors: {
        origin: 'http://localhost:3000',
    },
})

export class AppGateway {
    @WebSocketServer() server: Server;

    @SubscribeMessage('newComment')
    handleNewComment(
        @ConnectedSocket() client: Socket,
        @MessageBody() payload: { text: string }
    ) {
        console.log('New comment received:', payload);

        // Broadcast to all connected clients (including sender)
        this.server.emit('commentAdded', payload);
    }
}
