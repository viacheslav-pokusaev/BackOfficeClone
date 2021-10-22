import { Injectable, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Observable } from 'rxjs/Observable';

import { User } from '../models/user.model';
import { UsersService } from './users.service';
import { ResponseContentType } from "@angular/http/src/enums";
import { RequestOptions } from "@angular/http/src/base_request_options";
import { of } from "rxjs/observable/of";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserStorageService  {
    private user: User;
    private isInit: boolean = false;

    constructor(private http: HttpClient) {
        this.init();
    }

    isInited() {
        return this.isInit;
    }

    init():Observable<User>{
        return this.http.get<User>('api/Users/GetCurentUser')
        .map((data) => {
            this.isInit = true;
            return this.user = data; 
        });
    }

    hasPermission(permittedRoles: string []):boolean {
        let that = this;
            let isFounded = false;
            for (let i = 0; i < permittedRoles.length; i++) {
                if (that.hasRole(permittedRoles[i]))
                    isFounded = true;
            }
            return isFounded;
    }

    hasPermissionOrCurrentUser(permittedRoles: string [], id: number) {
        return (this.hasPermission(permittedRoles) || (id == this.getId()));
    }

    hasRole(role: string){
        return this.user.Role == role;
    }

    getId() {
        return this.user.UserProfileId;
    }

    getUser() {
        return this.user;
    }
}