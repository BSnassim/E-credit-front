import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { AppMainComponent } from '../app-main/app.main.component';

@Component({
    selector: 'app-config',
    template: `
        <a style="cursor: pointer" id="layout-config-button" class="layout-config-button" (click)="onConfigButtonClick($event)">
            <i class="pi pi-cog"></i>
        </a>
        <div class="layout-config" [ngClass]="{'layout-config-active': appMain.configActive}" (click)="appMain.onConfigClick($event)">

            <div class="field-radiobutton">
                <p-radioButton name="darkMode" value="dark" [(ngModel)]="app.colorScheme" inputId="darkMode2"
                (onClick)="changeColorScheme('dark')"></p-radioButton>
                <label style="margin-right:10px" for="darkMode2">Dark mode</label>
                <p-radioButton name="darkMode" value="light" [(ngModel)]="app.colorScheme" inputId="darkMode1"
                               (onClick)="changeColorScheme('light')"></p-radioButton>
                <label for="darkMode1">Light mode</label>
            </div>
        </div>
    `
})
export class AppConfigComponent implements OnInit {

    layoutColors: any[];

    themeColors: any[];

    constructor(public appMain: AppMainComponent, public app: AppComponent) { }

    ngOnInit() {
    }

    changeColorScheme(scheme) {
        this.changeStyleSheetsColor('layout-css', 'layout-' + scheme + '.css', 1);
        this.changeStyleSheetsColor('theme-css', 'theme-' + scheme + '.css', 1);

        this.app.colorScheme = scheme;
    }

    changeStyleSheetsColor(id, value, from) {
        const element = document.getElementById(id);
        const urlTokens = element.getAttribute('href').split('/');

        if (from === 1) {           // which function invoked this function - change scheme
            urlTokens[urlTokens.length - 1] = value;
        } else if (from === 2) {       // which function invoked this function - change color
            urlTokens[urlTokens.length - 2] = value;
        }

        const newURL = urlTokens.join('/');

        this.replaceLink(element, newURL);
    }

    changeTheme(theme) {
        const themeLink: HTMLLinkElement = document.getElementById('theme-css') as HTMLLinkElement;
        const href = 'assets/theme/' + theme + '/theme-' + this.app.colorScheme + '.css';
        this.app.theme = theme;

        this.replaceLink(themeLink, href);
    }

    changeLayout(layout) {
        const layoutLink: HTMLLinkElement = document.getElementById('layout-css') as HTMLLinkElement;
        const href = 'assets/layout/css/' + layout + '/layout-' + this.app.colorScheme + '.css';
        this.app.layout = layout;

        this.replaceLink(layoutLink, href);
    }

    isIE() {
        return /(MSIE|Trident\/|Edge\/)/i.test(window.navigator.userAgent);
    }

    replaceLink(linkElement, href) {
        if (this.isIE()) {
            linkElement.setAttribute('href', href);
        } else {
            const id = linkElement.getAttribute('id');
            const cloneLinkElement = linkElement.cloneNode(true);

            cloneLinkElement.setAttribute('href', href);
            cloneLinkElement.setAttribute('id', id + '-clone');

            linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);

            cloneLinkElement.addEventListener('load', () => {
                linkElement.remove();
                cloneLinkElement.setAttribute('id', id);
            });
        }
    }

    onConfigButtonClick(event) {
        this.appMain.configActive = !this.appMain.configActive;
        this.appMain.configClick = true;
        event.preventDefault();
    }



}
