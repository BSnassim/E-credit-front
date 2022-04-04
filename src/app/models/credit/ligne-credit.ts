/*           *************** LIGNE CREDIT ***************           */
export interface Credit {
    libCredit?: string;
    codeType?: number;
}

export interface LigneCredit {
    id?: string;
    credit?: Credit;
    montant?: number;
    unite?: string;
    nbrEcheance?: number;
}