import { Appointment } from "./appointment";

export class WorkCalendar {
    public id: number;
    public centerId: number;
    public appointments: Appointment[];

    constructor(private i: number, private c: number) {
        this.id = i;
        this.centerId = c;
        this.appointments = [];
    }
}