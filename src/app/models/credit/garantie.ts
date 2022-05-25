import { NatureGarantie } from "./natureGarantie";
import { TypeGarantie } from "./typeGarantie";

/*           *************** GARANTIE ***************               */
export interface Garantie {
    idGarantieDde?: number;
    idNatureGarantie?: number;
    idTypeGrt?: number;
    nature?: NatureGarantie;
    type?: TypeGarantie;
    montant?: number;
}
