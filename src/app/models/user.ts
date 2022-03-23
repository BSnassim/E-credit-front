import { Profil } from "./profil";

export class User {
    id : number;
    nom : string;
    prenom : string;
    password : string;
    email : string;
    tel : number;
    cin : number;
    dateNais : Date;
    profil : Profil;
}