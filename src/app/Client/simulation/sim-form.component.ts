import { TokenService } from './../../auth/services/token.service';
import { SimulationService } from './../../Services/simulation.service';
import { Simulation } from './../../models/credit/simulation';
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AppBreadcrumbService } from "src/app/main/app-breadcrumb/app.breadcrumb.service";
import { CreditFormService } from "src/app/Services/credit-form-service.service";
import { TypeCredit } from 'src/app/models/credit/typeCredit';
import { MessageService } from 'primeng/api';


@Component({
    selector: "app-sim-form",
    templateUrl: "./sim-form.component.html",
    styleUrls: ["./sim-form.component.scss"],
    providers: [MessageService],
})
export class SimFormComponent implements OnInit {

    echeanceOptions = [{ id: 1, name: 'Mois' }, { id: 2, name: 'An' }];
    selectedEcheance = {} as { id: number, name: string };

    familialeOptions = [{ id: 1, name: "Marié(e)" }, { id: 2, name: "Célibataire" }, { id: 3, name: "Divorcé(e)" }, { id: 4, name: "Veuf(ve)" }];
    selectedFamiliale = {} as { id: number, name: string };

    emploiOptions = [{ id: 1, name: 'Salarié' }, { id: 2, name: "Fonction libérale" }, { id: 3, name: "Retraité" }, { id: 4, name: "Rentier" }];
    selectedEmploi = {} as { id: number, name: string };

    medicaleOptions = [{ id: 1, name: 'Bon santé' }, { id: 2, name: "Maladie chronique" }];
    selectedMedicale = {} as { id: number, name: string };

    logementOptions = [{ id: 1, name: 'Locataire' }, { id: 2, name: "Propriétaire" }];
    selectedLogement = {} as { id: number, name: string };

    pieceOptions = [{ id: 1, name: 'CIN' }, { id: 2, name: "Passeport" }];
    selectedPiece = {} as { id: number, name: string };

    typesCredit: TypeCredit[];
    selectedCredit: TypeCredit;

    simulation = {} as Simulation;

    UserId: number;

    showResultat: boolean= false;

    resultat : number;

    constructor(
        private router: Router,
        private messageService: MessageService,
        private creditFormService: CreditFormService,
        private simulationService: SimulationService,
        private tokenService: TokenService,
        private breadcrumbService: AppBreadcrumbService
    ) {
        this.breadcrumbService.setItems([
            { label: "Credit" },
            { label: "Simulation de crédit" },
        ]);
    }

    ngOnInit(): void {
        this.getUserID();
        this.getTypeCredit();
    }

    getUserID(){
        this.tokenService.getUser().subscribe(
            data =>{
                this.UserId = data.id;
            }
        )
    }

    getTypeCredit() {
        this.creditFormService.getTypeCreditAPI().subscribe((response) => {
            this.typesCredit = response;
        });
    }

    submit() {
        if (!this.selectedCredit || !this.selectedEcheance || !this.selectedEmploi || !this.selectedFamiliale || !this.selectedLogement
            || !this.selectedMedicale || !this.selectedPiece || !this.simulation.nom || !this.simulation.prenom || !this.simulation.numPiece
            || !this.simulation.numCompte || !this.simulation.dateCompte || !this.simulation.dateNaissance || !this.simulation.gsm ||
            !this.simulation.montant || !this.simulation.nbreEcheance || !this.simulation.salaire) {
            this.messageService.add({ severity: 'error', summary: 'Echec', detail: 'Veuiller verifier les champs !', life: 3000 });
        }
        else{
            this.simulation.idTypeCredit = this.selectedCredit.idType;
            this.simulation.sitFamiliale = this.selectedFamiliale.name;
            this.simulation.sitLogement = this.selectedLogement.name;
            this.simulation.sitMedicale = this.selectedMedicale.name;
            this.simulation.sitProfessionnel = this.selectedEmploi.name;
            this.simulation.unite = this.selectedEcheance.name;
            this.simulation.typePiece = this.selectedPiece.name;
            this.simulation.idUser = this.UserId;
            this.resultat = this.simulationService.calculateSimulation(this.simulation);
            this.simulation.resultat = (this.resultat>=50? "Eligible":"Ineligible");
            this.simulationService.saveSimulation(this.simulation).subscribe();
            this.showResultat = true;
        }
    }

}
