import { Component, Inject } from '@angular/core';
import { UserProfileProjectService } from '../../../services/user-profile-project.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ISpinnerConfig } from '@hardpool/ngx-spinner';
import { Feedback } from '../../../models/feedback.model';
import { FeedbackService } from '../../../services/feedback.service';
import { ProjectsService } from '../../../services/projects.service';
import { Project } from '../../../models/project.model';
import { ProjectQueryModel } from '../../../models/query-models/project-query.model';
import { SPINNER_CONFIG } from '../../../constants/constants';

@Component({
    selector: 'user-feedback-create',
    templateUrl: './user-feedback-create.component.html',
    styleUrls: ['./user-feedback-create.component.css']
})
export class UserFeedbackCreateComponent {
    public loading: boolean = false;
    public feedback: Feedback = new Feedback();
    public projects: Array<Project>;
    spinnerConfig: ISpinnerConfig = SPINNER_CONFIG;

    constructor(public dialogRef: MatDialogRef<UserFeedbackCreateComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
        private feedbackService: FeedbackService, private projectService: ProjectsService, ) {
        this.loading = true;
        this.feedback.UserId = data.userId;
        this.feedback.AuthorId = data.authorId;
        this.projectService.get(new ProjectQueryModel()).subscribe(response => {
            this.projects = response.Result;
            this.loading = false;
        });
    }

    public createFeedback(): void {
        this.feedbackService.addFeedback(this.feedback).subscribe(response => {
            this.cancel();
        });
    }

    public cancel(): void {
        if (this.dialogRef != null && this.dialogRef != undefined) this.dialogRef.close();
    }
}
