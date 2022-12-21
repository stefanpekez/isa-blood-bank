import { Time } from "@angular/common";
import { User } from "../../users/shared/user.model";

export interface Appointment{
    scheduleTime: Date;
    startTime: Time;
    duration: number;
    assignedStaff: User[];
    donator: User;
    isReserved: boolean;
}