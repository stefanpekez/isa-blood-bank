import { Time } from "@angular/common";
import { Center } from "../../centers/shared/center.model";
import { User } from "../../users/shared/user.model";

export interface Appointment{
    id:number;
    scheduledTime: Date;
    duration: number;
   // assignedStaff: User[];
    isReserved: boolean;
    startTime: string;
    donator: User;
}

export interface ScheduleAppointment {
    userEmail: string;
    appointment: number;
}

export interface CenterAppointment {
    center: Center;
    appointment: Appointment;
}