import { TokenService } from 'src/app/auth/services/token.service';
import { DemandeRdv } from 'src/app/models/demande-rdv';
import { EventsService } from 'src/app/Services/events.service';
import { Component, Input, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-rendez-vous-invoice',
  templateUrl: './rendez-vous-invoice.component.html',
  styleUrls: ['./rendez-vous-invoice.component.scss']
})
export class RendezVousInvoiceComponent implements OnInit {
  @Input() demId: number;

  userId:string;

  userName:string;

  rendezVous: DemandeRdv;

  today = new Date();

  constructor(private rdvService: EventsService, public app: AppComponent, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.getRdv();
  }

  print() {
    window.print();
  }

  getUserId() {
    this.tokenService.getUser().subscribe(user => {
      this.userId = user.id
      this.userName = user.nom + " " + user.prenom;
    })
  }

  getRdv() {
    this.rdvService.getRdvByDemande(this.demId).subscribe(res => {
      this.rendezVous = res;
      this.getUserId();
    });
  }

}
