import { Component, OnInit } from "@angular/core";
import { AppBreadcrumbService } from "../main/app-breadcrumb/app.breadcrumb.service";
import { User } from "../models/user";

import { TokenService } from "../auth/services/token.service";

import { CreditFormService } from "../Services/credit-form-service.service";
import { Historique } from "../models/historique";
import { Demande } from "../models/credit/demande";

@Component({
    selector: "app-dashboard",
    templateUrl: "./dashboard.component.html",
    styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
    barData: any;

    pieData: any;

    barOptions: any;

    pieOptions: any;

    accepted: number = 0;

    rejected: number = 0;

    modified: number = 0;

    submitted: number = 0;

    returned: number = 0;

    demandes: Demande[] = [];

    JanDemands: Demande[] = [];

    FebDemands: Demande[] = [];

    MarDemands: Demande[] = [];

    AprDemands: Demande[] = [];

    MayDemands: Demande[] = [];

    JuiDemands: Demande[] = [];

    JulDemands: Demande[] = [];

    AugDemands: Demande[] = [];

    SepDemands: Demande[] = [];

    OctDemands: Demande[] = [];

    NovDemands: Demande[] = [];

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
        this.loadUserInfo();
    }

    loadHistoriqueDemande(id: string) {
        this.creditService.getHistoriqueDemandeRecente(id).subscribe((data) => {
            this.historiques = data;
        });
    }

    loadUserInfo() {
        this.tokenService.getUser().subscribe((data) => {
            this.currentUser = data;
            this.loadHistoriqueDemande(data.id);
            this.loadDemandsForManager(data.agence.idAgence);
        });
    }

    loadDemandsForManager(id: number) {
        this.creditService
            .getAllDemandesByAgenceAndByYear(id)
            .subscribe((data) => {
                this.demandes = data;
                this.demandes.forEach((demande) => {
                    if (demande.idPhase === 1) {
                        this.submitted++;
                    }
                    if (demande.idPhase === 2) {
                        this.accepted++;
                    }
                    if (demande.idPhase === 3) {
                        this.rejected++;
                    }
                    if (demande.idPhase === 4) {
                        this.returned++;
                    }
                    if (demande.idPhase === 5) {
                        this.modified++;
                    }
                });

                // Object.keys(this.demandes).length  for  table length

                this.barData = {
                    labels: [
                        "January",
                        "February",
                        "March",
                        "April",
                        "May",
                        "June",
                        "July",
                        "August",
                        "September",
                        "October",
                        "November",
                    ],
                    datasets: [
                        {
                            label: "Les Demandes rejetés",
                            backgroundColor: "rgb(255, 99, 132)",
                            borderColor: "rgb(255, 99, 132)",
                            data: [65, 59, 80, 81, 56, 55, 40, 50, 50, 22, 33],
                        },
                        {
                            label: "Les demandes accordés",
                            backgroundColor: "rgb(2, 217, 7)",
                            borderColor: "rgb(2, 217, 7)",
                            data: [28, 48, 40, 19, 86, 27, 90, 11, 42, 32, 33],
                        },
                    ],
                };
                this.barOptions = {
                    plugins: {
                        legend: {
                            labels: {
                                fontColor: "#A0A7B5",
                            },
                        },
                    },
                    scales: {
                        x: {
                            ticks: {
                                color: "#A0A7B5",
                            },
                            grid: {
                                color: "rgba(160, 167, 181, .3)",
                            },
                        },
                        y: {
                            ticks: {
                                color: "#A0A7B5",
                            },
                            grid: {
                                color: "rgba(160, 167, 181, .3)",
                            },
                        },
                    },
                };
                this.pieData = {
                    labels: [
                        "Les Demandes Soumises",
                        "Les demandes accordés",
                        "Les Demandes rejetés",
                        "En Attente d'un Complément",
                        "Les Demandes Modifiées",
                    ],
                    datasets: [
                        {
                            data: [
                                this.submitted,
                                this.accepted,
                                this.rejected,
                                this.returned,
                                this.modified,
                            ],
                            backgroundColor: [
                                "rgb(255, 205, 86)",
                                "rgb(2, 217, 7)",
                                "rgb(255, 99, 132)",
                                "rgb(186, 0, 255)",
                                "rgb(75, 192, 192)",
                            ],
                        },
                    ],
                };
                this.pieOptions = {
                    plugins: {
                        legend: {
                            labels: {
                                fontColor: "#A0A7B5",
                            },
                        },
                    },
                };
            });
    }
}
