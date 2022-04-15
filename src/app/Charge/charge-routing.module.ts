import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RendezVousComponent } from "./Rendez-vous/rendez-vous.component";

const routes: Routes = [
    { path: "rendez-vous", component: RendezVousComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ChargeRoutingModule {}
