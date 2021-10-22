import { Component, OnInit, Input } from '@angular/core';
import { BaseQueryModel } from '../../models/query-models/base-query.model';
import { Subject, Subscription } from 'rxjs';

@Component({
    selector: 'table-buttons',
    templateUrl: './table-buttons.component.html',
    styleUrls: ['./table-buttons.component.css']
})
export class TableButtonsComponent implements OnInit {

    counts: Array<number> = [10, 20, 50, 100];

    pageNumbers: Array<number> = [1,2,3,4,5];

    count: number = 10;

    pageNumber: number = 1;

    subscription: Subscription;
    
    model: BaseQueryModel<any>;

    indexStart: number = 0;

    indexFinish: number = 2;


    constructor() { }

    ngOnInit(): void {
        if (this.array != null && this.array != undefined) {
            this.count = this.array[0];
            this.counts = this.array;
        }
        this.subscription = this.subject.asObservable().subscribe(response => {
            if (response.from == "component"){
                this.model = response.response as BaseQueryModel<any>;
                this.recountTotalPageCount();
            }
        });
    }

    @Input('subject') subject: Subject<any>;
    @Input('array') array: Array<number>;

    goToPage(pageNumber: number){
        if (pageNumber != -1 && pageNumber != this.pageNumbers.length + 1){
            this.pageNumber = pageNumber;
            this.model.Take = this.count;
            this.model.Skip = this.count*(this.pageNumber - 1);
            this.indexStart = pageNumber - 2;
            this.indexFinish = pageNumber;
            this.subject.next({from: "tablebuttons", response: this.model}); 
            this.recountTotalPageCount();
        }
    }

    public select(count: number){
        this.count = count;
        this.pageNumber = 1;
        this.model.Take = this.count;
        this.model.Skip = 0;
        this.subject.next({from: "tablebuttons", response: this.model});
        this.recountTotalPageCount();
    }

    public recountTotalPageCount() {
        this.pageNumbers = new Array<number>();
        let totalPageCount = this.model.TotalCount/this.count + 1;
        for (let index = 1; index <= totalPageCount; index++) {
            this.pageNumbers.push(index);
        }
    }

    public getClass(pageNumber: number) {
        if (pageNumber == this.pageNumber) {
            return "pageNumber btn btn-primary black-tooltip";
        }
        else return "pageNumber btn btn-default black-tooltip";
    }

    public getClassForPreveous() {
        if (this.pageNumber == 1) {
            return "pageNumber btn btn-default disabled black-tooltip";
        }
        else {
            return "pageNumber btn btn-default black-tooltip"
        }
    }

    public getClassForNext() {
        if (this.pageNumber == this.pageNumbers.length) {
            return "pageNumber btn btn-default disabled black-tooltip";
        }
        else {
            return "pageNumber btn btn-default black-tooltip";
        }
    }

    public getEnd() {
        return Math.min(this.model.Skip + this.model.Take, this.model.TotalCount);
    }
}
