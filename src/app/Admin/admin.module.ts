
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminRoutingModule } from "./admin-routing.module";
import { FullCalendarModule } from "@fullcalendar/angular";

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        AdminRoutingModule,
        FullCalendarModule,
    ],
})
export class AdminModule {}
