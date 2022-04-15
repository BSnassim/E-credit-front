import { User } from './../../models/user';
import { Router } from '@angular/router';
import { TokenService } from "src/app/auth/services/token.service";

import { Component, OnInit } from "@angular/core";
import { AppBreadcrumbService } from "src/app/main/app-breadcrumb/app.breadcrumb.service";
import { Demande } from "src/app/models/credit/demande";
import { CreditFormService } from "src/app/Services/credit-form-service.service";
import { Table } from "primeng/table";
import { MenuItem } from "primeng/api";

@Component({
    selector: "app-credit-list",
    templateUrl: "./credit-list.component.html",
    styleUrls: ["./credit-list.component.scss"],
})
export class CreditListComponent implements OnInit {

    listDemande: Demande[] = [];

    items: MenuItem[];

    demandeId: number;

    displayList: {
        id: number;
        nomprenom: string;
        type: number;
        dateCreation: Date;
        montant: number;
        etat: string;
    }[] = [];

    phases: any;

    user: User;

    loading: boolean = true;

    constructor(
        private breadcrumbService: AppBreadcrumbService,
        private creditService: CreditFormService,
        private tokenService: TokenService,
        private router: Router
    ) {
        this.breadcrumbService.setItems([{ label: "Liste des credits" }]);
    }

    ngOnInit(): void {
        this.items = [{
            label: 'Voir détails',
            icon: 'pi pi-file',
            command: () => this.redirectToDetails()
        },
        {
            label: 'Info',
            icon: 'pi pi-upload',
            routerLink: '/',
            visible: false
        }

        ];
        this.getUserId().then((result) => {
            this.user = result;
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

    redirectToDetails() {
        this.router.navigate(["/credit/consultation/details", { id: this.demandeId }])
    }

    getDemandeId(id: number) {
        this.demandeId = id;
    }

    clear(table: Table) {
        table.clear();
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
        let access: boolean;
        this.user.profil.habilitations.forEach(e => {
            if (e.libelle == "ROLE_Traitement Demandes") {
                access = true;
            }
        })
        if (access) {
            const result = await this.creditService
                .getListDemande()
                .toPromise();
            return result;
        }
        else {
            const result = await this.creditService
                .getDemandesByUser(this.user.id)
                .toPromise();

            return result;
        }
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
