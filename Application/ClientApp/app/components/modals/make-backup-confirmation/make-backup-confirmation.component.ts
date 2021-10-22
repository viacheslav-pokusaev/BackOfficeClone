import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'make-backup-confirmation',
    templateUrl: './make-backup-confirmation.component.html',
    styleUrls: ['./make-backup-confirmation.component.css']
})

export class MakeBackupConfirmationComponent {
    constructor( private dialogRef: MatDialogRef<MakeBackupConfirmationComponent>) { }

    @HostListener('window:keyup', ['$event'])
    keyEvent(event: KeyboardEvent) {
      
      if (event.keyCode === 13) {
          this.yes();
      }
  
      if (event.keyCode === 27) {
          this.no();
      }
    }

    public yes() {
        this.dialogRef.close(true);
    }

    public no() {
        this.dialogRef.close(false);
    }
}
