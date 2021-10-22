import { Component, OnInit, Inject, Input, Optional } from '@angular/core';
import { ProjectsService } from '../../../services/projects.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from '../../../models/project.model';
import { Client } from '../../../models/client.model';
import { User } from '../../../models/user.model';
import { SPINNER_ANIMATIONS, SPINNER_PLACEMENT, ISpinnerConfig } from '@hardpool/ngx-spinner';
import { UserQueryModel } from '../../../models/query-models/user-query.model';
import { UserStorageService } from '../../../services/user-storage.service';
import { UsersService } from '../../../services/users.service';
import { UserProfileProject } from '../../../models/user-profile-project.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserProfileProjectService } from '../../../services/user-profile-project.service';
import { UserProfileProjectQueryModel } from '../../../models/query-models/user-profile-project-query.model';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material';
import { ProjectsEmploeesEditComponent } from '../projects-emploees-edit/projects-emploees-edit.component';
import { Subject, Subscription } from 'rxjs';
import { DeleteConfirmationComponent } from '../../modals/delete-confirmation/delete-confirmation.component';

@Component({
    selector: 'projects-emploees',
    templateUrl: './projects-emploees.component.html',
    styleUrls: ['./projects-emploees.component.css']
})
export class ProjectsEmploeesComponent implements OnInit {

    project: Project;

    private id: number;

    clients: Array<Client> = new Array<Client>();

    users: Array<User> = new Array<User>();

    emploees: Array<UserProfileProject> = new Array<UserProfileProject>();

    newEmploee: UserProfileProject;

    loading = false;

    editText: string = 'Edit'

    editId: number = -1;

    status: string;

    newEmploeeForm: FormGroup;

    updateEmploee: FormGroup;

    isAddVisible: boolean;

    submitAttempt: boolean;

    positions = ['developer', 'project manager', 'quality assurance', 'business analyst', 'team lead', 'designer'];

    name: string

    userId: number;

    queryModel: UserProfileProjectQueryModel;

    subject: Subject<any>;

    subscription: Subscription;



    spinnerConfig: ISpinnerConfig = {
        placement: SPINNER_PLACEMENT.block_ui,
        animation: SPINNER_ANIMATIONS.spin_3,
        size: "3rem",
        color: "#1574b3"
    };

    @Input('projectId') projectId: number;
    @Input('projectName') projectName: string;
    @Input('isNotModal') isNotModal: boolean;

    constructor(private projectService: ProjectsService,
        private userProfileProjectService: UserProfileProjectService,
        private route: ActivatedRoute,
        private userStorageService: UserStorageService,
        private usersService: UsersService,
        private fBuilder: FormBuilder,
        private router: Router,
        @Optional() public dialogRef: MatDialogRef<ProjectsEmploeesEditComponent>,
        @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
        private dialog: MatDialog) { }

    ngOnInit() {
        this.subject = new Subject<any>();
        this.queryModel = new UserProfileProjectQueryModel();
        if (this.projectId != null && this.projectId != undefined) 
        this.id = this.projectId;
        if (this.projectName != null && this.projectName != undefined) 
        this.name = this.projectName;
        if (this.data != null && this.data != undefined){
            if (this.data.projectId != null && this.data.projectId != undefined) 
            this.id = this.data.projectId;
            if (this.data.projectName != null && this.data.projectName != undefined) 
            this.name = this.data.projectName;
            if (this.data.userId != null && this.data.userId != undefined)
            this.userId = this.data.userId;
        }

        this.loading = true;
        this.isAddVisible = false;
        this.editId = -1;
        this.queryModel.Take =  10;
            this.queryModel.ProjectId = this.id;
            this.userProfileProjectService.get(this.queryModel).subscribe(response => {
                this.emploees = response.Result;
                this.loading = false;
                this.subject.next({from: "component", response: response});
                let queryModelUsers = new UserQueryModel();
                this.usersService.get(queryModelUsers).subscribe(res => {
                    this.users = res.Result;
                })
                this.emploees.forEach(element => {
                    if (element.DateStartWork != null) {
                        element.DateStartWork = new Date(Date.parse(element.DateStartWork.toString()));
                        element.DateStartWork = (element.DateStartWork.getUTCFullYear() > 2010) ? element.DateStartWork : null;
                    }
                    if (element.DateFinishWork) {
                        element.DateFinishWork = new Date(Date.parse(element.DateFinishWork.toString()));
                        element.DateFinishWork = (element.DateFinishWork.getUTCFullYear() > 2010) ? element.DateFinishWork : null;
                    }
                });
            });

            this.subscription = this.subject.asObservable().subscribe(response => {
                if (response.from == "tablebuttons") {
                    this.queryModel = response.response as UserProfileProjectQueryModel;
                    if (this.projectId != null && this.projectId != undefined) 
                        this.id = this.projectId;
                    if (this.projectName != null && this.projectName != undefined) 
                    this.name = this.projectName;
                    if (this.data != null && this.data != undefined) {
                    if (this.data.projectId != null && this.data.projectId != undefined) 
                    this.id = this.data.projectId;
                    if (this.data.projectName != null && this.data.projectName != undefined) 
                    this.name = this.data.projectName;
                    if (this.data.userId != null && this.data.userId != undefined)
                    this.userId = this.data.userId;
                    }
                    this.loading = true;
                    this.isAddVisible = false;
                    this.editId = -1;
                    this.queryModel.ProjectId = this.id;
                        this.userProfileProjectService.get(this.queryModel).subscribe(response => {
                            this.emploees = response.Result;
                            this.loading = false;
                            let queryModelUsers = new UserQueryModel();
                            this.usersService.get(queryModelUsers).subscribe(res => {
                                this.users = res.Result;
            
                            })
                            this.emploees.forEach(element => {
                                if (element.DateStartWork != null) {
                                    element.DateStartWork = new Date(Date.parse(element.DateStartWork.toString()));
                                    element.DateStartWork = (element.DateStartWork.getUTCFullYear() > 2010) ? element.DateStartWork : null;
                                }
                                if (element.DateFinishWork) {
                                    element.DateFinishWork = new Date(Date.parse(element.DateFinishWork.toString()));
                                    element.DateFinishWork = (element.DateFinishWork.getUTCFullYear() > 2010) ? element.DateFinishWork : null;
                                }
                            });
                        });
                }
            });
        this.initForm();
     }

