import { ListUserComponent } from "./User/list-user/list-user.component";
import { ListProfilComponent } from "./Profil/list-profil/list-profil.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NgxPermissionsGuard } from "ngx-permissions";

const routes: Routes = [
    {
        path: "profils", component: ListProfilComponent,
        canActivate: [NgxPermissionsGuard], data: { permissions: { only: 'ROLE_Administration' } }
    },
    { path: "users", component: ListUserComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminRoutingModule { }
