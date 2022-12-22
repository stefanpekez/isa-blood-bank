import { Time } from "@angular/common";

export interface AppointmentDto {
    id: number;
    scheduledTime: Date;
    duration: number;
    startTime: Time;
}

export interface Blood {
    bloodType: string;
    amount: number;
}

export interface AppointmentReviewDto {
    id: number;
    status: string;
    equipmentUsed: number;
    description: string;
    blood: Blood;
}