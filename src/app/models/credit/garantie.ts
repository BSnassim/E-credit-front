/*           *************** GARANTIE ***************               */
export interface TypeGarantie {
    idType?: number;
    libType?: string;
}

export interface NatureGarantie {
    idNature?: number;
    libelleNature?: string;
}

export interface Garantie {
    id?: string;
    nature?: NatureGarantie;
    type?: TypeGarantie;
    montant?: number;
}
