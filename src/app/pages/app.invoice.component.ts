import {Component} from '@angular/core';
import {AppBreadcrumbService} from '../main/app-breadcrumb/app.breadcrumb.service';
import {AppComponent} from '../app.component';

@Component({
    templateUrl: './app.invoice.component.html'
})
export class AppInvoiceComponent {

    constructor(private breadcrumbService: AppBreadcrumbService, public app: AppComponent) {
        this.breadcrumbService.setItems([
            { label: 'Pages' },
            { label: 'Invoice', routerLink: ['/pages/invoice'] }
        ]);
    }

    print() {
        window.print();
    }
}
