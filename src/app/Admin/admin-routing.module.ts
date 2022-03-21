import { FormUserComponent } from './User/form-user/form-user.component';
import { ListUserComponent } from './User/list-user/list-user.component';
import { FormProfilComponent } from './Profil/form-profil/form-profil.component';
import { ListProfilComponent } from './Profil/list-profil/list-profil.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: "profils", component: ListProfilComponent},
  {path: "profils/form", component: FormProfilComponent},
  {path: "users", component: ListUserComponent},
  {path: "users/form", component : FormUserComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
