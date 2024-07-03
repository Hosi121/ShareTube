export interface User {
    id: number;
    username: string;
    email: string;
    created_at: string;
}

export interface RegisterInput {
    username: string;
    email: string;
    password: string;
}

export interface LoginInput {
    email: string;
    password: string;
}

