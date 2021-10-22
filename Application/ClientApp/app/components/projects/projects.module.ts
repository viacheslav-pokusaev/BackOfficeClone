import { NgModule } from '@angular/core';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { ProjectsEmploeesComponent } from './projects-emploees/projects-emploees.component';
import { ProjectsEditComponent } from './projects-edit/projects-edit.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../modules/shared.module';
import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsEmploeesEditComponent } from './projects-emploees-edit/projects-emploees-edit.component';
import { ProjectsListForUserComponent } from './projects-list-for-user/projects-list-for-user.component';


@NgModule({
    declarations: [
        ProjectsListComponent,
        ProjectsEmploeesComponent,
        ProjectsEditComponent,
        ProjectsEmploeesEditComponent,
        ProjectsListForUserComponent,],
    imports: [ 
        ProjectsRoutingModule,
        SharedModule
    ],
    exports: [RouterModule,
        ProjectsListComponent,
        ProjectsListForUserComponent,
        ProjectsEditComponent],
    providers: []
})
export class ProjectsModule {}