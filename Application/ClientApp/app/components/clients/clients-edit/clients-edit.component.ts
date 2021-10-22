import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { Client } from '../../../models/client.model';
import { ClientsService } from '../../../services/clients.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'clients-edit',
    templateUrl: './clients-edit.component.html',
    styleUrls: ['./clients-edit.component.css']
})
export class ClientsEditComponent implements OnInit {

    client: Client;

    private id: number;
    
    @HostListener('window:keyup', ['$event'])
    keyEvent(event: KeyboardEvent) {
      console.log(event);
      
      if (event.keyCode === 13) {
          this.updateClient();
      }
  
      if (event.keyCode === 27) {
          this.cancel();
      }
    }

    constructor(private clientService: ClientsService,
        private location: Location,
        private route: ActivatedRoute,
        public dialogRef: MatDialogRef<ClientsEditComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit() { 
        this.id = this.data.clientId;
            this.clientService.getById(this.id).subscribe(response => {
                this.client = response;
            });
    }

    public updateClient() {
        this.clientService.update(this.client).subscribe(response => {
            if (this.dialogRef != null && this.dialogRef != undefined) this.dialogRef.close();
        })
    }

    public cancel() {
        if (this.dialogRef != null && this.dialogRef != undefined) this.dialogRef.close();
    }
}
