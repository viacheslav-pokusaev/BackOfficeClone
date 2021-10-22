import { Component, Inject } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
    selector: 'notification-no-vacation',
    templateUrl: './notification-no-vacation.component.html'
})
export class NotificationNoVacationComponent {

    constructor(
        private dialogRef: MatDialogRef<NotificationNoVacationComponent>,
        @Inject(MAT_DIALOG_DATA) data) {
    }

    public close() {
        this.dialogRef.close(false);
    }
}
