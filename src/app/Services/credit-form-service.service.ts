import { Agence } from "./../models/credit/agence";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Garantie } from "../models/credit/garantie";
import { Demande } from "../models/credit/demande";
import { NatureGarantie } from "../models/credit/natureGarantie";
import { PiecesJointes } from "../models/credit/piece-jointes";
import { TypeGarantie } from "../models/credit/typeGarantie";
import { TypeCredit } from "../models/credit/typeCredit";
import { Phase } from "../models/phase";

@Injectable({
    providedIn: "root",
})
export class CreditFormService {
    private _refresh$ = new Subject<void>();

    baseUrl = environment.apiURL + "/credit";

    constructor(private http: HttpClient) {}

    // demande
    postDemandeAPI(demande: Demande, listGarantie: Garantie[]) {
        demande.garantie = listGarantie;
        return this.http.post<Demande>(`${this.baseUrl}` + `/demande`, demande);
    }

    getDemandesByUser(id: string) {
        return this.http.get<Demande[]>(this.baseUrl + "/demande/ByUser/" + id);
    }

    getListDemande() {
        return this.http.get<Demande[]>(this.baseUrl + "/demande");
    }

    getDemandesByAgence(id: number) {
        return this.http.get<Demande[]>(
            this.baseUrl + "/demande/ByAgence/" + id
        );
    }

    getDemandeExistsAPI(i: string) {
        return this.http.get<boolean>(
            `${this.baseUrl}` + `/demande/Exists/` + i
        );
    }

    getDemandeById(id: number) {
        return this.http.get<Demande>(this.baseUrl + "/demande/" + id);
    }

    putDemande(demande: Demande) {
        return this.http.put<Demande>(this.baseUrl + "/demande", demande);
    }

    getAllDemandesByAgenceAndByYear(id: number) {
        return this.http.get<Demande[]>(
            this.baseUrl + "/demande/ByAllYear/" + id
        );
    }

    //type credit

    getTypeCreditAPI() {
        return this.http.get<TypeCredit[]>(`${this.baseUrl}` + `/typeCredit`);
    }

    getTypeCreditById(id: number) {
        return this.http.get<TypeCredit>(this.baseUrl + "/typeCredit/" + id);
    }

    //garantie

    postGarantieAPI(garantie: Garantie) {
        return this.http
            .post<Garantie>(`${this.baseUrl}` + `/garantie`, garantie)
            .pipe(
                tap(() => {
                    this._refresh$.next();
                })
            );
    }

    getTypeGarantieAPI() {
        return this.http.get<TypeGarantie[]>(
            `${this.baseUrl}` + `/typeGarantie`
        );
    }

    getTypeGarantieById(id: number) {
        return this.http.get<TypeGarantie>(
            this.baseUrl + "/typeGarantie/" + id
        );
    }

    getNatureGarantieAPI() {
        return this.http.get<NatureGarantie[]>(
            `${this.baseUrl}` + `/natureGarantie`
        );
    }

    getNatureGarantieById(id: number) {
        return this.http.get<NatureGarantie>(
            this.baseUrl + "/natureGarantie/" + id
        );
    }

    getGarantiesByDemande(id: number) {
        return this.http.get<Garantie[]>(
            this.baseUrl + "/garantie/ByDemande/" + id
        );
    }

    //pieces jointes

    getPiecesJointesAPI(i: any) {
        return this.http.get<PiecesJointes[]>(
            `${this.baseUrl}` + `/documents/` + i
        );
    }

    getPiecesJointesByDemande(id: number) {
        return this.http.get<PiecesJointes[]>(
            this.baseUrl + "/piecesJointes/demande/" + id
        );
    }

    // phase

    getListPhases() {
        return this.http.get<Phase[]>(this.baseUrl + "/phase");
    }

    getPhaseById(id: number) {
        return this.http.get<Phase>(this.baseUrl + "/phase/" + id);
    }

    // agence

    getListAgences() {
        return this.http.get<Agence[]>(this.baseUrl + "/agence");
    }

    getAgenceById(id: number) {
        return this.http.get<Agence>(this.baseUrl + "/agence/" + id);
    }

    // historique

    getAllHistorique() {
        return this.http.get<any[]>(this.baseUrl + "/historique");
    }

    getAllHistoriqueByDemande(id: number) {
        return this.http.get<any[]>(
            this.baseUrl + "/historique/ByDemande/" + id
        );
    }

    getHistoriqueDemandeRecente(id: string) {
        return this.http.get<any[]>(
            this.baseUrl + "/historique/DemandeRecente/ByUser/" + id
        );
    }
}
