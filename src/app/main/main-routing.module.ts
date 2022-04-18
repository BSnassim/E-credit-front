import { DashboardComponent } from "./../dashboard/dashboard.component";
import { ClientModule } from "./../Client/client.module";
import { UserModule } from "./../user/user.module";
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { AdminModule } from "../Admin/admin.module";
import { ChargeModule } from "../Charge/charge.module";

export const mainRoutes: Routes = [
    { path: "", component: DashboardComponent },
    // place here child routes
    /*  {
        path: 'administration',
        loadChildren: () => import('../administration/administration.module').then(m => m.AdministrationModule)
    },*/
    { path: "administration", loadChildren: () => AdminModule },
    { path: "user", loadChildren: () => UserModule },
    { path: "credit", loadChildren: () => ClientModule },
    { path: "rdv", loadChildren: () => ChargeModule },
];

@NgModule({
    imports: [RouterModule.forChild(mainRoutes)],
    exports: [RouterModule],
})
export class MainRoutingModule {}
