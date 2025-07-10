
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