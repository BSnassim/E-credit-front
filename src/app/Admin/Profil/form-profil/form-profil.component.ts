import { ProfilService } from './../../../Services/profil.service';
import { HabilitationService } from './../../../Services/habilitation.service';
import { Component, OnInit } from '@angular/core';
import { Habilitation } from 'src/app/models/habilitation';
import { Profil } from './../../../models/profil';

@Component({
  selector: 'app-form-profil',
  templateUrl: './form-profil.component.html',
  styleUrls: ['./form-profil.component.scss']
})
export class FormProfilComponent implements OnInit {
  habs: Habilitation[];

  selectedMulti: Habilitation[] = [];

  filteredHabs: any[];

  profil : Profil = new Profil;

  libelle : string;

  constructor(private habService : HabilitationService, private profilService : ProfilService ) { }

  ngOnInit(): void {
    this.habService.getHabilitations().subscribe(data => {
      this.habs = data;
      console.log(data);
    });
    this.profil.habilitation = [];
  }

  filterHab(event) {
    const filtered: any[] = [];
    const query = event.query;
    for (let i = 0; i < this.habs.length; i++) {
        const hab = this.habs[i];
        if (hab.libelle.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(hab);
        }
    }
    this.filteredHabs = filtered;
}

onSubmit(){
  this.profil.libelle = this.libelle;
  this.selectedMulti.forEach(e => { 
    this.profil.habilitation.push(e.id);
  });
  this.profilService.addProfil(this.profil).subscribe();
  console.log(this.profil);
}

}
