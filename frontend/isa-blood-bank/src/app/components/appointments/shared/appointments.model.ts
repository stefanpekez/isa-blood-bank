import { User } from "../../users/shared/user.model";

export interface Appointment{
    scheduleTime: Date;
    duration: number;
    assignedStaff: User[];
    donator: User;
    isReserved: boolean;
}