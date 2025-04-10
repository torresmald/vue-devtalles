import { IncomingHttpHeaders } from 'http';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { User } from './entities/user.entity';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    createUser(createUserDto: CreateUserDto): Promise<{
        user: User;
        token: string;
    }>;
    loginUser(loginUserDto: LoginUserDto): Promise<{
        user: User;
        token: string;
    }>;
    checkAuthStatus(user: User): Promise<{
        user: User;
        token: string;
    }>;
    testingPrivateRoute(request: Express.Request, user: User, userEmail: string, rawHeaders: string[], headers: IncomingHttpHeaders): {
        ok: boolean;
        message: string;
        user: User;
        userEmail: string;
        rawHeaders: string[];
        headers: IncomingHttpHeaders;
    };
    privateRoute2(user: User): {
        ok: boolean;
        user: User;
    };
    privateRoute3(user: User): {
        ok: boolean;
        user: User;
    };
}
