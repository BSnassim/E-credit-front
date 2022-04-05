import { ClientModule } from './../Client/client.module';
import { UserModule } from './../user/user.module';
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {DashboardDemoComponent} from '../demo/view/dashboarddemo.component';
import { AdminModule } from '../Admin/admin.module';

export const mainRoutes: Routes = [
    {path: '', component: DashboardDemoComponent},
    // place here child routes
  /*  {
        path: 'administration',
        loadChildren: () => import('../administration/administration.module').then(m => m.AdministrationModule)
    },*/
    {path: 'administration', loadChildren:()=> AdminModule},
    {path: 'user', loadChildren:()=>UserModule},
    {path: 'credit', loadChildren:()=>ClientModule}
];

@NgModule({
    imports: [RouterModule.forChild(mainRoutes)],
    exports: [RouterModule]
})
export class MainRoutingModule { }
