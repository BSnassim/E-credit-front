import { Component } from "@angular/core";
import { TokenService } from "src/app/auth/services/token.service";
import { DemandeRdv } from "src/app/models/demande-rdv";
import { User } from "src/app/models/user";
import { EventsService } from "src/app/Services/events.service";
import { AppMainComponent } from "../app-main/app.main.component";

@Component({
    selector: "app-rightmenu",
    templateUrl: "./app.rightmenu.component.html",
})
export class AppRightMenuComponent {
    date: Date;

    events: DemandeRdv[] = [];

    currentUser: User = new User();

    currentDate: Date = new Date();

    constructor(
        public appMain: AppMainComponent,
        private tokenService: TokenService,
        private eventsService: EventsService
    ) {}

    ngOnInit(): void {
        this.loadUser();
    }

    getEvent(id: number) {
        this.eventsService.getRdvByIdUserAPI(id).subscribe((data) => {
            this.events = data;
        });
    }

    loadUser() {
        this.tokenService.getUser().subscribe((data) => {
            this.currentUser = data;
            this.getEvent(data.id);
        });
    }
}
