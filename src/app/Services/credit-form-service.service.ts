import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Garantie } from "../models/credit/garantie";
import { Demande } from "../models/credit/demande";
import { NatureGarantie } from "../models/credit/natureGarantie";
import { PiecesJointes } from "../models/credit/piece-jointes";

import { TypeGarantie } from "../models/credit/typeGarantie";
import { TypeCredit } from "../models/credit/typeCredit";

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

    getDemandesByUser(id: number) {
        return this.http.get<Demande[]>(this.baseUrl + "/demande/ByUser/" + id);
    }

    getListDemande() {
        return this.http.get<Demande[]>(this.baseUrl + "/demande");
    }

    getDemandeExistsAPI(i: any) {
        return this.http.get<boolean>(
            `${this.baseUrl}` + `/demande/Exists/` + i
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

    getNatureGarantieAPI() {
        return this.http.get<NatureGarantie[]>(
            `${this.baseUrl}` + `/natureGarantie`
        );
    }

    //pieces jointes

    getPiecesJointesAPI(i: any) {
        return this.http.get<PiecesJointes[]>(
            `${this.baseUrl}` + `/documents/` + i
        );
    }

    // phase

    getListPhases() {
        return this.http.get(this.baseUrl + "/phase");
    }
}
