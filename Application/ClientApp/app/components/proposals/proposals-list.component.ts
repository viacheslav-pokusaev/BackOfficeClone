import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { User } from '../../models/user.model';
import { Proposal } from '../../models/proposal.model';

import { ProposalService } from '../../services/proposal.service';
import { ProposalQueryModel } from '../../models/query-models/proposal-query.model';
import { SPINNER_ANIMATIONS, SPINNER_PLACEMENT, ISpinnerConfig } from '@hardpool/ngx-spinner';
import { RequestToUpdatePassword } from '../../models/request-to-update-password.model';
import { UsersService } from '../../services/users.service';
import { RequestToUpdatePasswordQueryModel } from '../../models/query-models/request-to-update-password-query.model';
import { ChangePassword } from '../../models/change-password.model';

@Component({
    templateUrl: './proposal-list.component.html',
    styleUrls: ['./proposal-list.component.css']
})

export class ProposalListComponent implements OnInit {
    proposals: Array<Proposal> = new Array<Proposal>();
    requests: Array<RequestToUpdatePassword> = new Array<RequestToUpdatePassword>();
    user: User = new User();
    status: string;
    loading = false;

    spinnerConfig: ISpinnerConfig;

    constructor(private location: Location, 
        private proposalServise: ProposalService,
        private usersService: UsersService) {
        
    };
    public delete(id: number, index: number) {
        this.proposalServise.delete(id).subscribe((result) => {
            this.proposals.splice(index, 1);
            this.status = "Deleted";
        })
    };
    public addToUser(model: Proposal, index: number) {
        this.proposalServise.create(model).subscribe((result) => {
            this.proposals.splice(index, 1);
        })
    };

    ngOnInit(): void {
        this.spinnerConfig = {
            placement: SPINNER_PLACEMENT.block_ui,
            animation: SPINNER_ANIMATIONS.spin_3,
            size: "3rem",
            color: "#1574b3"
        };
        this.loading = true;
        this.proposalServise.get(new ProposalQueryModel()).subscribe((response) => {
            this.proposals = response.Result;
            this.proposals.forEach((value, index, array) => {
                value.DateBirthday = new Date(Date.parse(value.DateBirthday.toString()));
                value.DateCreate = new Date(Date.parse(value.DateCreate.toString()));
            });
            this.loading = false;
        })
        this.usersService.getRequestsToUpdatePassword(new RequestToUpdatePasswordQueryModel()).subscribe(response =>{
            this.requests = (response as RequestToUpdatePasswordQueryModel).Result;
            this.loading = false;
        })
    }

    public goBack() {
        this.location.back();
    }

    public confirm(request: RequestToUpdatePassword) {
        this.loading = true;
        let changePassword = new ChangePassword();
        changePassword.UserProfileID = request.Id;
        changePassword.NewPassword = request.NewPassword;
        this.usersService.changePassword(changePassword).subscribe((response: any) => {
            this.usersService.getRequestsToUpdatePassword(new RequestToUpdatePasswordQueryModel()).subscribe(response =>{
                this.requests = (response as RequestToUpdatePasswordQueryModel).Result;
                this.loading = false;
            })
        });
    }
}

