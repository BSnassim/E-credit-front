import { FormProfilComponent } from './Profil/form-profil/form-profil.component';
import { ListProfilComponent } from './Profil/list-profil/list-profil.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: "profils", component: ListProfilComponent},
  {path: "profils/form", component: FormProfilComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
