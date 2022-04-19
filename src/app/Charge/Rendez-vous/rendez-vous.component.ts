import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { DemandeRdv } from "src/app/models/demande-rdv";
import { CreditFormService } from "src/app/Services/credit-form-service.service";
import { environment } from "src/environments/environment";

@Component({
    selector: "app-rendez-vous",
    templateUrl: "./rendez-vous.component.html",
    styleUrls: ["./rendez-vous.component.scss"],
    providers: [],
})
export class RendezVousComponent implements OnInit {
    baseUrl = environment.apiURL + "/gestionRdv";

    events: any[];

    options: any;

    header: any;

    eventDialog: boolean;

    changedEvent: any;

    rdv: DemandeRdv[];

    clickedEvent = null;

    currentDate: Date = new Date();

    constructor(
        private http: HttpClient,
        private creditFormService: CreditFormService
    ) {}

    ngOnInit(): void {
        this.getEvents().then((events) => {
            this.events = events;
            // console.log(this.events);
            this.options = { ...this.options, ...{ events: events } };
        });

        this.options = {
            initialDate: this.currentDate,
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
            eventClick: (e) => {
                console.log(e);
                this.eventDialog = true;
                this.clickedEvent = e.event;
                console.log(this.clickedEvent);
                this.changedEvent.title = this.clickedEvent.title;
                this.changedEvent.dateRdv = this.clickedEvent.dateRdv;
            },
        };

        this.changedEvent = { title: "", dateRdv: null };
        this.getRdv();
    }

    getRdv() {
        this.creditFormService.getRdvAPI().subscribe((response) => {
            this.rdv = response;
            console.log(this.rdv);
        });
    }

    getEvents() {
        return this.http
            .get<any>(this.baseUrl + "/rdv")
            .toPromise()
            .then((res) => res.data as DemandeRdv[])
            .then((data) => data);
    }

    handleDateClick(arg) {
        this.eventDialog = true;
        this.clickedEvent = arg.event;
        this.changedEvent = { title: "", dateRdv: null };
        //this.clickedEvent = true;
    }

    save() {
        this.eventDialog = false;
        console.log(this.changedEvent);
        //appel api save

        this.getEvents().then((events) => {
            this.events = events;
            this.options = { ...this.options, ...{ events: events } };
        });
    }

    reset() {
        this.changedEvent.title = this.clickedEvent.title;
        this.changedEvent.dateRdv = this.clickedEvent.dateRdv;
    }
}
