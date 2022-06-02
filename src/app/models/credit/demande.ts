import { DemandeRdv } from 'src/app/models/demande-rdv';
import { Garantie } from "./garantie";
import { PiecesJointes } from "src/app/models/credit/piece-jointes";

/*           *************** INFORMATION PERSONNEL ***************           */
export interface Demande {
    idDemande?: number;
    nom?: string;
    prenom?: string;
    dateNaissance?: Date;
    numPiece?: string;
    sitFamiliale?: string;
    typePiece?: string;
    numCompte?: string;
    dateCompte?: Date;
    nbreEcheance?: number;
    montant?: number;
    unite?: string;
    datePhase?: Date;
    idPhase?: number;
    idTypeCredit?: number;
    complement?: string;
    garantie?: Garantie[];
    pieces?: PiecesJointes[];
    idUser?: string;
    changerId?: string;
    gsm?: number;
    idSimulation?: number;
    rdv?: DemandeRdv;
}
