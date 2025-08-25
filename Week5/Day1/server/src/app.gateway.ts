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
        @MessageBody() payload: { text: string; user: string }
    ) {
        console.log('New comment received:', payload);
        this.server.emit('commentAdded', payload);
    }
}
