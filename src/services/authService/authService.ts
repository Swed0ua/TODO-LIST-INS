import { AuthResponse, LoginData, User } from "../../types/userModel";
import { auth } from '../../firebase/firebase-config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';

export class AuthService {

    async register(user: User): Promise<AuthResponse> {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, user.email, user.password);

            const firebaseUser = userCredential.user;
            await updateProfile(firebaseUser, { displayName: user.displayName });

            return {
                userEmail: firebaseUser.email,
                displayName: firebaseUser.displayName,
                providerId: firebaseUser.providerId
            };

        } catch (error:any) {
            throw new Error('Registration failed: ' + error.message);
        }
    }

    async login(user: LoginData): Promise<AuthResponse> {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, user.email, user.password);
            return {
                userEmail: userCredential.user.email,
                displayName: userCredential.user.displayName,
                providerId: userCredential.user.providerId
            };
        } catch (error:any) {
            throw new Error('Login failed: ' + error.message);
        }
    }

    async logout(): Promise<void> {
        try {
            await signOut(auth);
        } catch (error:any) {
            throw new Error('Logout failed: ' + error.message);
        }
    }
}