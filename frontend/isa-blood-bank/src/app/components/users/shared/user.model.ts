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
    phoneNumber: string;
    occupation: string;
    workStatus: string;
    role: string;
    centerId: number;
    lastPasswordResetDate: string;
}

export interface ActivationResponse {
    message: string;
}

export interface LoggedInUser {
    email: string;
}