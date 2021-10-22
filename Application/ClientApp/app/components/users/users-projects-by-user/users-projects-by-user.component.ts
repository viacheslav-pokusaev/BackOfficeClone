import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserStorageService } from '../../../services/user-storage.service';

@Component({
    selector: 'users-projects-by-user',
    templateUrl: './users-projects-by-user.component.html',
    styleUrls: ['./users-projects-by-user.component.css']
})
export class UsersProjectsByUserComponent implements OnInit {

    userId: number;
    
    constructor(private userStorageService: UserStorageService,
        private route: ActivatedRoute,
        private router: Router) { }

    ngOnInit() { 
        this.route.params.subscribe(params => {
            this.userId = +params['id'];
        });
    }
}
