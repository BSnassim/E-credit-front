import { TokenService } from "src/app/auth/services/token.service";

import { Component, OnInit } from "@angular/core";
import { AppBreadcrumbService } from "src/app/main/app-breadcrumb/app.breadcrumb.service";
import { Demande } from "src/app/models/credit/demande";
import { CreditFormService } from "src/app/Services/credit-form-service.service";
import { TypeCredit } from "src/app/models/credit/typeCredit";

@Component({
    selector: "app-credit-list",
    templateUrl: "./credit-list.component.html",
    styleUrls: ["./credit-list.component.scss"],
})
export class CreditListComponent implements OnInit {
    demande = {} as Demande;

    listDemande: Demande[] = [];

    listTypesCredit: TypeCredit[] = [];

    displayList: {
        id: number;
        montant: number;
        type: string;
        dateDernier: Date;
        etat: string;
    }[] = [];

    phases: any;

    userId: number;

    constructor(
        private breadcrumbService: AppBreadcrumbService,
        private creditService: CreditFormService,
        private tokenService: TokenService
    ) {
        this.breadcrumbService.setItems([{ label: "Liste des credits" }]);
    }

    ngOnInit(): void {
        this.getUserId().then((result) => {
            this.userId = result.id;
            this.getListTypes().then((result1) => {
                this.listTypesCredit = result1;
                this.getPhases().then((result2) => {
                    this.phases = result2;
                    this.getDemandes().then((result3) => {
                        this.listDemande = result3;
                        this.initList();
                    });
                });
            });
        });
    }

    async getUserId() {
        const result = await this.tokenService.getUser().toPromise();

        return result;
    }

    async getListTypes() {
        const result = await this.creditService.getTypeCreditAPI().toPromise();

        return result;
    }

    async getPhases() {
        const result = await this.creditService.getListPhases().toPromise();

        return result;
    }

    async getDemandes() {
        const result = await this.creditService
            .getDemandesByUser(this.userId)
            .toPromise();

        return result;
    }

    initList(): void {
        this.listDemande.forEach((e) => {
            let credit = this.listTypesCredit.find(
                (i) => i.idType === e.idTypeCredit
            );
            let phase = this.phases.find((i) => i.id === e.idPhase);
            this.displayList.push({
                id: e.idDemande,
                montant: e.montant,
                type: credit?.libcredit,
                dateDernier: e.datePhase,
                etat: phase.enAttenteDe,
            });
        });
    }
}
