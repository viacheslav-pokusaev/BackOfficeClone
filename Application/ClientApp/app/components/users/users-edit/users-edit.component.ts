import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { UserStorageService } from '../../../services/user-storage.service';
import { User } from '../../../models/user.model';
import { UsersService } from '../../../services/users.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { UsersAvatarSelectModalComponent } from '../users-avatar-select-modal/users-avatar-select-modal.component';
import { ISpinnerConfig } from '@hardpool/ngx-spinner';
import { DateRangePickerDirective } from 'angular2-daterangepicker';
import * as moment from 'moment';
import { SPINNER_CONFIG } from '../../../constants/constants';

@Component({
    templateUrl: './users-edit.component.html',
    styleUrls: ['./users-edit.component.css']
})

export class UsersEditComponent implements OnInit{
    isAdmin: boolean;
    dateBegin: Date;
    dateBirthday: Date;
    id: any;
    user: User = new User();
    status: string;
    titleStatus: string;
    roles: Array<string> = [];
    public phoneNumberMask = ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];
    public birthdayMin = new Date(new Date().getUTCFullYear() - 60, 0, 1);
    public birthdayMax = new Date(new Date().getUTCFullYear() - 18, 0, 1);
    public beginWorkMin = new Date(2015, 0, 1);//Start date of the company
    public beginWorkMax = new Date();
    public userForm: FormGroup;
    loading = false;
    imageWasLoad: boolean = false;

    spinnerConfig: ISpinnerConfig;

    constructor(
        private usersService: UsersService,
        private location: Location,
        private route: ActivatedRoute,
        private userStorageService: UserStorageService,
        private fBuilder: FormBuilder,
        private router: Router,
        private dialog: MatDialog,
    ){}

    ngOnInit() {  
        this.spinnerConfig = SPINNER_CONFIG;
        this.loading = true;    
        this.initForm();
        this.route.params.subscribe(params => {
            this.titleStatus = "Update Info";
            this.id = +params['id'];
            this.usersService.getById(this.id).subscribe(response => {
                this.user = response;
                this.roles = this.addRoles();
                this.loading = false;
            });   
        });
        this.isAdmin = this.userStorageService.hasRole('Admin');
    }

    initForm() {
        this.userForm = this.fBuilder.group({
            Phone: ['', [
                Validators.required
            ]],
            Email: ['', [
                Validators.required, Validators.pattern(/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/),
            ]],
            FirstName: ['', [
                Validators.required, Validators.minLength(2)
            ]],
            LastName: ['', [
                Validators.required, Validators.minLength(2)
            ]],
            DateBeginWork: [],
            DateBeginTrialWork: [],
            Birthday: [],
            Comment: [],
            Role: [],
            Skype: [],
            ResidentialAddress:[],
            Skills:[],
            Hobbies:[],
            Wishes:[]
        });
    }

    public updateUser() {
        if (this.userForm.valid) {
            if (this.user.DateBeginWork != null) {
                this.user.DateBeginWork = new Date(Date.parse(this.user.DateBeginWork.toString()));
                this.user.DateBeginWork.setMinutes(this.user.DateBeginWork.getMinutes() - this.user.DateBeginWork.getTimezoneOffset());
            }
            else 
            this.user.DateBeginWork = null;
            if (this.user.DateBeginTrialWork != null) {
                this.user.DateBeginTrialWork = new Date(Date.parse(this.user.DateBeginTrialWork.toString()));
                this.user.DateBeginTrialWork.setMinutes(this.user.DateBeginTrialWork.getMinutes() - this.user.DateBeginTrialWork.getTimezoneOffset());
            }
            else
            this.user.DateBeginTrialWork = null;
            this.user.DateBirthday = new Date(Date.parse(this.user.DateBirthday.toString()));
            this.user.DateBirthday.setMinutes(this.user.DateBirthday.getMinutes() - this.user.DateBirthday.getTimezoneOffset());
            this.usersService.update(this.user).subscribe(response => {
                if (response) {
                    this.user = response;
                    this.user.DateBirthday = new Date(Date.parse(this.user.DateBirthday.toString()));
                    this.user.DateBeginWork = this.user.DateBeginWork != null ? new Date(Date.parse(this.user.DateBeginWork.toString())) : null;
                    this.user.DateBeginTrialWork = this.user.DateBeginTrialWork != null ? new Date(Date.parse(this.user.DateBeginTrialWork.toString())) : null;
                    this.status = "Updated";
                    this.userStorageService.init().subscribe(response => {
                        this.router.navigateByUrl('users/'+this.id+'/info');
                    })
                }
                else
                    alert("Server responded with error");

            });
        }
    };

    public process(event: any){
        console.log(event);
    }

    public changePassword() {
        this.router.navigate(['users/changePassword']);
    }

    public goBack() {
        this.location.back();
    }

    public showModalSelectAvatar() {
        const dialogRef = this.dialog.open(UsersAvatarSelectModalComponent, {
        });

          dialogRef.afterClosed().subscribe(result => {
            if (result.link != undefined) {
                this.user.Avatar = result.link;
                this.imageWasLoad = true;
            }
        })
    }

    public addRoles() {
        if (this.userStorageService.hasRole('Super_Admin')) {
            if (this.id == this.userStorageService.getId())
            return ['Super_Admin', 'Admin', 'ProjectManager', 'Developer', 'HumanResource'];
            else return ['Admin', 'ProjectManager', 'Developer', 'HumanResource'];
        }
        else if (this.userStorageService.hasRole('Admin')) {
            if (this.id == this.userStorageService.getId())
            return ['Admin', 'ProjectManager', 'Developer', 'HumanResource'];
            else return ['ProjectManager', 'Developer', 'HumanResource'];
        }
        else return [];
    }

    public cancel() {
        this.location.back();
    }
}