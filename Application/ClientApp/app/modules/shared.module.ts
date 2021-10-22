import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { TextMaskModule } from 'angular2-text-mask';
import { AgGridHelperComponent } from '../components/ag-grid-helper/ag-grid-helper.component';
import { DeleteConfirmationComponent } from '../components/modals/delete-confirmation/delete-confirmation.component';
import { NotificationNoVacationComponent } from '../components/modals/notification-no-vacation/notification-no-vacation.component';  
import { AgGridEditButton } from '../components/ag-grid-helper/ag-grid-edit-button/ag-grid-edit-button.component';
import { AgGridInfoButton } from '../components/ag-grid-helper/ag-grid-info-button/ag-grid-info-button.component';
import { ProjectsCreateComponent } from '../components/projects/projects-create/projects-create.component';
import { ClientsCreateComponent } from '../components/clients/clients-create/clients-create.component';

import {
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatIconModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatSelectModule,
    MatListModule,
    MatDialogModule
} from '@angular/material';
import { PermissionDirective } from '../directives/permission.directive';
import { IsCurrentUserDirective } from '../directives/is-current-user.directive';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { NgxSpinnerModule } from '@hardpool/ngx-spinner';
import { IsCurrentUserOrHasRoleDirective } from '../directives/is-current-user-or-has-role.directive';
import { TableButtonsComponent } from '../components/table-buttons/table-buttons.component';
import { ClientsInfoComponent } from '../components/clients/clients-info/clients-info.component';
import { ModalWrapperComponent } from '../components/modal-wrapper/modal-wrapper.component';
import { MakeBackupConfirmationComponent } from '../components/modals/make-backup-confirmation/make-backup-confirmation.component';
import { ContactPersonCreateComponent } from '../components/clients/contact-person-create/contact-person-create.component';
import { ContactPersonEditComponent } from '../components/clients/contact-person-edit/contact-person-edit.component';
import { AuditTrailDetailsComponent } from '../components/audit-trail-details/audit-trail-details.component';
import { AuditTrailParentComponent } from '../components/audit-trail-parent/audit-trail-parent.component';

@NgModule({
    declarations: [
        AgGridHelperComponent,
        DeleteConfirmationComponent,
        NotificationNoVacationComponent,
        TableButtonsComponent,
        AgGridEditButton,
        AgGridInfoButton,
        PermissionDirective,
        IsCurrentUserDirective,
        IsCurrentUserOrHasRoleDirective,
        ProjectsCreateComponent,
        ClientsCreateComponent,
        ClientsInfoComponent,
        ModalWrapperComponent,
        MakeBackupConfirmationComponent,
        ContactPersonEditComponent,
        ContactPersonCreateComponent,
        AuditTrailDetailsComponent,
        AuditTrailParentComponent
    ],
    imports: [ 
        CommonModule,
        AgGridModule.withComponents([AgGridHelperComponent]),
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatIconModule,
        MatCheckboxModule,
        MatSelectModule,
        MatListModule,
        MatDialogModule,
        TextMaskModule,
        NgxSpinnerModule,
        NgxLoadingModule.forRoot({})
    ],
    entryComponents: [
        DeleteConfirmationComponent, 
        NotificationNoVacationComponent, 
        AgGridInfoButton, 
        AgGridEditButton, 
        ProjectsCreateComponent, 
        ClientsCreateComponent, 
        ClientsInfoComponent, 
        MakeBackupConfirmationComponent,         
        ContactPersonEditComponent,
        ContactPersonCreateComponent,
        AuditTrailDetailsComponent,
        AuditTrailParentComponent
    ],
    exports: [
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        AgGridModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatIconModule,
        MatCheckboxModule,
        MatSelectModule,
        MatListModule,
        MatDialogModule,
        TextMaskModule,
        NgxLoadingModule,
        NgxSpinnerModule,
        AgGridHelperComponent,
        PermissionDirective,
        IsCurrentUserDirective,
        IsCurrentUserOrHasRoleDirective,
        TableButtonsComponent,
        ClientsInfoComponent,
        ModalWrapperComponent,
        MakeBackupConfirmationComponent,
        ContactPersonEditComponent,
        ContactPersonCreateComponent,
        AuditTrailDetailsComponent
    ],
    providers: [],
})
export class SharedModule {}