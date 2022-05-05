import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Profil } from "../models/profil";

const URL = environment.adminURL + "/profils";

@Injectable({
    providedIn: "root",
})
export class ProfilService {
    private _refresh$ = new Subject<void>();

    constructor(private http: HttpClient) {}

    get refresh$() {
        return this._refresh$;
    }

    getProfils(): Observable<Profil[]> {
        return this.http.get<Profil[]>(URL);
    }

    getProfilById(id: number): Observable<Profil[]> {
        return this.http.get<Profil[]>(URL + "/" + id);
    }

    addProfil(Profil: Profil): Observable<Profil> {
        return this.http.post<Profil>(URL, Profil).pipe(
            tap(() => {
                this._refresh$.next();
            })
        );
    }

    deleteProfil(id: number) {
        return this.http.delete(URL + "/" + id).pipe(
            tap(() => {
                this._refresh$.next();
            })
        );
    }

    deleteProfils(ids: number[]) {
        return this.http.delete(URL + "/deleteAll/" + ids).pipe(
            tap(() => {
                this._refresh$.next();
            })
        );
    }

    EditProfil(Profil: Profil): Observable<Profil> {
        return this.http.put<Profil>(URL, Profil).pipe(
            tap(() => {
                this._refresh$.next();
            })
        );
    }
}
