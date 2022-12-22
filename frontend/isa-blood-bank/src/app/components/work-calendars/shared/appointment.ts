export class Appointment {
    scheduleTime: string;
    duration: number;
    reserved: boolean;
    startTime: string;

    constructor(scheduleTime: string, duration: number, reserved: boolean, startTime: string) {
        this.scheduleTime = scheduleTime;
        this.duration = duration;
        this.reserved = reserved;
        this.startTime = startTime;
    }
}