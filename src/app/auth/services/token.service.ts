import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
    baseUrl = environment.adminURL + '/unsecured/token';

    constructor(private http: HttpClient) { }
    getToken(){
        return localStorage.getItem('sbeToken');
    }
    setToken(token: string){
        localStorage.setItem('sbeToken', token);
    }
    removeToken(){
        localStorage.removeItem('sbeToken');
    }

    // Used in the interceptor to refresh the current token
    refreshToken(){
        return this.http.post(this.baseUrl + '/refresh', this.getToken());
    }
}
