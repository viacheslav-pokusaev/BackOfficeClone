import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../../models/user.model';
import { UsersService } from '../../../services/users.service';
import { UserQueryModel } from '../../../models/query-models/user-query.model';
import { SPINNER_ANIMATIONS, SPINNER_PLACEMENT, ISpinnerConfig } from '@hardpool/ngx-spinner';
import { Subject, Subscription } from 'rxjs';
import { SPINNER_COFIG_CONST_OBJ, QUERY_MODEL_CONST_OBJ, FROM_COMPONENT } from '../../../constants/constants';

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
    subject: Subject<any>;
    subscription: Subscription;

    spinnerConfig: ISpinnerConfig = {
        placement: SPINNER_PLACEMENT.block_ui,
        animation: SPINNER_ANIMATIONS.spin_3,
        size: SPINNER_COFIG_CONST_OBJ.SIZE,
        color: SPINNER_COFIG_CONST_OBJ.COLOR
    };


    constructor(
        private usersService: UsersService
    ) {
    }

    ngOnInit(): void {
        this.subject = new Subject<any>();
        this.queryModel = new UserQueryModel();
        this.queryModel.Take = QUERY_MODEL_CONST_OBJ.TAKE;
        this.loading = QUERY_MODEL_CONST_OBJ.LOADING;
        this.usersService.get(this.queryModel).subscribe(response => {
            this.users = response.Result;
            this.subject.next({ from: FROM_COMPONENT, response: response });
            this.loading = !this.loading;
        })

    }
}