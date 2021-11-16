import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { Project } from '../../../models/project.model';
import { ProjectsService } from '../../../services/projects.service';
import { ClientsService } from '../../../services/clients.service';
import { UserStorageService } from '../../../services/user-storage.service';
import { UsersService } from '../../../services/users.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Client } from '../../../models/client.model';
import { User } from '../../../models/user.model';
import { UserProfileProject } from '../../../models/user-profile-project.model';
import { ClientQueryModel } from '../../../models/query-models/client-query.model';
import { UserQueryModel } from '../../../models/query-models/user-query.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Feedback } from '../../../models/feedback.model';
import { FeedbackService } from '../../../services/feedback.service';
import { ProjectQueryModel } from '../../../models/query-models/project-query.model';
import { ISpinnerConfig } from '@hardpool/ngx-spinner';
import { SPINNER_CONFIG } from '../../../constants/constants';

@Component({
    selector: 'users-feedback-edit',
    templateUrl: './users-feedback-edit.component.html',
    styleUrls: ['./users-feedback-edit.component.css']
})
export class UsersFeedbackEditComponent {
    public loading: boolean = false;
    public projects: Array<Project>;
    public feedback: Feedback;
    public originalFeedback: Feedback;
    spinnerConfig: ISpinnerConfig = SPINNER_CONFIG;

    constructor(private feedbackService: FeedbackService,
        private projectService: ProjectsService,
        public dialogRef: MatDialogRef<UsersFeedbackEditComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.feedback = data.feedback;
        this.originalFeedback = new Feedback();
        this.originalFeedback.ProjectName = this.feedback.ProjectName;
        this.originalFeedback.Position = this.feedback.Position;
        this.originalFeedback.Feedback = this.feedback.Feedback;
        this.loading = true;
        this.projectService.get(new ProjectQueryModel()).subscribe(response => {
            this.projects = response.Result;
            this.loading = false;
        });
    }

    @HostListener('window:keyup', ['$event'])
    keyEvent(event: KeyboardEvent) {
      
      if (event.keyCode === 13) {
          this.updateFeedback();
      }
  
      if (event.keyCode === 27) {
          this.cancel();
      }
    }    

    public updateFeedback() {
        this.feedbackService.updateFeedback(this.feedback).subscribe(response => {
            if (this.dialogRef != null && this.dialogRef != undefined) this.dialogRef.close(this.feedback);
        })
    }

    public cancel() {
        console.log(this.feedback);
        console.log(this.originalFeedback);
        if (this.dialogRef != null && this.dialogRef != undefined) {
            this.feedback = this.originalFeedback;
            this.dialogRef.close();
        }
    }
}
