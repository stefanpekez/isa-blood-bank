import { Address } from "src/app/shared/address.model";

export interface UserTable {
    id: number;
    email: string;
    name: string;
    surname: string;
    address: Address;
    upin: string;
    gender: string;
    occupation: string;
    workStatus: string;
    role: string;
}