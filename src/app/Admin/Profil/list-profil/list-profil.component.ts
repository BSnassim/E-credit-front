import { Subscription } from 'rxjs';
import { TokenService } from './../../../auth/services/token.service';
import { Profil } from './../../../models/profil';
import { ProfilService } from './../../../Services/profil.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppBreadcrumbService } from 'src/app/main/app-breadcrumb/app.breadcrumb.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-list-profil',
  templateUrl: './list-profil.component.html',
  styleUrls: ['./list-profil.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class ListProfilComponent implements OnInit, OnDestroy {

  profilList: Profil[];

  cols: any[];

  selectedProfils: Profil[];

  profilDialog: boolean;

  profil: Profil;

  subscription : Subscription;

  constructor(private breadcrumbService: AppBreadcrumbService, 
    private profilService: ProfilService,
    private messageService: MessageService, 
    private confirmationService: ConfirmationService
    ) {
    this.breadcrumbService.setItems([
      { label: 'Gestion des profils' },
      { label: 'Liste des Profils', routerLink: ['/administration/profils'] }
    ]);
    this.getData();
    this.subscription = this.profilService.refresh$.subscribe( () =>{
      this.getData();
    });
  }

  ngOnInit(): void {
    this.cols = [
      { field: 'libelle', header: 'Libelle' },
      { field: 'habilitations', header: 'Habilitations' },
    ];
    this.profilService.getProfils().subscribe(data => {
      this.profilList = data;
    });
  }

  getData(){
    this.profilService.getProfils().subscribe( data =>{
      this.profilList = data;
    });
  }

  openNew() {
    this.profil = null;
    this.profilDialog = true;
  }

  closeDialog($event) {
    this.profilDialog = false;
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

  deleteSelectedProfils() {
    this.confirmationService.confirm({
      message: 'Voulez-vous vraiment supprimer les profils selectionées ?',
      header: 'Confirmer',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        let idList : number[] = [];
        this.selectedProfils.forEach(e => {
          idList.push(e.id);
        });
        this.profilService.deleteProfils(idList).subscribe();
        this.selectedProfils = null;
        this.messageService.add({ severity: 'réussi', summary: 'Réussi', detail: 'Profils supprimés', life: 3000 });
      }
    });
  }

  editProfil(profil: Profil) {
    this.profil = profil;
    this.profilDialog = true;
  }

  ngOnDestroy():void{
    this.subscription.unsubscribe();
  }

}
