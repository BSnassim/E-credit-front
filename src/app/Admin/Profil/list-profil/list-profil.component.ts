import { Profil } from './../../../models/profil';
import { ProfilService } from './../../../Services/profil.service';
import { Component, OnInit } from '@angular/core';
import { AppBreadcrumbService } from 'src/app/main/app-breadcrumb/app.breadcrumb.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-list-profil',
  templateUrl: './list-profil.component.html',
  styleUrls: ['./list-profil.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class ListProfilComponent implements OnInit {

  profilList: Profil[];

  cols: any[];

  selectedProfils: Profil[];

  profilDialog: boolean;

  profil: Profil;

  submitted: boolean;

  constructor(private breadcrumbService: AppBreadcrumbService, private profilService: ProfilService,
    private messageService: MessageService, private confirmationService: ConfirmationService) {
    this.breadcrumbService.setItems([
      { label: 'Gestion des profils' },
      { label: 'Liste des Profils', routerLink: ['/administration/profils'] }
    ]);
  }

  ngOnInit(): void {
    this.profilService.getProfils().subscribe(data => {
      this.profilList = data;
    });
    this.cols = [
      { field: 'libelle', header: 'Libelle' },
      { field: 'habilitations', header: 'Habilitations' },
    ];
  }

  openNew() {
    this.profil = {};
    this.submitted = false;
    this.profilDialog = true;
  }

  deleteProfil(profil: Profil) {
    this.confirmationService.confirm({
      message: 'Voulez-vous vraiment supprimer ' + profil.libelle + '?',
      header: 'Confirmer',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.profilService.deleteProfil(profil.id).subscribe();
        this.messageService.add({ severity: 'réussi', summary: 'Réussi', detail: 'Profil supprimé', life: 3000 });
      }
    });
  }

}
