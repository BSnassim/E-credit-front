import { Component, OnDestroy } from "@angular/core";
import { AppBreadcrumbService } from "./app.breadcrumb.service";
import { Subscription } from "rxjs";
import { MenuItem } from "primeng/api";
import { AppMainComponent } from "../app-main/app.main.component";
import { EventsService } from "src/app/Services/events.service";
import { DemandeRdv } from "src/app/models/demande-rdv";

@Component({
    selector: "app-breadcrumb",
    templateUrl: "./app.breadcrumb.component.html",
})
export class AppBreadcrumbComponent implements OnDestroy {
    subscription: Subscription;

    items: MenuItem[];

    home: MenuItem;

    events: DemandeRdv[] = [];

    search: string;

    constructor(
        public breadcrumbService: AppBreadcrumbService,
        public appMain: AppMainComponent,
        private eventsService: EventsService
    ) {
        this.subscription = breadcrumbService.itemsHandler.subscribe(
            (response) => {
                this.items = response;
            }
        );

        this.home = { icon: "pi pi-home", routerLink: "/" };
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    getEvent(id: string) {
        this.eventsService.getRdvByIdUserAPI(id).subscribe((data) => {
            this.events = data;
            return data;
        });
    }
}
