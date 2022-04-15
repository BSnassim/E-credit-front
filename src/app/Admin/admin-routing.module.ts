import { ListUserComponent } from "./User/list-user/list-user.component";
import { ListProfilComponent } from "./Profil/list-profil/list-profil.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    { path: "profils", component: ListProfilComponent },
    { path: "users", component: ListUserComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminRoutingModule {}
