import { Address } from "src/app/shared/address.model";

export interface User{
    id: number;
    email: string;
    password: string;
    name: string;
    surname: string;
    address: Address;
    upin: string;
    gender: string;
    occupation: string;
    workStatus: string;
    role: string;
}