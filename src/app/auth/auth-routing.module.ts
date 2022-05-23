import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { NgModule } from "@angular/core";

export const authRoutes: Routes = [
    { path: "login", component: LoginComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(authRoutes)],

    exports: [RouterModule],
})
export class AuthRoutingModule {}
