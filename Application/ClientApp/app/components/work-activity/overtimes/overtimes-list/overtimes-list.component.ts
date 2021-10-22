import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { UserStorageService } from '../../../../services/user-storage.service';

import { Overtime } from '../../../../models/overtime.model';
import { User } from '../../../../models/user.model';
import { OvertimeService } from '../../../../services/overtime.service';
import { UsersService } from '../../../../services/users.service';
import { OvertimeQueryModel } from '../../../../models/query-models/overtime-query.model';
import { UserQueryModel } from '../../../../models/query-models/user-query.model';

@Component({
    templateUrl: './overtimes-list.component.html',
    styleUrls: ['./overtimes-list.component.css']
})

export class OvertimesListComponent implements OnInit {
    overtimes: Array<Overtime> = new Array<Overtime>();
    newOvertime: Overtime = new Overtime();
    users: Array<User> = new Array<User>();
    status: string;
    isAdmin: boolean;
    isUser: boolean;
    isAddVisible: boolean;
    selectedUser = new User();

    constructor(
        private overtimeService: OvertimeService,
        private userStorageService: UserStorageService,
        private usersService: UsersService,
        private location: Location,

    ) {
       
    }

    ngOnInit(): void {
    }
}