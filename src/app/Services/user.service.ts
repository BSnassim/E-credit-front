import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { tap } from "rxjs/operators";
import { environment } from "src/environments/environment.dev";
import { User } from "../models/user";

const URL = environment.adminURL + "/users";
const apiUrl = environment.apiURL;

@Injectable({
    providedIn: "root",
})
export class UserService {
    private _refresh$ = new Subject<void>();

    constructor(private http: HttpClient) {}

    get refresh$() {
        return this._refresh$;
    }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(URL);
    }

    getAllUsers(): Observable<User[]> {
        return this.http.get<User[]>(apiUrl + "/Utilisateur");
    }

    getUserById(id: string): Observable<User> {
        return this.http.get<User>(apiUrl + "/Utilisateur/" + id);
    }

    getUsersByIdAgence(id: number): Observable<User[]> {
        return this.http.get<User[]>(apiUrl + "/Utilisateur/ByAgence/" + id);
    }

    emailAlreadyExists(email: string): Observable<User> {
        return this.http.get<User>(URL + "/ByEmail/" + email);
    }

    addUser(User: User): Observable<User> {
        return this.http.post<User>(URL, User).pipe(
            tap(() => {
                this._refresh$.next();
            })
        );
    }

    deleteUser(id: string) {
        return this.http.delete(URL + "/" + id).pipe(
            tap(() => {
                this._refresh$.next();
            })
        );
    }

    deleteUsers(ids: string[]) {
        return this.http.delete(URL + "/deleteAll/" + ids).pipe(
            tap(() => {
                this._refresh$.next();
            })
        );
    }

    EditUser(User: User): Observable<User> {
        return this.http.put<User>(URL, User).pipe(
            tap(() => {
                this._refresh$.next();
            })
        );
    }
}
