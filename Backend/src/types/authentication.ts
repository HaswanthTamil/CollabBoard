import { User } from "../db/postgres/entities/user";

export interface JWTPayload {
    sub: string;
    iat: number;
    exp: number;
}

export interface TokenPair {
    accessToken: string;
    refreshToken: string;
}

export interface LoginRequest {
    email?: string;
    username?: string;
    password: string;
}

export interface RegisterRequest {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
}

export interface RefreshTokenRequest {
    refreshToken: string;
}

export interface AuthResponse {
    user: Omit<User, "passwordHash">;
    tokens: TokenPair;
}

export interface AuthContext {
    user: User;
    payload: JWTPayload;
}