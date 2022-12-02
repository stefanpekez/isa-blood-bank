export class WorkCalendarItem {
    public id: number = -1;
    public isCurrent: boolean = false;

    public constructor(id: number, isCurrent: boolean) {
        this.id = id;
        this.isCurrent = isCurrent;
    }
}