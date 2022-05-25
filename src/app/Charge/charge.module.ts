import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DialogModule } from "primeng/dialog";
import { FullCalendarModule } from "@fullcalendar/angular";
import { ChargeRoutingModule } from "./charge-routing.module";

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        ChargeRoutingModule,
        DialogModule,
        FullCalendarModule,
    ],
})
export class ChargeModule {}
