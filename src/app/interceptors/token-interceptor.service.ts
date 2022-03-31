import { Injectable } from '@angular/core';
import { TokenService } from '../auth/services/token.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
    providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

    constructor(private tokenService: TokenService, private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authReq = req;
        const token = this.tokenService.getToken();
        if (token != null) {
            authReq = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
        }
        return next.handle(authReq).pipe(catchError((error: HttpErrorResponse) => {
            console.log(error);
            if (error.status === 403) {
                // 403 handled in auth.interceptor
                //  Token expired !
                //  refresh token
                
                    this.tokenService.removeToken();
                    this.router.navigate(['/']);
                
            }
            return throwError(error);
        }));
    }



}
