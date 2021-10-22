import { Injectable } from '@angular/core';
import { BaseRestService } from './base-rest-service';
import { HttpClient } from '@angular/common/http';
import { Client } from '../models/client.model';
import { ClientQueryModel } from '../models/query-models/client-query.model';
import { ContactPerson } from '../models/contact-person.model';
import { Observable } from 'rxjs';

@Injectable()
export class ClientsService extends BaseRestService<Client, ClientQueryModel> {
    constructor(private http: HttpClient) {
        super(http,"/api/clients")
    }

    public updateContactPerson(model: ContactPerson) {
        return this.http.put('api/contact_persons', model);
    }

    public createContactPerson(model: ContactPerson) {
        return this.http.post('api/contact_persons', model);
    }

    public deleteContactPerson(id: number):Observable<any> {
        return this.http.delete('api/contact_persons/'+id);
    }
}