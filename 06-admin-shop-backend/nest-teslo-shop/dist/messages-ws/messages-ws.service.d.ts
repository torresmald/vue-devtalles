import { Socket } from 'socket.io';
import { User } from '../auth/entities/user.entity';
import { Repository } from 'typeorm';
export declare class MessagesWsService {
    private readonly userRepository;
    private connectedClients;
    constructor(userRepository: Repository<User>);
    registerClient(client: Socket, userId: string): Promise<void>;
    removeClient(clientId: string): void;
    getConnectedClients(): string[];
    getUserFullName(socketId: string): string;
    private checkUserConnection;
}
