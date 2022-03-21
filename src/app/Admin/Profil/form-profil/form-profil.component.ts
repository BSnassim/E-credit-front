import { ProfilService } from './../../../Services/profil.service';
import { HabilitationService } from './../../../Services/habilitation.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Habilitation } from 'src/app/models/habilitation';
import { Profil } from './../../../models/profil';
import { AppBreadcrumbService } from 'src/app/main/app-breadcrumb/app.breadcrumb.service';

@Component({
  selector: 'app-form-profil',
  templateUrl: './form-profil.component.html',
  styleUrls: ['./form-profil.component.scss']
})
export class FormProfilComponent implements OnInit {
  @Input() profilToEdit: Profil;
  @Output() closeDialog = new EventEmitter<boolean>();

  habs: Habilitation[];

  selectedMulti: Habilitation[] = [];

  filteredHabs: any[];

  profil: Profil = new Profil;

  constructor(private habService: HabilitationService, private profilService: ProfilService, private breadcrumbService: AppBreadcrumbService) {
    this.breadcrumbService.setItems([
      { label: 'Gestion des profils', routerLink: ['administration/profils'] },
      { label: 'Formulaire Profil' }
    ]);
  }

  ngOnInit(): void {
    this.habService.getHabilitations().subscribe(data => {
      this.habs = data;
    });
    if (this.profilToEdit != null) {
      this.profil.id = this.profilToEdit.id;
      this.profil.libelle = this.profilToEdit.libelle;
      this.selectedMulti = this.profilToEdit.habilitations;
    };
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

  onSubmit() {
    if (this.profilToEdit == null) {
      this.profil.habilitations = this.selectedMulti;
      this.profilService.addProfil(this.profil).subscribe();
    }
    else {
      this.profil.habilitations = this.selectedMulti;
      this.profilService.EditProfil(this.profil.id, this.profil).subscribe();
    }
    this.closeDialog.emit(false);
  }

  terminateDialog() {
    this.closeDialog.emit(false);
  }

}
