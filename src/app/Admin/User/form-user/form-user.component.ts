import { CreditFormService } from 'src/app/Services/credit-form-service.service';
import { Agence } from './../../../models/credit/agence';
import { TokenService } from './../../../auth/services/token.service';
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

  agences: Agence[];

  selectedProfil: Profil;

  selectedAgence: Agence;

  user: User = new User;

  nom: string;

  prenom: string;

  email: string = '';

  tel: number;

  cin: string;

  dateN: Date = new Date;

  password: string = '';

  repeatedPass: string = '';

  oldPassword: string = '';

  errorEmail: string;

  errorCIN: string;

  errorPass: string;

  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  noSpecial = /^[a-zàâçéèêëîïôûùüÿñæœ .-]*$/i

  constructor(private profilService: ProfilService,
    private userService: UserService,
    private tokenService: TokenService,
    private agenceService: CreditFormService) { }

  ngOnInit(): void {
    this.profilService.getProfils().subscribe(data => {
      this.profils = data;
    });
    this.agenceService.getListAgences().subscribe(data => {
      this.agences = data;
    })
    if (this.userToEdit != null) {
      this.user.id = this.userToEdit.id;
      this.nom = this.userToEdit.nom;
      this.prenom = this.userToEdit.prenom;
      this.dateN = new Date(this.userToEdit.dateNais);
      this.email = this.userToEdit.email;
      this.tel = this.userToEdit.tel;
      this.selectedProfil = this.userToEdit.profil;
      this.selectedAgence = this.userToEdit.agence;
    };
  };

  async onSubmit() {
    if (this.userToEdit == null) {

      this.userService.getUserById(this.cin).subscribe(dataU => {
        if (dataU != null) {
          this.errorCIN = "CIN existe déja";
          this.userService.emailAlreadyExists(this.email).subscribe(data => {
            if (data != null) {
              this.errorEmail = "Email existe déjà";
            }
          });
        } else {
          this.errorCIN = "";
          this.userService.emailAlreadyExists(this.email).subscribe(data => {
            if (data != null) {
              this.errorEmail = "Email existe déjà";
            } else {
              this.user.profil = this.selectedProfil;
              this.user.agence = this.selectedAgence;
              this.user.nom = this.nom;
              this.user.prenom = this.prenom;
              this.user.dateNais = this.dateN;
              this.user.email = this.email;
              this.user.password = this.password;
              this.user.tel = this.tel;
              this.user.id = this.cin;
              this.userService.addUser(this.user).subscribe();
              this.closeDialog.emit(false);
            };
          });
        }
      })
    }
    else {
      const req1 = await this.userService.emailAlreadyExists(this.email).toPromise();
      if (req1 != null && req1.email != this.userToEdit.email) {
        this.errorEmail = "Email utilisé par un autre utilisateur";
      }
      else this.errorEmail = "";

      const req2 = await this.tokenService.checkPassword(this.oldPassword, this.userToEdit.password).toPromise();
      if (req2 == false) {
        this.errorPass = "Mot de passe actuel invalide";
      }
      else this.errorPass = "";


      if (this.errorEmail == "" && this.errorPass == "") {

        this.user.profil = this.selectedProfil;
        this.user.agence = this.selectedAgence;
        this.user.nom = this.nom;
        this.user.prenom = this.prenom;
        this.user.dateNais = this.dateN;
        this.user.email = this.email;
        this.user.password = this.password;
        this.user.tel = this.tel;
        this.userService.EditUser(this.user).subscribe();
        this.closeDialog.emit(false);
      };

    }
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
    if (field != null)
      return field.toString().length !== 8;
    else return false;
  }

  allValidated() {
    let empty = (this.tel == null || this.nom == '' || this.prenom == '' || this.email == ''
      || this.password == '' || this.repeatedPass == '' || this.dateN == null ||
      this.selectedProfil == null || this.selectedAgence == null);
    return (this.validateEmail() || this.validatePassword() != '' || this.validateNumbers(this.tel) || this.validateNumbers(this.cin)
      || empty);
  }

}
