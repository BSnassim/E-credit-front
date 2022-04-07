import { Credit } from "./typeCredit";

/*           *************** LIGNE CREDIT ***************           */
export interface LigneCredit {
    id?: string;
    credit?: Credit;
    montant?: number;
    unite?: string;
    nbrEcheance?: number;
}
