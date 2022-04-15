import { Component, OnInit } from "@angular/core";
import { MessageService, ConfirmationService } from "primeng/api";
import { AppBreadcrumbService } from "src/app/main/app-breadcrumb/app.breadcrumb.service";
import { Garantie } from "src/app/models/credit/garantie";
import { Demande } from "src/app/models/credit/demande";
import { NatureGarantie } from "src/app/models/credit/natureGarantie";
import { PiecesJointes } from "src/app/models/credit/piece-jointes";
import { TypeGarantie } from "src/app/models/credit/typeGarantie";
import { User } from "src/app/models/user";
import { base64StringToBlob } from "blob-util";
import { saveAs } from "file-saver";
import { CreditFormService } from "src/app/Services/credit-form-service.service";
import { TokenService } from "src/app/auth/services/token.service";
import { TypeCredit } from "src/app/models/credit/typeCredit";
import { Router } from "@angular/router";

@Component({
    selector: "app-credit-form",
    templateUrl: "./credit-form.component.html",
    styleUrls: ["./credit-form.component.scss"],
    providers: [MessageService, ConfirmationService],
})
export class CreditFormComponent implements OnInit {
    demande = {} as Demande;

    garantie = {} as Garantie;

    garanties = [] as Garantie[];

    typeC = {} as TypeCredit;

    user = {} as User;

    typeCredit: TypeCredit[];

    typeGarantie: TypeGarantie[];

    natureGarantie: NatureGarantie[];

    piecesJointes: PiecesJointes[];

    submitted: boolean;

    submitAll: boolean;

    GarantieDialog: boolean;

    fileMaxSize: number;

    multiple: boolean;

    garantieCols: any[];

    disabled: boolean;

    loading: boolean;

    propagateChange: any;

    propagateValidator: any;

    readOnly: boolean;

    required: boolean;

    style: any;

    selected: PiecesJointes[];

    fileUpload: any;

    exists: boolean;

    constructor(
        private router: Router,
        private tokenService: TokenService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private creditFormService: CreditFormService,
        private breadcrumbService: AppBreadcrumbService
    ) {
        this.breadcrumbService.setItems([
            { label: "Credit" },
            { label: "Demande", routerLink: ["creidt/demande"] },
        ]);

        this.disabled = false;
        this.fileMaxSize = null;
        this.loading = false;
        this.multiple = true;
        this.propagateChange = (object: any) => {};
        this.propagateValidator = () => {};
        this.readOnly = false;
        this.required = false;
        this.style = { width: "100%" };
    }

    ngOnInit(): void {
        this.messageService.add({
            key: "tst",
            severity: "error",
            summary: "Erreur",
            detail: "Vous-avez déja déposer une demande",
        });
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
        });
    }

    /*           ****************************************               */
    /*           *************** GARANTIE ***************               */

    getTypeGarantie() {
        this.creditFormService.getTypeGarantieAPI().subscribe((response) => {
            this.typeGarantie = response;
        });
    }

    getNatureGarantie() {
        this.creditFormService.getNatureGarantieAPI().subscribe((response) => {
            this.natureGarantie = response;
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
    /*           ****************************************               */
    /*           *************** Piece Jointe ***********               */

    findDocObligatoire() {
        this.creditFormService
            .getPiecesJointesAPI(this.typeC.idType)
            .subscribe((response) => {
                this.piecesJointes = response;
                // console.log(this.piecesJointes);
            });
    }

    public onUpload(event: any): void {
        if (event.files.length > 0) {
            let total = event.files.length;
            this.loading = true;
            event.files.forEach((file) => {
                let fileReader = new FileReader();
                fileReader.readAsDataURL(file);
                fileReader.onloadend = () => {
                    const data = fileReader.result.toString().split(";");
                    let document = {} as PiecesJointes;
                    if (fileReader.result === "data:") {
                        document.fileContent = "";
                        document.fileName = file.name;
                        document.fileType = "";
                    } else {
                        document.fileContent = data[1].split(",")[1];
                        document.fileName = file.name;
                        document.fileType = data[0].split(":")[1];
                    }
                    if (this.multiple) {
                        if (!this.selected) this.selected = [];
                        if (
                            this.selected.filter(
                                (doc) => doc.fileName === document.fileName
                            ).length === 0
                        )
                            this.selected.push(document);
                    } else {
                        if (
                            !this.selected ||
                            this.selected.filter(
                                (doc) => doc.fileName === document.fileName
                            ).length === 0
                        ) {
                            this.selected = [];
                            this.selected.push(document);
                        }
                    }

                    total -= 1;
                    if (total === 0) {
                        this.loading = false;
                        this.propagateChange(this.selected);
                    }
                    this.demande.pieces = this.selected;
                };
            });
        }
    }
    public onDownload(pj: PiecesJointes): void {
        this.loading = true;
        if (pj.fileContent) {
            saveAs(
                base64StringToBlob(pj.fileContent, pj.fileType),
                pj.fileName,
                { autoBOM: true }
            );
            this.loading = false;
        }
    }
    public onDelete(pj: PiecesJointes): void {
        let index = this.selected.indexOf(pj);
        if (index != -1) this.selected.splice(index, 1);
        this.propagateChange(this.selected);
    }
    /*           ****************************************               */

    resetBT() {
        this.demande = {};
        this.typeC = {};
        this.garantie = {};
        this.messageService.add({
            key: "tst",
            severity: "info",
            summary: "Success",
            detail: "Le formulaire est initialiser",
        });
    }

    saveDemandeCredit(): void {
        this.submitAll = true;
        this.creditFormService
            .getDemandeExistsAPI(this.demande.numPiece)
            .subscribe((response) => {
                if (response) {
                    this.messageService.add({
                        key: "tst",
                        severity: "error",
                        summary: "Erreur",
                        detail: "Vous-avez déja déposer une demande",
                    });
                } else if (
                    !this.demande.nom ||
                    !this.demande.prenom ||
                    !this.demande.dateNaissance ||
                    !this.demande.numPiece ||
                    !this.demande.sitFamiliale ||
                    !this.demande.typePiece ||
                    !this.demande.numCompte ||
                    !this.demande.dateCompte ||
                    !this.demande.nbreEcheance ||
                    !this.demande.montant ||
                    !this.demande.unite ||
                    !this.demande.pieces
                ) {
                    this.messageService.add({
                        key: "tst",
                        severity: "error",
                        summary: "Erreur",
                        detail: "Votre demande est pas encore rempli",
                    });
                } else {
                    this.tokenService.getUser().subscribe((response) => {
                        this.user = response;
                        this.demande.idTypeCredit = this.typeC.idType;
                        this.demande.idUser = this.user.id;
                        this.creditFormService
                            .postDemandeAPI(this.demande, this.garanties)
                            .subscribe();
                        this.messageService.add({
                            key: "tst",
                            severity: "success",
                            summary: "Succués",
                            detail: "Demande déposer avec succés",
                        });
                    });
                    this.router.navigate(["/credit/consultation"]);
                }
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
}
