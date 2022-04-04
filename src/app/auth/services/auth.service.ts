import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {LoginUser} from '../../models/LoginUser';
import {Observable} from 'rxjs';
import {TokenService} from './token.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    baseUrl = environment.apiURL;
    constructor(private http: HttpClient, private tokenService: TokenService, private router: Router) {}


    login(u: LoginUser): Observable<any>{
        return this.http.post(this.baseUrl + '/authenticate', u);
    }
    logout(){
        this.tokenService.removeToken();
        this.router.navigate(['/login']);
    }
}
