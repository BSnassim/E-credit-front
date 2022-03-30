import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';

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

    // Used to get the user details using his token
    getUser(): Observable<User>{
        return this.http.get<User>(this.baseUrl + '/getUserByToken/'+ this.getToken());
    }

    // Used in the interceptor to refresh the current token
    refreshToken(){
        return this.http.post(this.baseUrl + '/refresh', this.getToken());
    }
}
