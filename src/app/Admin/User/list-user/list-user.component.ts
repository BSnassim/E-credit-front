import { Component, OnInit } from '@angular/core';
import { AppBreadcrumbService } from 'src/app/main/app-breadcrumb/app.breadcrumb.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class ListUserComponent implements OnInit {
  userList: User[];

  cols: any[];

  selectedUsers: User[];

  userDialog: boolean;

  user: User;

  submitted: boolean;

  interval: any;

  constructor(private breadcrumbService: AppBreadcrumbService,
    private userService: UserService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) {
    this.breadcrumbService.setItems([
      { label: 'Gestion des utilisateurs' },
      { label: 'Liste des utilisateurs', routerLink: ['/administration/users'] }
    ]);
  }

  ngOnInit(): void {
    this.cols = [
      { field: 'nom', header: 'Nom' },
      { field: 'prenom', header: 'Prenom' },
      { field: 'email', header: 'E-mail'},
      { field: 'tel', header: 'Telephone'},
      { field: 'dateN', header: 'Date de naissance'},
      { field: 'cin', header: 'CIN'},
      { field: 'password', header: 'Mot de passe'},
      { field: 'profil', header: 'Profil'},
    ];
    this.getData();
    this.interval = setInterval(() => {
      this.getData();
    }, 1000);
  }

  getData() {
    this.userService.getUsers().subscribe(data => {
      this.userList = data;
    });
  }

  openNew() {
    this.user = null;
    this.userDialog = true;
  }

  closeDialog($event) {
    this.userDialog = false;
  }

  deleteUser(user: User) {
    this.confirmationService.confirm({
      message: 'Voulez-vous vraiment supprimer ' + user.nom + ' ' + user.prenom + '?',
      header: 'Confirmer',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.userService.deleteUser(user.id).subscribe();
        this.messageService.add({ severity: 'réussi', summary: 'Réussi', detail: 'user supprimé', life: 3000 });
      }
    });
  }

  deleteSelectedUsers() {
    this.confirmationService.confirm({
      message: 'Voulez-vous vraiment supprimer les users selectionées ?',
      header: 'Confirmer',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        let idList: number[] = [];
        this.selectedUsers.forEach(e => {
          idList.push(e.id);
        });
        this.userService.deleteUsers(idList).subscribe();
        this.selectedUsers = null;
        this.messageService.add({ severity: 'réussi', summary: 'Réussi', detail: 'users supprimés', life: 3000 });
      }
    });
  }

  editUser(user: User) {
    this.user = user;
    this.userDialog = true;
  }
}
