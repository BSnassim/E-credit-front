import { Component } from '@angular/core';
import { AppComponent } from '../../app.component';

@Component({
    selector: 'app-footer',
    template: `
        <div class="layout-footer">
            <div class="footer-logo-container">
            <span class="copyright">&#169; GTI - 2022</span>
            </div>
        </div>
    `
})
export class AppFooterComponent {
    constructor(public app: AppComponent) { }
}
