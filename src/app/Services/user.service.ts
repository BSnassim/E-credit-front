import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.dev';
import { User } from '../models/user';

const URL = environment.adminURL + "/users";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(URL);
  }

  getUserById(id: number): Observable<User[]> {
    return this.http.get<User[]>(URL + "/" + id);
  }

  addUser(User: User): Observable<User> {

    return this.http.post<User>(URL, User);
  }

  deleteUser(id: number) {
    return this.http.delete(URL + "/" + id);
  }

  deleteUsers(ids: number[]) {
    return this.http.delete(URL + "/deleteAll/" + ids);
  }

  EditUser(User: User): Observable<User> {
    return this.http.put<User>(URL, User);
  }
}
