import { Component, OnInit, HostListener, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ContactPerson } from '../../../models/contact-person.model';
import { ClientsService } from '../../../services/clients.service';

@Component({
    selector: 'contact-person-create',
    templateUrl: './contact-person-create.component.html',
    styleUrls: ['./contact-person-create.component.css']
})
export class ContactPersonCreateComponent implements OnInit {
    constructor(public dialogRef: MatDialogRef<ContactPersonCreateComponent>,
        private clientsService: ClientsService,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    contactPerson: ContactPerson;

    @HostListener('window:keyup', ['$event'])
    keyEvent(event: KeyboardEvent) {
      
      if (event.keyCode === 13) {
          this.createContactPerson();
      }
  
      if (event.keyCode === 27) {
          this.cancel();
      }
    }

    cancel() {
        this.dialogRef.close();
    }

    createContactPerson(){
        this.clientsService.createContactPerson(this.contactPerson).subscribe(response => {
            this.dialogRef.close();
        })
    }

    ngOnInit(): void {
        this.contactPerson  = new ContactPerson();
        
        this.contactPerson.ClientId = this.data.clientId;
     }
}
