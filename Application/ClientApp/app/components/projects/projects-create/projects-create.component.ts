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
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { ProjectsEmploeesComponent } from '../projects-emploees/projects-emploees.component';
import { ClientsCreateComponent } from '../../clients/clients-create/clients-create.component';
import { ProjectQueryModel } from '../../../models/query-models/project-query.model';

@Component({
    selector: 'projects-create',
    templateUrl: './projects-create.component.html',
    styleUrls: ['./projects-create.component.css']
})
export class ProjectsCreateComponent implements OnInit {

    project: Project = new Project();

    private id: number;

    clients: Array<Client> = new Array<Client>();

    users: Array<User> = new Array<User>();

    selectedUsers: Array<UserProfileProject> = new Array<UserProfileProject>();

    isSelected: Array<boolean>;

    minDateBeginDate: Date;

    projectName: string;

    isNameExist: boolean = true;

    projects: Array<Project>;

    projectId: number;

    newClient: Client;

    @HostListener('window:keyup', ['$event'])
    keyEvent(event: KeyboardEvent) {
      
      if (event.keyCode === 13) {
          this.createProject();
      }
  
      if (event.keyCode === 27) {
          this.cancel();
      }
    }

    constructor(private projectService: ProjectsService,
        private clientsService: ClientsService,
        private userStorageService: UserStorageService,
        private usersService: UsersService,
        private location: Location,
        private route: ActivatedRoute,
        public dialogRef: MatDialogRef<ProjectsCreateComponent>,
        private dialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit() { 
        let queryModelClients = new ClientQueryModel();
        this.clientsService.get(queryModelClients).subscribe(resp =>{
            this.clients = resp.Result;
        })
        let queryModel = new ProjectQueryModel();
        queryModel.UserId = this.userStorageService.getId();
        this.projectService.get(queryModel).subscribe(response => {
            this.projects = response.Result;
        })
        this.project.ClientId = this.data.clientId;
        this.minDateBeginDate = new Date();
        this.minDateBeginDate.setUTCFullYear(2018);
    }

    public createProject() {
        if (this.project.Name == null || this.project.Name == undefined || this.project.Name == ""){
            this.isNameExist = false;
        }
        else {
            if (this.project.DateBegin != undefined) {
                this.project.DateBegin.setMinutes(this.project.DateBegin.getMinutes() - this.project.DateBegin.getTimezoneOffset());
                this.project.DateBegin = new Date(Date.parse(this.project.DateBegin.toString()));
            }
            if (this.project.DateEnd != undefined){
                this.project.DateEnd = new Date(Date.parse(this.project.DateEnd.toString()));
                this.project.DateEnd.setMinutes(this.project.DateEnd.getMinutes() - this.project.DateEnd.getTimezoneOffset());
            }
            this.project.Client = this.newClient;
            this.projectService.create(this.project).subscribe(response => {
                if (this.dialogRef != null && this.dialogRef != undefined) this.dialogRef.close(this.project);
            })
        }
    }

    public createNewClient() {
        const dialogRef = this.dialog.open(ClientsCreateComponent, {
            width: '1050px',
            data: {fromClientPage: false}
          });

          dialogRef.afterClosed().subscribe(result => {
            this.newClient = result as Client;
        });
    }

    public updateProject(){
        this.projectService.getById(this.projectId).subscribe(response => {
            let proj = response;
            proj.ClientId = this.data.clientId;
            this.projectService.update(proj).subscribe(response => {
                if (this.dialogRef != null && this.dialogRef != undefined) this.dialogRef.close();
            })
        })
    }

    public cancel() {
        if (this.dialogRef != null && this.dialogRef != undefined) this.dialogRef.close();
    }
}
