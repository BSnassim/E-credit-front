import { Component, OnInit } from "@angular/core";
import { MessageService, ConfirmationService } from "primeng/api";
import { AppBreadcrumbService } from "src/app/main/app-breadcrumb/app.breadcrumb.service";
import { Garantie } from "src/app/models/credit/garantie";
import { Demande } from "src/app/models/credit/info-personnel";
import { LigneCredit } from "src/app/models/credit/ligne-credit";
import { NatureGarantie } from "src/app/models/credit/natureGarantie";
import { PiecesJointes } from "src/app/models/credit/piece-jointes";
import { Credit } from "src/app/models/credit/typeCredit";
import { TypeGarantie } from "src/app/models/credit/typeGarantie";
import { CreditFormService } from "src/app/Services/credit-form-service.service";

@Component({
    selector: "app-credit-form",
    templateUrl: "./credit-form.component.html",
    styleUrls: ["./credit-form.component.scss"],
    providers: [MessageService, ConfirmationService],
})
export class CreditFormComponent implements OnInit {
    demande = {} as Demande;

    ligne = {} as LigneCredit;

    garantie = {} as Garantie;

    piece = {} as PiecesJointes;

    lignes = [] as LigneCredit[];

    garanties = [] as Garantie[];

    typeC = {} as Credit;

    typeCredit: Credit[];

    typeGarantie: TypeGarantie[];

    natureGarantie: NatureGarantie[];

    piecesJointes: PiecesJointes[];

    submitted: boolean;

    GarantieDialog: boolean;

    uploadedFiles: any[] = [];

    selectedFile: File = null;

    garantieCols: any[];

    constructor(
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private creditFormService: CreditFormService,
        private breadcrumbService: AppBreadcrumbService
    ) {
        this.breadcrumbService.setItems([
            { label: "Credit" },
            { label: "Demande", routerLink: ["creidt/demande"] },
        ]);
    }

    ngOnInit(): void {
        this.getTypeCredit();
        this.getTypeGarantie();
        this.getNatureGarantie();

        this.garantieCols = [
            { field: "nature", header: "Nature" },
            { field: "type", header: "Type" },
            { field: "montant", header: "Montant" },
        ];
    }

    /*           *************** INFORMATION CLIENT ***************         */

    sitFam: any[] = ["Mariée", "Célibataire", "Divorsé"];

    typePiece: any[] = ["CIN", "Passeport"];

    /*           ********************************************               */
    /*           *************** LIGNE CREDIT ***************               */

    unite: any[] = ["Jour", "Mois", "Année"];

    getTypeCredit() {
        this.creditFormService.getTypeCreditAPI().subscribe((response) => {
            this.typeCredit = response;
            console.log(this.typeCredit);
        });
    }

    addLigne() {
        this.submitted = true;
        if (this.ligne.id) {
            this.lignes[this.findIndexByIdLigne(this.ligne.id)] = this.ligne;
        } else {
            this.ligne.id = this.createId();
            this.lignes.push(this.ligne);
        }
        this.lignes = [...this.lignes];

        console.log(this.lignes);

        console.log(this.lignes[this.lignes.length - 1].credit.idType);

        this.getPiecesJointes(
            this.lignes[this.lignes.length - 1].credit.idType
        );
    }

    findIndexByIdLigne(id: string): number {
        let index = -1;
        for (let i = 0; i < this.lignes.length; i++) {
            if (this.lignes[i].id === id) {
                index = i;
                break;
            }
        }
        return index;
    }
    /*           ****************************************               */
    /*           *************** GARANTIE ***************               */

    getTypeGarantie() {
        this.creditFormService.getTypeGarantieAPI().subscribe((response) => {
            this.typeGarantie = response;
            console.log(this.typeGarantie);
        });
    }

    getNatureGarantie() {
        this.creditFormService.getNatureGarantieAPI().subscribe((response) => {
            this.natureGarantie = response;
            console.log(this.natureGarantie);
        });
    }

