import { Time } from "@angular/common";
import { User } from "../../users/shared/user.model";

export interface Appointment{
    scheduleTime: Date;
    duration: number;
   // assignedStaff: User[];
    isReserved: boolean;
    startTime: Time;
}