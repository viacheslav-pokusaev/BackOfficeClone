import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { UserStorageService } from '../services/user-storage.service';

@Directive({
    selector: '[isCurrentUser]'
})

export class IsCurrentUserDirective {
    rolesOfUser: string [];
    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private userStorageService: UserStorageService) { }

    @Input() set isCurrentUser(id: number) {
        if ( this.userStorageService.getId()==id) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
            this.viewContainer.clear();
        }
    }
}