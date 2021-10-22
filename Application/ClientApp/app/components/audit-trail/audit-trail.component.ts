import { Component, OnInit } from '@angular/core';
import { AuditTrailService } from '../../services/audit-trail.service';
import { AuditTrailQueryModel } from '../../models/query-models/audit-trail-query.model';
import { AuditTrailEntity } from '../../models/audit-trail-entity.model';
import { SPINNER_ANIMATIONS, SPINNER_PLACEMENT, ISpinnerConfig } from '@hardpool/ngx-spinner';
import { Subject, Subscription } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AuditTrailDetailsComponent } from '../audit-trail-details/audit-trail-details.component';
import { Router } from '@angular/router';
import { AuditTrailParentComponent } from '../audit-trail-parent/audit-trail-parent.component';

@Component({
    selector: 'audit-trail',
    templateUrl: './audit-trail.component.html',
    styleUrls: ['./audit-trail.component.css']
})
export class AuditTrailComponent implements OnInit {

    auditTrailEntities: Array<AuditTrailEntity>;

    loading: boolean;

    subject: Subject<any>;
    
    subscription: Subscription;

    queryModel: AuditTrailQueryModel;

    spinnerConfig: ISpinnerConfig = {
        placement: SPINNER_PLACEMENT.block_ui,
        animation: SPINNER_ANIMATIONS.spin_3,
        size: "3rem",
        color: "#1574b3"
    };

    constructor(private auditTrailService: AuditTrailService,
        private dialog: MatDialog,
        private router: Router) { }

    ngOnInit(): void {
        this.subject = new Subject<any>();
        this.loading = true;
        this.queryModel = new AuditTrailQueryModel();
        this.queryModel.Take = 10;
        this.auditTrailService.get(this.queryModel).subscribe(response => {
            this.auditTrailEntities = response.Result;
            this.auditTrailEntities.forEach(element => {
                element.Date = new Date(Date.parse(element.Date.toString()));
            });
            this.subject.next({from: "component", response: response});
            this.loading = false;
        })
        this.subscription = this.subject.asObservable().subscribe(response => {
            if (response.from == "tablebuttons") {
                this.loading = true;
                this.queryModel = response.response as AuditTrailQueryModel;
                this.queryModel.Take = 10;
                this.auditTrailService.get(this.queryModel).subscribe(response => {
                    this.auditTrailEntities = response.Result;
                    this.loading = false;
                })
            }
        });
    }

    showDetails(auditTrailEntity: AuditTrailEntity) {
        const dialogRef = this.dialog.open(AuditTrailDetailsComponent, {
            width: '800px',
            data: {auditTrailEntity: auditTrailEntity}
          });
    }

    showParent(auditTrailEntity: AuditTrailEntity) {
        const dialogRef = this.dialog.open(AuditTrailParentComponent, {
            width: '800px',
            data: {auditTrailEntity: auditTrailEntity}
          });
    }


    goToUser(auditTrailEntity: AuditTrailEntity) {
        this.router.navigateByUrl('/users/'+auditTrailEntity.UserId+'/info')
    }
}
