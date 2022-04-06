import { Component, OnInit } from '@angular/core';
import { AppBreadcrumbService } from 'src/app/main/app-breadcrumb/app.breadcrumb.service';

@Component({
  selector: 'app-credit-list',
  templateUrl: './credit-list.component.html',
  styleUrls: ['./credit-list.component.scss']
})
export class CreditListComponent implements OnInit {

  constructor(
    private breadcrumbService: AppBreadcrumbService
) {
    this.breadcrumbService.setItems([
        { label: "Liste des credits" }
    ]);
}

  ngOnInit(): void {
  }

}
