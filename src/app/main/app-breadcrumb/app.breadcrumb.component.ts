import { Component, OnDestroy } from '@angular/core';
import { AppBreadcrumbService } from './app.breadcrumb.service';
import { Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api';
import {AppMainComponent} from '../app-main/app.main.component';
import { TokenService } from 'src/app/auth/services/token.service';
import { EventsService } from 'src/app/Services/events.service';

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './app.breadcrumb.component.html'
})
export class AppBreadcrumbComponent implements OnDestroy {

    subscription: Subscription;

    items: MenuItem[];

    home: MenuItem;

    search: string;

    events: number;

    constructor(public breadcrumbService: AppBreadcrumbService, public appMain: AppMainComponent,private tokenService: TokenService,
        private eventsService: EventsService) {
        this.subscription = breadcrumbService.itemsHandler.subscribe(response => {
            this.items = response;
        });

        this.home = { icon: 'pi pi-home', routerLink: '/' };
    }

    ngOnInit(): void {
        this.loadUser();
    }

    getEvent(id: string) {
        this.eventsService.getRdvByIdUserAPI(id).subscribe((data) => {
            this.events = data.length;
        });
    }

    loadUser() {
        this.tokenService.getUser().subscribe((data) => {
            this.getEvent(data.id);
        });
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
