import { NgxPermissionsService } from 'ngx-permissions';
import { NgxRolesService } from 'ngx-permissions';
import { Component, OnInit } from '@angular/core';
import { AppBreadcrumbService } from '../main/app-breadcrumb/app.breadcrumb.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private breadcrumbService: AppBreadcrumbService,) {
    this.breadcrumbService.setItems([
        { label: "Dashboard", routerLink: ["/"] },
    ]);
}

  ngOnInit(): void {
  }

}
