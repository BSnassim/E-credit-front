import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {RouterModule} from '@angular/router';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MessageModule} from "primeng/message";
import {MessagesModule} from "primeng/messages";



@NgModule({
  declarations: [
    LoginComponent,
  ],
    imports: [
        CommonModule,
        RouterModule,
        InputTextModule,
        ButtonModule,
        FormsModule,
        ReactiveFormsModule,
        MessageModule,
        MessagesModule,
    ],
})
export class AuthModule { }
