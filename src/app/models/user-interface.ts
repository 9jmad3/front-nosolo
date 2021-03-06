export type Roles = 'SUSCRIPTOR' | 'ADMIN';

export interface User {
    email: string;
    username: string;
    password: string;
}

export interface UserResponse {
    accessToken: string;
    user: any;
}

export interface UserData {
    username: string;
    id: number;
}