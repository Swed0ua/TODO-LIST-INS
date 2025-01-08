import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthResponse } from '../types/userModel';

interface AuthState {
    isAuthenticated: boolean;
    user: AuthResponse | null;
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<AuthResponse>) {
        state.isAuthenticated = true;
        state.user = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload));
        localStorage.setItem('authTimestamp', Date.now().toString());
    },
    logout(state) {
        state.isAuthenticated = false;
        state.user = null;
        localStorage.removeItem('user');
        localStorage.removeItem('authTimestamp');
    },
    checkAuth(state) {
        const storedUser = localStorage.getItem('user');
        const authTimestamp = localStorage.getItem('authTimestamp');
        
        if (storedUser && authTimestamp) {
            const user = JSON.parse(storedUser);
            const timestamp = parseInt(authTimestamp, 10);
            const expirationTime = 6 * 24 * 60 * 60 * 1000; // 6 днів в мілісекундах
            
            if (Date.now() - timestamp <= expirationTime) {
            state.isAuthenticated = true;
            state.user = user;
            } else {
            state.isAuthenticated = false;
            state.user = null;
            localStorage.removeItem('user');
            localStorage.removeItem('authTimestamp');
            }
        }
    },
  },
});

export const { login, logout, checkAuth } = authSlice.actions;

export default authSlice.reducer;