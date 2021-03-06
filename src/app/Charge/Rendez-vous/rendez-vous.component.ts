import { TokenService } from "src/app/auth/services/token.service";
import { User } from "src/app/models/user";
import { Subscription } from "rxjs";
import {
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
} from "@angular/core";
import { EventsService } from "src/app/Services/events.service";
import { DatePipe } from "@angular/common";
import { DemandeRdv } from "src/app/models/demande-rdv";
import { MessageService } from "primeng/api";

@Component({
    selector: "app-rendez-vous",
    templateUrl: "./rendez-vous.component.html",
    styleUrls: ["./rendez-vous.component.scss"],
    providers: [DatePipe, MessageService],
})
export class RendezVousComponent implements OnInit, OnDestroy {
    @Input() demandeId: number;
    @Input() clientId: string;
    @Input() clientName: string;
    @Output() closeDialog = new EventEmitter<DemandeRdv>();

    user: User;

    events: any = [];

    options: any;

    header: any;

    eventDialog: boolean;

    changedEvent: any;

    clickedEvent = null;

    currentDate: Date = new Date();

    date: any;

    myRdv = {} as DemandeRdv;

    subscription: Subscription;

    constructor(
        private eventService: EventsService,
        private datePipe: DatePipe,
        private messageService: MessageService,
        private tokenService: TokenService
    ) {}

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    ngOnInit() {
        this.getUser();
        this.getRdv();
        this.subscription = this.eventService.refresh$.subscribe(() => {
            this.getRdv();
        });

        this.datePipe.transform(this.currentDate, "dd/MM/yyyy");

        this.changedEvent = {
            id: null,
            title: "",
            start: null,
            end: "",
            allDay: null,
        };
    }

    getUser() {
        this.tokenService.getUser().subscribe((data) => {
            this.user = data;
        });
    }

    getRdv() {
        this.eventService.getRdvAPI().subscribe((response) => {
            response.map((el) => {
                el.title = el.title;
                el.start = el.dateRdv;
                el.end = el.dateRdv;
                el.id = el.idRdv;
                el.idDemande = el.idDemande;
                /// el.color = "#F00020";
            });
            this.events = [];
            this.events.push(response);

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
                        this.changedEvent.id = this.clickedEvent.id;
                    },
                };
            }, 1);
            this.options = { ...this.options, ...{ events: this.events } };
        });
    }

    handleDateClick(arg) {
        let newEvent = new Date(arg.dateStr);
        if (newEvent.getTime() < this.currentDate.setHours(0, 0, 0, 0)) {
            this.eventDialog = false;
        } else {
            this.eventDialog = true;
            this.clickedEvent = arg.event;
            this.date = new Date(arg.dateStr);
            this.date.setHours(8, 30, 0, 0);
            // this.date = this.datePipe.transform(this.newDate, "yyyy-MM-dd");
            this.changedEvent = {
                id: null,
                title: this.clientName,
                start: this.date,
                end: null,
                allDay: null,
            };
            this.clickedEvent = true;
        }
    }

    save() {
        if (this.demandeId != null) {
            this.eventDialog = false;
            this.myRdv.dateRdv = this.changedEvent.start;
            this.myRdv.title = this.changedEvent.title;
            this.myRdv.idDemande = this.demandeId;

            this.myRdv.idUser = this.clientId;

            // this.eventService.postRdvAPI(this.myRdv).subscribe();
            this.messageService.add({
                key: "tst",
                severity: "success",
                summary: "Succ??s",
                detail: "Rendez-vous enregistrer avec succ??s",
            });
            this.closeDialog.emit(this.myRdv);
        } else if (this.changedEvent.id != null) {
            this.myRdv.dateRdv = this.changedEvent.start;
            this.myRdv.title = this.changedEvent.title;
            this.myRdv.idRdv = this.changedEvent.id;
            this.myRdv.idUser = this.user.id;
            let e = this.events[0].find((i) => i.idRdv == this.changedEvent.id);
            this.myRdv.idDemande = e.idDemande;
            this.eventService.postRdvAPI(this.myRdv).subscribe();
            this.messageService.add({
                key: "tst",
                severity: "success",
                summary: "Succ??s",
                detail: "Rendez-vous modifi?? avec succ??s",
            });
            this.eventDialog = false;
        } else {
            this.messageService.add({
                key: "tst",
                severity: "error",
                summary: "Acc??s refus??",
                detail: "Vous ne pouvez pas fixer un rendez-vous sans une demande",
            });
        }
    }

    supprimer() {
        if (this.changedEvent.id != null) {
            this.eventService.deleteRdvAPI(this.clickedEvent.id).subscribe();
            this.eventDialog = false;
            this.messageService.add({
                key: "tst",
                severity: "info",
                summary: "Info Message",
                detail: "Rendez-vous supprim??",
            });
        } else {
            this.eventDialog = false;
        }
    }
}
