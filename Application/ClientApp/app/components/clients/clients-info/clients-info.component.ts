import { Component, OnInit, Input, Inject, HostListener } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material';
import { ClientsService } from '../../../services/clients.service';
import { Client } from '../../../models/client.model';
import { ContactPersonCreateComponent } from '../contact-person-create/contact-person-create.component';
import { ContactPerson } from '../../../models/contact-person.model';
import { ContactPersonEditComponent } from '../contact-person-edit/contact-person-edit.component';
import { DeleteConfirmationComponent } from '../../modals/delete-confirmation/delete-confirmation.component';

@Component({
    selector: 'clients-info',
    templateUrl: './clients-info.component.html',
    styleUrls: ['./clients-info.component.css']
})
export class ClientsInfoComponent implements OnInit {

    clientId: number;

    client: Client;

    fullName: string;

    constructor(public dialogRef: MatDialogRef<ClientsInfoComponent>,
        private clientsService: ClientsService,
        private dialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit(): void {
        this.clientId = this.data.clientId;
        this.clientsService.getById(this.clientId).subscribe(response => {
            this.client = response;
        })
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

    public createContactPerson(){
        const dialogRef = this.dialog.open(ContactPersonCreateComponent, {
            width: '800px',
            data: { clientId : this.clientId }
          });

          dialogRef.afterClosed().subscribe(result => {
            this.clientsService.getById(this.clientId).subscribe(response => {
                this.client = response;
            })
            });
    }

    public updateContactPerson(contactPerson: ContactPerson){
        const dialogRef = this.dialog.open(ContactPersonEditComponent, {
            width: '800px',
            data: { contactPerson : contactPerson }
          });

          dialogRef.afterClosed().subscribe(result => {
            this.clientsService.getById(this.clientId).subscribe(response => {
                this.client = response;
            })
            });
    }

    public confirmDeleteDialog(contactPerson: ContactPerson) {

        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.position = { top: '0' };
        dialogConfig.autoFocus = false;

        this.dialog.open(DeleteConfirmationComponent, dialogConfig)
            .afterClosed().subscribe(dialogResult => {
                if (dialogResult)
                    this.deleteContactPerson(contactPerson.Id);
            });
    }

    public deleteContactPerson(id: number){
        this.clientsService.deleteContactPerson(id).subscribe(response => {
            this.clientsService.getById(this.clientId).subscribe(response => {
                this.client = response;
            })
        });
    }
}
