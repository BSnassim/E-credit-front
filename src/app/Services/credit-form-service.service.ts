import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Credit, TypeGarantie, NatureGarantie, PiecesJointes } from "../models/credit/demande";


@Injectable({
    providedIn: "root",
})
export class CreditFormService {
    private getTypeCreditUrl = "http://localhost:8081/typeCredit/findAll";

    private getTypeGarantieUrl = "http://localhost:8081/typeGarantie/findAll";

    private getNatureGarantieUrl =
        "http://localhost:8081/natureGarantie/findAll";

    private getPiecesJointesUrl =
        "http://localhost:8081/piecesJointes/findByType/";

    constructor(private http: HttpClient) {}

    getTypeCreditAPI() {
        return this.http.get<Credit[]>(`${this.getTypeCreditUrl}`);
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