import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
    cors: {
        origin: 'http://localhost:3000',
    },
})
export class AppGateway {
    @WebSocketServer() server: Server;

    @SubscribeMessage('hello')
    handleHello(client: Socket, payload: string) {
        console.log('Message from client:', payload);

        // Send response only to the sender
        client.emit('helloResponse', 'Hello from NestJS!');
    }

}
