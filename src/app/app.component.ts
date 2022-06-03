import { NgxPermissionsService } from "ngx-permissions";
import { AuthService } from "./auth/services/auth.service";
import { Component, OnInit } from "@angular/core";
import { PrimeNGConfig } from "primeng/api";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
    menuMode = "sidebar";

    layout = "blue";

    theme = "blue";

    ripple: boolean;

    colorScheme = "light";

    constructor(
        private primengConfig: PrimeNGConfig,
        private authService: AuthService,
        private permissionsService: NgxPermissionsService
    ) {}

    ngOnInit() {
        this.changeStyleSheetsColor(
            "layout-css",
            "layout-" + "light" + ".css",
            1
        );
        this.changeStyleSheetsColor(
            "theme-css",
            "theme-" + "light" + ".css",
            1
        );

        this.primengConfig.ripple = true;
        this.ripple = true;
        this.permissionsService.loadPermissions(
            this.authService.getPermissions()
        );
    }

    changeStyleSheetsColor(id, value, from) {
        const element = document.getElementById(id);
        const urlTokens = element.getAttribute("href").split("/");

        if (from === 1) {
            // which function invoked this function - change scheme
            urlTokens[urlTokens.length - 1] = value;
        } else if (from === 2) {
            // which function invoked this function - change color
            urlTokens[urlTokens.length - 2] = value;
        }

        const newURL = urlTokens.join("/");

        this.replaceLink(element, newURL);
    }

    replaceLink(linkElement, href) {
        if (this.isIE()) {
            linkElement.setAttribute("href", href);
        } else {
            const id = linkElement.getAttribute("id");
            const cloneLinkElement = linkElement.cloneNode(true);

            cloneLinkElement.setAttribute("href", href);
            cloneLinkElement.setAttribute("id", id + "-clone");

            linkElement.parentNode.insertBefore(
                cloneLinkElement,
                linkElement.nextSibling
            );

            cloneLinkElement.addEventListener("load", () => {
                linkElement.remove();
                cloneLinkElement.setAttribute("id", id);
            });
        }
    }

    isIE() {
        return /(MSIE|Trident\/|Edge\/)/i.test(window.navigator.userAgent);
    }
}
