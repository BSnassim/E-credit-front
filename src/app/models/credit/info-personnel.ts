/*           *************** INFORMATION PERSONNEL ***************           */
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
}