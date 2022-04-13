import { Component, OnInit } from "@angular/core";
import { AppBreadcrumbService } from "src/app/main/app-breadcrumb/app.breadcrumb.service";
import { Demande } from "src/app/models/credit/info-personnel";
import { Credit } from "src/app/models/credit/typeCredit";

@Component({
    selector: "app-credit-list",
    templateUrl: "./credit-list.component.html",
    styleUrls: ["./credit-list.component.scss"],
})
export class CreditListComponent implements OnInit {
    demande = {} as Demande;

    typeCredit: Credit[];

    typeC = {} as Credit;

    constructor(private breadcrumbService: AppBreadcrumbService) {
        this.breadcrumbService.setItems([
            { label: "Credit" },
            {
                label: "Liste des demandes",
                routerLink: ["creidt/list_demande"],
            },
        ]);
    }

    ngOnInit(): void {}

    sitFam: any[] = ["Mariée", "Célibataire", "Divorsé"];

    typePiece: any[] = ["CIN", "Passeport"];

    saveDemandeCredit(): void {}
}
