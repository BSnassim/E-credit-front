import { Component, OnInit } from "@angular/core";
import { environment } from "src/environments/environment";
import { EventsService } from "src/app/Services/events.service";
import { DatePipe } from "@angular/common";
import { DemandeRdv } from "src/app/models/demande-rdv";
import { MessageService } from "primeng/api";
import { Router } from "@angular/router";
import { Location } from "@angular/common";

@Component({
    selector: "app-rendez-vous",
    templateUrl: "./rendez-vous.component.html",
    styleUrls: ["./rendez-vous.component.scss"],
    providers: [DatePipe, MessageService],
})
export class RendezVousComponent implements OnInit {
    baseUrl = environment.apiURL + "/gestionRdv";

    events: any = [];

    options: any;

    header: any;

    eventDialog: boolean;

    changedEvent: any;

    clickedEvent = null;

    currentDate: Date = new Date();

    date: any;

    myRdv = {} as DemandeRdv;

    // newDate = Date.now();

    constructor(
        private eventService: EventsService,
        private datePipe: DatePipe,
        private messageService: MessageService,
        public _router: Router,
        public _location: Location
    ) {}

    ngOnInit() {
        this.getRdv();

        setTimeout(() => {
            this.options = {
                initialDate: this.datePipe.transform(
                    this.currentDate,
                    "dd/MM/yyyy"
                ),
                dateClick: this.handleDateClick.bind(this),
                headerToolbar: {
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay",
                },
                editable: true,
                selectable: true,
                selectMirror: true,
                dayMaxEvents: true,
                events: this.events[0],
                eventClick: (e) => {
                    this.eventDialog = true;
                    this.clickedEvent = e.event;
                    this.changedEvent.title = this.clickedEvent.title;
                    this.changedEvent.start = this.clickedEvent.start;
                    this.changedEvent.end = this.clickedEvent.end;
                },
            };
        }, 1000);
        this.datePipe.transform(this.currentDate, "dd/MM/yyyy");

        this.changedEvent = {
            title: "",
            start: null,
            end: "",
            allDay: null,
        };
    }

    getRdv() {
        this.eventService.getRdvAPI().subscribe((response) => {
            response.map((el) => {
                el.title = el.title;
                el.start = el.dateRdv;
                el.end = el.dateRdv;
                /// el.color = "#F00020";
            });
            this.events.push(response);
            console.log(this.events);
            this.options = { ...this.options, ...{ events: this.events } };

            console.log(this.options);
        });
    }

    handleDateClick(arg) {
        this.eventDialog = true;
        this.clickedEvent = arg.event;
        console.log("rendez vous avec", arg.dateStr);
        this.date = new Date(arg.dateStr);
        // this.date = this.datePipe.transform(this.newDate, "yyyy-MM-dd");
        this.changedEvent = {
            title: "Clients.name",
            start: this.date,
            end: null,
            allDay: null,
        };
        this.clickedEvent = true;
    }

    save() {
        this.eventDialog = false;

        this.myRdv.dateRdv = this.changedEvent.start;
        this.myRdv.title = this.changedEvent.title;
        // this.myRdv.heur = this.changedEvent.;
        // this.myRdv.idDemande
        console.log(this.myRdv);
        this.eventService.postRdvAPI(this.myRdv).subscribe();
        this.messageService.add({
            key: "tst",
            severity: "success",
            summary: "Succués",
            detail: "Rendez-vous enregistrer avec succés",
        });
        this._router
            .navigateByUrl("/refresh", { skipLocationChange: true })
            .then(() => {
                console.log(decodeURI(this._location.path()));
                this._router.navigate([decodeURI(this._location.path())]);
            });
    }

    reset() {
        this.eventDialog = false;
    }
}
