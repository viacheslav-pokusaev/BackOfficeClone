import { Component, OnInit, Input, Optional, Inject, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ISpinnerConfig } from '@hardpool/ngx-spinner';
import { UserStorageService } from '../../../services/user-storage.service';
import { Project } from '../../../models/project.model';
import { ProjectsService } from '../../../services/projects.service';
import { ProjectQueryModel } from '../../../models/query-models/project-query.model';
import { Client } from '../../../models/client.model';
import { ClientsService } from '../../../services/clients.service';
import { ClientQueryModel } from '../../../models/query-models/client-query.model';
import { UsersService } from '../../../services/users.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material';
import { ProjectsEmploeesComponent } from '../projects-emploees/projects-emploees.component'
import { ProjectsEditComponent } from '../projects-edit/projects-edit.component';
import { DeleteConfirmationComponent } from '../../modals/delete-confirmation/delete-confirmation.component';
import { Subject, Subscription } from 'rxjs';
import { ProjectsCreateComponent } from '../projects-create/projects-create.component';
import { UserProfileProjectService } from '../../../services/user-profile-project.service';
import { ClientsInfoComponent } from '../../clients/clients-info/clients-info.component';
import { SPINNER_CONFIG } from '../../../constants/constants';

@Component({
    selector: 'projects-list',
    templateUrl: './projects-list.component.html',
    styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent implements OnInit {

    newProject: Project = new Project();

    projects: Array<Project> = new Array<Project>();

    clients: Array<Client> = new Array<Client>();

    isSelected: Array<boolean>;

    newProjectForm: FormGroup;

    submitAttempt: boolean;

    loading = false;

    isAdmin: boolean;

    isUser: boolean;
    
    isMyPage: boolean;
    
    isAddVisible: boolean;

    status: string;

    queryModel: ProjectQueryModel;

    subject: Subject<any>;

    subscription: Subscription;

    numbers: Array<Array<number>>

    spinnerConfig: ISpinnerConfig = SPINNER_CONFIG;

    constructor(private projectService: ProjectsService,
        private clientsService: ClientsService,
        private userStorageService: UserStorageService,
        private usersService: UsersService,
        private userProfileProject: UserProfileProjectService,
        private route: ActivatedRoute,
        private fBuilder: FormBuilder,
        private dialog: MatDialog,
        private location: Location,
        @Optional() public dialogRef: MatDialogRef<ProjectsListComponent>,
        @Optional() @Inject(MAT_DIALOG_DATA) public data: any) { }

    @Input('clientId') clientId: number;

    ngOnInit() { 
        this.subject = new Subject<any>();
        this.queryModel = new ProjectQueryModel();
        this.queryModel.Take =  10;
        this.isAddVisible = false;
        if (this.data != undefined && this.data != null){
            this.clientId = this.data.clientId;
        }
        if (this.clientId != null)
        this.queryModel.ClientId = this.clientId;
        this.queryModel.UserId = this.userStorageService.getId();
        this.loading = true;

        this.projectService.get(this.queryModel).subscribe(response => {
            this.projects = response.Result;
            this.subject.next({from: "component", response: response});
            this.loading = false;
            this.numbers = new Array<Array<number>>(this.projects.length);
            for (let index = 0; index < this.numbers.length; index++) {
                this.numbers[index] = new Array<number>(2);
                this.numbers[index][0] = 0;
                this.numbers[index][1] = Math.min(4, this.projects[index].EmploeesAvatars.length - 1);
            }
            this.projects.forEach(element => {
                if (element.DateBegin != null) {
                    element.DateBegin = new Date(Date.parse(element.DateBegin.toString()));
                    element.DateBegin = (element.DateBegin.getUTCFullYear() > 2010) ? element.DateBegin : null;
                }
                if (element.DateEnd != null) {
                    element.DateEnd = new Date(Date.parse(element.DateEnd.toString()));
                    element.DateEnd = (element.DateEnd.getUTCFullYear() > 2010) ? element.DateEnd : null;
                }
            });
            let queryModelClients = new ClientQueryModel();
            queryModelClients.Take = 10;
            this.clientsService.get(queryModelClients).subscribe(resp =>{
                this.clients = resp.Result;
                this.loading = false;
            })
        })

        this.subscription = this.subject.asObservable().subscribe(response => {
            if (response.from == "tablebuttons") {
                this.queryModel = response.response as ProjectQueryModel;
                if (this.clientId != null)
                this.queryModel.ClientId = this.clientId;
                this.queryModel.UserId = this.userStorageService.getId();
                this.loading = true;
                this.projectService.get(this.queryModel).subscribe(response => {
                this.projects = response.Result;
                this.loading = false;
                this.numbers = new Array<Array<number>>(this.projects.length);
                for (let index = 0; index < this.numbers.length; index++) {
                    this.numbers[index] = new Array<number>(2);
                    this.numbers[index][0] = 0;
                    this.numbers[index][1] = Math.min(4, this.projects[index].EmploeesAvatars.length - 1);
                }
                this.projects.forEach(element => {
                    if (element.DateBegin != null) {
                        element.DateBegin = new Date(Date.parse(element.DateBegin.toString()));
                        element.DateBegin = (element.DateBegin.getUTCFullYear() > 2010) ? element.DateBegin : null;
                    }
                    if (element.DateEnd != null) {
                        element.DateEnd = new Date(Date.parse(element.DateEnd.toString()));
                        element.DateEnd = (element.DateEnd.getUTCFullYear() > 2010) ? element.DateEnd : null;
                    }
                });
                let queryModelClients = new ClientQueryModel();
                queryModelClients.Take = 10;
                this.clientsService.get(queryModelClients).subscribe(resp =>{
                    this.clients = resp.Result;
                    this.loading = false;
                })
            })
            }
        });

        this.initForm();
    }

    initForm() {
        this.newProjectForm = this.fBuilder.group({
            Name: ['', [
                Validators.required
            ]],
            BeginDate: [],
            Users: [],
            EndDate: [],
            Comment:[],
            selectClient:['', [
                Validators.required
            ]],
        });
    }

    public confirmDeleteDialog(id, index) {

        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.position = { top: '0' };
        dialogConfig.autoFocus = false;

        this.dialog.open(DeleteConfirmationComponent, dialogConfig)
            .afterClosed().subscribe(dialogResult => {
                if (dialogResult)
                    this.delete(id, index);
            });
    }

    public delete(index: number, indexOnArray: number) {
        this.projectService.delete(index).subscribe((result) => {
            this.queryModel.UserId = this.userStorageService.getId();
            this.loading = true;
            this.projectService.get(this.queryModel).subscribe(response => {
            this.projects = response.Result;
            this.subject.next({from: "component", response: response});
            this.loading = false;
            let queryModelClients = new ClientQueryModel();
            this.clientsService.get(queryModelClients).subscribe(resp =>{
                this.clients = resp.Result;
                this.loading = false;
            })
            this.status = "Deleted";
        })
        })
    }

    public menuAddNew() {
        this.isAddVisible = true;
        this.newProject = new Project();
    }

    public getTime(currentProject: Project) {
        let date1 = new Date(Date.parse(currentProject.DateBegin.toString()));
        let date2 = new Date();
        let date3 = new Date(Date.parse(currentProject.DateEnd.toString()));
        let timeDiff = (date3 > date1) ? Math.abs(date3.getTime() - date1.getTime()) : Math.abs(date2.getTime() - date1.getTime());
        return Math.ceil(timeDiff / (1000 * 3600 * 24)); 
    }

    public showEmploeesDialog(project: Project) {
        const dialogRef = this.dialog.open(ProjectsEmploeesComponent, {
            width: '1500px',
            data: {projectId: project.Id, projectName: project.Name}
          });

          dialogRef.afterClosed().subscribe(result => {
            this.isAddVisible = false;
            if (this.clientId != null)
            this.queryModel.ClientId = this.clientId;
            this.queryModel.UserId = this.userStorageService.getId();
            this.projectService.get(this.queryModel).subscribe(response => {
            this.projects = response.Result;
            })
            this.initForm();
            });
    }

    public editProjectDialog(project: Project, i: number) {
        const dialogRef = this.dialog.open(ProjectsEditComponent, {
            width: '800px',
            data: {projectId: project.Id, projectName: project.Name, clientId: (this.data != undefined && this.data != null) ? this.data.clientId : null}
          });

          dialogRef.afterClosed().subscribe(result => {
            this.isAddVisible = false;
            if (this.clientId != null)
            this.queryModel.ClientId = this.clientId;
            this.queryModel.UserId = this.userStorageService.getId();
            this.projectService.get(this.queryModel).subscribe(response => {
            this.projects = response.Result;
            })
            this.initForm();
            });
    }

    public createProjectDialog() {
        const dialogRef2 = this.dialog.open(ProjectsCreateComponent, {
            width: '800px',
            data: {fromProjectPage: true, clientId : this.clientId }
          });

          dialogRef2.afterClosed().subscribe(result => {
            if (this.clientId != null)
            this.queryModel.ClientId = this.clientId;
            this.queryModel.UserId = this.userStorageService.getId();
            this.loading = true;
            this.projectService.get(this.queryModel).subscribe(response => {
                this.projects = response.Result;
                this.loading = false;
                this.numbers = new Array<Array<number>>(this.projects.length);
                for (let index = 0; index < this.numbers.length; index++) {
                    this.numbers[index] = new Array<number>(2);
                    this.numbers[index][0] = 0;
                    this.numbers[index][1] = Math.min(4, this.projects[index].EmploeesAvatars.length - 1);
                }
                this.projects.forEach(element => {
                    if (element.DateBegin != null) {
                        element.DateBegin = new Date(Date.parse(element.DateBegin.toString()));
                        element.DateBegin = (element.DateBegin.getUTCFullYear() > 2010) ? element.DateBegin : null;
                    }
                    if (element.DateEnd != null) {
                        element.DateEnd = new Date(Date.parse(element.DateEnd.toString()));
                        element.DateEnd = (element.DateEnd.getUTCFullYear() > 2010) ? element.DateEnd : null;
                    }
                });
            })
            this.initForm();
          })
    }

    public goBack() {
        this.location.back();
    }

    public showClient(project: Project){
        if (project.ClientId != null && project.ClientId != undefined) {
        const dialogRef = this.dialog.open(ClientsInfoComponent, {
            width: '800px',
            data: {clientId: project.ClientId, fullInfo: true}
          });
        }
    }

    
    public cancel() {
        if (this.dialogRef != null && this.dialogRef != undefined) this.dialogRef.close();
    }

    
    @HostListener('window:keyup', ['$event'])
    keyEvent(event: KeyboardEvent) {
      
      if (event.keyCode === 13) {
        this.cancel();
      }
  
      if (event.keyCode === 27) {
          this.cancel();
      }
    }  

    public decrementIndexes(i: number) {
        if (this.numbers[i][0] > 0) {
            this.numbers[i][0]--;
            this.numbers[i][1]--;
        }

    }

    public incrementIndexes(i: number) {
        if (this.numbers[i][1] < this.projects[i].EmploeesAvatars.length - 1) {
            this.numbers[i][0]++;
            this.numbers[i][1]++;
        }
    }
    
    public getClassForTable() {
        if (this.data != undefined && this.data != null) {
            return "card x_panel scroll-in-modal";
        }
        else return "card x_panel";
    }

    public getClassForClientButton(project: Project){
        if (project.ClientId != null && project.ClientId != undefined) {
            return "btn btn-primary black-tooltip";
        }
        else return "btn btn-primary black-tooltip disabled";
    }

    public getToolTipText(project: Project){
        if (project.ClientId != null && project.ClientId != undefined) {
            return "Client";
        }
        else return "Client not exist";
    }

    public getClassForToggleButton(){
        if (this.data != undefined && this.data != null) {
            return "btn btn-primary btn-toggle-in-modal";
        }
        else return "btn btn-primary btn-toggle";
    }
}