    newGarantie() {
        this.garantie = {};
        this.submitted = false;
        this.GarantieDialog = true;
    }

    hideGarantieDialog() {
        this.GarantieDialog = false;
        this.submitted = false;
        this.garantie = {};
    }

    saveGarantie() {
        this.submitted = true;
        if (this.garantie.id) {
            this.garanties[this.findIndexByIdGarantie(this.garantie.id)] =
                this.garantie;
            this.messageService.add({
                severity: "success",
                summary: "Successful",
                detail: "Garantie mis è jour",
                life: 3000,
            });
        } else {
            this.garantie.id = this.createId();
            this.garanties.push(this.garantie);
            this.messageService.add({
                severity: "success",
                summary: "Successful",
                detail: "Garantie ajouter",
                life: 3000,
            });
        }

        this.garanties = [...this.garanties];
        this.GarantieDialog = false;
        this.garantie = {};
        console.log(this.garanties);
    }

    editGarantie(garantie: Garantie) {
        this.garantie = { ...garantie };
        this.GarantieDialog = true;
    }

    deleteGarantie(garantie: Garantie) {
        this.confirmationService.confirm({
            message: "Voulez-vous vraiment supprimer ce garantie ?",
            header: "Confirm",
            icon: "pi pi-exclamation-triangle",
            accept: () => {
                this.garanties = this.garanties.filter(
                    (val) => val.id !== garantie.id
                );
                this.garantie = {};
                this.messageService.add({
                    severity: "success",
                    summary: "Successful",
                    detail: "garantie Supprimer",
                    life: 3000,
                });
            },
        });
    }

    findIndexByIdGarantie(id: string): number {
        let index = -1;
        for (let i = 0; i < this.garanties.length; i++) {
            if (this.garanties[i].id === id) {
                index = i;
                break;
            }
        }
        return index;
    }
    /*           ***********************************************              */
    /*           *************** PIECES JOINTES ***************               */
    getPiecesJointes(i: any) {
        this.creditFormService.getPiecesJointesAPI(i).subscribe((response) => {
            this.piecesJointes = response;
            console.log(this.piecesJointes);
        });
    }

    onUpload(event) {
        for (const file of event.files) {
            this.uploadedFiles.push(file);
        }
        this.messageService.add({
            severity: "info",
            summary: "Success",
            detail: "Fichier téléchager",
        });
    }
    /*           ***********************************************           */
    /*           *************** OBSERVATION ***************               */

    /*           ***********************************************           */

    // resetBT() {
    //     this.demande = {};
    //     this.messageService.add({
    //         severity: "info",
    //         summary: "Success",
    //         detail: "Le formulaire est initialiser",
    //         life: 3000,
    //     });
    // }

    onSubmit() {
        console.log(this.demande);
        console.log(this.garanties);
        this.demande.idTypeCredit = this.typeC.idType;
        this.creditFormService
            .postDemandeAPI(this.demande, this.garanties)
            .subscribe();
        // ((response) => {
        //     this.demande = response;
        // });
    }

    createId(): string {
        let id = "";
        const chars =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    // onSort() {
    //     this.updateRowGroupMetaData();
    // }

    // updateRowGroupMetaData() {
    //     this.rowGroupMetadata = {};

    //     if (this.customers3) {
    //         for (let i = 0; i < this.customers3.length; i++) {
    //             const rowData = this.customers3[i];
    //             const representativeName = rowData.representative.name;

    //             if (i === 0) {
    //                 this.rowGroupMetadata[representativeName] = {
    //                     index: 0,
    //                     size: 1,
    //                 };
    //             } else {
    //                 const previousRowData = this.customers3[i - 1];
    //                 const previousRowGroup =
    //                     previousRowData.representative.name;
    //                 if (representativeName === previousRowGroup) {
    //                     this.rowGroupMetadata[representativeName].size++;
    //                 } else {
    //                     this.rowGroupMetadata[representativeName] = {
    //                         index: i,
    //                         size: 1,
    //                     };
    //                 }
    //             }
    //         }
    //     }
    // }
}
