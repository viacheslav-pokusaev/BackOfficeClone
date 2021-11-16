import { Component, OnInit } from '@angular/core';
import { WorkActivity } from '../../../models/work-activity.model';
import { WorkActivityService } from '../../../services/work-activity.service';
import { WorkActivityQueryModel } from '../../../models/query-models/work-activity-query.model';
import { ISpinnerConfig } from '@hardpool/ngx-spinner';
import { Location } from '@angular/common';
import { Subject, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { SPINNER_CONFIG } from '../../../constants/constants';

@Component({
    templateUrl: './workactivities-list.component.html',
    styleUrls: ['./workactivities-list.component.css']
})

export class WorkActivitiesListComponent implements OnInit{
    workActivity: Array<WorkActivity> = new Array<WorkActivity>();
    status: string;
    isMyPage: boolean;
    loading: boolean;
    queryModel: WorkActivityQueryModel;
    subject: Subject<any>;
    subscription: Subscription;

    spinnerConfig: ISpinnerConfig = SPINNER_CONFIG;

    constructor(
        private workActivityService: WorkActivityService,
        private location: Location,
        private router: Router
    ) {
    };

    dateFormatter(params) {
        if(params.value)
            return new Date(params.value).toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
    }

    ngOnInit(): void {
        this.subject = new Subject<any>();
        this.queryModel = new WorkActivityQueryModel();
        this.queryModel.Take =  10;
        this.loading = true;
        this.workActivityService.get(this.queryModel).subscribe(response => {
            this.workActivity = response.Result;
            this.subject.next({from: "component", response: response});
            this.loading = false;
        })

        this.subscription = this.subject.asObservable().subscribe(response => {
            if (response.from == "tablebuttons") {             
                this.queryModel = response.response as WorkActivityQueryModel;
                this.loading = true;
                this.workActivityService.get(this.queryModel).subscribe(response => {
                    this.workActivity = response.Result;
                    this.loading = false;
                });
            }
        });
    }

    public goBack() {
        this.location.back();
    }

    public goToUser(workActivity: WorkActivity){
        this.router.navigateByUrl('/users/'+workActivity.UserProfileId+'/info')
    }
}
