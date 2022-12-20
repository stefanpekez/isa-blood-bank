import { Appointment } from "./appointment";

export class MonthSlot {
    date: string;
    isCurrent: boolean = false;
    appointments: Appointment[];

    constructor(isCurrent: boolean, date: string) {
        this.date = date;
        this.isCurrent = isCurrent;
        this.appointments = [];
    }

    addAppointment(appointment: Appointment) {
        this.appointments.push(appointment);
    }
}