import { CryptojsService } from './../../Services/cryptojs.service';
import { Profil } from './../../models/profil';
import { User } from './../../models/user';
import { CreditFormService } from 'src/app/Services/credit-form-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppBreadcrumbService } from 'src/app/main/app-breadcrumb/app.breadcrumb.service';
import { Demande } from 'src/app/models/credit/demande';
import { TokenService } from 'src/app/auth/services/token.service';
import { ConfirmationService, ConfirmEventType, MenuItem, MessageService } from 'primeng/api';

@Component({
    selector: "app-credit-details",
    templateUrl: "./credit-details.component.html",
    styleUrls: ["./credit-details.component.scss"],
    providers: [ConfirmationService,MessageService]
})
export class CreditDetailsComponent implements OnInit {
    position: string;

    demande = {} as Demande;

    pieces = [] as any[];

    garanties = [] as any[];

    hidden: boolean = true;

    user = {} as User;

    page: string;

    phases: any;

    history: { date: Date, phase: string, nextPhase: string }[] = [];

    items: MenuItem[];

    constructor(
        private breadcrumbService: AppBreadcrumbService,
        private route: ActivatedRoute,
        private demandeService: CreditFormService,
        private tokenService: TokenService,
        private encrypter: CryptojsService,
        private confirmationService: ConfirmationService,
        private messageService: MessageService
    ) {
        this.breadcrumbService.setItems([
            { label: "Liste des credits", routerLink: ["credit/consultation"] },
            { label: "Details du demande" },
        ]);
        this.items = [
            {
                label: 'Accepter',
                icon: 'pi pi-check',
            },
            {
                label: 'Complément',
                icon: 'pi pi-refresh',
                command: () => this.showComplement()
            },
            {
                label: 'Refuser',
                icon: 'pi pi-times',
                command: () => this.refuseDemande()

            },
        ];
        this.user.profil = {} as Profil;
        this.user.profil.habilitations = [];
    }

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            let value: number = +this.encrypter.decrypt(params.id);
            this.page = params.page;
            this.getDemande(value);
            this.getGaranties(value);
            this.getPieces(value);
            this.getPhases();
            this.getHistory(value);
            this.getUser();
        });
    }

    getUser() {
        this.tokenService.getUser().subscribe((data) => {
            this.user = data;
        });
    }

    getPhases() {
        this.demandeService.getListPhases().subscribe(data => {
            this.phases = data;
        })
    }

    getHistory(id: number) {
        this.demandeService.getAllHistoriqueByDemande(id).subscribe(data => {
            data.forEach(e => {
                let phase = this.phases.find((i) => i.id === e.idPhase);
                this.history.push({
                    date: e.datePhase,
                    phase: phase.etape,
                    nextPhase: phase.enAttenteDe
                })
            })

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

    refuseDemande() {
        this.confirmationService.confirm({
            message: 'Voulez vous vraiment refuser cette demande?',
            header: 'Confirmation',
            icon: 'pi pi-info-circle',
            accept: () => {
                this.messageService.add({ severity: 'info', summary: 'Confirmé', detail: 'Demande refusée' });
                let dem = this.demande;
                dem.idPhase = 3;
                dem.garantie = [];
                dem.pieces = [];
                this.demandeService.putDemande(dem).subscribe();

            },
            reject: (type) => {
                switch (type) {
                    case ConfirmEventType.REJECT:
                        this.messageService.add({ severity: 'error', summary: 'Rejeté', detail: 'Vous avez rejeté' });
                        break;
                    case ConfirmEventType.CANCEL:
                        this.messageService.add({ severity: 'warn', summary: 'Anuulé', detail: 'Vous avez annulé' });
                        break;
                }
            }
        });


    }
}
