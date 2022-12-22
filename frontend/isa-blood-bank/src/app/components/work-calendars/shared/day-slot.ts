import { Appointment } from "./appointment";

export class DaySlot {
    date: string;
    time: string;
    appointment: Appointment | null;

    constructor(date: string, time: string) {
        this.date = date;
        this.time = time;
        this.appointment = null;
    }
}