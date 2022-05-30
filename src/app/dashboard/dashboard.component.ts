import { NgxPermissionsService } from "ngx-permissions";
import { NgxRolesService } from "ngx-permissions";
import { Component, OnInit } from "@angular/core";
import { AppBreadcrumbService } from "../main/app-breadcrumb/app.breadcrumb.service";
import { DemandeRdv } from "../models/demande-rdv";
import { User } from "../models/user";

import { TokenService } from "../auth/services/token.service";

import { CreditFormService } from "../Services/credit-form-service.service";
import { Historique } from "../models/historique";

@Component({
    selector: "app-dashboard",
    templateUrl: "./dashboard.component.html",
    styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
    historiques: Historique[] = [];

    currentUser: User = new User();

    historique = {} as Historique;

    constructor(
        private breadcrumbService: AppBreadcrumbService,
        private tokenService: TokenService,
        private creditService: CreditFormService
    ) {
        this.breadcrumbService.setItems([
            { label: "Dashboard", routerLink: ["/"] },
        ]);
    }

    ngOnInit(): void {
        this.loadUser();
        // console.log(this.LoadHistoriqueDemande("12345678"));
        // this.getLibEtapePhase().then((res) => {
        //     this.customEvents = [
        //         {
        //             // idPhase=1
        //             status: res.find((i) => i.id == 1).etape,
        //             date: res.find((i) => i.id == 1).enAttenteDe,
        //             icon: PrimeIcons.DOWNLOAD,
        //             color: "rgba(228, 0, 123, 1)",
        //         },
        //         {
        //             // idPhase=1
        //             status: "Demande en cours de traitement",
        //             // date: "15/10/2020 14:00",
        //             icon: PrimeIcons.COG,
        //             color: "rgba(255, 170, 0, 1)",
        //         },
        //         {
        //             // idPhase=4
        //             status: res.find((i) => i.id == 4).etape,
        //             date: res.find((i) => i.id == 4).enAttenteDe,
        //             icon: PrimeIcons.PLUS,
        //             color: "rgba(186, 0, 255, 1)",
        //         },
        //         {
        //             // idPhase=5
        //             status: res.find((i) => i.id == 5).etape,
        //             date: res.find((i) => i.id == 5).enAttenteDe,
        //             icon: PrimeIcons.PENCIL,
        //             color: "rgba(0, 186, 255, 1)",
        //         },
        //         {
        //             // idPhase=3
        //             status: res.find((i) => i.id == 3).etape,
        //             date: "Pour plus d'informations contacter le responsable de votre agence",
        //             icon: PrimeIcons.TIMES,
        //             color: "rgba(255, 0, 0, 1)",
        //         },
        //         {
        //             // idPhase=2
        //             status: res.find((i) => i.id == 2).etape,
        //             // info: "Rendez-vous dans votre agence le :",
        //             date: res.find((i) => i.id == 2).enAttenteDe,
        //             icon: PrimeIcons.CHECK,
        //             color: "rgba(2, 217, 7, 0.82)",
        //         },
        //     ];
        // });
    }

    LoadHistoriqueDemande(id: string) {
        this.creditService.getHistoriqueDemandeRecente(id).subscribe((data) => {
            setTimeout(() => {
                this.historiques = data;
            }, 1000);
        });
    }

    loadUser() {
        this.tokenService.getUser().subscribe((data) => {
            this.currentUser = data;

            this.LoadHistoriqueDemande(data.id);
        });
    }
}
