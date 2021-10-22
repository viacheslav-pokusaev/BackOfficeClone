import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserStorageService } from '../../../services/user-storage.service';

@Component({
    selector: 'clients-projects-by-client',
    templateUrl: './clients-projects-by-client.component.html',
    styleUrls: ['./clients-projects-by-client.component.css']
})
export class ClientsProjectsByClientComponent implements OnInit {

    clientId: number;
    
    constructor(private userStorageService: UserStorageService,
        private route: ActivatedRoute,
        private router: Router) { }

    ngOnInit() { 
        this.route.params.subscribe(params => {
            this.clientId = +params['id'];
        });
    }
}
