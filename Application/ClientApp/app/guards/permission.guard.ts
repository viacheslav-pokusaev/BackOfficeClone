import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, Router, ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { UserStorageService } from '../services/user-storage.service';
import { Injectable } from "@angular/core";
import { checkAndUpdateBinding } from "@angular/core/src/view/util";

@Injectable()
export class PermissionGuard implements CanActivate{

	constructor(private userStorageService:UserStorageService, private router: Router) {
	}

	data:any;

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | boolean{

		if (this.userStorageService.isInited() == true) {
			let res = this.check(route, state);
			return res;
		}
		else {
			return this.userStorageService.init().map(response => {
				let res = this.check(route, state);
				return res;
			})
		}
	}

	check(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
		if (state.url == '/users/0/info') {
			return true;
		}
		else {
			if (route.data != null && route.data != undefined) {
				this.data = route.data;
			}
			else {
				if (route.children[0].data != null && route.children[0].data != undefined) {
					this.data = route.children[0].data;
				}
				else {
					return true;
				}
			}
				let roles = this.data["roles"] as Array<string>;
				
				let isForCurrentUser = this.data["forCurrentUser"] as boolean;
				
				let canAct = true;

				if (isForCurrentUser == true) {
					canAct = this.userStorageService.hasPermissionOrCurrentUser(roles, +route.url[0]);
				}
				else {
					canAct = this.userStorageService.hasPermission(roles);
				}	
				if (canAct == false) {
					let currentUserId = this.userStorageService.getId();
					this.router.navigateByUrl('/users/'+currentUserId+'/info');
					return false;
				}
				else {
					return true;
				}
			}
	}
}