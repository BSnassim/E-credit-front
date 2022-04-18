import { SharedModule } from "./../shared/shared.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminRoutingModule } from "./admin-routing.module";
import { FullCalendarModule } from "@fullcalendar/angular";

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        AdminRoutingModule,
        SharedModule,
        FullCalendarModule,
    ],
})
export class AdminModule {}
