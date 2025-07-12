
export interface CarType {
    id: string,
    owner: string,
    licensePlate: string,
    color: string,
    status: string,
    services: string[],
    price: number,
}

export type NewCarType = Omit<CarType, "id">;

export interface User {
    id: string;
    name: string;
    email: string;
}

export interface AuthState {
    user: User | null;
    token: string | null;
}

export interface LoginSystem {
    email: string;
    password: string;
}