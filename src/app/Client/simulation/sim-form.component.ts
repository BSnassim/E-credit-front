import { Simulation } from './../../models/credit/simulation';
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AppBreadcrumbService } from "src/app/main/app-breadcrumb/app.breadcrumb.service";
import { CreditFormService } from "src/app/Services/credit-form-service.service";
import { TypeCredit } from 'src/app/models/credit/typeCredit';


@Component({
    selector: "app-sim-form",
    templateUrl: "./sim-form.component.html",
    styleUrls: ["./sim-form.component.scss"],
})
export class SimFormComponent implements OnInit {

    echeanceOptions = [{id:1, name:'Mois'}, {id:2, name:'An'}];
    selectedEcheance={} as {id:number, name:string};

    familialeOptions = [{id:1, name:"Marié(e)"}, {id:2, name:"Célibataire"}, {id:3, name:"Divorcé(e)"}, {id:4, name:"Veuf(ve)"}];
    selectedFamiliale={} as {id:number, name:string};

    emploiOptions = [{id:1, name:'Salarié'}, {id:2, name:"Fonction libérale"}, {id:3, name:"Retraité"}, {id:4, name:"Rentier"}];
    selectedEmploi={} as {id:number, name:string};

    medicaleOptions = [{id:1, name:'Bon santé'}, {id:2, name:"Maladie chronique"}];
    selectedMedicale={} as {id:number, name:string};

    logementOptions = [{id:1, name:'Locataire'}, {id:2, name:"Propriétaire"}];
    selectedLogement={} as {id:number, name:string};

    pieceOptions = [{id:1, name:'CIN'}, {id:2, name:"Passeport"}];
    selectedPiece={} as {id:number, name:string};
    
    typesCredit: TypeCredit[];
    selectedCredit:TypeCredit;

    simulation = {} as Simulation;

    constructor(
        private router: Router,
        private creditFormService: CreditFormService,
        private breadcrumbService: AppBreadcrumbService
    ) {
        this.breadcrumbService.setItems([
            { label: "Credit" },
            { label: "Simulation de crédit" },
        ]);
    }

    ngOnInit(): void {
        this.getTypeCredit();
    }

    getTypeCredit() {
        this.creditFormService.getTypeCreditAPI().subscribe((response) => {
            this.typesCredit = response;
        });
    }
    
}