     initForm() {
        this.newEmploeeForm = this.fBuilder.group({
            Position:['', [
                Validators.required
            ]],
            UserProfile: ['', [
                Validators.required
            ]],
            DateStartWork: [],
            DateFinishWork:[],
            Comment: []
        });
    }

    add(newEmploee: UserProfileProject) {
        if (this.newEmploeeForm.valid && this.isAddVisible == true) {
            if (newEmploee.DateStartWork != undefined && newEmploee.DateStartWork != null) {
                newEmploee.DateStartWork = new Date(Date.parse(newEmploee.DateStartWork.toString()));
                newEmploee.DateStartWork.setMinutes(newEmploee.DateStartWork.getMinutes() - newEmploee.DateStartWork.getTimezoneOffset());
            }
            if (newEmploee.DateFinishWork != undefined && newEmploee.DateFinishWork != null) {
                newEmploee.DateFinishWork = new Date(Date.parse(newEmploee.DateFinishWork.toString()));
                newEmploee.DateFinishWork.setMinutes(newEmploee.DateFinishWork.getMinutes() - newEmploee.DateFinishWork.getTimezoneOffset());
            }
            this.submitAttempt = false;
            newEmploee.ProjectId = this.id;
            this.loading = true;
            this.userProfileProjectService.create(newEmploee).subscribe(response => {
                let queryModel = new UserProfileProjectQueryModel();
                queryModel.ProjectId = this.id;
                this.userProfileProjectService.get(queryModel).subscribe(response => {
                this.emploees = response.Result;
                this.loading = false;
                this.isAddVisible = false;
                });
            })
        }
        else {
            this.submitAttempt = true;
        }
     }

     public confirmDeleteDialog(emploee: UserProfileProject, index) {

        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.position = { top: '0' };
        dialogConfig.autoFocus = false;

        this.dialog.open(DeleteConfirmationComponent, dialogConfig)
            .afterClosed().subscribe(dialogResult => {
                if (dialogResult)
                    this.delete(emploee, index);
            });
    }


    public delete(emploee: UserProfileProject, indexOnArray: number) {
        this.loading = true;
        this.userProfileProjectService.delete(emploee.Id).subscribe((result) => {
            let queryModel = new UserProfileProjectQueryModel();
                queryModel.ProjectId = this.id;
                this.userProfileProjectService.get(queryModel).subscribe(response => {
                this.emploees = response.Result;
                this.isAddVisible = false;
                this.loading = false;
                });
            this.status = "Deleted";
        })
     }

     public menuAddNew() {
        this.isAddVisible = true;
        this.newEmploee = new UserProfileProject();
    }

    public editProjectDialog(emploee: UserProfileProject) {
        const dialogRef = this.dialog.open(ProjectsEmploeesEditComponent, {
            width: '1050px',
            data: {emploeeId: emploee.Id}
          });

          this.loading = true;
          this.isAddVisible = false;
          this.editId = -1;
              let queryModel = new UserProfileProjectQueryModel();
              queryModel.ProjectId = this.id;
              this.userProfileProjectService.get(queryModel).subscribe(response => {
                  this.emploees = response.Result;
                  let queryModelUsers = new UserQueryModel();
                  this.usersService.get(queryModelUsers).subscribe(res => {
                      this.users = res.Result;
                      this.loading = false;
                  })
              });
          this.initForm();
    }

    public cancel() {
        if (this.dialogRef != null && this.dialogRef != undefined) this.dialogRef.close();
    }

    public goToUser(emploee: UserProfileProject) {
        if (this.dialogRef != null) this.dialogRef.close();
        this.router.navigateByUrl('/users/'+emploee.UserProfileId+'/info');
    }

    public getClassForTable() {
        if (this.data != undefined && this.data != null) {
            return "card x_panel scroll-in-modal";
        }
        else return "card x_panel";
    }
    
}
