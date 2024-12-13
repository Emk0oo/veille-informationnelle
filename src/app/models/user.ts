export interface User {
    id?: number;
    name: string;
    surname: string;
    email: string;
    password: string;
}

export interface UserLogin {
    username: string;
    password: string;
}

export interface UserRegister {
    name: string;
    surname: string;
    email: string;
    password: string;
}