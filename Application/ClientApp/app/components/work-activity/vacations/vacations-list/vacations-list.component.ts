import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { UserStorageService } from '../../../../services/user-storage.service';

import { Vacation } from '../../../../models/vacation.model';
import { User } from '../../../../models/user.model';
import { VacationService } from '../../../../services/vacation.service';
import { UsersService } from '../../../../services/users.service';
import { VacationQueryModel } from '../../../../models/query-models/vacation.query.model';
import { UserQueryModel } from '../../../../models/query-models/user-query.model';


@Component({
    templateUrl: './vacations-list.component.html',
    styleUrls: ['./vacations-list.component.css']
})

export class VacationsListComponent {
    vacations: Array<Vacation> = new Array<Vacation>();
    newVacation: Vacation = new Vacation();
    users: Array<User> = new Array<User>();
    status: string;
    isAdmin: boolean;
    isUser: boolean;
    isAddVisible: boolean;
    selectedUser = new User();

    constructor(
        private vacationService: VacationService,
        private userStorageService: UserStorageService,
        private usersService: UsersService,
        private location: Location,

    ) {

    }
}