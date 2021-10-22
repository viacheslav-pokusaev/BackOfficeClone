import { NgModule } from '@angular/core';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersEditComponent } from './users-edit/users-edit.component';
import { UsersInfoComponent } from './users-info/users-info.component';
import { UsersChangePasswordComponent } from './users-change-password/users-change-password.component';
import { UsersVacationsStatisticListComponent } from './users-vacations-statistic-list/users-vacations-statistic-list.component';
import { UsersRoutingModule } from './users-routing.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../modules/shared.module';
import { WorkActivityModule } from '../work-activity/work-activity.module';
import { ProjectsModule } from '../projects/projects.module';
import { UsersProjectsByUserComponent } from './users-projects-by-user/users-projects-by-user.component';
import { UsersAvatarSelectModalComponent } from './users-avatar-select-modal/users-avatar-select-modal.component';
import { FancyImageUploaderModule } from 'ng2-fancy-image-uploader';
import { UsersShortInfoComponent } from './users-short-info/users-short-info.component';
import { UserFeedbacksComponent } from './user-feedbacks/user-feedbacks.component';
import { UserFeedbackCreateComponent } from './user-feedback-create/user-feedback-create.component';
import { UsersFeedbackEditComponent } from './users-feedback-edit/users-feedback-edit.component';

@NgModule({
    declarations: [
        UsersListComponent,
        UsersInfoComponent,
        UsersEditComponent,
        UsersChangePasswordComponent,
        UsersVacationsStatisticListComponent,
        UsersProjectsByUserComponent,
        UsersAvatarSelectModalComponent,
        UsersShortInfoComponent,
        UserFeedbacksComponent,
        UserFeedbackCreateComponent,
        UsersFeedbackEditComponent
    ],
    imports: [
        UsersRoutingModule, 
        SharedModule,
        WorkActivityModule,
        ProjectsModule,
        FancyImageUploaderModule
    ],
    exports: [RouterModule
    ],
    providers: [],
    entryComponents: [UsersAvatarSelectModalComponent, UsersShortInfoComponent, UserFeedbacksComponent, UserFeedbackCreateComponent, UsersFeedbackEditComponent]
})

export class UsersModule {
}
