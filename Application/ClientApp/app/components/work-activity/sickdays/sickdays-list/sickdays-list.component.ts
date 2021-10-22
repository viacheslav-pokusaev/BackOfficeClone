import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { UserStorageService } from '../../../../services/user-storage.service';

import { SickDay } from '../../../../models/sick-day.model';
import { User } from '../../../../models/user.model';
import { SickDayService } from '../../../../services/sick-day.service';
import { UsersService } from '../../../../services/users.service';
import { SickDayQueryModel } from '../../../../models/query-models/sick-day-query.model';
import { UserQueryModel } from '../../../../models/query-models/user-query.model';


@Component({
    templateUrl: './sickdays-list.component.html',
    styleUrls: ['./sickdays-list.component.css']
    
})

export class SickDaysListComponent {
    sickDays: Array<SickDay> = new Array<SickDay>();
    newSickDays: SickDay = new SickDay();
    users: Array<User> = new Array<User>();
    status: string;
    isAddVisible: boolean;
    selectedUser = new User();

    constructor(
        private sickDayService: SickDayService,
        private userStorageService: UserStorageService,
        private usersService: UsersService,
        private location: Location,

    ) {

    }

}
