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
}

// Elements
export enum InputTypes {
  Text = "text",
  Email = "email",
  Password = "password"
}