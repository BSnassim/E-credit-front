import { AuthService } from './../auth/services/auth.service';
import { Injectable } from '@angular/core';
import { TokenService } from '../auth/services/token.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';


@Injectable({
    providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

    constructor(
        private tokenService: TokenService,
        private router: Router,
        private permissionService: NgxPermissionsService,
        private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authReq = req;
        const token = this.tokenService.getToken();
        if (token != null) {
            authReq = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
        }
        return next.handle(authReq).pipe(catchError((error: HttpErrorResponse) => {
            console.log(error);
            if (error.status == 401 || error.status == 403) {
                // handling unauthorized errors
                //  or token expired 
                if (token != null) {
                    this.authService.logout();
                } else {
                    this.tokenService.removeToken();
                    sessionStorage.removeItem("permissions");
                    this.permissionService.flushPermissions();
                    this.router.navigate(["/login"]);
                }
            }
            return throwError(error);
        }));
    }



}
