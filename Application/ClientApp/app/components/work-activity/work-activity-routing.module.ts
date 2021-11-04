import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkActivitiesListComponent } from './workactivites/workactivities-list.component';
import { VacationsListComponent } from './vacations/vacations-list/vacations-list.component';
import { VacationsEditComponent } from './vacations/vacations-edit/vacations-edit.component';
import { SickDaysListComponent } from './sickdays/sickdays-list/sickdays-list.component';
import { SickDaysEditComponent } from './sickdays/sickdays-edit/sickdays-edit.component';
import { OvertimesListComponent } from './overtimes/overtimes-list/overtimes-list.component';
import { OvertimesEditComponent } from './overtimes/overtimes-edit/overtimes-edit.component';
import { SizeVacationsListComponent } from './sizevacations/sizevacations-list.component';
import { PermissionGuard } from '../../guards/permission.guard';
import { WorkAtHomeListComponent } from './work-at-home/work-at-home-list/work-at-home-list.component';
import { MonthActivityComponent } from './month-activity/month-activity.component';
import { EditMonthCellComponent } from './edit-month-cell/edit-month-cell.component';

const routes: Routes = [
    { path: '', component: WorkActivitiesListComponent, canActivate: [PermissionGuard], data: { roles: ['Super_Admin', 'Admin', 'HumanResource', 'ProjectManager', 'Developer'], forCurrentUser: true } },

    {
        path: 'vacations', children: [
            { path: '', component: VacationsListComponent, canActivate: [PermissionGuard], data: { roles: ['Super_Admin', 'Admin', 'HumanResource', 'ProjectManager'], forCurrentUser: false } },
            { path: ':id/edit', component: VacationsEditComponent, canActivate: [PermissionGuard], data: { roles: ['Super_Admin', 'Admin', 'HumanResource', 'Developer'], forCurrentUser: true } }
        ]
    },

    {
        path: 'sickDays', children: [
            { path: '', component: SickDaysListComponent, canActivate: [PermissionGuard], data: { roles: ['Super_Admin', 'Admin', 'HumanResource', 'ProjectManager'], forCurrentUser: false } },
            { path: ':id/edit', component: SickDaysEditComponent, canActivate: [PermissionGuard], data: { roles: ['Super_Admin', 'Admin', 'HumanResource', 'Developer'], forCurrentUser: true } }
        ]
    },

    {
        path: 'overtimes', children: [
            { path: '', component: OvertimesListComponent, canActivate: [PermissionGuard], data: { roles: ['Super_Admin', 'Admin', 'HumanResource', 'ProjectManager'], forCurrentUser: false } },
            { path: ':id/edit', component: OvertimesEditComponent, canActivate: [PermissionGuard], data: { roles: ['Super_Admin', 'Admin', 'HumanResource', 'Developer'], forCurrentUser: true } }
        ]
    },

    {
        path: 'sizeVacations', children: [
            { path: '', component: SizeVacationsListComponent, canActivate: [PermissionGuard], data: { roles: ['Super_Admin', 'Admin', 'HumanResource', 'ProjectManager', 'Developer'], forCurrentUser: true } }
        ]
    },

    {
        path: 'workathome', children: [
            { path: '', component: WorkAtHomeListComponent, canActivate: [PermissionGuard], data: { roles: ['Super_Admin', 'Admin', 'HumanResource', 'ProjectManager'], forCurrentUser: false } }
        ]
    },

    {
        path: 'monthactivity', children: [
            { path: '', component: MonthActivityComponent, canActivate: [PermissionGuard], data: { roles: ['Super_Admin', 'Admin', 'HumanResource', 'ProjectManager', 'Developer'], forCurrentUser: true } }
        ]
    },

    {
        path: 'editmonthcell', children: [
            { path: '', component: EditMonthCellComponent, canActivate: [PermissionGuard], data: { roles: ['Super_Admin', 'Admin', 'HumanResource', 'ProjectManager', 'Developer'], forCurrentUser: true } }
        ]
    }


];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    providers: [],
    exports: [RouterModule]
})
export class WorkActivityRoutingModule { }