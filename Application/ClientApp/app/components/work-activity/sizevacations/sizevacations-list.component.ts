import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UserStorageService } from '../../../services/user-storage.service';
import { SizeVacation } from '../../../models/size-vacation.model';
import { SizeVacationsService } from '../../../services/size-vacations.service';
import { SizeVacationQueryModel } from '../../../models/query-models/size-vacation-query.model';
import { ISpinnerConfig } from '@hardpool/ngx-spinner';
import { SPINNER_CONFIG } from '../../../constants/constants';

@Component({
    templateUrl: './sizevacations-list.component.html',
    styleUrls: ['./sizevacations-list.component.css']
})

export class SizeVacationsListComponent implements OnInit {
    sizevacations: Array<SizeVacation> = new Array<SizeVacation>();
    newSizeVacation: SizeVacation = new SizeVacation();
    status: string;
    isAdmin: boolean;
    isUser: boolean;
    isAddVisible: boolean;
    loading = false;

    spinnerConfig: ISpinnerConfig;

    constructor(
        private sizeVacationService: SizeVacationsService,
        private userStorageService: UserStorageService,
        private location: Location
    ) {
    };

    public delete(index: number, indexOnArray: number) {
        this.sizeVacationService.delete(index).subscribe((result) => {
            this.sizevacations.splice(indexOnArray, 1);
            this.status = "Deleted";
        })
    }

    public add(newSizeVacation: SizeVacation) {
        if (newSizeVacation.Year < 2050 && newSizeVacation.Year > 2000 && newSizeVacation.CountDays < 365 && newSizeVacation.CountDays > -1) {
            this.sizeVacationService.create(newSizeVacation).subscribe((result) => {
                this.newSizeVacation = result;
                if (this.newSizeVacation.Id != 0) {
                    this.sizeVacationService.get(new SizeVacationQueryModel()).subscribe((response) => {
                        this.sizevacations = response.Result;
                        this.sizevacations.sort(x => x.Year).reverse();
                    });
                    this.isAddVisible = false;
                }
            });
        }
    }

    public menuAddNew() {
        this.isAddVisible = true;
        this.newSizeVacation = new SizeVacation();
    }

    ngOnInit(): void {
        this.spinnerConfig = SPINNER_CONFIG;
        this.loading = true;
        this.isAdmin = this.userStorageService.hasRole('Admin');
        this.isUser = this.userStorageService.hasRole('User');
        this.sizeVacationService.get(new SizeVacationQueryModel()).subscribe((response) => {
            this.sizevacations = response.Result;
            this.sizevacations.sort((x, y) => {
                if (x.Year > y.Year)
                    return -1;
                if (x.Year < y.Year)
                    return 1;
                return 0;
            });
            this.loading = false;
        })
    }

    public goBack() {
        this.location.back();
    }
}