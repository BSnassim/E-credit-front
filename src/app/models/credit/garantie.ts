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