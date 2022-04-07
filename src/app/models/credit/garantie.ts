import { NatureGarantie } from "./natureGarantie";
import { TypeGarantie } from "./typeGarantie";

/*           *************** GARANTIE ***************               */
export interface Garantie {
    id?: string;
    nature?: NatureGarantie;
    type?: TypeGarantie;
    montant?: number;
}
