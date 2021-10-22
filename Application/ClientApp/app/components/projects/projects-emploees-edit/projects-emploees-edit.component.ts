import { Component, OnInit, Optional, Inject } from '@angular/core';
import { ProjectsService } from '../../../services/projects.service';
import { UserProfileProject } from '../../../models/user-profile-project.model';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { UserProfileProjectService } from '../../../services/user-profile-project.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'projects-emploees-edit',
    templateUrl: './projects-emploees-edit.component.html',
    styleUrls: ['./projects-emploees-edit.component.css']
})
export class ProjectsEmploeesEditComponent implements OnInit {

    private id: number;

    emploee: UserProfileProject;

    minDateStart: Date;

    positions = ['developer', 'project manager', 'quality assurance', 'business analyst', 'team lead', 'designer'];

    statuses = ['Working', 'Complete'];

    constructor(private userProfileProjectService: UserProfileProjectService,
        private route: ActivatedRoute,
        @Optional() public dialogRef: MatDialogRef<ProjectsEmploeesEditComponent>,
        @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
        private location: Location) { }

    ngOnInit(): void {
            this.id = this.data.emploeeId;
            this.userProfileProjectService.getById(this.id).subscribe(response => {
                this.emploee = response;
                if (this.emploee.DateStartWork) {
                    this.emploee.DateStartWork = new Date(Date.parse(this.emploee.DateStartWork.toString()));
                    this.emploee.DateStartWork = (this.emploee.DateStartWork.getUTCFullYear() > 2010) ? this.emploee.DateStartWork : null;
                }
                if (this.emploee.DateFinishWork) {
                    this.emploee.DateFinishWork = new Date(Date.parse(this.emploee.DateFinishWork.toString()));
                    this.emploee.DateFinishWork = (this.emploee.DateFinishWork.getUTCFullYear() > 2010) ? this.emploee.DateFinishWork : null;
                }
            });
        this.minDateStart = new Date();
        this.minDateStart.setUTCFullYear(2018);
     }

     updateEmploee(emploee: UserProfileProject) {
         if (emploee.DateStartWork) {
             emploee.DateStartWork = new Date(Date.parse(emploee.DateStartWork.toString()));
             emploee.DateStartWork.setMinutes(emploee.DateStartWork.getMinutes() - emploee.DateStartWork.getTimezoneOffset());
         }
         if (emploee.DateFinishWork) {
             emploee.DateFinishWork = new Date(Date.parse(emploee.DateFinishWork.toString()));
             emploee.DateFinishWork.setMinutes(emploee.DateFinishWork.getMinutes() - emploee.DateFinishWork.getTimezoneOffset());
         }
        emploee.ProjectId = this.id;
        this.userProfileProjectService.update(emploee).subscribe(response => {
            if (this.dialogRef != null && this.dialogRef != undefined) this.dialogRef.close();
        });
     }

     cancel() {
        if (this.dialogRef != null && this.dialogRef != undefined) this.dialogRef.close();
    }
}
