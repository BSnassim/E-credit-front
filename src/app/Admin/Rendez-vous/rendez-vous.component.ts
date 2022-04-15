// import { Component, OnInit } from "@angular/core";
// import { EventService } from "src/app/demo/service/eventservice";

// @Component({
//     selector: "app-rendez-vous",
//     templateUrl: "./rendez-vous.component.html",
//     styleUrls: ["./rendez-vous.component.scss"],
//     providers: [EventService],
// })
// export class RendezVousComponent implements OnInit {
//     events: any[];

//     options: any;

//     header: any;

//     eventDialog: boolean;

//     changedEvent: any;

//     clickedEvent = null;

//     constructor(private eventService: EventService) {}

//     ngOnInit(): void {
//         this.eventService.getEvents().then((events) => {
//             this.events = events;
//             this.options = { ...this.options, ...{ events: events } };
//         });

//         this.options = {
//             initialDate: "2021-02-01",
//             headerToolbar: {
//                 left: "prev,next today",
//                 center: "title",
//                 right: "dayGridMonth,timeGridWeek,timeGridDay",
//             },
//             editable: true,
//             selectable: true,
//             selectMirror: true,
//             dayMaxEvents: true,
//             eventClick: (e) => {
//                 this.eventDialog = true;

//                 this.clickedEvent = e.event;

//                 this.changedEvent.title = this.clickedEvent.title;
//                 this.changedEvent.start = this.clickedEvent.start;
//                 this.changedEvent.end = this.clickedEvent.end;
//             },
//         };

//         this.changedEvent = { title: "", start: null, end: "", allDay: null };
//     }
//     save() {
//         this.eventDialog = false;

//         this.clickedEvent.setProp("title", this.changedEvent.title);
//         this.clickedEvent.setStart(this.changedEvent.start);
//         this.clickedEvent.setEnd(this.changedEvent.end);
//         this.clickedEvent.setAllDay(this.changedEvent.allDay);

//         this.changedEvent = { title: "", start: null, end: "", allDay: null };
//     }

//     reset() {
//         this.changedEvent.title = this.clickedEvent.title;
//         this.changedEvent.start = this.clickedEvent.start;
//         this.changedEvent.end = this.clickedEvent.end;
//     }
// }
