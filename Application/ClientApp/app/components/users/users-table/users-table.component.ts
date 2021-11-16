import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../../models/user.model';
import { UsersService } from '../../../services/users.service';
import { UserQueryModel } from '../../../models/query-models/user-query.model';
import { ISpinnerConfig } from '@hardpool/ngx-spinner';
import { SPINNER_COFIG_CONST_OBJ, QUERY_MODEL_CONST_OBJ, FROM_COMPONENT, SPINNER_CONFIG } from '../../../constants/constants';

@Component({
    templateUrl: './users-table.component.html',
    styleUrls: ['./users-table.component.css']
})

export class UsersTableComponent implements OnInit {
    users: Array<User> = new Array<User>();
    status: string;
    isAdmin: boolean;
    isUser: boolean;
    loading: boolean;
    queryModel: UserQueryModel;

    spinnerConfig: ISpinnerConfig = SPINNER_CONFIG;

    constructor(
        private usersService: UsersService
    ) {
    }

    ngOnInit(): void {
        this.queryModel = new UserQueryModel();
        this.queryModel.Take = QUERY_MODEL_CONST_OBJ.TAKE;
        this.loading = true;
        this.usersService.get(this.queryModel).subscribe(response => {
            this.users = response.Result;
            this.loading = !this.loading;
        })

    }
}