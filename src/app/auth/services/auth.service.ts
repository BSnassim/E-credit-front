import { CryptojsService } from './../../Services/cryptojs.service';
import { Habilitation } from './../../models/habilitation';
import { NgxPermissionsService } from 'ngx-permissions';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { LoginUser } from '../../models/LoginUser';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    baseUrl = environment.apiURL;
    constructor(private http: HttpClient,
        private tokenService: TokenService,
        private router: Router,
        private encrypter: CryptojsService,
        private permissionService: NgxPermissionsService) { }

    savePermissions(permissions: Habilitation[]) { 
        let perms = permissions.map(a => a.libelle);
        let res = this.encrypter.encrypt(JSON.stringify(perms));
        sessionStorage.setItem('permissions', res);
    }
    getPermissions(){ 
        let perms = this.encrypter.decrypt(sessionStorage.getItem('permissions'));
        let res = JSON.parse(perms);
        return res;
    }
    login(u: LoginUser): Observable<any> {
        return this.http.post(this.baseUrl + '/authenticate', u);
    }
    logout() {
        this.tokenService.removeToken();
        sessionStorage.removeItem('permissions');
        this.permissionService.flushPermissions();
        this.router.navigate(['/login']);
    }
}
