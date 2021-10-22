import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EncryptDecryptModel } from '../models/encrypt-decrypt.model';
import { CryptKeyModel } from '../models/crypt-key.model';

@Injectable()
export class DatabaseService  {
    constructor(private http: HttpClient) {
    }

    getBackUp() {
        return this.http.get('/api/database', {responseType: 'blob'});
    }

    getTablesNames(){
        return this.http.get('/api/database/tables');
    }

    setKey(config: CryptKeyModel){
        return this.http.put('/api/database/key', config);
    }

    setTables(model: EncryptDecryptModel) {
        return this.http.post('/api/database/tables', model);
    }

    getDatabaseName() {
        return this.http.get('/api/database/name');
    }
}