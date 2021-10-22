import { Component, OnInit, HostListener, Inject } from '@angular/core';
import { AuditTrailEntity } from '../../models/audit-trail-entity.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'audit-trail-parent',
    templateUrl: './audit-trail-parent.component.html',
    styleUrls: ['./audit-trail-parent.component.css']
})
export class AuditTrailParentComponent implements OnInit {
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

    constructor(public dialogRef: MatDialogRef<AuditTrailParentComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    ngOnInit(): void {
        this.auditTrailEntity = this.data.auditTrailEntity as AuditTrailEntity;
     }

    public cancel() {
        if (this.dialogRef != null && this.dialogRef != undefined) this.dialogRef.close();
    }
}
