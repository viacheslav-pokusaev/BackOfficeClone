import { Component, OnInit } from '@angular/core';
import { Client } from '../../../models/client.model';
import { ClientsService } from '../../../services/clients.service';
import { ClientQueryModel } from '../../../models/query-models/client-query.model';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { SPINNER_ANIMATIONS, SPINNER_PLACEMENT, ISpinnerConfig } from '@hardpool/ngx-spinner';
import { UserStorageService } from '../../../services/user-storage.service';
import { ClientsEditComponent } from '../clients-edit/clients-edit.component';
import { DeleteConfirmationComponent } from '../../modals/delete-confirmation/delete-confirmation.component';
import { Subject, Subscription } from 'rxjs';
import { ClientsCreateComponent } from '../clients-create/clients-create.component';
import { ClientsInfoComponent } from '../clients-info/clients-info.component';
import { ProjectsListComponent } from '../../projects/projects-list/projects-list.component';
import { ProjectsCreateComponent } from '../../projects/projects-create/projects-create.component';

@Component({
    selector: 'clients-list',
    templateUrl: './clients-list.component.html',
    styleUrls: ['./clients-list.component.css']
})
export class ClientsListComponent implements OnInit {

    newClient: Client = new Client();

    clients: Array<Client> = new Array<Client>();

    newClientForm: FormGroup;

    loading = false;

    status: string;

    queryModel: ClientQueryModel;

    subject: Subject<any>;

    subscription: Subscription;

    public phoneNumberMask = ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];

    spinnerConfig: ISpinnerConfig = {
        placement: SPINNER_PLACEMENT.block_ui,
        animation: SPINNER_ANIMATIONS.spin_3,
        size: "3rem",
        color: "#1574b3"
    };

    constructor(private clientsService: ClientsService,
        private userStorageService: UserStorageService,
        private route: ActivatedRoute,
        private fBuilder: FormBuilder,
        private dialog: MatDialog,
        private location: Location) { }

    ngOnInit() { 
        this.subject = new Subject<any>();
        this.queryModel = new ClientQueryModel();
        this.queryModel.Take =  10;
        this.loading = true;
        this.clientsService.get(this.queryModel).subscribe(response => {
            this.clients = response.Result;
            this.subject.next({from: "component", response: response});
            this.loading = false;
        })

        this.subscription = this.subject.asObservable().subscribe(response => {
            if (response.from == "tablebuttons"){
                this.queryModel = response.response as ClientQueryModel;
                this.loading = true;
                this.clientsService.get(this.queryModel).subscribe(response => {
                    this.clients = response.Result;
                    this.loading = false;
                })
            }
        });


        this.initForm();
    }

    initForm() {
        this.newClientForm = this.fBuilder.group({
            Organization: ['', [
                Validators.required
            ]],
            FirstName: ['', [

            ]],
            LastName: ['', [

            ]],
            CommunicationChannel: ['', [

            ]],
            Email: ['', [
                Validators.pattern(/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/),
            ]],
            Phone: ['', [
                
            ]],
            Description: ['']
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

    delete(index: number, indexOnArray: number) {
        this.clientsService.delete(index).subscribe((result) => {
            this.loading = true;
            this.clientsService.get(this.queryModel).subscribe(response => {
            this.clients = response.Result;
            this.loading = false;
            this.status = "Deleted";
        })
        })
    }


    public editClientDialog(client: Client, i: number) {
        const dialogRef = this.dialog.open(ClientsEditComponent, {
            width: '800px',
            data: {clientId: client.Id}
          });

        dialogRef.afterClosed().subscribe(result => {
        this.clientsService.get(this.queryModel).subscribe(response => {
            this.clients = response.Result;
            // this.subject.next(response);
        })
        this.initForm();
        });
    }

    public createClientDialog() {
        const dialogRef = this.dialog.open(ClientsCreateComponent, {
            width: '800px',
            data: {fromClientPage: true}
          });

          dialogRef.afterClosed().subscribe(result => {
            this.clientsService.get(this.queryModel).subscribe(response => {
                this.clients = response.Result;
                // this.subject.next(response);
            })
            this.initForm();
            });
    }

    public showClientInfoDialog(client: Client){
        const dialogRef = this.dialog.open(ClientsInfoComponent, {
            width: '800px',
            data: {clientId: client.Id, fullInfo: false}
          });
    }

    public showProjectsDialog(client: Client){
        const dialogRef = this.dialog.open(ProjectsListComponent, {
            width: '1400px',
            data: {clientId: client.Id, fullInfo: false}
          });

          dialogRef.afterClosed().subscribe(result => {
            this.clientsService.get(this.queryModel).subscribe(response => {
                this.clients = response.Result;
                // this.subject.next(response);
            })
            this.initForm();
            });
    }

    public addProjectDialog(client: Client){
        const dialogRef = this.dialog.open(ProjectsCreateComponent, {
            width: '800px',
            data: {fromProjectPage: false, clientId : client.Id }
          });

          dialogRef.afterClosed().subscribe(result => {
            this.clientsService.get(this.queryModel).subscribe(response => {
                this.clients = response.Result;
            })
            this.initForm();
            });
    }

    public goBack() {
        this.location.back();
    }
}
 