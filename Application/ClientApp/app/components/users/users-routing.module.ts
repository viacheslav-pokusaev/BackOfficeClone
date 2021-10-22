import { NgModule } from '@angular/core';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersEditComponent } from './users-edit/users-edit.component';
import { PermissionGuard } from '../../guards/permission.guard';
import { RouterModule, Routes } from '@angular/router';
import { UsersChangePasswordComponent } from './users-change-password/users-change-password.component';
import { UsersProjectsByUserComponent } from './users-projects-by-user/users-projects-by-user.component';
import { UsersInfoComponent } from './users-info/users-info.component';
import { UsersTableComponent } from './users-table/users-table.component';


const routes: Routes = [
    { path: ':id/info', component: UsersInfoComponent, canActivate:[PermissionGuard], data:{ roles: ['Super_Admin', 'Admin'], forCurrentUser: true}},
    { path: '', component: UsersListComponent, canActivate: [PermissionGuard], data: { roles: ['Super_Admin', 'Admin', 'HumanResource', 'ProjectManager', 'Developer'], forCurrentUser: true } },
    { path: 'table', component: UsersTableComponent, canActivate: [PermissionGuard], data: { roles: ['Super_Admin', 'Admin', 'HumanResource', 'ProjectManager', 'Developer'], forCurrentUser: true } },
    { path: ':id/edit', component: UsersEditComponent, canActivate: [PermissionGuard], data: { roles: ['Super_Admin', 'Admin', 'Developer'], forCurrentUser: true } },
    { path: 'changePassword', component: UsersChangePasswordComponent, canActivate:[PermissionGuard], data:{ roles: ['Super_Admin', 'Admin', 'HumanResource', 'ProjectManager', 'Developer'], forCurrentUser: true}  },
    { path: ':id/projects', component: UsersProjectsByUserComponent, canActivate:[PermissionGuard], data:{ roles: ['Super_Admin', 'Admin'], forCurrentUser: true}}
];      
@NgModule({
    imports: [RouterModule.forChild(routes)],
    providers: [PermissionGuard],
    exports: [RouterModule]
})

export class UsersRoutingModule {
}
