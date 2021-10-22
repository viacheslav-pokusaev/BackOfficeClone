import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EncryptDecryptModel } from '../models/encrypt-decrypt.model';
import { CryptKeyModel } from '../models/crypt-key.model';

@Injectable()
export class LogfileService  {
    constructor(private http: HttpClient) {
    }

    getLogFile() {
        return this.http.get('/api/logfile', {responseType: 'blob'});
    }
}