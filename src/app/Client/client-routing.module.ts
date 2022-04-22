import { CreditListComponent } from "./credit-list/credit-list.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreditFormComponent } from "./credit-form/credit-form.component";
import { SimFormComponent } from "./simulation/sim-form.component";

const routes: Routes = [
    { path: "demande", component: CreditFormComponent },
    { path: "consultation", component: CreditListComponent },
    { path: "simulation", component: SimFormComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ClientRoutingModule {}
