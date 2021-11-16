import { Component, Inject } from '@angular/core';
import { UserProfileProjectService } from '../../../services/user-profile-project.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig, MatDialog } from '@angular/material';
import { ISpinnerConfig } from '@hardpool/ngx-spinner';
import { Feedback } from '../../../models/feedback.model';
import { DeleteConfirmationComponent } from '../../modals/delete-confirmation/delete-confirmation.component';
import { FeedbackService } from '../../../services/feedback.service';
import { UsersFeedbackEditComponent } from '../users-feedback-edit/users-feedback-edit.component';
import { UsersService } from '../../../services/users.service';
import { User } from '../../../models/user.model';
import { SPINNER_CONFIG } from '../../../constants/constants';
                                                            
@Component({
    selector: 'user-feedbacks',
    templateUrl: './user-feedbacks.component.html',
    styleUrls: ['./user-feedbacks.component.css']
})
export class UserFeedbacksComponent {
    loading: boolean = false;

    spinnerConfig: ISpinnerConfig = SPINNER_CONFIG;

    public feedbacks: Array<Feedback>;
    private userId: number;

    constructor(public dialogRef: MatDialogRef<UserFeedbacksComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private feedbackService: FeedbackService, private dialog: MatDialog, private usersService: UsersService) {
        this.userId = data.userId;
        this.loading = true;
        this.feedbackService.getByUserId(this.userId).subscribe((feedbacks: Feedback[]) => {
            this.feedbacks = feedbacks;
            this.loading = false;
        });
    }

    public editFeedbackDialog(feedback: Feedback) {
        let dialogRes = this.dialog.open(UsersFeedbackEditComponent, {
            width: '1050px',
            data: {
                feedback: {
                    Id: feedback.Id,
                    ProjectName: feedback.ProjectName,
                    Position: feedback.Position,
                    Feedback: feedback.Feedback
                }
            }
        }).afterClosed().subscribe(dialogResult => {
            if (dialogResult) {
                this.feedbackService.getByUserId(this.userId).subscribe((feedbacks: Feedback[]) => {
                    this.feedbacks = feedbacks;
                });
            }
        });
    }

    public confirmDeleteDialog(feedback: Feedback) {

        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.position = { top: '0' };
        dialogConfig.autoFocus = false;

        this.dialog.open(DeleteConfirmationComponent, dialogConfig)
            .afterClosed().subscribe(dialogResult => {
                if (dialogResult)
                    this.delete(feedback);
            });
    }

    public delete(feedback: Feedback) {
        this.feedbackService.removeFeedback(feedback.Id).subscribe(response => {
            this.feedbackService.getByUserId(this.userId).subscribe((feedbacks: Feedback[]) => {
                this.feedbacks = feedbacks;
            });
        });  
    }
}
