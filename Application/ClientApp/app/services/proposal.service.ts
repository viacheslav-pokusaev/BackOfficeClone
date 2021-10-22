import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { User } from '../models/user.model';
import { Proposal } from '../models/proposal.model';
import { ProposalQueryModel } from '../models/query-models/proposal-query.model';
import { BaseRestService } from './base-rest-service';

@Injectable()

export class ProposalService extends BaseRestService<Proposal, ProposalQueryModel> {
    constructor(private http: HttpClient) {
        super(http,"/api/proposals")
    }
}