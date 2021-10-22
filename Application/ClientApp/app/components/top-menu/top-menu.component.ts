import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserStorageService } from '../../services/user-storage.service';
import { User } from '../../models/user.model';
import { Location } from '@angular/common';

@Component({
    selector: 'top-menu',
    templateUrl: './top-menu.component.html',
    styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {
    id: number;
    user: User = new User();
    
    constructor(
        private usersService: UsersService,
        private router: Router,
        private userStorageService: UserStorageService,
        private location: Location   ) { }

    ngOnInit(): void {
        this.user = this.userStorageService.getUser();
        this.id = this.userStorageService.getId();
     }

    // toggleClicked(event: MouseEvent)
    // {
    //     var target = event.srcElement.id;
    //     var body = $('body');
    //     var menu = $('#sidebar-menu');
    //     var leftCol = $('.left_col');
    //     var scrollView = $('.scroll-view');
    //     var rightCol = $('.right_col');
        
    //     if (body.hasClass('nav-md')) {
    //         menu.find('li.active ul').hide();
    //         menu.find('li.active').addClass('active-sm').removeClass('active');
    //     } else {
    //         menu.find('li.active-sm ul').show();
    //         menu.find('li.active-sm').addClass('active').removeClass('active-sm');
    //     }
    //     body.toggleClass('nav-md nav-sm');

    // }

    // toggleClicked(event: MouseEvent)
    // {
    //     var target = event.srcElement.id;
    //     var body = $('body');
    //     var menu = $('#sidebar-menu');
        
    //     // toggle small or large menu
    //     if (body.hasClass('nav-md')) {
    //         menu.find('li.active ul').hide();
    //         menu.find('li.active').addClass('active-sm').removeClass('active');
    //     } else {
    //         menu.find('li.active-sm ul').show();
    //         menu.find('li.active-sm').addClass('active').removeClass('active-sm');
    //     }
    //     body.toggleClass('nav-md nav-sm');

    // }

    public signOut() {
        this.usersService.signOut().subscribe(response => {
            let resp = response;
            this.router.navigate([""]).then(result => {
                document.location.href = document.baseURI;
            });
        });
    }

    public settings() {
        let currentUserId = this.userStorageService.getId();
        this.router.navigateByUrl('/users/'+currentUserId+'/edit');
    }

    public goBack() {
        this.location.back();
    }
}
