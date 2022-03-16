import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageSelectComponent } from './language-select/language-select.component';
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";



@NgModule({
    declarations: [
        LanguageSelectComponent
    ],
    exports: [
        LanguageSelectComponent
    ],
    imports: [
        CommonModule,
        DropdownModule,
        FormsModule
    ]
})
export class SharedModule { }
