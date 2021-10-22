import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermissionGuard } from '../../guards/permission.guard';
import { ClientsListComponent } from './clients-list/clients-list.component';
import { ClientsInfoComponent } from './clients-info/clients-info.component';
import { ClientsEditComponent } from './clients-edit/clients-edit.component';

const routes: Routes = [
    { path: ':id/info', component: ClientsInfoComponent, canActivate:[PermissionGuard], data:{ roles: ['Super_Admin', 'Admin', 'ProjectManager'], forCurrentUser: false} },
    { path: '', component: ClientsListComponent, canActivate:[PermissionGuard], data:{ roles: ['Super_Admin', 'Admin', 'ProjectManager'], forCurrentUser: false} },
    { path: ':id/edit', component: ClientsEditComponent, canActivate:[PermissionGuard], data:{ roles: ['Super_Admin', 'Admin', 'ProjectManager'], forCurrentUser: false} },
]; 

@NgModule({
    imports: [RouterModule.forChild(routes)],
    providers: [PermissionGuard],
    exports: [RouterModule]
})
export class ClientsRoutingModule {}