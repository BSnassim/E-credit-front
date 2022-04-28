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

    colorScheme = "dark";

    constructor(
        private primengConfig: PrimeNGConfig,
        private authService: AuthService,
        private permissionsService: NgxPermissionsService
    ) {}

    ngOnInit() {
        this.primengConfig.ripple = true;
        this.ripple = true;
        this.permissionsService.loadPermissions(
            this.authService.getPermissions()
        );

        (function (d, m) {
            var kommunicateSettings = {
                appId: "25f891fd7d70ad508f7f7132897fb02fc",
                popupWidget: true,
                automaticChatOpenOnNavigation: true,
            };
            var s = document.createElement("script");
            s.type = "text/javascript";
            s.async = true;
            s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
            var h = document.getElementsByTagName("head")[0];
            h.appendChild(s);
            (window as any).kommunicate = m;
            m._globals = kommunicateSettings;
        })(document, (window as any).kommunicate || {});
    }
}
