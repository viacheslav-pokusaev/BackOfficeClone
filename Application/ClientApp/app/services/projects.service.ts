import { Injectable } from '@angular/core';
import { BaseRestService } from './base-rest-service';
import { Project } from '../models/project.model';
import { ProjectQueryModel } from '../models/query-models/project-query.model';
import { HttpClient } from '@angular/common/http';
import { UserProfileProject } from '../models/user-profile-project.model';

@Injectable()
export class ProjectsService extends BaseRestService<Project, ProjectQueryModel> {
    constructor(private http: HttpClient) {
        super(http,"/api/projects")
    }
}