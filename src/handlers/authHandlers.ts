import { AuthService } from "../services/authService/authService";
import { AuthResponse, LoginData, User } from "../types/userModel";

export class AuthHandler {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    // Registration processing
    async registerUser(user: User): Promise<AuthResponse | undefined> {
        try {
            const registerCredential = await this.authService.register(user);
            console.log('Registration successful', registerCredential.displayName);
            return registerCredential
        } catch (error:any) {
            console.error(error.message);
        }
    }

    // Login processing
    async loginUser(user: LoginData): Promise<AuthResponse | undefined>  {
        try {
            const loginCredential = await this.authService.login(user);
            console.log('Login successful', loginCredential.displayName);
            return loginCredential
        } catch (error:any) {
            console.error(error.message);
        }
    }

    // Output processing
    async logoutUser() {
        try {
            await this.authService.logout();
            console.log('Logout successful');
        } catch (error:any) {
            console.error(error.message);
        }
    }
}

export const AuthHandlerInstance = new AuthHandler()