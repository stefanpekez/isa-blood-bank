import { User } from "../../users/shared/user.model";

export class Appointment {
    scheduledTime: string;
    duration: number;
    reserved: boolean;
    startTime: string;
    id: number;
    donator: User;

    constructor(scheduledTime: string, duration: number, reserved: boolean, startTime: string, 
            donator: User, id: number) {
        this.scheduledTime = scheduledTime;
        this.duration = duration;
        this.reserved = reserved;
        this.startTime = startTime;
        this.id = id;
        this.donator = donator;
    }
}