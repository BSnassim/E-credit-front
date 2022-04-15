import { SharedModule } from "./../shared/shared.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminRoutingModule } from "./admin-routing.module";
import { DialogModule } from "primeng/dialog";
import { FullCalendarModule } from "@fullcalendar/angular";

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        AdminRoutingModule,
        SharedModule,
        DialogModule,
        FullCalendarModule,
    ],
})
export class AdminModule {}
