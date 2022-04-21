import { TokenService } from 'src/app/auth/services/token.service';
import { User } from 'src/app/models/user';
import {Component} from '@angular/core';
import {AppMainComponent} from '../app-main/app.main.component';

@Component({
    selector: 'app-rightmenu',
    templateUrl: './app.rightmenu.component.html'
})
export class AppRightMenuComponent {
    date: Date;

    user= {} as User;

    constructor(public appMain: AppMainComponent, private tokenService: TokenService) {
        this.tokenService.getUser().subscribe(data=>{
            this.user = data;
        })
    }
}
