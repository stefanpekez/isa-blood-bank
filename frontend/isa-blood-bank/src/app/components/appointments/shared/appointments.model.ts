import { Time } from "@angular/common";
import { User } from "../../users/shared/user.model";

export interface Appointment{
    id:number;
    scheduleTime: Date;
    duration: number;
   // assignedStaff: User[];
    isReserved: boolean;
    startTime: Time;
    donator: User;
}

export interface ScheduleAppointment {
    userEmail: string;
    appointment: number;
}