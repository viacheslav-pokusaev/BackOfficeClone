import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuditTrailEntity } from '../../models/audit-trail-entity.model';

@Component({
    selector: 'audit-trail-details',
    templateUrl: './audit-trail-details.component.html',
    styleUrls: ['./audit-trail-details.component.css']
})
export class AuditTrailDetailsComponent implements OnInit {

    @HostListener('window:keyup', ['$event'])
    keyEvent(event: KeyboardEvent) {
      
      if (event.keyCode === 13) {
        this.cancel();
      }
  
      if (event.keyCode === 27) {
          this.cancel();
      }
    }

    auditTrailEntity: AuditTrailEntity;

    constructor(public dialogRef: MatDialogRef<AuditTrailDetailsComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit(): void {
        this.auditTrailEntity = this.data.auditTrailEntity as AuditTrailEntity;
     }

    public cancel() {
        if (this.dialogRef != null && this.dialogRef != undefined) this.dialogRef.close();
    }
}
