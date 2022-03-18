import { Habilitation } from 'src/app/models/habilitation';
import { Component, OnInit } from '@angular/core';
import { HabilitationService } from 'src/app/Services/habilitation.service';
import { AppBreadcrumbService } from 'src/app/main/app-breadcrumb/app.breadcrumb.service';

@Component({
  selector: 'app-form-hab',
  templateUrl: './form-hab.component.html',
  styleUrls: ['./form-hab.component.scss']
})
export class FormHabComponent implements OnInit {

  hab : Habilitation = new Habilitation();

  constructor(private habService : HabilitationService, private breadcrumbService: AppBreadcrumbService) {
    this.breadcrumbService.setItems([
        { label: 'Gestion des habiltiations' },
        { label: 'Formulaire Habilitation', routerLink: ['/Admin/Habilitation/Form'] }
    ]); }

  ngOnInit(): void {
  }

  onSubmit(){
    this.habService.addHabilitation(this.hab).subscribe();
  }

}
