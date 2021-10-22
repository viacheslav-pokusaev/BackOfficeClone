import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProposalListComponent } from './components/proposals/proposals-list.component';
import { PermissionGuard } from './guards/permission.guard';
import { UsersModule } from './components/users/users.module';
import { WorkActivityModule } from './components/work-activity/work-activity.module';
import { ClientsModule } from './components/clients/clients.module';
import { ProjectsModule } from './components/projects/projects.module';
import { DatabaseAdministrateComponent } from './components/database-administrate/database-administrate.component';
import { AuditTrailComponent } from './components/audit-trail/audit-trail.component';

//const routes: Routes = [
//    { path: 'users', loadChildren: () => UsersModule },

//    { path: 'workactivities', loadChildren: () => WorkActivityModule },

//    { path: 'clients', loadChildren: () => ClientsModule },

//    { path: 'projects', loadChildren: () => ProjectsModule },

//    { path: 'proposals', component: ProposalListComponent, canActivate: [PermissionGuard], data: { roles: ['Super_Admin', 'Admin', 'HumanResource'], forCurrentUser: false } },

//    { path: 'database-administrate', component: DatabaseAdministrateComponent, canActivate: [PermissionGuard], data: { roles: ['Super_Admin', 'Admin'], forCurrentUser: false } },

//    { path: 'Account/Admin', redirectTo: '/users/0/info' },
//];

 const routes: Routes = [
     { path: 'users', loadChildren: './components/users/users.module#UsersModule' },

     { path: 'workactivities', loadChildren: './components/work-activity/work-activity.module#WorkActivityModule'},

     { path: 'clients', loadChildren: './components/clients/clients.module#ClientsModule' },

     { path: 'projects', loadChildren: './components/projects/projects.module#ProjectsModule' },

     { path: 'database-administrate', component: DatabaseAdministrateComponent, canActivate: [PermissionGuard], data: { roles: ['Super_Admin', 'Admin'], forCurrentUser: false } },

     { path: 'audit-trail', component: AuditTrailComponent, canActivate: [PermissionGuard], data: { roles: ['Super_Admin', 'Admin'], forCurrentUser: false } },

     { path: 'proposals', component: ProposalListComponent, canActivate:[PermissionGuard], data:{ roles: ['Super_Admin', 'Admin', 'HumanResource'], forCurrentUser: false}  },

     { path: 'Account/Admin', redirectTo: '/users/0/info' },
 ]; 
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})


export class AppRoutingModule {
}