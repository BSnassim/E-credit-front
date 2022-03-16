import { HabilitationService } from './../../../Services/habilitation.service';
import { Component, OnInit } from '@angular/core';
import { Habilitation } from 'src/app/models/habilitation';

@Component({
  selector: 'app-form-profil',
  templateUrl: './form-profil.component.html',
  styleUrls: ['./form-profil.component.scss']
})
export class FormProfilComponent implements OnInit {
  habs: Habilitation[];

  selectedMulti: string[] = [];

  constructor(private habService : HabilitationService ) { }

  ngOnInit(): void {
    this.habService.getHabilitations().subscribe(data => {
      this.habs = data;
      console.log(data);
    });
  }

}
