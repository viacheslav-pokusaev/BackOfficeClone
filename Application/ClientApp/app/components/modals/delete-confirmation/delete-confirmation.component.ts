import { Component, Inject, HostListener } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
    selector: 'delete-confirmation',
    templateUrl: './delete-confirmation.component.html',
})
export class DeleteConfirmationComponent {

    constructor(
        private dialogRef: MatDialogRef<DeleteConfirmationComponent>,
        @Inject(MAT_DIALOG_DATA) data) {
    }

    @HostListener('window:keyup', ['$event'])
    keyEvent(event: KeyboardEvent) {
      
      if (event.keyCode === 13) {
          this.confirm();
      }
  
      if (event.keyCode === 27) {
          this.cancel();
      }
    }

    public confirm() {
        this.dialogRef.close(true);
    }

    public cancel() {
        this.dialogRef.close(false);
    }
}
