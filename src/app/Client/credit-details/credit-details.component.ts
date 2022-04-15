import { CreditFormService } from "src/app/Services/credit-form-service.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AppBreadcrumbService } from "src/app/main/app-breadcrumb/app.breadcrumb.service";
import { Demande } from "src/app/models/credit/demande";

@Component({
    selector: "app-credit-details",
    templateUrl: "./credit-details.component.html",
    styleUrls: ["./credit-details.component.scss"],
})
export class CreditDetailsComponent implements OnInit {
    demande = {} as Demande;

    garanties = [] as any[];

    constructor(
        private breadcrumbService: AppBreadcrumbService,
        private route: ActivatedRoute,
        private demandeService: CreditFormService
    ) {
        this.breadcrumbService.setItems([
            { label: "Liste des credits", routerLink: ["credit/consultation"] },
            { label: "Details du demande" },
        ]);
    }

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.getDemande(params.id);
            this.getGaranties(params.id);
        });
    }

    getGaranties(id: number) {
        this.demandeService.getGarantiesByDemande(id).subscribe((data) => {
            this.garanties = data;
        });
    }

    getDemande(id: number) {
        this.demandeService.getDemandeById(id).subscribe((data) => {
            this.demande = data;
        });
    }
}
