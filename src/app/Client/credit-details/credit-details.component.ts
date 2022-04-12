import { Component, OnInit } from '@angular/core';
import { AppBreadcrumbService } from 'src/app/main/app-breadcrumb/app.breadcrumb.service';

@Component({
  selector: 'app-credit-details',
  templateUrl: './credit-details.component.html',
  styleUrls: ['./credit-details.component.scss']
})
export class CreditDetailsComponent implements OnInit {

  constructor(private breadcrumbService: AppBreadcrumbService) {
    this.breadcrumbService.setItems([
      { label: "Details du demande" }
    ]);
   }

  ngOnInit(): void {
  }

}
