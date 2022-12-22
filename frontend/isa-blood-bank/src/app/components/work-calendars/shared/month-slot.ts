import { Appointment } from "./appointment";

export class MonthSlot {
    date: string;
    isCurrent: boolean = false;
    appointments: Appointment[];
    freeAppointments: number;
    reservedAppointments: number;

    constructor(isCurrent: boolean, date: string) {
        this.date = date;
        this.isCurrent = isCurrent;
        this.appointments = [];
        this.freeAppointments = 0;
        this.reservedAppointments = 0;
    }

    addAppointment(appointment: Appointment) {
        this.appointments.push(appointment);
    }
}