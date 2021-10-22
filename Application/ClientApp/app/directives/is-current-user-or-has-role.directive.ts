import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { UserStorageService } from '../services/user-storage.service';
import { DirectiveData } from '../models/directive.model'

@Directive({
    selector: '[isCurrentUserOrHasRole]'
})

export class IsCurrentUserOrHasRoleDirective {
    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private userStorageService: UserStorageService) { }

    @Input() set isCurrentUserOrHasRole(data: DirectiveData) {
        let roles = data.roles;
        let id = data.id;
        let isRight = this.userStorageService.hasPermissionOrCurrentUser(roles, id);
            if (isRight) {
                this.viewContainer.createEmbeddedView(this.templateRef);
            } else {
                this.viewContainer.clear();
            }
    }
}