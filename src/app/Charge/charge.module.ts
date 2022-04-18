import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/shared.module";
import { DialogModule } from "primeng/dialog";
import { FullCalendarModule } from "@fullcalendar/angular";
import { ChargeRoutingModule } from "./charge-routing.module";

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        ChargeRoutingModule,
        SharedModule,
        DialogModule,
        FullCalendarModule,
    ],
})
export class ChargeModule {}
