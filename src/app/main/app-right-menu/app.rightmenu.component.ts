import { Component } from "@angular/core";
import { TokenService } from "src/app/auth/services/token.service";
import { User } from "src/app/models/user";
import { AppMainComponent } from "../app-main/app.main.component";

@Component({
    selector: "app-rightmenu",
    templateUrl: "./app.rightmenu.component.html",
})
export class AppRightMenuComponent {
    date: Date;

    currentUser: User = new User();

    constructor(
        public appMain: AppMainComponent,
        private tokenService: TokenService
    ) {}

    ngOnInit(): void {
        this.loadUser();
    }

    loadUser() {
        this.tokenService.getUser().subscribe((data) => {
            this.currentUser = data;
        });
    }
}
