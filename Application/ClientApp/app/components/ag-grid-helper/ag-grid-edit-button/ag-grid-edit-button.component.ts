import { Component, Input, Output, EventEmitter } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular/main";
import { Router } from '@angular/router';

@Component({
    selector: 'user-edit-clickable',
    template: ` 
        <a (click)="click()" class="btn btn-primary">
            Edit
        </a>
        `
})

export class AgGridEditButton implements ICellRendererAngularComp {
    private params: any;
    public cell: any;
    refresh: any;
    id: number;
    url: string;
    @Output() onClicked = new EventEmitter<boolean>();

    constructor(private parentRouter: Router) {
    }

    agInit(params: any): void {
        if (params.value != undefined) {
            this.params = params;
            this.id = params.value;
        }
        if (params.url != undefined) {
            this.url = params.url;
        }
    }

    click(): void {
        this.parentRouter.navigate([this.url + this.id + '/edit']);
    }

}