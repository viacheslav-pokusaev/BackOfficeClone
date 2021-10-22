import { Component, OnInit, HostListener, Inject } from '@angular/core';
import { ContactPerson } from '../../../models/contact-person.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ClientsEditComponent } from '../clients-edit/clients-edit.component';
import { ClientsService } from '../../../services/clients.service';

@Component({
    selector: 'contact-person-edit',
    templateUrl: './contact-person-edit.component.html',
    styleUrls: ['./contact-person-edit.component.css']
})
export class ContactPersonEditComponent implements OnInit {

    contactPerson: ContactPerson;

    @HostListener('window:keyup', ['$event'])
    keyEvent(event: KeyboardEvent) {
      
      if (event.keyCode === 13) {
          this.updateContactPerson();
      }
  
      if (event.keyCode === 27) {
          this.cancel();
      }
    }

    constructor(private clientService: ClientsService,
        public dialogRef: MatDialogRef<ContactPersonEditComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit(): void {
        this.contactPerson = this.data.contactPerson;
     }

        cancel() {
        this.dialogRef.close();
    }

    updateContactPerson() {
        this.clientService.updateContactPerson(this.contactPerson).subscribe(response => {
            this.dialogRef.close();
        })
    }

}
