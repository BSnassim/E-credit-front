import { Garantie } from "./garantie";
import { PiecesJointes } from "./piece-jointes";

/*           *************** INFORMATION PERSONNEL ***************           */
export interface Demande {
    idDemande?: number;
    nom?: string;
    prenom?: string;
    dateNaissance?: Date;
    numPiece?: number;
    sitFamiliale?: string;
    typePiece?: string;
    numCompte?: number;
    dateCompte?: Date;
    nbreEcheance?: number;
    montant?: number;
    unite?: string;
    datePhase?: Date;
    idPhase?: number;
    idTypeCredit?: number;
    garantie?: Garantie[];
    pieces?: File[];
    idUser?: number;
}
