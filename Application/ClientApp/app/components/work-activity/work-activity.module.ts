import { NgModule } from '@angular/core';
import { AgGridModule } from 'ag-grid-angular';
import { SharedModule } from '../../modules/shared.module';
import  { WorkActivityRoutingModule } from './work-activity-routing.module';
import { WorkActivitiesListComponent } from './workactivites/workactivities-list.component';
import { VacationsListComponent } from './vacations/vacations-list/vacations-list.component';
import { VacationsEditComponent } from './vacations/vacations-edit/vacations-edit.component';
import { SickDaysListComponent } from './sickdays/sickdays-list/sickdays-list.component';
import { SickDaysEditComponent } from './sickdays/sickdays-edit/sickdays-edit.component';
import { OvertimesListComponent } from './overtimes/overtimes-list/overtimes-list.component';
import { OvertimesEditComponent } from './overtimes/overtimes-edit/overtimes-edit.component';
import { SizeVacationsListComponent } from './sizevacations/sizevacations-list.component';
import { OvertimeUserListComponent } from './overtimes/overtimes-user-list/overtimes-user-list.component';
import { SickDaysUserListComponent } from './sickdays/sickdays-user-list/sickdays-user-list.component';
import { VacationsUserListComponent } from './vacations/vacations-user-list/vacations-user-list.component';
import { RouterModule } from '@angular/router';
import { WorkAtHomeListComponent } from './work-at-home/work-at-home-list/work-at-home-list.component';
import { WorkAtHomeUserListComponent } from './work-at-home/work-at-home-user-list/work-at-home-user-list.component';
import { MonthActivityComponent } from './month-activity/month-activity.component';
import { EditMonthCellComponent } from './edit-month-cell/edit-month-cell.component';

@NgModule({
    declarations: [WorkActivitiesListComponent,
        VacationsListComponent,
        VacationsEditComponent,
        SickDaysListComponent,
        SickDaysEditComponent,
        OvertimesListComponent,
        OvertimesEditComponent,
        SizeVacationsListComponent,
        OvertimeUserListComponent,
        SickDaysUserListComponent,
        VacationsUserListComponent,
        WorkAtHomeListComponent,
        WorkAtHomeUserListComponent,
        MonthActivityComponent,
        EditMonthCellComponent
        ],
    imports: [ SharedModule,
        AgGridModule.withComponents([WorkActivitiesListComponent]),
        WorkActivityRoutingModule ],
    exports: [RouterModule,
        OvertimeUserListComponent,
        SickDaysUserListComponent,
        VacationsUserListComponent,
        WorkAtHomeUserListComponent,
        MonthActivityComponent        
    ],
    providers: [],
    entryComponents: [ EditMonthCellComponent ]
})
export class WorkActivityModule {}