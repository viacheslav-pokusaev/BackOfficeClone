import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { User } from '../../../models/user.model';
import { ListVacation } from '../../../models/list-vacation.model';
import { UsersService } from '../../../services/users.service';
import { UserStorageService } from '../../../services/user-storage.service';
import { Subscription } from 'rxjs';
import { SPINNER_ANIMATIONS, SPINNER_PLACEMENT, ISpinnerConfig } from '@hardpool/ngx-spinner';

@Component({
    selector: 'user-info',
    templateUrl: './users-info.component.html',
    styleUrls: ['./users-info.component.css']
})
export class UsersInfoComponent implements OnInit {
    id: number;
    user: User = new User();
    status: string;
    listVacation: Array<ListVacation>;
    countVacationDay: number;
    countVacationDayInfo: string = '';
    countBorrowedDayInfo: string = '';
    subscription: Subscription;
    loading = false;
    indexOfCurrentTab: number = 1;
    

    spinnerConfig: ISpinnerConfig;
    currentUserId: number;
    userSubscription: Subscription;

    constructor(
        private usersService: UsersService,
        private route: ActivatedRoute,
        private location: Location,
        private router: Router,
        private userStorageService: UserStorageService      
    ) {        
        this.router.routeReuseStrategy.shouldReuseRoute = function() {
            return false;
        };
    }    

    ngOnInit() {
        this.spinnerConfig = {
            placement: SPINNER_PLACEMENT.block_ui,
            animation: SPINNER_ANIMATIONS.spin_3,
            size: "3rem",
            color: "#1574b3"
        };
        this.route.params.subscribe(params => {
            this.loading = true;
            if (+params['id'] == 0) {
                this.currentUserId = this.userStorageService.getId();
                this.router.navigateByUrl('/users/'+this.currentUserId+'/info');
            }
            else{
                this.currentUserId = +params['id'];
            }
            if (this.userStorageService.getId() == this.currentUserId) {
                this.user = this.userStorageService.getUser();
                this.user.DateBirthday = new Date(Date.parse(this.user.DateBirthday.toString()));
                this.user.DateBeginWork = this.user.DateBeginWork != null ? new Date(Date.parse(this.user.DateBeginWork.toString())) : null;
                this.user.DateBeginTrialWork = this.user.DateBeginTrialWork != null ? new Date(Date.parse(this.user.DateBeginTrialWork.toString())) : null;
                this.countVacationDay = this.userStorageService.getUser().CountAvailableVacationDay;
                this.getInfoAboutFreeVacationDays(this.countVacationDay);
                this.loading = false;
            }
            else {
                this.usersService.getById(this.currentUserId).subscribe(response => {
                    this.user = response;
                    this.user.DateBirthday = new Date(Date.parse(this.user.DateBirthday.toString()));
                    this.user.DateBeginWork = this.user.DateBeginWork != null ? new Date(Date.parse(this.user.DateBeginWork.toString())) : null;
                    this.user.DateBeginTrialWork = this.user.DateBeginTrialWork != null ? new Date(Date.parse(this.user.DateBeginTrialWork.toString())) : null;
                    this.countVacationDay = response.CountAvailableVacationDay;
                    this.getInfoAboutFreeVacationDays(this.countVacationDay);
                    this.loading = false;
                });
            }
        });

        
        this.subscription = this.usersService.getVacDays().subscribe(response => { 
            this.countVacationDay -= response.count; 
            this.getInfoAboutFreeVacationDays(this.countVacationDay);
        });  
    }

    public signOut() {
        this.usersService.signOut().subscribe(response => {
            let resp = response;
            this.router.navigate([""]).then(result => {
                document.location.href = document.baseURI;
            });
        });
    }


    public settings() {
        let currentUserId = this.userStorageService.getId();
        this.router.navigateByUrl('/users/'+this.currentUserId+'/edit');
    }

    public getInfoAboutFreeVacationDays(count: number) {
        let res = '';
        if (count < 0) {
            res+='(';
            res+=(count*(-1)).toString();
            res+=' - overspending)';
            this.countVacationDayInfo = '0';
            this.countBorrowedDayInfo = res;
        }
        else {
            this.countVacationDayInfo = count.toString(); 
            this.countBorrowedDayInfo = '';
        }
    }

    public setCurrentTab(i: number){
        this.indexOfCurrentTab = i;
    }
}
