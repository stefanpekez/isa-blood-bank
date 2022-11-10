import { Address } from "src/app/shared/address.model";

export interface Center {
    name: string;
    description: string;
    address: Address;
    donationPrice: string;
    workingHours: string;
    rating: string;
}