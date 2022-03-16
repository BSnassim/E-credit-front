import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppComponent} from '../../app.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {LoginUser} from '../../models/LoginUser';
import {AuthService} from '../services/auth.service';
import {TokenService} from '../services/token.service';
import {NgxRolesService} from 'ngx-permissions';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
    subscription: Subscription;
    loginForm: FormGroup;
    errorMsgs = [];
    constructor(public app: AppComponent, private formBuilder: FormBuilder, private translateService: TranslateService, private authService: AuthService, private tokenService: TokenService, private permissionsService: NgxRolesService, private router: Router) {
    }
    ngOnInit(): void {
       if (this.tokenService.getToken()){
            this.router.navigate(['/']);
        }
       this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        }, {updateOn: 'submit'});
    }

    login() {
        this.errorMsgs = [];
        if (this.loginForm.invalid) {
            this.showValidationMsgs();
        } else { // Valid Form
            let loginUser: LoginUser;
            // Binding data to Model
            loginUser = {...loginUser, ...this.loginForm.value};
            this.authService.login(loginUser).subscribe((response) => {
                    console.log(response);
                    this.tokenService.setToken(response.token.value);
                // Add roles to permission service
                // tslint:disable-next-line:max-line-length
                    response.roles.forEach(role => this.permissionsService.addRoleWithPermissions(role.name, role.permissions.map((permission) => role.name + '_' + permission)));
                    console.log(this.permissionsService.getRoles());
                    this.router.navigate(['/']);
                }, (error) => {
                   this.subscription = this.translateService.get('msgs').subscribe((msg) => {
                       if (error.status === 403) {
                           this.errorMsgs.push({severity: 'error', detail: msg.invalid_credentials});
                       }else{
                           this.errorMsgs.push({severity: 'error', detail: msg.error});
                       }
                   });
                }
            );
        }
    }

    showValidationMsgs() {
        this.subscription = this.translateService.get(['user', 'msgs']).subscribe((data) => {
            if (this.loginForm.controls.username.hasError('required')) {
                this.errorMsgs.push({severity: 'error', detail: data.user.username + data.msgs.required});
            }
            if (this.loginForm.controls.password.hasError('required')) {
                this.errorMsgs.push({severity: 'error', detail: data.user.password + data.msgs.required});
            }
        });
    }
    ngOnDestroy(){
       // Open observable subscription streams causes performance issues
       if (this.subscription){
           this.subscription.unsubscribe();
       }
    }


}
