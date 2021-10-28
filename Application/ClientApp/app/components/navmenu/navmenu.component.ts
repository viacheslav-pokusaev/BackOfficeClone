import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UserStorageService } from '../../services/user-storage.service';

@Component({
    selector: 'nav-menu',
    templateUrl: './navmenu.component.html',
    styleUrls: ['./navmenu.component.css']
})
export class NavMenuComponent {
    id: number;
    isWorkActivityGroup: boolean;  
    firstName: string;
    lastName: string;

    public imgPath: string = ""

    private $BODY;
    private $MENU_TOGGLE;
    private $SIDEBAR_MENU;
    private $SIDEBAR_FOOTER;
    private $LEFT_COL;
    private $RIGHT_COL;
    private $NAV_MENU;
    private $FOOTER;

    constructor(
        private userStorageService: UserStorageService,
        private router: Router,
    ) {
    } 
    ngOnInit() {
        this.isWorkActivityGroup = false;
        this.id = this.userStorageService.getId();
        this.firstName = this.userStorageService.getUser().FirstName;
        this.lastName = this.userStorageService.getUser().LastName;
        this.imgPath = window.location.origin + "/img/navbar-logo.png";
    }      

    public isLinkWorkActivitiesActive() {
        let segments = this.router.url.split('/');
        return (segments.length < 3);
    }

    public isLinkUsersActive() {
        let segments = this.router.url.split('/');
        let userId = +segments[2];
        return (segments.length < 3 || userId != this.id);
    }

    public anchorClicked(event: MouseEvent)
  {
        var target = this.getTarget(event).id;

      var $li = $('#' + target.replace("chevron","li")).parent(); 

        //get arrow to span
        var link = document.getElementById(target);
        var span = link.getElementsByTagName('span')[0];

      if ($li.is('.active')) {
            //move span to start rotate
            span.classList.remove('span-open');
                span.classList.add('span-close');
            

          $li.removeClass('active active-sm');
              $('ul:first', $li).slideUp(function() {
                  //this.setContentHeight();
              });
          } else {
              //move span to open rotate(270deg)
              span.classList.remove('span-close');
              span.classList.add('span-open');
              // prevent closing menu if we are on child menu
              if (!$li.parent().is('.child_menu')) {
                  $('#sidebar-menu').find('li').removeClass('active active-sm');
                  $('#sidebar-menu').find('li ul').slideUp();
              }
              
              $li.addClass('active');

              $('ul:first', $li).slideDown(function() {
                  //this.setContentHeight();
              });
          }
    }

    public getTarget(e: MouseEvent) {
        var targ;
        if (e.target) {
            targ = e.target;
        }
        else if (e.srcElement) {
            targ = e.srcElement;
        }
        if (targ.nodeType == 3) targ = targ.parentNode; // defeat Safari bug
        return targ;
    }

  public plot()
  {     
      let that = this;
      console.log('in sidebar');

      this.$BODY = $('body');
      this.$MENU_TOGGLE = $('#menu_toggle');
      this.$SIDEBAR_MENU = $('#sidebar-menu');
      this.$SIDEBAR_FOOTER = $('.sidebar-footer');
      this.$LEFT_COL = $('.left_col');
      this.$RIGHT_COL = $('.right_col');
      this.$NAV_MENU = $('.nav_menu');
      this.$FOOTER = $('footer');

      var $a = this.$SIDEBAR_MENU.find('a');
      this.$SIDEBAR_MENU.find('a').on('click', function(ev) {
          var $li = $(this).parent();

          if ($li.is('.active')) {
              $li.removeClass('active active-sm');
              $('ul:first', $li).slideUp(function() {
                that.setContentHeight();
              });
          } else {
              // prevent closing menu if we are on child menu
              if (!$li.parent().is('.child_menu')) {
                  this.$SIDEBAR_MENU.find('li').removeClass('active active-sm');
                  this.$SIDEBAR_MENU.find('li ul').slideUp();
              }
              
              $li.addClass('active');

              $('ul:first', $li).slideDown(function() {
                that.setContentHeight();
              });
          }
      });

      // toggle small or large menu
      this.$MENU_TOGGLE.on('click', function() {
          if (this.$BODY.hasClass('nav-md')) {
              this.$SIDEBAR_MENU.find('li.active ul').hide();
              this.$SIDEBAR_MENU.find('li.active').addClass('active-sm').removeClass('active');
          } else {
              this.$SIDEBAR_MENU.find('li.active-sm ul').show();
              this.$SIDEBAR_MENU.find('li.active-sm').addClass('active').removeClass('active-sm');
          }

          this.$BODY.toggleClass('nav-md nav-sm');

          this.setContentHeight();
      });

  }   

  public setContentHeight() {
      // reset height
      this.$RIGHT_COL.css('min-height', $(window).height());

      var bodyHeight = this.$BODY.outerHeight(),
          footerHeight = this.$BODY.hasClass('footer_fixed') ? -10 : this.$FOOTER.height(),
          leftColHeight = this.$LEFT_COL.eq(1).height() + this.$SIDEBAR_FOOTER.height(),
          contentHeight = bodyHeight < leftColHeight ? leftColHeight : bodyHeight;

      // normalize content
      contentHeight -= this.$NAV_MENU.height() + footerHeight;

      this.$RIGHT_COL.css('min-height', contentHeight);
  };


}