import { DemandeRdv } from 'src/app/models/demande-rdv';
import { EventsService } from 'src/app/Services/events.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rendez-vous-invoice',
  templateUrl: './rendez-vous-invoice.component.html',
  styleUrls: ['./rendez-vous-invoice.component.scss']
})
export class RendezVousInvoiceComponent implements OnInit {
  @Input() demId: number;

  RendezVous: DemandeRdv;

  constructor(private rdvService: EventsService) { }

  ngOnInit(): void {
    this.getRdv();
  }

  print(){
    window.print();
  }

  getRdv() {
    this.rdvService.getRdvByDemande(this.demId).subscribe(res => {
      this.RendezVous = res;
    });
  }

}
