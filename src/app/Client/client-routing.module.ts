import { CreditListComponent } from "./credit-list/credit-list.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreditFormComponent } from "./credit-form/credit-form.component";

const routes: Routes = [
    { path: "demande", component: CreditFormComponent },
    { path: "consultation", component: CreditListComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ClientRoutingModule {}
