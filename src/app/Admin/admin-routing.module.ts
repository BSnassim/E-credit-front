import { ListUserComponent } from "./User/list-user/list-user.component";
import { ListProfilComponent } from "./Profil/list-profil/list-profil.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
// import { RendezVousComponent } from "./Rendez-vous/rendez-vous.component";

const routes: Routes = [
    { path: "profils", component: ListProfilComponent },
    { path: "users", component: ListUserComponent },
    // { path: "rendez-vous", component: RendezVousComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminRoutingModule {}
