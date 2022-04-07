import { User } from "src/app/models/user";
import { TokenService } from "./../../auth/services/token.service";
import { UserService } from "src/app/Services/user.service";
import { Component, OnInit } from "@angular/core";
import { AppMainComponent } from "../app-main/app.main.component";
import {
    trigger,
    state,
    style,
    transition,
    animate,
} from "@angular/animations";
import { AuthService } from "../../auth/services/auth.service";

@Component({
    selector: "app-inlinemenu",
    templateUrl: "./app.inlinemenu.component.html",
    animations: [
        trigger("inline", [
            state(
                "hidden",
                style({
                    height: "0px",
                    overflow: "hidden",
                })
            ),
            state(
                "visible",
                style({
                    height: "*",
                })
            ),
            state(
                "hiddenAnimated",
                style({
                    height: "0px",
                    overflow: "hidden",
                })
            ),
            state(
                "visibleAnimated",
                style({
                    height: "*",
                })
            ),
            transition(
                "visibleAnimated => hiddenAnimated",
                animate("400ms cubic-bezier(0.86, 0, 0.07, 1)")
            ),
            transition(
                "hiddenAnimated => visibleAnimated",
                animate("400ms cubic-bezier(0.86, 0, 0.07, 1)")
            ),
        ]),
    ],
})
export class AppInlineMenuComponent implements OnInit {
    currentUser: User = new User();

    constructor(
        public appMain: AppMainComponent,
        private authService: AuthService,
        private tokenService: TokenService
    ) {}

    ngOnInit(): void {
        this.loadUser();
    }

    logout() {
        this.authService.logout();
    }

    loadUser() {
        this.tokenService.getUser().subscribe((data) => {
            this.currentUser = data;
        });
    }
}
