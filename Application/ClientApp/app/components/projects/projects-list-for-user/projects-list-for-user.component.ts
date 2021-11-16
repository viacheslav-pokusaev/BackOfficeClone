import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ISpinnerConfig } from '@hardpool/ngx-spinner';
import { UserStorageService } from '../../../services/user-storage.service';
import { Project } from '../../../models/project.model';
import { ProjectsService } from '../../../services/projects.service';
import { ProjectQueryModel } from '../../../models/query-models/project-query.model';
import { Client } from '../../../models/client.model';
import { UserProfileProjectQueryModel } from '../../../models/query-models/user-profile-project-query.model';
import { UserProfileProjectService } from '../../../services/user-profile-project.service';
import { UserProfileProject } from '../../../models/user-profile-project.model';
import { Location } from '@angular/common';
import { ProjectsEmploeesComponent } from '../projects-emploees/projects-emploees.component';
import { MatDialog } from '@angular/material';
import { Subject, Subscription } from 'rxjs';
import { SPINNER_CONFIG } from '../../../constants/constants';

@Component({
    selector: 'projects-list-for-user',
    templateUrl: './projects-list-for-user.component.html',
    styleUrls: ['./projects-list-for-user.component.css']
})
export class ProjectsListForUserComponent implements OnInit {

    emploees: Array<UserProfileProject> = new Array<UserProfileProject>();

    clients: Array<Client> = new Array<Client>();

    isSelected: Array<boolean>;

    submitAttempt: boolean;

    loading = false;
    
    isAddVisible: boolean;

    status: string;

    id: number;

    queryModel: UserProfileProjectQueryModel;

    subject: Subject<any>;

    subscription: Subscription;

    spinnerConfig: ISpinnerConfig = SPINNER_CONFIG;

    constructor(private projectService: ProjectsService,
        private userStorageService: UserStorageService,
        private fBuilder: FormBuilder,
        private dialog: MatDialog,
        private userProfileProjectService: UserProfileProjectService,
        private location: Location) { }

    @Input('userId') userId: number;

    ngOnInit() { 
        this.subject = new Subject<any>();
        this.isAddVisible = false;
        this.queryModel = new UserProfileProjectQueryModel();
        if (this.userId != null)
            this.id = this.userId;
        this.loading = true;
              this.queryModel.UserProfileId = this.id;
              this.queryModel.Take =  10;
              this.userProfileProjectService.get(this.queryModel).subscribe(response => {
                  this.emploees = response.Result;
                  this.subject.next({from: "component", response: response});
                  this.loading = false;
        })

        this.subscription = this.subject.asObservable().subscribe(response => {
            if (response.from == "tablebuttons"){
                this.queryModel = response.response as UserProfileProjectQueryModel;
                if (this.userId != null)
                this.id = this.userId;
                this.loading = true;
                  this.queryModel.UserProfileId = this.id;
                  this.userProfileProjectService.get(this.queryModel).subscribe(response => {
                      this.emploees = response.Result;
                      this.loading = false;
                 })
            }
        })
    }

    public getTime(currentEmploee: UserProfileProject) {
        if (currentEmploee.DateFinishWork == null) return 0;
        if (currentEmploee.DateStartWork == null) return 0;
        let date1 = new Date(Date.parse(currentEmploee.DateStartWork.toString()));
        let date2 = new Date();
        let date3 = new Date(Date.parse(currentEmploee.DateFinishWork.toString()));
        let timeDiff = (date3 > date1) ? Math.abs(date3.getTime() - date1.getTime()) : Math.abs(date2.getTime() - date1.getTime());
        return Math.ceil(timeDiff / (1000 * 3600 * 24)); 
    }

    public showEmploeesDialog(emploee: UserProfileProject) {
        const dialogRef = this.dialog.open(ProjectsEmploeesComponent, {
            width: '1050px',
            data: {projectId: emploee.ProjectId, projectName: emploee.ProjectName, userId: this.userId}
          });
    }

    public goBack() {
        this.location.back();
    }
}
