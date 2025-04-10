import { JwtService } from '@nestjs/jwt';
import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { NewMessageDto } from './dtos/new-message.dto';
import { MessagesWsService } from './messages-ws.service';
export declare class MessagesWsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly messagesWsService;
    private readonly jwtService;
    wss: Server;
    constructor(messagesWsService: MessagesWsService, jwtService: JwtService);
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): void;
    onMessageFromClient(client: Socket, payload: NewMessageDto): void;
}
