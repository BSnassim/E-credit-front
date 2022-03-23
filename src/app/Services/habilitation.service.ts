import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Habilitation } from '../models/habilitation';
import { environment } from 'src/environments/environment.dev';

const URL = environment.adminURL + "/habilitations";

@Injectable({
  providedIn: 'root'
})
export class HabilitationService {

  constructor(private http:HttpClient) { }

  getHabilitations(): Observable<Habilitation[]>{
    return this.http.get<Habilitation[]>(URL);
  }

  getHabilitationById(id:number):Observable<Habilitation[]>{
    return this.http.get<Habilitation[]>(URL+"/"+id);
  }

  addHabilitation(Habilitation:Habilitation): Observable<Habilitation>{
    return this.http.post<Habilitation>(URL, Habilitation);
  }

  deleteHabilitation(id:number){
    return this.http.delete(URL+"/"+id);
  }

  EditHabilitation(Habilitation:Habilitation): Observable<Habilitation>{
    return this.http.put<Habilitation>(URL, Habilitation);
  }
}
