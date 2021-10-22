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
import { ProjectsEmploeesComponent } from '../projects-emploees/projects-emploees.component';

@Component({
    selector: 'projects-edit',
    templateUrl: './projects-edit.component.html',
    styleUrls: ['./projects-edit.component.css']
})
export class ProjectsEditComponent implements OnInit {

    project: Project;

    private id: number;

    clients: Array<Client> = new Array<Client>();

    users: Array<User> = new Array<User>();

    selectedUsers: Array<UserProfileProject> = new Array<UserProfileProject>();

    isSelected: Array<boolean>;

    minDateBeginDate: Date;

    projectName: string;

    constructor(private projectService: ProjectsService,
        private clientsService: ClientsService,
        private userStorageService: UserStorageService,
        private usersService: UsersService,
        private location: Location,
        private route: ActivatedRoute,
        public dialogRef: MatDialogRef<ProjectsEditComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    @HostListener('window:keyup', ['$event'])
    keyEvent(event: KeyboardEvent) {
      
      if (event.keyCode === 13) {
          this.updateProject();
      }
  
      if (event.keyCode === 27) {
          this.cancel();
      }
    }    

    ngOnInit() { 
        this.id = this.data.projectId;
        this.projectName = this.data.projectName;
            this.projectService.getById(this.id).subscribe(response => {
                this.project = response;
                if (this.project.DateBegin) {
                    this.project.DateBegin = new Date(Date.parse(this.project.DateBegin.toString()));
                    this.project.DateBegin = (this.project.DateBegin.getUTCFullYear() > 2010) ? this.project.DateBegin : null;
                }
                if (this.project.DateEnd) {
                    this.project.DateEnd = new Date(Date.parse(this.project.DateEnd.toString()));
                    this.project.DateEnd = (this.project.DateEnd.getUTCFullYear() > 2010) ? this.project.DateEnd : null;
                }
                this.selectedUsers = this.project.Emploees;
                let queryModelClients = new ClientQueryModel();
            this.clientsService.get(queryModelClients).subscribe(resp =>{
                this.clients = resp.Result;
            })
            });
        this.minDateBeginDate = new Date();
        this.minDateBeginDate.setUTCFullYear(2018);
    }

    public updateProject() {
        if (this.project.DateBegin != undefined) {
            this.project.DateBegin = new Date(Date.parse(this.project.DateBegin.toString()));
            this.project.DateBegin.setMinutes(this.project.DateBegin.getMinutes() - this.project.DateBegin.getTimezoneOffset());
        }
        if (this.project.DateEnd != undefined) {
            this.project.DateEnd = new Date(Date.parse(this.project.DateEnd.toString()));
            this.project.DateEnd.setMinutes(this.project.DateEnd.getMinutes() - this.project.DateEnd.getTimezoneOffset());
        }
        this.projectService.update(this.project).subscribe(response => {
            if (this.dialogRef != null && this.dialogRef != undefined) this.dialogRef.close();
        })
    }

    public cancel() {
        if (this.dialogRef != null && this.dialogRef != undefined) this.dialogRef.close();
    }
}
