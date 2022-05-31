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

    demands: Demande[] = [];

    CurrentMonthDemands: Demande[] = [];

    JanDemands: Demande[] = [];
    JanDemandsAccepted: number = 0;
    JanDemandsRejected: number = 0;

    FebDemands: Demande[] = [];
    FebDemandsAccepted: number = 0;
    FebDemandsRejected: number = 0;

    MarDemands: Demande[] = [];
    MarDemandsAccepted: number = 0;
    MarDemandsRejected: number = 0;

    AprDemands: Demande[] = [];
    AprDemandsAccepted: number = 0;
    AprDemandsRejected: number = 0;

    MayDemands: Demande[] = [];
    MayDemandsAccepted: number = 0;
    MayDemandsRejected: number = 0;

    JuiDemands: Demande[] = [];
    JuiDemandsAccepted: number = 0;
    JuiDemandsRejected: number = 0;

    JulDemands: Demande[] = [];
    JulDemandsAccepted: number = 0;
    JulDemandsRejected: number = 0;

    AugDemands: Demande[] = [];
    AugDemandsAccepted: number = 0;
    AugDemandsRejected: number = 0;

    SepDemands: Demande[] = [];
    SepDemandsAccepted: number = 0;
    SepDemandsRejected: number = 0;

    OctDemands: Demande[] = [];
    OctDemandsAccepted: number = 0;
    OctDemandsRejected: number = 0;

    NovDemands: Demande[] = [];
    NovDemandsAccepted: number = 0;
    NovDemandsRejected: number = 0;

    historiques: Historique[] = [];

    historique = {} as Historique;

    currentUser: User = new User();

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
                this.demands = data;
                let y: number = 0;
                let x: number = 0;
                while (y < Object.keys(this.demands).length) {
                    let dat = new Date(this.demands[y].datePhase);
                    let today = new Date();
                    if (dat.getMonth() === today.getMonth()) {
                        this.CurrentMonthDemands[x] = this.demands[y];
                        x++;
                    }
                    y++;
                }
                this.CurrentMonthDemands.forEach((demande) => {
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
                // console.log(Object.keys(this.demandes).length); //  for  table length
                // let i: number = 0;
                // while (i < Object.keys(this.demandes).length) {
                //     let dat = new Date(this.demandes[i].datePhase);
                //     console.log(dat.getMonth());
                //     i++;
                // }
                let i: number = 0;
                let a: number = 0;
                let b: number = 0;
                let c: number = 0;
                let d: number = 0;
                let e: number = 0;
                let f: number = 0;
                let g: number = 0;
                let h: number = 0;
                let j: number = 0;
                let k: number = 0;
                let l: number = 0;
                while (i < Object.keys(this.demands).length) {
                    let dat = new Date(this.demands[i].datePhase);
                    if (dat.getMonth() === 0) {
                        console.log("January");
                        this.JanDemands[a] = this.demands[i];
                        if (this.JanDemands[a].idPhase === 2) {
                            this.JanDemandsAccepted++;
                        } else if (this.JanDemands[a].idPhase === 3) {
                            this.JanDemandsRejected++;
                        }
                        a++;
                    }
                    if (dat.getMonth() === 1) {
                        console.log("February");
                        this.FebDemands[b] = this.demands[i];
                        if (this.FebDemands[b].idPhase === 2) {
                            this.FebDemandsAccepted++;
                        } else if (this.FebDemands[b].idPhase === 3) {
                            this.FebDemandsRejected++;
                        }
                        b++;
                    }
                    if (dat.getMonth() === 2) {
                        console.log("Mars");
                        this.MarDemands[c] = this.demands[i];
                        if (this.MarDemands[c].idPhase === 2) {
                            this.MarDemandsAccepted++;
                        } else if (this.MarDemands[c].idPhase === 3) {
                            this.MarDemandsRejected++;
                        }
                        c++;
                    }
                    if (dat.getMonth() === 3) {
                        console.log("April");
                        this.AprDemands[d] = this.demands[i];
                        if (this.AprDemands[d].idPhase === 2) {
                            this.AprDemandsAccepted++;
                        } else if (this.AprDemands[d].idPhase === 3) {
                            this.AprDemandsRejected++;
                        }
                        d++;
                    }
                    if (dat.getMonth() === 4) {
                        console.log("May");
                        this.MayDemands[e] = this.demands[i];
                        if (this.MayDemands[e].idPhase === 2) {
                            this.MayDemandsAccepted++;
                        } else if (this.MayDemands[e].idPhase === 3) {
                            this.MayDemandsRejected++;
                        }
                        e++;
                    }
                    if (dat.getMonth() === 5) {
                        console.log("Juin");
                        this.JuiDemands[f] = this.demands[i];
                        if (this.JuiDemands[f].idPhase === 2) {
                            this.JuiDemandsAccepted++;
                        } else if (this.JuiDemands[f].idPhase === 3) {
                            this.JuiDemandsRejected++;
                        }
                        f++;
                    }
                    if (dat.getMonth() === 6) {
                        console.log("July");
                        this.JulDemands[g] = this.demands[i];
                        if (this.JulDemands[g].idPhase === 2) {
                            this.JulDemandsAccepted++;
                        } else if (this.JulDemands[g].idPhase === 3) {
                            this.JulDemandsRejected++;
                        }
                        g++;
                    }
                    if (dat.getMonth() === 7) {
                        console.log("August");
                        this.AugDemands[h] = this.demands[i];
                        if (this.AugDemands[h].idPhase === 2) {
                            this.AugDemandsAccepted++;
                        } else if (this.AugDemands[h].idPhase === 3) {
                            this.AugDemandsRejected++;
                        }
                        h++;
                    }
                    if (dat.getMonth() === 8) {
                        console.log("September");
                        this.SepDemands[j] = this.demands[i];
                        if (this.SepDemands[j].idPhase === 2) {
                            this.SepDemandsAccepted++;
                        } else if (this.SepDemands[j].idPhase === 3) {
                            this.SepDemandsRejected++;
                        }
                        j++;
                    }
                    if (dat.getMonth() === 9) {
                        console.log("October");
                        this.OctDemands[k] = this.demands[i];
                        if (this.OctDemands[k].idPhase === 2) {
                            this.OctDemandsAccepted++;
                        } else if (this.OctDemands[k].idPhase === 3) {
                            this.OctDemandsRejected++;
                        }
                        k++;
                    }
                    if (dat.getMonth() === 10) {
                        console.log("November");
                        this.NovDemands[l] = this.demands[i];
                        if (this.NovDemands[l].idPhase === 2) {
                            this.NovDemandsAccepted++;
                        } else if (this.NovDemands[l].idPhase === 3) {
                            this.NovDemandsRejected++;
                        }
                        l++;
                    }
                    i++;
                }
                let yoyo: any[];
                let today = new Date();
                switch (today.getMonth()) {
                    case 0:
                        yoyo = [];
                        break;
                    case 1:
                        yoyo = ["January"];
                        break;
                    case 2:
                        yoyo = ["January", "February"];
                        break;
                    case 3:
                        yoyo = ["January", "February", "March"];
                        break;
                    case 4:
                        yoyo = ["January", "February", "March", "April"];
                        break;
                    case 5:
                        yoyo = ["January", "February", "March", "April", "May"];
                        break;
                    case 6:
                        yoyo = [
                            "January",
                            "February",
                            "March",
                            "April",
                            "May",
                            "Juin",
                        ];
                        break;
                    case 7:
                        yoyo = [
                            "January",
                            "February",
                            "March",
                            "April",
                            "May",
                            "Juin",
                            "July",
                        ];
                        break;

                    case 8:
                        yoyo = [
                            "January",
                            "February",
                            "March",
                            "April",
                            "May",
                            "Juin",
                            "July",
                            "August",
                        ];
                        break;
                    case 9:
                        yoyo = [
                            "January",
                            "February",
                            "March",
                            "April",
                            "May",
                            "Juin",
                            "July",
                            "August",
                            "September",
                        ];
                        break;
                    case 10:
                        yoyo = [
                            "January",
                            "February",
                            "March",
                            "April",
                            "May",
                            "Juin",
                            "July",
                            "August",
                            "September",
                            "October",
                        ];
                        break;
                    case 11:
                        yoyo = [
                            "January",
                            "February",
                            "March",
                            "April",
                            "May",
                            "Juin",
                            "July",
                            "August",
                            "September",
                            "October",
                            "November",
                        ];
                        break;
                }
                this.barData = {
                    labels: yoyo,
                    datasets: [
                        {
                            label: "Les Demandes rejetés",
                            backgroundColor: "rgb(255, 99, 132)",

                            data: [
                                this.JanDemandsRejected,
                                this.FebDemandsRejected,
                                this.MarDemandsRejected,
                                this.AprDemandsRejected,
                                this.MayDemandsRejected,
                                this.JuiDemandsRejected,
                                this.JulDemandsRejected,
                                this.AugDemandsRejected,
                                this.SepDemandsRejected,
                                this.OctDemandsRejected,
                                this.NovDemandsRejected,
                            ],
                        },
                        {
                            label: "Les demandes accordés",
                            backgroundColor: "rgb(2, 217, 72)",

                            data: [
                                this.JanDemandsAccepted,
                                this.FebDemandsAccepted,
                                this.MarDemandsAccepted,
                                this.AprDemandsAccepted,
                                this.MayDemandsAccepted,
                                this.JuiDemandsAccepted,
                                this.JulDemandsAccepted,
                                this.AugDemandsAccepted,
                                this.SepDemandsAccepted,
                                this.OctDemandsAccepted,
                                this.NovDemandsAccepted,
                            ],
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
                                "rgb(2, 217, 72)",
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
