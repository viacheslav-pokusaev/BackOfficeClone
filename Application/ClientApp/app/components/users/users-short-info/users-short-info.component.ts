import { Component, OnInit, Input, Inject } from '@angular/core';
import { UserProfileProjectQueryModel } from '../../../models/query-models/user-profile-project-query.model';
import { UserProfileProjectService } from '../../../services/user-profile-project.service';
import { UserProfileProject } from '../../../models/user-profile-project.model';
import { User } from '../../../models/user.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { SPINNER_ANIMATIONS, SPINNER_PLACEMENT, ISpinnerConfig } from '@hardpool/ngx-spinner';

@Component({
    selector: 'users-short-info',
    templateUrl: './users-short-info.component.html',
    styleUrls: ['./users-short-info.component.css']
})
export class UsersShortInfoComponent implements OnInit {


    loading: boolean = false;

    userProfileQueryModel: UserProfileProjectQueryModel;

    emploees: Array<UserProfileProject>;

    spinnerConfig: ISpinnerConfig = {
        placement: SPINNER_PLACEMENT.block_ui,
        animation: SPINNER_ANIMATIONS.spin_3,
        size: "3rem",
        color: "#1574b3"
    };

    constructor(private userProfileProjectService: UserProfileProjectService,
        public dialogRef: MatDialogRef<UsersShortInfoComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit(): void {
        console.log(this.data.user);
        this.loading = true;
        let userProfileQueryModel = new UserProfileProjectQueryModel();
        userProfileQueryModel.UserProfileId = this.data.user.UserProfileId;        
        userProfileQueryModel.Take = 1;
              this.userProfileProjectService.get(userProfileQueryModel).subscribe(response => {
                  this.emploees = response.Result;
                  this.loading = false;
        })
     }
}
