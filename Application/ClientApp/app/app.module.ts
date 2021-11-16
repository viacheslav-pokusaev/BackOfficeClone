import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './modules/shared.module';
import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { ProposalListComponent } from './components/proposals/proposals-list.component';
import { UserStorageService } from './services/user-storage.service';
import { UsersService } from './services/users.service';
import { ProposalService } from './services/proposal.service';
import { SizeVacationsService } from './services/size-vacations.service';
import { VacationService } from './services/vacation.service';
import { SickDayService } from './services/sick-day.service';
import { OvertimeService } from './services/overtime.service';
import { WorkActivityService } from './services/work-activity.service'; 
import { WorkAtHomeService } from './services/work-at-home.service';
import { PermissionGuard } from './guards/permission.guard';
import { AppRoutingModule } from './app-routing.module';
import { TopMenuComponent } from './components/top-menu/top-menu.component';
import * as $ from 'jquery';
import { ClientsService } from './services/clients.service';
import { ProjectsService } from './services/projects.service';
import { UserProfileProjectService } from './services/user-profile-project.service';
import { DatabaseAdministrateComponent } from './components/database-administrate/database-administrate.component';
import { DatabaseService } from './services/database.service';
import { LogfileService } from './services/logfile.service';
import { AuditTrailComponent } from './components/audit-trail/audit-trail.component';
import { AuditTrailService } from './services/audit-trail.service';
import { FeedbackService } from './services/feedback.service';
import { MonthActivityService } from './services/month-activity.service';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        ProposalListComponent,
        TopMenuComponent,
        DatabaseAdministrateComponent,
        AuditTrailComponent
    ],
    imports: [
        BrowserModule,
        SharedModule,
        AppRoutingModule,
        BrowserAnimationsModule,
    ],
    providers: [
        UsersService,
        ProposalService,
        SizeVacationsService,
        UserStorageService,
        VacationService,
        SickDayService,
        OvertimeService,
        WorkAtHomeService,
        WorkActivityService,
        ClientsService,
        ProjectsService,
        UserProfileProjectService,
        DatabaseService,
        LogfileService,
        AuditTrailService,
        PermissionGuard,
        FeedbackService,
        MonthActivityService
    ],
    bootstrap: [AppComponent],
    exports: [
        SharedModule
    ]
})


export class AppModule {
}
