import { Injectable } from '@angular/core';
import {AuthService} from '../auth/services/auth.service';
import {TokenService} from '../auth/services/token.service';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{


    constructor(private authService: AuthService, private tokenService: TokenService, private router: Router) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // We retrieve the token, if any*/
        const token = this.tokenService.getToken();
        let newHeaders = req.headers;
        if (token) {
            newHeaders = newHeaders.append('Authorization', 'Bearer ' + token);
        }
        const tokenReq = req.clone({headers: newHeaders});
        return next.handle(tokenReq).pipe(catchError((error: HttpErrorResponse) => {
            console.log(error);
            if (error.status === 403) {
                // 403 handled in auth.interceptor
                //  Token expired !
                //  refresh token
                this.tokenService.refreshToken().subscribe((newToken: string) => {
                    this.tokenService.setToken(newToken);
                    this.intercept(req, next);
                }, err => {
                    console.log('Error refreshing token !');
                    console.log(err);
                    this.tokenService.removeToken();
                    this.router.navigate(['/']);
                });
                console.log('need to refresh token !');
            }
            return throwError(error);
        }));
    }


}
