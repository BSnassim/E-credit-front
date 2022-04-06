/*           *************** LIGNE CREDIT ***************           */
export interface Credit {
    libcredit?: string;
    idType?: number;
}

export interface LigneCredit {
    id?: string;
    credit?: Credit;
    montant?: number;
    unite?: string;
    nbrEcheance?: number;
}
