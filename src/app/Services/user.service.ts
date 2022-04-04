import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.dev';
import { User } from '../models/user';

const URL = environment.adminURL + "/users";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _refresh$ = new Subject<void>();

  constructor(private http: HttpClient) { }

  get refresh$(){
    return this._refresh$;
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(URL);
  }

  // getUserById(id: number): Observable<User> {
  //   return this.http.get<User>(URL + "/" + id);
  // }

  emailAlreadyExists(email: string): Observable<User>{
    return this.http.get<User>(URL + "/" + email);
  }

  addUser(User: User): Observable<User> {
    return this.http.post<User>(URL, User).pipe(
      tap(()=>{
        this._refresh$.next();
      })
    );
  }

  deleteUser(id: number) {
    return this.http.delete(URL + "/" + id).pipe(
      tap(()=>{
        this._refresh$.next();
      })
    );;
  }

  deleteUsers(ids: number[]) {
    return this.http.delete(URL + "/deleteAll/" + ids).pipe(
      tap(()=>{
        this._refresh$.next();
      })
    );;
  }

  EditUser(User: User): Observable<User> {
    return this.http.put<User>(URL, User).pipe(
      tap(()=>{
        this._refresh$.next();
      })
    );;
  }
}
