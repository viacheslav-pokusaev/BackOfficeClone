import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { WorkActivityService } from '../../../services/work-activity.service';
import { HttpClient } from '@angular/common/http';

@Component({
    templateUrl: './month-activity.component.html',
    styleUrls: ['./month-activity.component.css']
})

export class MonthActivityComponent implements OnInit {
    

   

    constructor(
        private workActivityService: WorkActivityService,
        private location: Location,
        private router: Router,
        private http: HttpClient
    ) {
        
    };

   

    ngOnInit(): void {

        this.http.get('/api/vacations-table/all').subscribe();
       
    }

   
}
