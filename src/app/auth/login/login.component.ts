import { Component, OnDestroy, OnInit } from "@angular/core";
import { AppComponent } from "../../app.component";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { LoginUser } from "../../models/LoginUser";
import { AuthService } from "../services/auth.service";
import { TokenService } from "../services/token.service";
import { NgxPermissionsService } from "ngx-permissions";
import { Router } from "@angular/router";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
    // :::::::::  PIN PAD CONFIGURATION  :::::::::::::
    // generatedPad() {
    //     const padLayout = [
    //         "1",
    //         "2",
    //         "3",
    //         "4",
    //         "5",
    //         "6",
    //         "7",
    //         "8",
    //         "9",
    //         "0",
    //         "erase",
    //     ];
    //     padLayout.forEach((key) => {
    //         const insertBreak = key.search(/[369]/) !== -1;
    //         const keyEl = document.createElement("div");

    //         keyEl.classList.add("pin-login__key");
    //         keyEl.classList.toggle("material-icons", isNaN(key));
    //         keyEl.textContent = key;
    //         keyEl.addEventListener("click", () => {
    //             this._handleKeyPress(key);
    //         });
    //         this.el.numPad.appendChild(keyEl);
    //         if (insertBreak) {
    //             this.el.numPad.appendChild(document.createElement("br"));
    //         }
    //     });
    // }
    // _handleKeyPress(key) {
    //     switch (key) {
    //         case "backspace":
    //             this.value = this.value.substring(0, this.value.length - this.value.length);
    //             break;
    //         default:
    //             if (this.value.length < this.maxNumbers && !isNaN(key)) {
    //                 this.value += key;
    //             }
    //             break;
    //     }

    //     this._updateValueText();
    // }

    // _updateValueText() {
    //     this.el.textDisplay.value = "_".repeat(this.value.length);
    //     this.el.textDisplay.classList.remove("pin-login__text--error");
    // }

    // :::::::::::::::::::::::::::::::::::::::::::::::
    loginForm: FormGroup;
    errorMsgs = [];
    constructor(
        public app: AppComponent,
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private tokenService: TokenService,
        private permissionsService: NgxPermissionsService,
        private router: Router
    ) {}

    ngOnInit(): void {
        if (this.tokenService.getToken()) {
            this.router.navigate(["/"]);
        }
        this.loginForm = this.formBuilder.group(
            {
                id: ["", Validators.required],
                password: ["", Validators.required],
            },
            { updateOn: "submit" }
        );
    }

    login() {
        this.errorMsgs = [];
        if (this.loginForm.invalid) {
            this.showValidationMsgs();
        } else {
            // Valid Form
            let loginUser: LoginUser;
            // Binding data to Model
            loginUser = { ...this.loginForm.value };
            this.authService.login(loginUser).subscribe(
                (response) => {
                    this.tokenService.setToken(response.token);
                    // Add roles to permission service
                    this.authService.savePermissions(response.roles);
                    this.permissionsService.loadPermissions(
                        this.authService.getPermissions()
                    );
                    this.router.navigate(["/"]);
                },
                (error) => {
                    if (error.status === 403 || error.status === 401) {
                        this.errorMsgs.push({
                            severity: "error",
                            detail: "Login invalide",
                        });
                    } else {
                        this.errorMsgs.push({
                            severity: "error",
                            detail: "Une erreur est survenue !",
                        });
                    }
                }
            );
        }
    }

    showValidationMsgs() {
        if (this.loginForm.controls.username.hasError("required")) {
            this.errorMsgs.push({
                severity: "error",
                detail: "Veuillez saisir votre identifiant.",
            });
        }
        if (this.loginForm.controls.password.hasError("required")) {
            this.errorMsgs.push({
                severity: "error",
                detail: "Veuillez saisir votre mot de passe.",
            });
        }
    }
}
