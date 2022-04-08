import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Garantie } from "../models/credit/garantie";
import { Demande } from "../models/credit/info-personnel";
import { NatureGarantie } from "../models/credit/natureGarantie";
import { PiecesJointes } from "../models/credit/piece-jointes";
import { Credit } from "../models/credit/typeCredit";
import { TypeGarantie } from "../models/credit/typeGarantie";

@Injectable({
    providedIn: "root",
})
export class CreditFormService {
    private _refresh$ = new Subject<void>();

    baseUrl = environment.apiURL + "/credit";

    constructor(private http: HttpClient) {}

    getTypeCreditAPI() {
        return this.http.get<Credit[]>(`${this.baseUrl}` + `/typeCredit`);
    }

    postDemandeAPI(demande: Demande, listGarantie: Garantie[]) {
        demande.garantie = listGarantie;
        return this.http.post<Demande>(`${this.baseUrl}` + `/demande`, demande);
    }

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

    getPiecesJointesAPI(i: any) {
        return this.http.get<PiecesJointes[]>(
            `${this.baseUrl}` + `/documents/` + i
        );
    }

    // getToken() {
    //     return localStorage.getItem("access token");
    // }

    // getUser(): Observable<User> {
    //     return this.http.get<User>(
    //         this.baseUrl + "/getUserByToken/" + this.getToken()
    //     );
    // }
}
