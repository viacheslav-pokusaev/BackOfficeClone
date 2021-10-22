import { Component, OnInit } from '@angular/core';
import { UserStorageService } from '../../services/user-storage.service';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    constructor(private userStorageService: UserStorageService) {
    }

    ngOnInit() {  
    }  

    public isInited(){
        return this.userStorageService.isInited();
    }
}
