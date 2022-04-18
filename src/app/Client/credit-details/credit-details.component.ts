import { CryptojsService } from './../../Services/cryptojs.service';
import { Profil } from './../../models/profil';
import { Habilitation } from './../../models/habilitation';
import { User } from './../../models/user';
import { CreditFormService } from 'src/app/Services/credit-form-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppBreadcrumbService } from 'src/app/main/app-breadcrumb/app.breadcrumb.service';
import { Demande } from 'src/app/models/credit/demande';
import { TokenService } from 'src/app/auth/services/token.service';

@Component({
    selector: "app-credit-details",
    templateUrl: "./credit-details.component.html",
    styleUrls: ["./credit-details.component.scss"],
})
export class CreditDetailsComponent implements OnInit {
    demande = {} as Demande;

    pieces = [] as any[];

    garanties = [] as any[];

    hidden: boolean = true;

    user = {} as User;

    constructor(
        private breadcrumbService: AppBreadcrumbService,
        private route: ActivatedRoute,
        private demandeService: CreditFormService,
        private tokenService: TokenService,
        private encrypter: CryptojsService
    ) {
        this.breadcrumbService.setItems([
            { label: "Liste des credits", routerLink: ["credit/consultation"] },
            { label: "Details du demande" },
        ]);
        this.user.profil = {} as Profil;
        this.user.profil.habilitations = [];
    }

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            let value: number = +this.encrypter.decrypt(params.id);
            this.getDemande(value);
            this.getGaranties(value);
            this.getPieces(value);
            this.getUser();
        });
    }

    getUser() {
        this.tokenService.getUser().subscribe((data) => {
            this.user = data;
        });
    }

    hasAccess() {
        let access: boolean = false;
        this.user.profil.habilitations.forEach(e => {
            if (e.libelle == "ROLE_Traitement Demandes") {
                access = true;
            }
        })
        return access;
    }

    showComplement() {
        this.hidden = !this.hidden;
    }

    getGaranties(id: number) {
        this.demandeService.getGarantiesByDemande(id).subscribe((data) => {
            this.garanties = data;
        });
    }

    getPieces(id: number) {
        this.demandeService.getPiecesJointesByDemande(id).subscribe((data) => {
            this.pieces = data;
        })
    }

    getDemande(id: number) {
        this.demandeService.getDemandeById(id).subscribe((data) => {
            this.demande = data;
        });
    }
}
