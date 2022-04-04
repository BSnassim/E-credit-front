export interface Demande {
    id?: number;
    nom?: string;
    prenom?: string;
    date?: Date;
    numCin?: number;
    sitFam?: string;
    typePiece?: string;
    numCompte?: number;
    dateCompte?: Date;
    ligne?: LigneCredit;
    garantie?: Garantie;
    piece?: PiecesJointes;
}
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
/*           ****************************************               */
/*           *************** GARANTIE ***************               */
export interface TypeGarantie {
    codeType?: string;
    libType?: string;
}

export interface NatureGarantie {
    codeNature?: string;
    libelleNature?: string;
}

export interface Garantie {
    id?: string;
    nature?: NatureGarantie;
    type?: TypeGarantie;
    montant?: number;
}
/*           ***********************************************        */
/*           *************** PIECES JOINTES ****************        */
export interface PiecesJointes {
    libDoc?: string;
    codeDoc?: number;
}
/*           ***********************************************        */