
import { Component, OnInit } from "@angular/core";
import { MessageService, ConfirmationService } from "primeng/api";

import { AppBreadcrumbService } from "src/app/main/app-breadcrumb/app.breadcrumb.service";
import { LigneCredit, Garantie, PiecesJointes, Demande, Credit, TypeGarantie, NatureGarantie } from "src/app/models/credit/demande";
import { CreditFormService } from "src/app/Services/credit-form-service.service";


@Component({
    selector: "app-credit-form",
    templateUrl: "./credit-form.component.html",
    styleUrls: ["./credit-form.component.scss"],
    providers: [MessageService, ConfirmationService],
})
export class CreditFormComponent implements OnInit {
    demande = {
        ligne: {} as LigneCredit,
        garantie: {} as Garantie,
        piece: {} as PiecesJointes,
    } as Demande;

    // demandes = [lignes: [] as LigneCredit[], garanties: [] as Garantie, piepiecesJointesce: [] as PiecesJointes] as Demande [];

    demandes = [] as Demande[];

    lignes = [] as LigneCredit[];

    typeCredit: Credit[];

    garanties = [] as Garantie[];

    typeGarantie: TypeGarantie[];

    natureGarantie: NatureGarantie[];

    piecesJointes: PiecesJointes[];

    submitted: boolean;

    LigneCreditDialog: boolean;

    GarantieDialog: boolean;

    uploadedFiles: any[] = [];

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

    sitFam: any[] = [
        { name: "Mariée", code: "M" },
        { name: "Célibataire", code: "C" },
        { name: "Divorsé", code: "D" },
    ];

    /*           ********************************************               */
    /*           *************** LIGNE CREDIT ***************               */

    unite: any[] = [
        { name: "Jour", code: "J" },
        { name: "Mois", code: "M" },
        { name: "Ans", code: "A" },
    ];

    getTypeCredit() {
        this.creditFormService.getTypeCreditAPI().subscribe((response) => {
            this.typeCredit = response;
            console.log(this.typeCredit);
        });
    }

    // storeLigneInformation(ligne: LigneCredit) {
    //     this.creditFormService.storeLigneInformation(ligne).subscribe(() => {
    //         console.log("SuccessFully fetched record");
    //     });
    // }

    addLigne() {
        this.submitted = true;
        if (this.demande.ligne.credit.libCredit.trim()) {
            if (this.demande.ligne.id) {
                this.lignes[this.findIndexByIdLigne(this.demande.ligne.id)] =
                    this.demande.ligne;
            } else {
                this.demande.ligne.id = this.createId();
                this.lignes.push(this.demande.ligne);
            }
            this.lignes = [...this.lignes];
            // this.ligne = {};
        }

        console.log(this.lignes);

        console.log(this.lignes[this.lignes.length - 1].credit.codeType);

        this.getPiecesJointes(
            this.lignes[this.lignes.length - 1].credit.codeType
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

    // storeGarantieInformation(garantie: Garantie) {
    //     this.creditFormService
    //         .storeGarantieInformation(garantie)
    //         .subscribe(() => {
    //             console.log("SuccessFully fetched record");
    //         });
    // }

    newGarantie() {
        this.demande.garantie = {};
        this.submitted = false;
        this.GarantieDialog = true;
    }

    hideGarantieDialog() {
        this.GarantieDialog = false;
        this.submitted = false;
        this.demande.garantie = {};
    }

    saveGarantie() {
        this.submitted = true;
        if (this.demande.garantie.nature.codeNature.trim()) {
            if (this.demande.garantie.id) {
                this.garanties[
                    this.findIndexByIdGarantie(this.demande.garantie.id)
                ] = this.demande.garantie;
                this.messageService.add({
                    severity: "success",
                    summary: "Successful",
                    detail: "Garantie mis è jour",
                    life: 3000,
                });
            } else {
                this.demande.garantie.id = this.createId();
                this.garanties.push(this.demande.garantie);
                this.messageService.add({
                    severity: "success",
                    summary: "Successful",
                    detail: "Garantie ajouter",
                    life: 3000,
                });
            }

            this.garanties = [...this.garanties];
            this.GarantieDialog = false;
            this.demande.garantie = {};
        }
        console.log(this.garanties);
    }

    editGarantie(garantie: Garantie) {
        this.demande.garantie = { ...garantie };
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
                this.demande.garantie = {};
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

    resetBT() {
        this.demande = {};
        this.messageService.add({
            severity: "info",
            summary: "Success",
            detail: "Le formulaire est initialiser",
            life: 3000,
        });
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