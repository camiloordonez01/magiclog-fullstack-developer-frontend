export type UserRole = 'admin' | 'seller' | 'customer';

export interface LoginResponse {
    token: string;
    role: UserRole;
}

export interface User {
    id: number
    name: string
    lastName: string
    email: string
    role: string
}