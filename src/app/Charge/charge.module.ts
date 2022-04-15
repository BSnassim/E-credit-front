import { SharedModule } from "./../shared/shared.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DialogModule } from "primeng/dialog";
import { FullCalendarModule } from "@fullcalendar/angular";
import { RendezVousComponent } from "./Rendez-vous/rendez-vous.component";

@NgModule({
    declarations: [RendezVousComponent],
    imports: [CommonModule, SharedModule, DialogModule, FullCalendarModule],
})
export class AdminModule {}
