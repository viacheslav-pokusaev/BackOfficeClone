import { Component, OnInit, Input } from '@angular/core';
import { ISpinnerConfig } from '@hardpool/ngx-spinner';
import { WorkAtHome } from '../../../../models/work-at-home.model';
import { User } from '../../../../models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UserStorageService } from '../../../../services/user-storage.service';
import { SickDayService } from '../../../../services/sick-day.service';
import { UsersService } from '../../../../services/users.service';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { WorkAtHomeQueryModel } from '../../../../models/query-models/work-at-home-query.model';
import { WorkAtHomeService } from '../../../../services/work-at-home.service';
import { UserQueryModel } from '../../../../models/query-models/user-query.model';
import { Location } from '@angular/common';
import { Subject, Subscription } from 'rxjs';
import { DeleteConfirmationComponent } from '../../../modals/delete-confirmation/delete-confirmation.component';
import { SPINNER_CONFIG } from '../../../../constants/constants';

@Component({
    selector: 'user-work-at-home',
    templateUrl: './work-at-home-user-list.component.html',
    styleUrls: ['./work-at-home-user-list.component.css']
})
export class WorkAtHomeUserListComponent implements OnInit {
  
    workAtHome: Array<WorkAtHome> = new Array<WorkAtHome>();
    newWorkAtHome: WorkAtHome = new WorkAtHome();
    users: Array<User> = new Array<User>();
    id: number;
    status: string;
    isAdmin: boolean;
    isUser: boolean;
    isMyPage: boolean;
    isAddVisible: boolean;
    selectedUser = new User();
    isBeginDateIncorrect = false;
    isEndDateIncorrect = false;
    submitAttempt: boolean;
    loading = false;
    editText: string = 'Edit'
    editId: number = -1;
    isAtHome: boolean;
    queryModel: WorkAtHomeQueryModel;
    subject: Subject<any>;
    subscription: Subscription;

    @Input('userId') userId: number;

    spinnerConfig: ISpinnerConfig = SPINNER_CONFIG;  
  
    constructor(        
        private route: ActivatedRoute,
        private userStorageService: UserStorageService,
        private workAtHomeService: WorkAtHomeService,
        private usersService: UsersService,
        private fBuilder: FormBuilder,
        private dialog: MatDialog,
        private location: Location,
        private router: Router) { }

    ngOnInit() {
        this.subject = new Subject<any>();

        let thisDay = new Date();
        this.isAddVisible = false;
        this.isAdmin = this.userStorageService.hasRole('Admin');
        this.isUser = this.userStorageService.hasRole('User');
        this.id = this.userId;
        this.queryModel = new WorkAtHomeQueryModel();
        if (this.id != null) this.queryModel.UserId = this.id;
        this.loading = true;
        this.isAtHome = false;
            this.workAtHomeService.get(this.queryModel).subscribe(response => {
                this.workAtHome = response.Result;
                this.subject.next({from: "component", response: response});
                this.workAtHome.forEach((value, index, array) => {
                    value.Date = new Date(Date.parse(value.Date.toString()));
                    if (value.Date.getFullYear() == thisDay.getFullYear() && value.Date.getMonth() == thisDay.getMonth()&&value.Date.getDay() == thisDay.getDay()){
                        this.isAtHome = true;
                    }
                });
                this.loading = false;
            });
            this.usersService.get(new UserQueryModel()).subscribe(response => {
            this.users = response.Result;
            }); 

            this.subscription = this.subject.asObservable().subscribe(response => {
                if (response.from == "tablebuttons") {
                    this.queryModel = response.response as WorkAtHomeQueryModel;
                    if (this.id != null) this.queryModel.UserId = this.id;
                    this.loading = true;
                    this.loading = true;
                    this.isAtHome = false;
                        this.workAtHomeService.get(this.queryModel).subscribe(response => {
                            this.workAtHome = response.Result;
                            this.workAtHome.forEach((value, index, array) => {
                                value.Date = new Date(Date.parse(value.Date.toString()));
                                if (value.Date.getFullYear() == thisDay.getFullYear() && value.Date.getMonth() == thisDay.getMonth()&&value.Date.getDay() == thisDay.getDay()){
                                    this.isAtHome = true;
                                }
                            });
                            this.loading = false;
                        });
                        this.usersService.get(new UserQueryModel()).subscribe(response => {
                        this.users = response.Result;
                        });
                }
            });
        this.isMyPage = (this.id == this.userStorageService.getId() || this.isAdmin);
     }

     delete(id, index){
        this.isAtHome = false;
        this.workAtHomeService.delete(id).subscribe(result => {
            this.workAtHome.splice(index, 1);
            let thisDay = new Date();
            this.workAtHome.forEach((value, index, array) => {
                value.Date = new Date(Date.parse(value.Date.toString()));
                if (value.Date.getFullYear() == thisDay.getFullYear() && value.Date.getMonth() == thisDay.getMonth()&&value.Date.getDay() == thisDay.getDay()){
                    this.isAtHome = true;
                }
            });
        })
     }

     public confirmDeleteDialog(id, index) {

        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.position = { top: '0' };
        dialogConfig.autoFocus = false;

        this.dialog.open(DeleteConfirmationComponent, dialogConfig)
            .afterClosed().subscribe(dialogResult => {
                if (dialogResult)
                    this.delete(id, index);
            });
    }

    public add() {
        this.newWorkAtHome.Date = new Date();
        this.newWorkAtHome.UserProfileId = this.id;
        this.newWorkAtHome.Comment = '';
        this.workAtHomeService.create(this.newWorkAtHome).subscribe((response) => {
            this.newWorkAtHome = response;
            this.subject.next({from: "component", response: response});
            if (this.newWorkAtHome.Id != 0) {
                this.isAtHome = true;
                this.queryModel = new WorkAtHomeQueryModel();
                this.queryModel.UserId = this.id;
                this.workAtHomeService.get(this.queryModel).subscribe(response => {
                    this.workAtHome = response.Result;
                    this.workAtHome.forEach((value, index, array) => {
                        value.Date = new Date(Date.parse(value.Date.toString()));
                    });
                });
                this.isAddVisible = false;
            }
        });
    }

    public edit(work: WorkAtHome) {
        if (this.editText == 'Edit') {
            this.editText = 'Save'
            this.editId = work.Id;
        } 
        else {
            this.editText = 'Edit';
            this.workAtHomeService.update(work).subscribe(response => {
                this.editId = -1;
            });
        }
    }

    public goBack() {
        this.location.back();
    }

    public goToUser(work: WorkAtHome){
        this.router.navigateByUrl('/users/'+work.UserProfileId+'/info')
    }
}
