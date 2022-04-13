import { TokenService } from "src/app/auth/services/token.service";
import { Credit } from "src/app/models/credit/typeCredit";
import { Component, OnInit } from "@angular/core";
import { AppBreadcrumbService } from "src/app/main/app-breadcrumb/app.breadcrumb.service";
import { Demande } from "src/app/models/credit/info-personnel";
import { CreditFormService } from "src/app/Services/credit-form-service.service";

@Component({
    selector: "app-credit-list",
    templateUrl: "./credit-list.component.html",
    styleUrls: ["./credit-list.component.scss"],
})
export class CreditListComponent implements OnInit {
    demande = {} as Demande;

    listDemande: Demande[] = [];

    displayList: {
        id: number;
        nomprenom: string;
        type: number;
        dateCreation: Date;
        montant: number;
        etat: string;
    }[] = [];

    phases: any;

    userId: number;

    loading: boolean = true;

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
                this.getPhases().then((result2) => {
                    this.phases = result2;
                    this.getDemandes().then((result3) => {
                        this.listDemande = result3;
                        this.initList();
                        this.loading = false;
                    });
                
            });
        });
    }

    async getUserId() {
        const result = await this.tokenService.getUser().toPromise();

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
            let phase = this.phases.find((i) => i.id === e.idPhase);
            this.displayList.push({
                id: e.idDemande,
                nomprenom: e.nom + " " + e.prenom,
                dateCreation: e.datePhase,
                montant: e.montant,
                type: e.idTypeCredit,
                etat: phase.enAttenteDe,
            });
        });
    }
}
