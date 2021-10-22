import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { Client } from '../../../models/client.model';
import { ClientsService } from '../../../services/clients.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { ProjectsService } from '../../../services/projects.service';
import { ProjectQueryModel } from '../../../models/query-models/project-query.model';
import { Project } from '../../../models/project.model';
import { ProjectsCreateComponent } from '../../projects/projects-create/projects-create.component';
import { UserStorageService } from '../../../services/user-storage.service';

@Component({
    selector: 'clients-create',
    templateUrl: './clients-create.component.html',
    styleUrls: ['./clients-create.component.css']
})                        
export class ClientsCreateComponent implements OnInit {

    client: Client = new Client();

    projects: Array<Project> = new Array<Project>();

    private id: number;

    isOrganizationExist: boolean = true;

    newProject: Project;

    @HostListener('window:keyup', ['$event'])
    keyEvent(event: KeyboardEvent) {
      
      if (event.keyCode === 13) {
          this.createClient();
      }
  
      if (event.keyCode === 27) {
          this.cancel();
      }
    }

    constructor(private clientsService: ClientsService,
        private projectsService: ProjectsService,
        private location: Location,
        private route: ActivatedRoute,
        private dialog: MatDialog,
        private userStorageService: UserStorageService,
        public dialogRef: MatDialogRef<ClientsCreateComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit() { 
        let queryModel = new ProjectQueryModel();
        queryModel.UserId = this.userStorageService.getId();
        this.projectsService.get(queryModel).subscribe(response => {
            this.projects = response.Result;
        })
    }

    public createClient() {
        if (this.client.OrganizationName == null || this.client.OrganizationName == undefined || this.client.OrganizationName == '') {
            this.isOrganizationExist = false;
        }
        else {
            this.client.Project = this.newProject;
            this.clientsService.create(this.client).subscribe(response => {
                if (this.dialogRef != null && this.dialogRef != undefined) this.dialogRef.close(this.client);
            })
        }
    }

    public cancel() {
        if (this.dialogRef != null && this.dialogRef != undefined) this.dialogRef.close();
    }

    public createNewProject() {
        const dialogRef2 = this.dialog.open(ProjectsCreateComponent, {
            width: '1050px',
            data: {fromProjectPage: false}
          });

          dialogRef2.afterClosed().subscribe(result => {
            this.newProject = result as Project;
          })
    }
}
