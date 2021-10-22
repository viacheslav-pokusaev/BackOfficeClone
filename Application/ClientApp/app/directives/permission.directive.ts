import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { UserStorageService } from '../services/user-storage.service';

@Directive({
    selector: '[permission]'
})

export class PermissionDirective {
    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private userStorageService: UserStorageService) { }

    @Input() set permission(roles: string[]) {
        let isFounded = this.userStorageService.hasPermission(roles);
            if (isFounded) {
                this.viewContainer.createEmbeddedView(this.templateRef);
            } else {
                this.viewContainer.clear();
            }
    }
}