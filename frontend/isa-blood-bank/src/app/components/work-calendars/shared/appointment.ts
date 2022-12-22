export class Appointment {
    scheduleTime: string;
    duration: number;
    reserved: boolean;
    startTime: string;
    id: number;

    constructor(scheduleTime: string, duration: number, reserved: boolean, startTime: string, id: number) {
        this.scheduleTime = scheduleTime;
        this.duration = duration;
        this.reserved = reserved;
        this.startTime = startTime;
        this.id = id;
    }
}