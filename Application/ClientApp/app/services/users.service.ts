import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { User } from '../models/user.model'
import { ChangePassword } from '../models/change-password.model';
import { BaseRestService } from './base-rest-service';
import { UserQueryModel } from '../models/query-models/user-query.model';
import { Subject } from 'rxjs/Rx';
import { RequestToUpdatePasswordQueryModel } from '../models/query-models/request-to-update-password-query.model';
import { ListVacationQueryModel } from '../models/query-models/list-vacation-query.model';
import { ResponseType } from '@angular/http/src/enums';

@Injectable()
      
export class UsersService extends BaseRestService<User, UserQueryModel> { 

    public data: Array<User>;
    public doNotreload = false;
    public allGridState: any;
    public paginationOld: any;

    constructor(private http: HttpClient) {      
        super(http,"/api/users")
    }

    private subject = new Subject<any>();

    public updateVacDays(count:number) {
        this.subject.next({ count: count });
    }

    public getVacDays():Observable<any> {
        return this.subject.asObservable();
    }

    public getVacationDays(model: ListVacationQueryModel):Observable<ListVacationQueryModel> {
        return this.http.post<ListVacationQueryModel>('/api/Users/GetVacationDay', model);
    };

    signOut():Observable<any> {
        return this.http.get('/api/Users/SignOut');
    };

    changePassword(change: ChangePassword): Observable<any> {
        return this.http.post('/api/Users/ChangePassword', change);
    };

    getRequestsToUpdatePassword(model: RequestToUpdatePasswordQueryModel): Observable<any> {
        return this.http.post('/api/Users/GetRequestsToUpdatePasswords/', model);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }
}