import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermissionGuard } from '../../guards/permission.guard';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { ProjectsEmploeesComponent } from './projects-emploees/projects-emploees.component';
import { ProjectsEditComponent } from './projects-edit/projects-edit.component';
import { ProjectsEmploeesEditComponent } from './projects-emploees-edit/projects-emploees-edit.component';

const routes: Routes = [
    { path: ':id/emploees', component: ProjectsEmploeesComponent, canActivate:[PermissionGuard], data:{ roles: ['Super_Admin', 'Admin', 'ProjectManager'], forCurrentUser: false}},
    { path: '', component: ProjectsListComponent, canActivate:[PermissionGuard], data:{ roles: ['Super_Admin', 'Admin', 'ProjectManager', 'HumanResource'], forCurrentUser: false}},
    { path: ':id/edit', component: ProjectsEditComponent, canActivate:[PermissionGuard], data:{ roles: ['Super_Admin', 'Admin', 'ProjectManager'], forCurrentUser: false}},
    { path: ':id/emploees/:e_id/edit', component: ProjectsEmploeesEditComponent, canActivate:[PermissionGuard], data:{ roles: ['Super_Admin', 'Admin', 'ProjectManager'], forCurrentUser: false}}
]; 

@NgModule({
    imports: [RouterModule.forChild(routes)],
    providers: [PermissionGuard],
    exports: [RouterModule]
})
export class ProjectsRoutingModule {}