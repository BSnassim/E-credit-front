import { Component, OnInit } from '@angular/core';
import { AppBreadcrumbService } from 'src/app/main/app-breadcrumb/app.breadcrumb.service';
import { Demande } from 'src/app/models/credit/info-personnel';
import { CreditFormService } from 'src/app/Services/credit-form-service.service';

@Component({
  selector: 'app-credit-list',
  templateUrl: './credit-list.component.html',
  styleUrls: ['./credit-list.component.scss']
})
export class CreditListComponent implements OnInit {

  listDemande : Demande[] = [{},{}];

  constructor(
    private breadcrumbService: AppBreadcrumbService,
    private creditService: CreditFormService
) {
    this.breadcrumbService.setItems([
        { label: "Liste des credits" }
    ]);
}

  ngOnInit(): void {
    // this.creditService.getListDemande( data =>{
    //   this.listDemande = data;
    // })
  }

}
