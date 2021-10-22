import { Injectable } from '@angular/core';
import { BaseRestService } from './base-rest-service';
import { HttpClient } from '@angular/common/http';
import { UserProfileProject } from '../models/user-profile-project.model';
import { UserProfileProjectQueryModel } from '../models/query-models/user-profile-project-query.model';

@Injectable()
export class UserProfileProjectService extends BaseRestService<UserProfileProject, UserProfileProjectQueryModel> {
    constructor(private http: HttpClient) {
        super(http,"/api/emploees")
    }
}