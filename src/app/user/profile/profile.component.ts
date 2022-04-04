import { TokenService } from './../../auth/services/token.service';
import { User } from 'src/app/models/user';
import { Component, OnInit } from '@angular/core';
import { AppBreadcrumbService } from 'src/app/main/app-breadcrumb/app.breadcrumb.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  currentUser : User = new User;

  constructor(private breadcrumbService: AppBreadcrumbService, private tokenService: TokenService) {
    this.breadcrumbService.setItems([
        { label: 'Utilisateur' },
        { label: 'Profile' }
    ]);
}

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser(){
    this.tokenService.getUser().subscribe(data=>{
      this.currentUser = data;
    })
  }

}
