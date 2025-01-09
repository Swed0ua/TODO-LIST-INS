import { AuthService } from "../services/authService/authService";
import { AuthResponse, AuthResult, LoginData, User } from "../types/userModel";

export class AuthHandler {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    // Registration processing
    async registerUser(user: User): Promise<AuthResult> {
        try {
            const registerCredential = await this.authService.register(user);
            console.log('Registration successful', registerCredential.displayName);
            return {
                success:true,
                data:registerCredential
            }
        } catch (error:any) {
            console.error(error.message);
            return {
                success: false,
                error:error.message
            }
        }
    }

    // Login processing
    async loginUser(user: LoginData): Promise<AuthResult>  {
        try {
            const loginCredential = await this.authService.login(user);
            console.log('Login successful', loginCredential.displayName);
            return {
                success:true,
                data:loginCredential
            }
        } catch (error:any) {
            return {
                success: false,
                error:error.message
            }
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