import { DashboardComponent } from "./../dashboard/dashboard.component";
import { ClientModule } from "./../Client/client.module";
import { UserModule } from "./../user/user.module";
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { AdminModule } from "../Admin/admin.module";
import { ChargeModule } from "../Charge/charge.module";
import { NgxPermissionsGuard } from "ngx-permissions";

export const mainRoutes: Routes = [
    { path: "", component: DashboardComponent },
    // place here child routes
    /*  {
        path: 'administration',
        loadChildren: () => import('../administration/administration.module').then(m => m.AdministrationModule)
    },*/
    {
        path: "administration", loadChildren: () => AdminModule,
        canActivate: [NgxPermissionsGuard], data: { permissions: { only: 'ROLE_Administration' } }
    },
    { path: "user", loadChildren: () => UserModule },
    {
        path: "credit", loadChildren: () => ClientModule,
        canActivate: [NgxPermissionsGuard], data: { permissions: { only: ['ROLE_Demande Credit Client','ROLE_Traitement Demandes'] } }
    },
    {
        path: "rdv", loadChildren: () => ChargeModule,
        canActivate: [NgxPermissionsGuard], data: { permissions: { only: 'ROLE_Traitement Demandes' } }
    },
];

@NgModule({
    imports: [RouterModule.forChild(mainRoutes)],
    exports: [RouterModule],
})
export class MainRoutingModule { }
