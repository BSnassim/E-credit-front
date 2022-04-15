import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";

@Component({
    templateUrl: "./app.calendar.component.html",
    styles: [
        `
            @media screen and (max-width: 960px) {
                :host ::ng-deep .fc-header-toolbar {
                    display: flex;
                    flex-wrap: wrap;
                }
            }
        `,
    ],
})
export class AppCalendarComponent implements OnInit {
    events: any[];

    options: any;

    header: any;

    eventDialog: boolean;

    changedEvent: any;

    clickedEvent = null;

    constructor(private http: HttpClient) {}

    ngOnInit() {
        this.getEvents().then((events) => {
            this.events = events;
            this.options = { ...this.options, ...{ events: events } };
        });

        this.options = {
            initialDate: "2021-02-01",
            headerToolbar: {
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay",
            },
            editable: true,
            selectable: true,
            selectMirror: true,
            dayMaxEvents: true,
            eventClick: (e) => {
                this.eventDialog = true;

                this.clickedEvent = e.event;

                this.changedEvent.title = this.clickedEvent.title;
                this.changedEvent.start = this.clickedEvent.start;
                this.changedEvent.end = this.clickedEvent.end;
            },
        };

        this.changedEvent = { title: "", start: null, end: "", allDay: null };
    }

    getEvents() {
        return this.http
            .get<any>("assets/demo/data/scheduleevents.json")
            .toPromise()
            .then((res) => res.data as any[])
            .then((data) => data);
    }

    save() {
        this.eventDialog = false;

        this.clickedEvent.setProp("title", this.changedEvent.title);
        this.clickedEvent.setStart(this.changedEvent.start);
        this.clickedEvent.setEnd(this.changedEvent.end);
        this.clickedEvent.setAllDay(this.changedEvent.allDay);

        this.changedEvent = { title: "", start: null, end: "", allDay: null };
    }

    reset() {
        this.changedEvent.title = this.clickedEvent.title;
        this.changedEvent.start = this.clickedEvent.start;
        this.changedEvent.end = this.clickedEvent.end;
    }
}
