import {Component, OnInit} from '@angular/core';
import {AppComponent} from '../../app.component';
import {AppMainComponent} from '../app-main/app.main.component';
import {AuthService} from "../../auth/services/auth.service";

@Component({
    selector: 'app-topbar',
    template: `
        <div class="layout-topbar">
            <div class="layout-topbar-left">
                <a href="#" class="topbar-menu-button" (click)="appMain.onMenuButtonClick($event)" *ngIf="appMain.isOverlay() || appMain.isMobile()">
                    <i class="pi pi-bars"></i>
                </a>

                <a href="#" class="logo">
                    <img  [src]="'assets/layout/images/logo3-'+ (app.colorScheme === 'light' ? 'dark' : 'light') + '.png'">
                </a>

            </div>

            <app-menu></app-menu>

            <div class="layout-topbar-right">
                <ul class="layout-topbar-right-items">
                    <li #profile class="profile-item" [ngClass]="{'active-topmenuitem':appMain.activeTopbarItem === profile}">
                        <a href="#" (click)="appMain.onTopbarItemClick($event,profile)">
                            <img src="assets/layout/images/profile-image.png">
                        </a>

                        <ul class="fadeInDown">
                            <li role="menuitem">
                                <a href="#" [routerLink]="['/user/profile']">
                                    <i class="pi pi-fw pi-user"></i>
                                    <span>Profile</span>
                                </a>
                            </li>

                            <li role="menuitem">
                                <a  (click)="logout()">
                                    <i class="pi pi-fw pi-sign-out"></i>
                                    <span>Logout</span>
                                </a>
                            </li>
                        </ul>
                    </li>

                    

                </ul>
            </div>
        </div>
    `
})
export class AppTopbarComponent{
    constructor(public app: AppComponent, public appMain: AppMainComponent, private authService: AuthService) {}
    logout(){
        this.authService.logout();
    }

}
