import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { DemandeRdv } from "../models/demande-rdv";
import { Subject } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable({
    providedIn: "root",
})
export class EventsService {
    baseUrl1 = environment.apiURL + "/gestionRdv";

    private _refresh$ = new Subject<void>();

    constructor(private http: HttpClient) {}

    get refresh$() {
        return this._refresh$;
    }

    // getEvents() {
    //     return this.http
    //         .get<any>("assets/demo/data/scheduleevents.json")
    //         .toPromise()
    //         .then((res) => res.data as any[])
    //         .then((data) => data);
    // }

    // //rdv
    postRdvAPI(rdv: DemandeRdv) {
        return this.http.post<DemandeRdv>(this.baseUrl1 + "/rdv", rdv).pipe(
            tap(() => {
                this._refresh$.next();
            })
        );
    }

    deleteRdvAPI(id: number) {
        return this.http.delete(this.baseUrl1 + "/rdv/" + id).pipe(
            tap(() => {
                this._refresh$.next();
            })
        );
    }

    getRdvAPI() {
        return this.http.get<any>(this.baseUrl1 + "/rdv");
    }

    getRdvByIdUserAPI(id: number) {
        return this.http.get<any>(this.baseUrl1 + "/rdv/" + id);
    }
}
