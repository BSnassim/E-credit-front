import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Garantie } from "../models/credit/garantie";
import { Demande } from "../models/credit/info-personnel";
import { NatureGarantie } from "../models/credit/natureGarantie";
import { PiecesJointes } from "../models/credit/piece-jointes";
import { Credit } from "../models/credit/typeCredit";
import { TypeGarantie } from "../models/credit/typeGarantie";
import { User } from "../models/user";

@Injectable({
    providedIn: "root",
})
export class CreditFormService {
    private _refresh$ = new Subject<void>();

    baseUrl = environment.apiURL + "/authenticate";

    private getTypeCreditUrl = "http://localhost:8088/credit/typeCredit";

    private postDemandeUrl = "http://localhost:8088/credit/demande";

    private getTypeGarantieUrl = "http://localhost:8088/credit/typeGarantie";

    private postGarantieUrl = "http://localhost:8088/credit/garantie";

    private getNatureGarantieUrl =
        "http://localhost:8088/credit/natureGarantie";

    private getPiecesJointesUrl = "http://localhost:8088/credit/documents/";

    constructor(private http: HttpClient) {}

    getTypeCreditAPI() {
        return this.http.get<Credit[]>(`${this.getTypeCreditUrl}`);
    }

    postDemandeAPI(demande: Demande, listGarantie: Garantie[]) {
        demande.garantie = listGarantie;
        return this.http.post<Demande>(`${this.postDemandeUrl}`, demande);
    }

    postGarantieAPI(garantie: Garantie) {
        return this.http
            .post<Garantie>(`${this.postGarantieUrl}`, garantie)
            .pipe(
                tap(() => {
                    this._refresh$.next();
                })
            );
    }

    getToken() {
        return localStorage.getItem("access token");
    }

    getUser(): Observable<User> {
        return this.http.get<User>(
            this.baseUrl + "/getUserByToken/" + this.getToken()
        );
    }

    getTypeGarantieAPI() {
        return this.http.get<TypeGarantie[]>(`${this.getTypeGarantieUrl}`);
    }

    getNatureGarantieAPI() {
        return this.http.get<NatureGarantie[]>(`${this.getNatureGarantieUrl}`);
    }

    getPiecesJointesAPI(i: any) {
        return this.http.get<PiecesJointes[]>(
            `${this.getPiecesJointesUrl}` + i
        );
    }
}
