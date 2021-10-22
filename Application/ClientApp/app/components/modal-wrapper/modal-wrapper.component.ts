import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
    selector: 'modal-wrapper',
    templateUrl: './modal-wrapper.component.html',
    styleUrls: ['./modal-wrapper.component.css']
})
export class ModalWrapperComponent implements OnInit {
    constructor() { }

    @Input('dialogRef') dialogRef: MatDialogRef<any>

    ngOnInit(): void { }

    public click() {
        this.dialogRef.close();
    }
}
