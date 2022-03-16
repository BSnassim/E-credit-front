import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {TokenService} from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private tokenService: TokenService, private router: Router) {
    }

    // @ts-ignore
    // tslint:disable-next-line:max-line-length
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean {
        /*if (!this.tokenService.getToken()) {// User not authenticated properly
            // Not authenticated properly
            this.tokenService.removeToken();
            this.router.navigate(['/login']);
            return false;
        } else {
            return true;
        }*/
        return true;
    }
}
