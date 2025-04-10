import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { LoginUserDto, CreateUserDto } from './dto';
export declare class AuthService {
    private readonly userRepository;
    private readonly jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    create(createUserDto: CreateUserDto): Promise<{
        user: User;
        token: string;
    }>;
    login(loginUserDto: LoginUserDto): Promise<{
        user: User;
        token: string;
    }>;
    checkAuthStatus(user: User): Promise<{
        user: User;
        token: string;
    }>;
    private getJwtToken;
    private handleDBErrors;
}
