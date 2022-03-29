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

  nom: string;

  prenom: string;

  email: string = '';

  tel: number;

  dateN: Date = new Date;

  password: string = '';

  repeatedPass: string = '';

  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(private profilService: ProfilService, private userService: UserService) { }

  ngOnInit(): void {
    this.profilService.getProfils().subscribe(data => {
      this.profils = data;
    });
    if (this.userToEdit != null) {
      this.user.id = this.userToEdit.id;
      this.nom = this.userToEdit.nom;
      this.prenom = this.userToEdit.prenom;
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
      this.user.nom = this.nom;
      this.user.prenom = this.prenom;
      this.user.dateNais = this.dateN;
      this.user.email = this.email;
      this.user.password = this.password;
      this.user.tel = this.tel;
      this.userService.addUser(this.user).subscribe();
    }
    else {
      this.user.profil = this.selectedProfil;
      this.user.nom = this.nom;
      this.user.prenom = this.prenom;
      this.user.dateNais = this.dateN;
      this.user.email = this.email;
      this.user.password = this.password;
      this.user.tel = this.tel;
      this.userService.EditUser(this.user).subscribe();
    }
    this.closeDialog.emit(false);
  }

  terminateDialog() {
    this.closeDialog.emit(false);
  }

  validateEmail() {
    return (this.email.length !== 0 && !(this.emailRegex.test(this.email)));
  }

  validatePassword() {
    if (this.password.length < 6 && this.password.length > 0)
      return "Mot de passe doit être 6 caractéres au minimum";
    else if (this.password != this.repeatedPass && this.repeatedPass.length > 0)
      return "Le mot de passe n'est pas le même";
    else return "";
  }

  validateNumbers(field) {
    if (field!=null)
    return field.toString().length !==8;
    else return false;
  }

  allValidated(){
    let empty = (this.tel == null || this.nom == '' || this.prenom == '' || this.email == '' 
      || this.password == '' || this.repeatedPass == '' || this.dateN == null || this.selectedProfil == null );
    return (this.validateEmail() || this.validatePassword()!="" || this.validateNumbers(this.tel) || empty);
  }

}
