export interface User {
  email: string;
  password: string;
  displayName: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  userEmail: string | null;
  displayName: string | null;
  uid: string | null;
}

export interface AuthResult {
  success: boolean;
  data?: AuthResponse;
  error?: string;
};

// Elements
export enum InputTypes {
  Text = "text",
  Email = "email",
  Password = "password"
}