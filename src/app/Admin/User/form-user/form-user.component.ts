import { ProfilService } from './../../../Services/profil.service';
import { Component, OnInit } from '@angular/core';
import { Profil } from 'src/app/models/profil';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss']
})
export class FormUserComponent implements OnInit {

  profils : Profil[];

  selectedProfil : Profil[];

  constructor( private profilService : ProfilService) { }

  ngOnInit(): void {
    this.profilService.getProfils().subscribe(data =>{
      this.profils = data;
      }
    )
  }

}
