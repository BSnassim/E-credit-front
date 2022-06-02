import { Component, OnInit } from "@angular/core";
import { AppBreadcrumbService } from "../main/app-breadcrumb/app.breadcrumb.service";
import { User } from "../models/user";
import { TokenService } from "../auth/services/token.service";
import { CreditFormService } from "../Services/credit-form-service.service";
import { Historique } from "../models/historique";
import { Demande } from "../models/credit/demande";
import { UserService } from "../Services/user.service";

@Component({
    selector: "app-dashboard",
    templateUrl: "./dashboard.component.html",
    styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
    /***** Manager's Dashboard Declarations *****/

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

    /***** Admin's Dashboard Declarations *****/

    users: User[] = [];

    stackedData: any;

    stackedOptions: any;

    adminTu: number = 0;
    chargeTu: number = 0;
    clientTu: number = 0;

    adminAr: number = 0;
    chargeAr: number = 0;
    clientAr: number = 0;

    adminAo: number = 0;
    chargeAo: number = 0;
    clientAo: number = 0;

    adminMou: number = 0;
    chargeMou: number = 0;
    clientMou: number = 0;

    adminNa: number = 0;
    chargeNa: number = 0;
    clientNa: number = 0;

    adminMontazah: number = 0;
    chargeMontazah: number = 0;
    clientMontazah: number = 0;

    adminMontplaisir: number = 0;
    chargeMontplaisir: number = 0;
    clientMontplaisir: number = 0;

    invoiceDialog = false;

    demId:number;

    constructor(
        private breadcrumbService: AppBreadcrumbService,
        private tokenService: TokenService,
        private creditService: CreditFormService,
        private userService: UserService
    ) {
        this.breadcrumbService.setItems([
            { label: "Tableau de bord", routerLink: ["/"] },
        ]);
    }

    ngOnInit(): void {
        this.loadUserInfo();
    }

    loadHistoriqueDemandeForClient(id: string) {
        this.creditService.getHistoriqueDemandeRecente(id).subscribe((data) => {
            this.historiques = data;
            });
    }

    rdvInvoice(id:number){
        this.invoiceDialog = true;
        this.demId = id;
    }     

    loadUserInfo() {
        this.tokenService.getUser().subscribe((data) => {
            this.currentUser = data;
            this.loadHistoriqueDemandeForClient(data.id);
            this.loadDemandsForManager(data.agence.idAgence);
            this.loadDataForAdmin();
        });
    }

    loadDataForAdmin() {
        this.userService.getUsers().subscribe((data) => {
            this.users = data;
            let u: number = 0;
            while (u < Object.keys(this.users).length) {
                if (this.users[u].agence.idAgence === 100) {
                    if (this.users[u].profil.id === 85) {
                        this.adminTu++;
                    } else if (this.users[u].profil.id === 86) {
                        this.chargeTu++;
                    } else if (this.users[u].profil.id === 101) {
                        this.clientTu++;
                    }
                } else if (this.users[u].agence.idAgence === 101) {
                    if (this.users[u].profil.id === 85) {
                        this.adminAr++;
                    } else if (this.users[u].profil.id === 86) {
                        this.chargeAr++;
                    } else if (this.users[u].profil.id === 101) {
                        this.clientAr++;
                    }
                } else if (this.users[u].agence.idAgence === 102) {
                    if (this.users[u].profil.id === 85) {
                        this.adminAo++;
                    } else if (this.users[u].profil.id === 86) {
                        this.chargeAo++;
                    } else if (this.users[u].profil.id === 101) {
                        this.clientAo++;
                    }
                } else if (this.users[u].agence.idAgence === 103) {
                    if (this.users[u].profil.id === 85) {
                        this.adminMou++;
                    } else if (this.users[u].profil.id === 86) {
                        this.chargeMou++;
                    } else if (this.users[u].profil.id === 101) {
                        this.clientMou++;
                    }
                } else if (this.users[u].agence.idAgence === 104) {
                    if (this.users[u].profil.id === 85) {
                        this.adminNa++;
                    } else if (this.users[u].profil.id === 86) {
                        this.chargeNa++;
                    } else if (this.users[u].profil.id === 101) {
                        this.clientNa++;
                    }
                } else if (this.users[u].agence.idAgence === 105) {
                    if (this.users[u].profil.id === 85) {
                        this.adminMontazah++;
                    } else if (this.users[u].profil.id === 86) {
                        this.chargeMontazah++;
                    } else if (this.users[u].profil.id === 101) {
                        this.clientMontazah++;
                    }
                } else if (this.users[u].agence.idAgence === 106) {
                    if (this.users[u].profil.id === 85) {
                        this.adminMontplaisir++;
                    } else if (this.users[u].profil.id === 86) {
                        this.chargeMontplaisir++;
                    } else if (this.users[u].profil.id === 101) {
                        this.clientMontplaisir++;
                    }
                }
                u++;
            }
            this.stackedData = {
                labels: [
                    "Tunis",
                    "Ariana",
                    "Aouina",
                    "Mourouj",
                    "Nabeul",
                    "Montazah",
                    "Montplaisir",
                ],
                datasets: [
                    {
                        type: "bar",
                        label: "Admins",
                        backgroundColor: "rgba(245, 39, 93, 0.91)",
                        data: [
                            this.adminTu,
                            this.adminAr,
                            this.adminAo,
                            this.adminMou,
                            this.adminNa,
                            this.adminMontazah,
                            this.adminMontplaisir,
                        ],
                    },
                    {
                        type: "bar",
                        label: "Chargés des demandes de crédit",
                        backgroundColor: "rgba(39, 217, 245, 1)",
                        data: [
                            this.chargeTu,
                            this.chargeAr,
                            this.chargeAo,
                            this.chargeMou,
                            this.chargeNa,
                            this.chargeMontazah,
                            this.chargeMontplaisir,
                        ],
                    },
                    {
                        type: "bar",
                        label: "Clients",
                        backgroundColor: "rgba(39, 245, 127, 1)",
                        data: [
                            this.clientTu,
                            this.clientAr,
                            this.clientAo,
                            this.clientMou,
                            this.clientNa,
                            this.clientMontazah,
                            this.clientMontplaisir,
                        ],
                    },
                ],
            };
            this.stackedOptions = {
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
                        this.JanDemands[a] = this.demands[i];
                        if (this.JanDemands[a].idPhase === 2) {
                            this.JanDemandsAccepted++;
                        } else if (this.JanDemands[a].idPhase === 3) {
                            this.JanDemandsRejected++;
                        }
                        a++;
                    }
                    if (dat.getMonth() === 1) {
                        this.FebDemands[b] = this.demands[i];
                        if (this.FebDemands[b].idPhase === 2) {
                            this.FebDemandsAccepted++;
                        } else if (this.FebDemands[b].idPhase === 3) {
                            this.FebDemandsRejected++;
                        }
                        b++;
                    }
                    if (dat.getMonth() === 2) {
                        this.MarDemands[c] = this.demands[i];
                        if (this.MarDemands[c].idPhase === 2) {
                            this.MarDemandsAccepted++;
                        } else if (this.MarDemands[c].idPhase === 3) {
                            this.MarDemandsRejected++;
                        }
                        c++;
                    }
                    if (dat.getMonth() === 3) {
                        this.AprDemands[d] = this.demands[i];
                        if (this.AprDemands[d].idPhase === 2) {
                            this.AprDemandsAccepted++;
                        } else if (this.AprDemands[d].idPhase === 3) {
                            this.AprDemandsRejected++;
                        }
                        d++;
                    }
                    if (dat.getMonth() === 4) {
                        this.MayDemands[e] = this.demands[i];
                        if (this.MayDemands[e].idPhase === 2) {
                            this.MayDemandsAccepted++;
                        } else if (this.MayDemands[e].idPhase === 3) {
                            this.MayDemandsRejected++;
                        }
                        e++;
                    }
                    if (dat.getMonth() === 5) {
                        this.JuiDemands[f] = this.demands[i];
                        if (this.JuiDemands[f].idPhase === 2) {
                            this.JuiDemandsAccepted++;
                        } else if (this.JuiDemands[f].idPhase === 3) {
                            this.JuiDemandsRejected++;
                        }
                        f++;
                    }
                    if (dat.getMonth() === 6) {
                        this.JulDemands[g] = this.demands[i];
                        if (this.JulDemands[g].idPhase === 2) {
                            this.JulDemandsAccepted++;
                        } else if (this.JulDemands[g].idPhase === 3) {
                            this.JulDemandsRejected++;
                        }
                        g++;
                    }
                    if (dat.getMonth() === 7) {
                        this.AugDemands[h] = this.demands[i];
                        if (this.AugDemands[h].idPhase === 2) {
                            this.AugDemandsAccepted++;
                        } else if (this.AugDemands[h].idPhase === 3) {
                            this.AugDemandsRejected++;
                        }
                        h++;
                    }
                    if (dat.getMonth() === 8) {
                        this.SepDemands[j] = this.demands[i];
                        if (this.SepDemands[j].idPhase === 2) {
                            this.SepDemandsAccepted++;
                        } else if (this.SepDemands[j].idPhase === 3) {
                            this.SepDemandsRejected++;
                        }
                        j++;
                    }
                    if (dat.getMonth() === 9) {
                        this.OctDemands[k] = this.demands[i];
                        if (this.OctDemands[k].idPhase === 2) {
                            this.OctDemandsAccepted++;
                        } else if (this.OctDemands[k].idPhase === 3) {
                            this.OctDemandsRejected++;
                        }
                        k++;
                    }
                    if (dat.getMonth() === 10) {
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
