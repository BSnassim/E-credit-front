import { UserService } from './../../../Services/user.service';
import { User } from './../../../models/user';
import { ProfilService } from './../../../Services/profil.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Profil } from 'src/app/models/profil';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss']
})
export class FormUserComponent implements OnInit {
  @Input() userToEdit: User;
  @Output() closeDialog = new EventEmitter<boolean>();

  profils: Profil[];

  selectedProfil: Profil;

  user: User = new User;

  nom;

  prenom;

  email;

  cin;

  tel;

  dateN;

  password;

  repeatedPass;

  emailRegex = "^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$";

  constructor(private profilService: ProfilService, private userService: UserService) { }

  ngOnInit(): void {
    this.profilService.getProfils().subscribe(data => {
      this.profils = data;
    });
    if (this.userToEdit != null) {
      this.user.id = this.userToEdit.id;
      this.nom = this.userToEdit.nom;
      this.prenom = this.userToEdit.prenom;
      this.cin = this.userToEdit.cin;
      this.dateN = this.userToEdit.dateNais;
      this.email = this.userToEdit.email;
      this.password = this.userToEdit.password;
      this.tel = this.userToEdit.tel;
      this.selectedProfil = this.userToEdit.profil;
    };
  };

  onSubmit() {
    if (this.userToEdit == null) {
      this.user.profil = this.selectedProfil;
      this.user.nom = this.nom
      this.user.prenom = this.prenom
      this.user.cin = this.cin
      this.user.dateNais = this.dateN
      this.user.email = this.email
      this.user.password = this.password
      this.user.tel = this.tel
      this.userService.addUser(this.user).subscribe();
    }
    else {
      this.user.profil = this.selectedProfil;
      this.user.nom = this.nom
      this.user.prenom = this.prenom
      this.user.cin = this.cin
      this.user.dateNais = this.dateN
      this.user.email = this.email
      this.user.password = this.password
      this.user.tel = this.tel
      this.userService.EditUser(this.user).subscribe();
    }
    this.closeDialog.emit(false);
  }

  terminateDialog() {
    this.closeDialog.emit(false);
  }

}
