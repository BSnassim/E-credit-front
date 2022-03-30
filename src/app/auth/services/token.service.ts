import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
    baseUrl = environment.apiURL + '/authenticate';

    constructor(private http: HttpClient) { }
    getToken(){
        return localStorage.getItem('access token');
    }
    setToken(token: string){
        localStorage.setItem('access token', token);
    }
    removeToken(){
        localStorage.removeItem('access token');
    }

    // Used in the interceptor to refresh the current token
    refreshToken(){
        return this.http.post(this.baseUrl + '/refresh', this.getToken());
    }
}
