import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { UsersService } from '../../../services/users.service';
import { ChangePassword } from '../../../models/change-password.model';
import { UserStorageService } from '../../../services/user-storage.service';

@Component({
    templateUrl: './users-change-password.component.html'
})

export class UsersChangePasswordComponent implements OnInit{
    change: ChangePassword;

    constructor(
        private userStorageService: UserStorageService,
        private usersService: UsersService,
        private location: Location,
    ) {
        this.change = new ChangePassword();
    }

    ngOnInit() {
        
    }

    public saveChange() {
        this.change.UserProfileID = this.userStorageService.getId();
        this.usersService.changePassword(this.change).subscribe((response: any) => {
            this.location.back();
        });
    }

    public goBack() {
        this.location.back();
    }
}