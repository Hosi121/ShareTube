export interface User {
    id: number;
    username: string;
    email: string;
    created_at: string;
    avatar_url: string;
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