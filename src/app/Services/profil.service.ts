import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profil } from '../models/profil';

const URL = "http://localhost:8088/data/profils";

@Injectable({
  providedIn: 'root'
})
export class ProfilService {

  constructor(private http:HttpClient) { }

  getProfils(): Observable<Profil[]>{
    return this.http.get<Profil[]>(URL);
  }

  getProfilById(id:number): Observable<Profil[]>{
    return this.http.get<Profil[]>(URL+"/"+id);
  }

  addProfil(Profil:Profil): Observable<Profil>{
    
    return this.http.post<Profil>(URL, Profil);
  }

  deleteProfil(id:number){
    return this.http.delete(URL+"/"+id);
  }

  deleteProfils(ids:number[]){
    return this.http.delete(URL+"/deleteAll/"+ids);
  }

  EditProfil(id:number, Profil:Profil): Observable<Profil>{
    return this.http.put<Profil>(URL+"/"+id, Profil);
  }
}
