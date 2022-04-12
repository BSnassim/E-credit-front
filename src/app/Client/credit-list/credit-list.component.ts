import { Credit } from 'src/app/models/credit/typeCredit';
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

  listDemande: Demande[] = [];

  listTypesCredit: Credit[] = [];

  displayList: { 'montant': number, 'type': string, 'dateDernier': Date, 'etat': string }[] = [];

  phases: any;

  constructor(
    private breadcrumbService: AppBreadcrumbService,
    private creditService: CreditFormService
  ) {
    this.breadcrumbService.setItems([
      { label: "Liste des credits" }
    ]);
  }

  ngOnInit(): void {
    this.getListTypes().then(() => {
      this.getPhases().then(() => {
      this.getDemandes().then(() => {
        this.initList();
      })
    })
  })
  };

  getListTypes(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.creditService.getTypeCreditAPI().subscribe(data => {
        this.listTypesCredit = data;
        resolve();
      }
      );
    })
  };

  getPhases(): Promise<void>{
    return new Promise((resolve, reject) => {
      this.creditService.getListPhases().subscribe(data => {
        this.phases = data;
        resolve();
      }
      );
    })
  };

  getDemandes(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.creditService.getListDemande().subscribe(data => {
        this.listDemande = data;
        resolve();
      }
      );
    })
  };

  initList(): void {
    this.listDemande.forEach(e => {
      let credit = this.listTypesCredit.find(i => i.idType === e.idTypeCredit);
      let phase = this.phases.find(i => i.id === e.idPhase);
      this.displayList.push({
        montant: e.montant,
        type: credit?.libcredit,
        dateDernier: e.datePhase,
        etat: phase.enAttenteDe
      });
    });
  }

}
