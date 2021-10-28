webpackJsonp(["common"],{

/***/ "./ClientApp/app/components/projects/projects-edit/projects-edit.component.css":
/***/ (function(module, exports) {

module.exports = ".cancel:hover {\r\n    cursor: pointer;\r\n}\r\n\r\n.cancel {\r\n    border-width: 1px;\r\n    border-color: black;\r\n    border-style: solid;\r\n    padding-left: 3px;\r\n    padding-right: 3px;\r\n}\r\n"

/***/ }),

/***/ "./ClientApp/app/components/projects/projects-edit/projects-edit.component.html":
/***/ (function(module, exports) {

module.exports = "<modal-wrapper [dialogRef]=\"dialogRef\">\r\n\r\n\r\n    <div class=\"card x_panel\" *ngIf=\"project && clients\">\r\n        <div id=\"divDataBody\" class=\"container entity\">\r\n            <div class=\"row\">\r\n                    <div class=\"col-md-12  form-title\">\r\n                            <h2 style=\"color: #73879C;\">Update info of {{ projectName}} </h2>\r\n                        </div>\r\n                <div class=\"col-md-12 col-lg-12\">\r\n                    <form name=\"addpost\" class=\"form-horizontal  container-fluid\">\r\n                        <div class=\"col-md-12 col-sm-12 col-xs-12 form-group has-feedback  black-tooltip\">\r\n                            <input type=\"text\" class=\"form-control has-feedback-left\" id=\"inputSuccess2\" placeholder=\"Name\" [(ngModel)]=\"project.Name\" name=\"Name\" autocomplete=\"off\">\r\n                            <span class=\"fa fa-bank form-control-feedback left\" aria-hidden=\"true\"></span>\r\n                            <span class=\"tooltiptext\">\r\n                                Name\r\n                            </span>\r\n                        </div>\r\n                        <div *ngIf=\"data.clientId == null || data.clientId == undefined\">\r\n                            <div class=\"form-group col-md-11 col-xs-11  black-tooltip\">\r\n                                <select class=\"select2_single form-control\" [(ngModel)]=\"project.ClientId\" name=\"selectClient\" tabindex=\"-1\">\r\n                                    <option *ngFor=\"let selectClient of clients; let i = index\" [value]=\"selectClient.Id\">\r\n                                        {{ selectClient.OrganizationName }}\r\n                                    </option>\r\n                                </select>\r\n                                <span class=\"tooltiptext\">\r\n                                    Client\r\n                                </span>\r\n                            </div>\r\n                            <div class=\"col-md-1 col-xs-1\" style=\"right: 8px;\">\r\n                                <button class=\"btn btn-primary black-tooltip\" (click)=\"createNewClient()\">\r\n                                    <i class=\"fa fa-plus\"></i>\r\n                                    <span class=\"tooltiptext\">Add new</span>\r\n                                </button>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-12 col-sm-12 col-xs-12 form-group has-feedback black-tooltip date-field\">\r\n                            <mat-datepicker #picker1></mat-datepicker>\r\n                            <input type=\"text\" class=\"form-control has-feedback-left form-control-small\" id=\"inputSuccess7\" [matDatepicker]=\"picker1\" placeholder=\"Begin Date\" name=\"BeginDate\" [(ngModel)]=\"project.DateBegin\">\r\n                            <mat-datepicker-toggle class=\"left\" matSuffix [for]=\"picker1\" style=\"color: #73879C;\"></mat-datepicker-toggle>\r\n                            <span class=\"tooltiptext\">\r\n                                Start Date\r\n                            </span>\r\n                        </div>\r\n                        <div class=\"col-md-12 col-sm-12 col-xs-12 form-group has-feedback black-tooltip date-field\">\r\n                            <mat-datepicker #picker2></mat-datepicker>\r\n                            <input type=\"text\" class=\"form-control has-feedback-left form-control-small\" id=\"inputSuccess7\" [matDatepicker]=\"picker2\" placeholder=\"End Date\" name=\"EndDate\" [(ngModel)]=\"project.DateEnd\">\r\n                            <mat-datepicker-toggle class=\"left\" matSuffix [for]=\"picker2\" style=\"color: #73879C;\"></mat-datepicker-toggle>\r\n                            <span class=\"tooltiptext\">\r\n                                End Date\r\n                            </span>\r\n                        </div>\r\n                        <div class=\"col-md-12 col-sm-12 col-xs-12 form-group has-feedback  black-tooltip\">\r\n                            <input type=\"text\" class=\"form-control has-feedback-left\" id=\"inputSuccess2\" placeholder=\"Comment\" [(ngModel)]=\"project.Comment\" name=\"Comment\" autocomplete=\"off\">\r\n                            <span class=\"fa fa-comment form-control-feedback left\" aria-hidden=\"true\"></span>\r\n                            <span class=\"tooltiptext\">\r\n                                Comment\r\n                            </span>\r\n                        </div>\r\n                        <div class=\"col-md-12 col-xs-12\">\r\n                            <div class=\"form-group col-md-6 col-xs-6 text-center\">\r\n                                <button class=\"btn btn-primary alignCenterBtn black-tooltip\" (click)=\"updateProject()\">\r\n                                    Save\r\n                                </button>\r\n                            </div>\r\n                            <div class=\"form-group col-md-6 col-xs-6 text-center\">\r\n                                <button class=\"btn btn-primary alignCenterBtn black-tooltip\" (click)=\"cancel()\">\r\n                                    Cancel\r\n                                </button>\r\n                            </div>\r\n                        </div>\r\n                    </form>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</modal-wrapper>"

/***/ }),

/***/ "./ClientApp/app/components/projects/projects-edit/projects-edit.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var projects_service_1 = __webpack_require__("./ClientApp/app/services/projects.service.ts");
var clients_service_1 = __webpack_require__("./ClientApp/app/services/clients.service.ts");
var user_storage_service_1 = __webpack_require__("./ClientApp/app/services/user-storage.service.ts");
var users_service_1 = __webpack_require__("./ClientApp/app/services/users.service.ts");
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var common_1 = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
var client_query_model_1 = __webpack_require__("./ClientApp/app/models/query-models/client-query.model.ts");
var material_1 = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
var ProjectsEditComponent = /** @class */ (function () {
    function ProjectsEditComponent(projectService, clientsService, userStorageService, usersService, location, route, dialogRef, data) {
        this.projectService = projectService;
        this.clientsService = clientsService;
        this.userStorageService = userStorageService;
        this.usersService = usersService;
        this.location = location;
        this.route = route;
        this.dialogRef = dialogRef;
        this.data = data;
        this.clients = new Array();
        this.users = new Array();
        this.selectedUsers = new Array();
    }
    ProjectsEditComponent.prototype.keyEvent = function (event) {
        if (event.keyCode === 13) {
            this.updateProject();
        }
        if (event.keyCode === 27) {
            this.cancel();
        }
    };
    ProjectsEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.id = this.data.projectId;
        this.projectName = this.data.projectName;
        this.projectService.getById(this.id).subscribe(function (response) {
            _this.project = response;
            if (_this.project.DateBegin) {
                _this.project.DateBegin = new Date(Date.parse(_this.project.DateBegin.toString()));
                _this.project.DateBegin = (_this.project.DateBegin.getUTCFullYear() > 2010) ? _this.project.DateBegin : null;
            }
            if (_this.project.DateEnd) {
                _this.project.DateEnd = new Date(Date.parse(_this.project.DateEnd.toString()));
                _this.project.DateEnd = (_this.project.DateEnd.getUTCFullYear() > 2010) ? _this.project.DateEnd : null;
            }
            _this.selectedUsers = _this.project.Emploees;
            var queryModelClients = new client_query_model_1.ClientQueryModel();
            _this.clientsService.get(queryModelClients).subscribe(function (resp) {
                _this.clients = resp.Result;
            });
        });
        this.minDateBeginDate = new Date();
        this.minDateBeginDate.setUTCFullYear(2018);
    };
    ProjectsEditComponent.prototype.updateProject = function () {
        var _this = this;
        if (this.project.DateBegin != undefined) {
            this.project.DateBegin = new Date(Date.parse(this.project.DateBegin.toString()));
            this.project.DateBegin.setMinutes(this.project.DateBegin.getMinutes() - this.project.DateBegin.getTimezoneOffset());
        }
        if (this.project.DateEnd != undefined) {
            this.project.DateEnd = new Date(Date.parse(this.project.DateEnd.toString()));
            this.project.DateEnd.setMinutes(this.project.DateEnd.getMinutes() - this.project.DateEnd.getTimezoneOffset());
        }
        this.projectService.update(this.project).subscribe(function (response) {
            if (_this.dialogRef != null && _this.dialogRef != undefined)
                _this.dialogRef.close();
        });
    };
    ProjectsEditComponent.prototype.cancel = function () {
        if (this.dialogRef != null && this.dialogRef != undefined)
            this.dialogRef.close();
    };
    __decorate([
        core_1.HostListener('window:keyup', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [KeyboardEvent]),
        __metadata("design:returntype", void 0)
    ], ProjectsEditComponent.prototype, "keyEvent", null);
    ProjectsEditComponent = __decorate([
        core_1.Component({
            selector: 'projects-edit',
            template: __webpack_require__("./ClientApp/app/components/projects/projects-edit/projects-edit.component.html"),
            styles: [__webpack_require__("./ClientApp/app/components/projects/projects-edit/projects-edit.component.css")]
        }),
        __param(7, core_1.Inject(material_1.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [projects_service_1.ProjectsService,
            clients_service_1.ClientsService,
            user_storage_service_1.UserStorageService,
            users_service_1.UsersService,
            common_1.Location,
            router_1.ActivatedRoute,
            material_1.MatDialogRef, Object])
    ], ProjectsEditComponent);
    return ProjectsEditComponent;
}());
exports.ProjectsEditComponent = ProjectsEditComponent;


/***/ }),

/***/ "./ClientApp/app/components/projects/projects-emploees-edit/projects-emploees-edit.component.css":
/***/ (function(module, exports) {

module.exports = ".cancel:hover {\r\n    cursor: pointer;\r\n}\r\n\r\n.cancel {\r\n    border-width: 1px;\r\n    border-color: black;\r\n    border-style: solid;\r\n    padding-left: 3px;\r\n    padding-right: 3px;\r\n}"

/***/ }),

/***/ "./ClientApp/app/components/projects/projects-emploees-edit/projects-emploees-edit.component.html":
/***/ (function(module, exports) {

module.exports = "<modal-wrapper [dialogRef]=\"dialogRef\">\r\n\r\n    <div class=\"card x_panel\" *ngIf=\"emploee\">\r\n        <div id=\"divDataBody\" class=\"container entity\">\r\n            <div class=\"row\">\r\n                    <div class=\"col-md-12 form-title\">\r\n                            <h2 style=\"color: #73879C;\">Update Employee`s info</h2>\r\n                        </div>\r\n                <div class=\"col-md-12 col-lg-12\">\r\n                    <form name=\"addpost\" class=\"form-horizontal  container-fluid\">\r\n                        <div class=\"col-md-12 col-sm-12 col-xs-12 form-group has-feedback  black-tooltip\">\r\n                            <input type=\"text\" class=\"form-control has-feedback-left\" id=\"inputSuccess2\" placeholder=\"FirstName\" [(ngModel)]=\"emploee.FirstName\" name=\"FirstName\" readonly>\r\n                            <span class=\"fa fa-user form-control-feedback left\" aria-hidden=\"true\"></span>\r\n                            <span class=\"tooltiptext\">\r\n                                FirstName\r\n                            </span>\r\n                        </div>\r\n                        <div class=\"col-md-12 col-sm-12 col-xs-12 form-group has-feedback  black-tooltip\">\r\n                            <input type=\"text\" class=\"form-control has-feedback-left\" id=\"inputSuccess2\" placeholder=\"LastName\" [(ngModel)]=\"emploee.LastName\" name=\"LastName\" readonly>\r\n                            <span class=\"fa fa-user form-control-feedback left\" aria-hidden=\"true\"></span>\r\n                            <span class=\"tooltiptext\">\r\n                                LastName\r\n                            </span>\r\n                        </div>\r\n\r\n                        <div class=\"col-md-12 col-sm-12 col-xs-12 form-group has-feedback black-tooltip\">\r\n                            <select class=\"select2_single form-control\" [(ngModel)]=\"emploee.Position\" name=\"Position\" tabindex=\"-1\">\r\n                                <option *ngFor=\"let position of positions; let i = index\" [value]=\"position\">\r\n                                    {{position }}\r\n                                </option>\r\n                            </select>\r\n                            <span class=\"tooltiptext\">\r\n                                Position\r\n                            </span>\r\n                        </div>\r\n                        <div class=\"col-md-12 col-sm-12 col-xs-12 form-group has-feedback black-tooltip\">\r\n                            <select class=\"select2_single form-control\" [(ngModel)]=\"emploee.Status\" name=\"Status\" tabindex=\"-1\">\r\n                                <option *ngFor=\"let status of statuses; let i = index\" [value]=\"status\">\r\n                                    {{status }}\r\n                                </option>\r\n                            </select>\r\n                            <span class=\"tooltiptext\">\r\n                                Status\r\n                            </span>\r\n                        </div>\r\n                        <div class=\"col-md-12 col-sm-12 col-xs-12 form-group has-feedback black-tooltip date-field\">\r\n                            <mat-datepicker #picker1></mat-datepicker>\r\n                            <input type=\"text\" class=\"form-control has-feedback-left form-control-small\" id=\"inputSuccess7\" [matDatepicker]=\"picker1\" placeholder=\"Date of start of work\" [min]=\"minDateStart\" name=\"DateStartWork\" [(ngModel)]=\"emploee.DateStartWork\">\r\n                            <mat-datepicker-toggle class=\"left\" matSuffix [for]=\"picker1\" style=\"color: #73879C;\"></mat-datepicker-toggle>\r\n                            <span class=\"tooltiptext\">\r\n                                Start Work\r\n                            </span>\r\n                        </div>\r\n                        <div class=\"col-md-12 col-sm-12 col-xs-12 form-group has-feedback black-tooltip date-field\">\r\n                            <mat-datepicker #picker2></mat-datepicker>\r\n                            <input type=\"text\" class=\"form-control has-feedback-left form-control-small\" id=\"inputSuccess7\" [matDatepicker]=\"picker2\" placeholder=\"Date of finish of work\" [min]=\"minDateStart\" name=\"DateFinishWork\" [(ngModel)]=\"emploee.DateFinishWork\">\r\n                            <mat-datepicker-toggle class=\"left\" matSuffix [for]=\"picker2\" style=\"color: #73879C;\"></mat-datepicker-toggle>\r\n                            <span class=\"tooltiptext\">\r\n                                End Work\r\n                            </span>\r\n                        </div>\r\n                        <div class=\"col-md-12 col-sm-12 col-xs-12 form-group has-feedback  black-tooltip\">\r\n                            <input type=\"text\" class=\"form-control has-feedback-left\" id=\"inputSuccess2\" placeholder=\"Comment\" [(ngModel)]=\"emploee.Comment\" name=\"Comment\" autocomplete=\"off\">\r\n                            <span class=\"fa fa-bank form-control-feedback left\" aria-hidden=\"true\"></span>\r\n                            <span class=\"tooltiptext\">\r\n                                Comment\r\n                            </span>\r\n                        </div>\r\n                        <div class=\"col-md-12 col-xs-12\">\r\n                            <div class=\"form-group col-md-6 col-xs-6 text-center\">\r\n                                <button class=\"btn btn-primary alignCenterBtn black-tooltip\" (click)=\"updateEmploee(emploee)\">\r\n                                    Save\r\n                                </button>\r\n                            </div>\r\n                            <div class=\"form-group col-md-6 col-xs-6 text-center\">\r\n                                <button class=\"btn btn-primary alignCenterBtn black-tooltip\" (click)=\"cancel()\">\r\n                                    Cancel\r\n                                </button>\r\n                            </div>\r\n                        </div>\r\n                    </form>\r\n                </div>\r\n            </div>\r\n\r\n        </div>\r\n    </div>\r\n</modal-wrapper>"

/***/ }),

/***/ "./ClientApp/app/components/projects/projects-emploees-edit/projects-emploees-edit.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var common_1 = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
var user_profile_project_service_1 = __webpack_require__("./ClientApp/app/services/user-profile-project.service.ts");
var material_1 = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
var ProjectsEmploeesEditComponent = /** @class */ (function () {
    function ProjectsEmploeesEditComponent(userProfileProjectService, route, dialogRef, data, location) {
        this.userProfileProjectService = userProfileProjectService;
        this.route = route;
        this.dialogRef = dialogRef;
        this.data = data;
        this.location = location;
        this.positions = ['developer', 'project manager', 'quality assurance', 'business analyst', 'team lead', 'designer'];
        this.statuses = ['Working', 'Complete'];
    }
    ProjectsEmploeesEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.id = this.data.emploeeId;
        this.userProfileProjectService.getById(this.id).subscribe(function (response) {
            _this.emploee = response;
            if (_this.emploee.DateStartWork) {
                _this.emploee.DateStartWork = new Date(Date.parse(_this.emploee.DateStartWork.toString()));
                _this.emploee.DateStartWork = (_this.emploee.DateStartWork.getUTCFullYear() > 2010) ? _this.emploee.DateStartWork : null;
            }
            if (_this.emploee.DateFinishWork) {
                _this.emploee.DateFinishWork = new Date(Date.parse(_this.emploee.DateFinishWork.toString()));
                _this.emploee.DateFinishWork = (_this.emploee.DateFinishWork.getUTCFullYear() > 2010) ? _this.emploee.DateFinishWork : null;
            }
        });
        this.minDateStart = new Date();
        this.minDateStart.setUTCFullYear(2018);
    };
    ProjectsEmploeesEditComponent.prototype.updateEmploee = function (emploee) {
        var _this = this;
        if (emploee.DateStartWork) {
            emploee.DateStartWork = new Date(Date.parse(emploee.DateStartWork.toString()));
            emploee.DateStartWork.setMinutes(emploee.DateStartWork.getMinutes() - emploee.DateStartWork.getTimezoneOffset());
        }
        if (emploee.DateFinishWork) {
            emploee.DateFinishWork = new Date(Date.parse(emploee.DateFinishWork.toString()));
            emploee.DateFinishWork.setMinutes(emploee.DateFinishWork.getMinutes() - emploee.DateFinishWork.getTimezoneOffset());
        }
        emploee.ProjectId = this.id;
        this.userProfileProjectService.update(emploee).subscribe(function (response) {
            if (_this.dialogRef != null && _this.dialogRef != undefined)
                _this.dialogRef.close();
        });
    };
    ProjectsEmploeesEditComponent.prototype.cancel = function () {
        if (this.dialogRef != null && this.dialogRef != undefined)
            this.dialogRef.close();
    };
    ProjectsEmploeesEditComponent = __decorate([
        core_1.Component({
            selector: 'projects-emploees-edit',
            template: __webpack_require__("./ClientApp/app/components/projects/projects-emploees-edit/projects-emploees-edit.component.html"),
            styles: [__webpack_require__("./ClientApp/app/components/projects/projects-emploees-edit/projects-emploees-edit.component.css")]
        }),
        __param(2, core_1.Optional()),
        __param(3, core_1.Optional()), __param(3, core_1.Inject(material_1.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [user_profile_project_service_1.UserProfileProjectService,
            router_1.ActivatedRoute,
            material_1.MatDialogRef, Object, common_1.Location])
    ], ProjectsEmploeesEditComponent);
    return ProjectsEmploeesEditComponent;
}());
exports.ProjectsEmploeesEditComponent = ProjectsEmploeesEditComponent;


/***/ }),

/***/ "./ClientApp/app/components/projects/projects-emploees/projects-emploees.component.css":
/***/ (function(module, exports) {

module.exports = ".cancel:hover {\r\n    cursor: pointer;\r\n}\r\n\r\n.cancel {\r\n    border-width: 1px;\r\n    border-color: black;\r\n    border-style: solid;\r\n    padding-left: 3px;\r\n    padding-right: 3px;\r\n}\r\n\r\n.my-table-striped > tbody > tr:nth-of-type(odd) {\r\n    background-color: #f9f9f9 !important;\r\n  }\r\n\r\n.btn-toggle {\r\n    position: absolute !important;\r\n    right: 15px !important;\r\n  }\r\n\r\n.scroll-in-modal {\r\n    height: 500px; overflow-y: auto; overflow-x: hidden;\r\n  }\r\n\r\n.dropdown-menu.pull-right {\r\n    right: 20px !important;\r\n    top: 40px !important;\r\n}\r\n\r\n\r\n"

/***/ }),

/***/ "./ClientApp/app/components/projects/projects-emploees/projects-emploees.component.html":
/***/ (function(module, exports) {

module.exports = "<modal-wrapper [dialogRef]=\"dialogRef\">\r\n\r\n    <div  [className]=\"getClassForTable()\">\r\n        <div class=\"row\">\r\n            <div class=\"col-md-6\">\r\n                <h2 style=\"color: #73879C;\">{{name}}</h2>\r\n            </div>\r\n            <div class=\"col-md-6 text-right\">\r\n                <a href=\"javascript:;\" class=\"user-profile dropdown-toggle\" data-toggle=\"dropdown\" aria-expanded=\"false\" *permission=\"['Super_Admin', 'Admin', 'ProjectManager']\">\r\n                    <button class=\"btn btn-primary btn-toggle\">\r\n                        <span class=\"fa fa-plus\"></span>\r\n                    </button>\r\n                </a>\r\n                <ul class=\"dropdown-menu dropdown-usermenu pull-right\">\r\n                    <li>\r\n                        <a (click)=\"menuAddNew()\" class=\"side-menu-link\">\r\n                            Add Employee to the project\r\n                        </a>\r\n                    </li>\r\n                </ul>\r\n            </div>\r\n        </div>\r\n        <div class=\"row\">\r\n            <div class=\"col-md-12\">\r\n                <h3>\r\n                    Employees:\r\n                </h3>\r\n                <form [formGroup]=\"newEmploeeForm\" (submit)=\"add(newEmploee)\">\r\n                    <div id=\"datatable-responsive_wrapper\" class=\"dataTables_wrapper form-inline dt-bootstrap no-footer\">\r\n                        <div class=\"row\">\r\n                            <div class=\"col-md-12\">\r\n                                <table class=\"table my-table-striped table-bordered projects\" [formGroup]=\"newEmploeeForm\" (submit)=\"add(newEmploee)\" *ngIf=\"emploees != null && emploees != undefined\">\r\n                                    <thead style=\"color: #73879C;\">\r\n                                        <tr>\r\n                                            <th>First & Last Name</th>\r\n                                            <th>Position</th>\r\n                                            <th>Date of start of work</th>\r\n                                            <th>Date of finish of work</th>\r\n                                            <th style=\"width:15%\">Comment</th>\r\n                                            <th>Status</th>\r\n                                            <th *permission=\"['Super_Admin', 'Admin', 'ProjectManager']\" style=\"width: 18%\"></th>\r\n                                        </tr>\r\n                                    </thead>\r\n                                    <tbody>\r\n                                        <tr *ngIf=\"isAddVisible\">\r\n                                            <td>\r\n                                                <select class=\"select2_single form-control\" [(ngModel)]=\"newEmploee.UserProfileId\" formControlName=\"UserProfile\" tabindex=\"-1\">\r\n                                                    <option *ngFor=\"let selectedUser of users; let i = index\" [value]=\"selectedUser.UserProfileId\">\r\n                                                        {{ selectedUser.FirstName }} {{ selectedUser.LastName }}\r\n                                                    </option>\r\n                                                </select>\r\n                                                <div class=\"error-message\" *ngIf=\"newEmploeeForm.get('UserProfile').errors\">\r\n                                                    <span *ngIf=\"newEmploeeForm.get('UserProfile').errors.required && submitAttempt\">User is required</span>\r\n                                                </div>\r\n                                            </td>\r\n                                            <td>\r\n                                                <select class=\"select2_single form-control\" [(ngModel)]=\"newEmploee.Position\" formControlName=\"Position\" tabindex=\"-1\">\r\n                                                    <option *ngFor=\"let position of positions; let i = index\" [value]=\"position\">\r\n                                                        {{ position }}\r\n                                                    </option>\r\n                                                </select>\r\n                                                <div class=\"error-message\" *ngIf=\"newEmploeeForm.get('Position').errors\">\r\n                                                    <span *ngIf=\"newEmploeeForm.get('Position').errors.required && submitAttempt\">Position is required</span>\r\n                                                </div>\r\n                                            </td>\r\n                                            <td>\r\n\r\n\r\n                                                <div class=\"col-md-12 col-sm-12 col-xs-12 form-group has-feedback black-tooltip date-field\">\r\n                                                    <mat-datepicker #picker1></mat-datepicker>\r\n                                                    <input type=\"text\" class=\"form-control has-feedback-left form-control-small\" id=\"inputSuccess7\" [matDatepicker]=\"picker1\" placeholder=\"Start of work\" formControlName=\"DateStartWork\" [(ngModel)]=\"newEmploee.DateStartWork\">\r\n                                                    <mat-datepicker-toggle class=\"left\" matSuffix [for]=\"picker1\" style=\"color: #73879C;\"></mat-datepicker-toggle>\r\n                                                    <span class=\"tooltiptext\">\r\n                                                        Start of work\r\n                                                    </span>\r\n                                                </div>\r\n                                            </td>\r\n                                            <td>\r\n\r\n                                                <div class=\"col-md-12 col-sm-12 col-xs-12 form-group has-feedback black-tooltip date-field\">\r\n                                                    <mat-datepicker #picker2></mat-datepicker>\r\n                                                    <input type=\"text\" class=\"form-control has-feedback-left form-control-small\" id=\"inputSuccess7\" [matDatepicker]=\"picker2\" placeholder=\"End of work\" formControlName=\"DateFinishWork\" [(ngModel)]=\"newEmploee.DateFinishWork\">\r\n                                                    <mat-datepicker-toggle class=\"left\" matSuffix [for]=\"picker2\" style=\"color: #73879C;\"></mat-datepicker-toggle>\r\n                                                    <span class=\"tooltiptext\">\r\n                                                        End of work\r\n                                                    </span>\r\n                                                </div>\r\n                                            </td>\r\n                                            <td style=\"width:15%\">\r\n                                                <div class=\"col-md-12 col-sm-12 col-xs-12 form-group has-feedback black-tooltip\">\r\n                                                    <input type=\"text\" class=\"form-control form-control-small has-feedback-left\" id=\"inputSuccess2\" placeholder=\"Comment\" [(ngModel)]=\"newEmploee.Comment\" formControlName=\"Comment\" autocomplete=\"off\">\r\n                                                    <span class=\"fa fa-bank form-control-feedback left\" aria-hidden=\"true\"></span>\r\n                                                    <span class=\"tooltiptext\">\r\n                                                        Comment\r\n                                                    </span>\r\n                                                </div>\r\n                                            </td>\r\n                                            <td></td>\r\n                                            <td style=\"text-align:right; width: 18%\">\r\n                                                <button type=\"submit\" class=\"btn btn-primary black-tooltip\">\r\n                                                    <i class=\"fa fa-check\"></i>\r\n                                                    <span class=\"tooltiptext\">Save</span>\r\n                                                </button>\r\n                                                <button class=\"btn btn-default black-tooltip\" (click)=\"isAddVisible = false\">\r\n                                                    <i class=\"fa fa-close\"></i>\r\n                                                    <span class=\"tooltiptext\">Cancel</span>\r\n                                                </button>\r\n                                            </td>\r\n                                        </tr>\r\n                                        <ngx-spinner [visible]=\"loading\" [config]=\"spinnerConfig\"></ngx-spinner>\r\n                                        <tr *ngFor=\"let emploee of emploees; let i = index\">\r\n                                            <td><span>{{emploee.FirstName}}{{emploee.LastName }}</span></td>\r\n                                            <td><span>{{emploee.Position }}</span></td>\r\n                                            <td><span>{{emploee.DateStartWork| date:'MM/dd/yyyy'}}</span></td>\r\n                                            <td><span>{{emploee.DateFinishWork| date:'MM/dd/yyyy'}}</span></td>\r\n                                            <td style=\"width:15%\"><span>{{emploee.Comment}}</span></td>\r\n                                            <td><span>{{emploee.Status}}</span></td>\r\n                                            <td *permission=\"['Super_Admin', 'Admin', 'ProjectManager']\" style=\"text-align:right; width: 18%\">\r\n                                                <button class=\"btn btn-primary black-tooltip\" (click)=\"goToUser(emploee)\">\r\n                                                    <i class=\"fa fa-male\"></i>\r\n                                                    <span class=\"tooltiptext\">Go to user</span>\r\n                                                </button>\r\n                                                <button class=\"btn btn-primary black-tooltip\" (click)=\"editProjectDialog(emploee)\">\r\n                                                    <i class=\"fa fa-edit\"></i>\r\n                                                    <span class=\"tooltiptext\">Edit</span>\r\n                                                </button>\r\n                                                <button class=\"btn btn-default black-tooltip\" (click)=\"delete(emploee)\">\r\n                                                    <i class=\"fa fa-trash\"></i>\r\n                                                    <span class=\"tooltiptext\">Delete</span>\r\n                                                </button>\r\n                                            </td>\r\n                                        </tr>\r\n                                    </tbody>\r\n                                </table>\r\n                                <table-buttons [subject]=\"subject\">\r\n\r\n                                </table-buttons>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </form>\r\n\r\n            </div>\r\n        </div>\r\n    </div>\r\n</modal-wrapper>"

/***/ }),

/***/ "./ClientApp/app/components/projects/projects-emploees/projects-emploees.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var projects_service_1 = __webpack_require__("./ClientApp/app/services/projects.service.ts");
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var ngx_spinner_1 = __webpack_require__("./node_modules/@hardpool/ngx-spinner/fesm5/hardpool-ngx-spinner.js");
var user_query_model_1 = __webpack_require__("./ClientApp/app/models/query-models/user-query.model.ts");
var user_storage_service_1 = __webpack_require__("./ClientApp/app/services/user-storage.service.ts");
var users_service_1 = __webpack_require__("./ClientApp/app/services/users.service.ts");
var user_profile_project_model_1 = __webpack_require__("./ClientApp/app/models/user-profile-project.model.ts");
var forms_1 = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
var user_profile_project_service_1 = __webpack_require__("./ClientApp/app/services/user-profile-project.service.ts");
var user_profile_project_query_model_1 = __webpack_require__("./ClientApp/app/models/query-models/user-profile-project-query.model.ts");
var material_1 = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
var projects_emploees_edit_component_1 = __webpack_require__("./ClientApp/app/components/projects/projects-emploees-edit/projects-emploees-edit.component.ts");
var rxjs_1 = __webpack_require__("./node_modules/rxjs/Rx.js");
var delete_confirmation_component_1 = __webpack_require__("./ClientApp/app/components/modals/delete-confirmation/delete-confirmation.component.ts");
var ProjectsEmploeesComponent = /** @class */ (function () {
    function ProjectsEmploeesComponent(projectService, userProfileProjectService, route, userStorageService, usersService, fBuilder, router, dialogRef, data, dialog) {
        this.projectService = projectService;
        this.userProfileProjectService = userProfileProjectService;
        this.route = route;
        this.userStorageService = userStorageService;
        this.usersService = usersService;
        this.fBuilder = fBuilder;
        this.router = router;
        this.dialogRef = dialogRef;
        this.data = data;
        this.dialog = dialog;
        this.clients = new Array();
        this.users = new Array();
        this.emploees = new Array();
        this.loading = false;
        this.editText = 'Edit';
        this.editId = -1;
        this.positions = ['developer', 'project manager', 'quality assurance', 'business analyst', 'team lead', 'designer'];
        this.spinnerConfig = {
            placement: ngx_spinner_1.SPINNER_PLACEMENT.block_ui,
            animation: ngx_spinner_1.SPINNER_ANIMATIONS.spin_3,
            size: "3rem",
            color: "#1574b3"
        };
    }
    ProjectsEmploeesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subject = new rxjs_1.Subject();
        this.queryModel = new user_profile_project_query_model_1.UserProfileProjectQueryModel();
        if (this.projectId != null && this.projectId != undefined)
            this.id = this.projectId;
        if (this.projectName != null && this.projectName != undefined)
            this.name = this.projectName;
        if (this.data != null && this.data != undefined) {
            if (this.data.projectId != null && this.data.projectId != undefined)
                this.id = this.data.projectId;
            if (this.data.projectName != null && this.data.projectName != undefined)
                this.name = this.data.projectName;
            if (this.data.userId != null && this.data.userId != undefined)
                this.userId = this.data.userId;
        }
        this.loading = true;
        this.isAddVisible = false;
        this.editId = -1;
        this.queryModel.Take = 10;
        this.queryModel.ProjectId = this.id;
        this.userProfileProjectService.get(this.queryModel).subscribe(function (response) {
            _this.emploees = response.Result;
            _this.loading = false;
            _this.subject.next({ from: "component", response: response });
            var queryModelUsers = new user_query_model_1.UserQueryModel();
            _this.usersService.get(queryModelUsers).subscribe(function (res) {
                _this.users = res.Result;
            });
            _this.emploees.forEach(function (element) {
                if (element.DateStartWork != null) {
                    element.DateStartWork = new Date(Date.parse(element.DateStartWork.toString()));
                    element.DateStartWork = (element.DateStartWork.getUTCFullYear() > 2010) ? element.DateStartWork : null;
                }
                if (element.DateFinishWork) {
                    element.DateFinishWork = new Date(Date.parse(element.DateFinishWork.toString()));
                    element.DateFinishWork = (element.DateFinishWork.getUTCFullYear() > 2010) ? element.DateFinishWork : null;
                }
            });
        });
        this.subscription = this.subject.asObservable().subscribe(function (response) {
            if (response.from == "tablebuttons") {
                _this.queryModel = response.response;
                if (_this.projectId != null && _this.projectId != undefined)
                    _this.id = _this.projectId;
                if (_this.projectName != null && _this.projectName != undefined)
                    _this.name = _this.projectName;
                if (_this.data != null && _this.data != undefined) {
                    if (_this.data.projectId != null && _this.data.projectId != undefined)
                        _this.id = _this.data.projectId;
                    if (_this.data.projectName != null && _this.data.projectName != undefined)
                        _this.name = _this.data.projectName;
                    if (_this.data.userId != null && _this.data.userId != undefined)
                        _this.userId = _this.data.userId;
                }
                _this.loading = true;
                _this.isAddVisible = false;
                _this.editId = -1;
                _this.queryModel.ProjectId = _this.id;
                _this.userProfileProjectService.get(_this.queryModel).subscribe(function (response) {
                    _this.emploees = response.Result;
                    _this.loading = false;
                    var queryModelUsers = new user_query_model_1.UserQueryModel();
                    _this.usersService.get(queryModelUsers).subscribe(function (res) {
                        _this.users = res.Result;
                    });
                    _this.emploees.forEach(function (element) {
                        if (element.DateStartWork != null) {
                            element.DateStartWork = new Date(Date.parse(element.DateStartWork.toString()));
                            element.DateStartWork = (element.DateStartWork.getUTCFullYear() > 2010) ? element.DateStartWork : null;
                        }
                        if (element.DateFinishWork) {
                            element.DateFinishWork = new Date(Date.parse(element.DateFinishWork.toString()));
                            element.DateFinishWork = (element.DateFinishWork.getUTCFullYear() > 2010) ? element.DateFinishWork : null;
                        }
                    });
                });
            }
        });
        this.initForm();
    };
    ProjectsEmploeesComponent.prototype.initForm = function () {
        this.newEmploeeForm = this.fBuilder.group({
            Position: ['', [
                    forms_1.Validators.required
                ]],
            UserProfile: ['', [
                    forms_1.Validators.required
                ]],
            DateStartWork: [],
            DateFinishWork: [],
            Comment: []
        });
    };
    ProjectsEmploeesComponent.prototype.add = function (newEmploee) {
        var _this = this;
        if (this.newEmploeeForm.valid && this.isAddVisible == true) {
            if (newEmploee.DateStartWork != undefined && newEmploee.DateStartWork != null) {
                newEmploee.DateStartWork = new Date(Date.parse(newEmploee.DateStartWork.toString()));
                newEmploee.DateStartWork.setMinutes(newEmploee.DateStartWork.getMinutes() - newEmploee.DateStartWork.getTimezoneOffset());
            }
            if (newEmploee.DateFinishWork != undefined && newEmploee.DateFinishWork != null) {
                newEmploee.DateFinishWork = new Date(Date.parse(newEmploee.DateFinishWork.toString()));
                newEmploee.DateFinishWork.setMinutes(newEmploee.DateFinishWork.getMinutes() - newEmploee.DateFinishWork.getTimezoneOffset());
            }
            this.submitAttempt = false;
            newEmploee.ProjectId = this.id;
            this.loading = true;
            this.userProfileProjectService.create(newEmploee).subscribe(function (response) {
                var queryModel = new user_profile_project_query_model_1.UserProfileProjectQueryModel();
                queryModel.ProjectId = _this.id;
                _this.userProfileProjectService.get(queryModel).subscribe(function (response) {
                    _this.emploees = response.Result;
                    _this.loading = false;
                    _this.isAddVisible = false;
                });
            });
        }
        else {
            this.submitAttempt = true;
        }
    };
    ProjectsEmploeesComponent.prototype.confirmDeleteDialog = function (emploee, index) {
        var _this = this;
        var dialogConfig = new material_1.MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.position = { top: '0' };
        dialogConfig.autoFocus = false;
        this.dialog.open(delete_confirmation_component_1.DeleteConfirmationComponent, dialogConfig)
            .afterClosed().subscribe(function (dialogResult) {
            if (dialogResult)
                _this.delete(emploee, index);
        });
    };
    ProjectsEmploeesComponent.prototype.delete = function (emploee, indexOnArray) {
        var _this = this;
        this.loading = true;
        this.userProfileProjectService.delete(emploee.Id).subscribe(function (result) {
            var queryModel = new user_profile_project_query_model_1.UserProfileProjectQueryModel();
            queryModel.ProjectId = _this.id;
            _this.userProfileProjectService.get(queryModel).subscribe(function (response) {
                _this.emploees = response.Result;
                _this.isAddVisible = false;
                _this.loading = false;
            });
            _this.status = "Deleted";
        });
    };
    ProjectsEmploeesComponent.prototype.menuAddNew = function () {
        this.isAddVisible = true;
        this.newEmploee = new user_profile_project_model_1.UserProfileProject();
    };
    ProjectsEmploeesComponent.prototype.editProjectDialog = function (emploee) {
        var _this = this;
        var dialogRef = this.dialog.open(projects_emploees_edit_component_1.ProjectsEmploeesEditComponent, {
            width: '1050px',
            data: { emploeeId: emploee.Id }
        });
        this.loading = true;
        this.isAddVisible = false;
        this.editId = -1;
        var queryModel = new user_profile_project_query_model_1.UserProfileProjectQueryModel();
        queryModel.ProjectId = this.id;
        this.userProfileProjectService.get(queryModel).subscribe(function (response) {
            _this.emploees = response.Result;
            var queryModelUsers = new user_query_model_1.UserQueryModel();
            _this.usersService.get(queryModelUsers).subscribe(function (res) {
                _this.users = res.Result;
                _this.loading = false;
            });
        });
        this.initForm();
    };
    ProjectsEmploeesComponent.prototype.cancel = function () {
        if (this.dialogRef != null && this.dialogRef != undefined)
            this.dialogRef.close();
    };
    ProjectsEmploeesComponent.prototype.goToUser = function (emploee) {
        if (this.dialogRef != null)
            this.dialogRef.close();
        this.router.navigateByUrl('/users/' + emploee.UserProfileId + '/info');
    };
    ProjectsEmploeesComponent.prototype.getClassForTable = function () {
        if (this.data != undefined && this.data != null) {
            return "card x_panel scroll-in-modal";
        }
        else
            return "card x_panel";
    };
    __decorate([
        core_1.Input('projectId'),
        __metadata("design:type", Number)
    ], ProjectsEmploeesComponent.prototype, "projectId", void 0);
    __decorate([
        core_1.Input('projectName'),
        __metadata("design:type", String)
    ], ProjectsEmploeesComponent.prototype, "projectName", void 0);
    __decorate([
        core_1.Input('isNotModal'),
        __metadata("design:type", Boolean)
    ], ProjectsEmploeesComponent.prototype, "isNotModal", void 0);
    ProjectsEmploeesComponent = __decorate([
        core_1.Component({
            selector: 'projects-emploees',
            template: __webpack_require__("./ClientApp/app/components/projects/projects-emploees/projects-emploees.component.html"),
            styles: [__webpack_require__("./ClientApp/app/components/projects/projects-emploees/projects-emploees.component.css")]
        }),
        __param(7, core_1.Optional()),
        __param(8, core_1.Optional()), __param(8, core_1.Inject(material_1.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [projects_service_1.ProjectsService,
            user_profile_project_service_1.UserProfileProjectService,
            router_1.ActivatedRoute,
            user_storage_service_1.UserStorageService,
            users_service_1.UsersService,
            forms_1.FormBuilder,
            router_1.Router,
            material_1.MatDialogRef, Object, material_1.MatDialog])
    ], ProjectsEmploeesComponent);
    return ProjectsEmploeesComponent;
}());
exports.ProjectsEmploeesComponent = ProjectsEmploeesComponent;


/***/ }),

/***/ "./ClientApp/app/components/projects/projects-list-for-user/projects-list-for-user.component.css":
/***/ (function(module, exports) {

module.exports = ".my-table-striped > tbody > tr:nth-of-type(odd) {\r\n  background-color: #f9f9f9 !important;\r\n}"

/***/ }),

/***/ "./ClientApp/app/components/projects/projects-list-for-user/projects-list-for-user.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"card x_panel\" style=\"margin-top: 20px !important;\">\r\n    <div class=\"row\">\r\n        <div class=\"col-md-6\">\r\n            <h2>Projects</h2>\r\n        </div>\r\n        <div class=\"col-md-6 text-right\">\r\n            <div class=\"row\">\r\n                <div class=\"col-md-4\">\r\n\r\n                </div>\r\n\r\n                <div class=\"col-md-4 text-right\">\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div id=\"datatable-responsive_wrapper\" class=\"dataTables_wrapper form-inline dt-bootstrap no-footer\">\r\n        <div class=\"row\">\r\n            <div class=\"col-md-12\">\r\n                <table class=\"table my-table-striped table-bordered projects\">\r\n                    <thead class=\"text-primary\">\r\n                        <tr>\r\n                            <th>Project</th>\r\n                            <th>Role in the project</th>\r\n                            <th>Work time in the project(days)</th>\r\n                            <th></th>\r\n                        </tr>\r\n                    </thead>\r\n                    <tbody>\r\n                        <ngx-spinner [visible]=\"loading\" [config]=\"spinnerConfig\"></ngx-spinner>\r\n                        <tr *ngFor=\"let emploee of emploees; let i = index\">\r\n                            <td><span>{{emploee.ProjectName}}</span></td>\r\n                            <td><span>{{emploee.Position}}</span></td>\r\n                            <td><span>{{getTime(emploee)}}</span></td>\r\n                            <td style=\"text-align:right\">\r\n                                <button class=\"btn btn-primary btn-go-to-user black-tooltip\" (click)=\"showEmploeesDialog(emploee)\">\r\n                                    <i class=\"fa fa-users\"></i>\r\n                                    <span class=\"tooltiptext\">All employees</span>\r\n                                </button>\r\n                            </td>\r\n                        </tr>\r\n                    </tbody>\r\n                </table>\r\n                <table-buttons [subject]=\"subject\">\r\n                </table-buttons>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "./ClientApp/app/components/projects/projects-list-for-user/projects-list-for-user.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var forms_1 = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
var ngx_spinner_1 = __webpack_require__("./node_modules/@hardpool/ngx-spinner/fesm5/hardpool-ngx-spinner.js");
var user_storage_service_1 = __webpack_require__("./ClientApp/app/services/user-storage.service.ts");
var projects_service_1 = __webpack_require__("./ClientApp/app/services/projects.service.ts");
var user_profile_project_query_model_1 = __webpack_require__("./ClientApp/app/models/query-models/user-profile-project-query.model.ts");
var user_profile_project_service_1 = __webpack_require__("./ClientApp/app/services/user-profile-project.service.ts");
var common_1 = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
var projects_emploees_component_1 = __webpack_require__("./ClientApp/app/components/projects/projects-emploees/projects-emploees.component.ts");
var material_1 = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
var rxjs_1 = __webpack_require__("./node_modules/rxjs/Rx.js");
var ProjectsListForUserComponent = /** @class */ (function () {
    function ProjectsListForUserComponent(projectService, userStorageService, fBuilder, dialog, userProfileProjectService, location) {
        this.projectService = projectService;
        this.userStorageService = userStorageService;
        this.fBuilder = fBuilder;
        this.dialog = dialog;
        this.userProfileProjectService = userProfileProjectService;
        this.location = location;
        this.emploees = new Array();
        this.clients = new Array();
        this.loading = false;
        this.spinnerConfig = {
            placement: ngx_spinner_1.SPINNER_PLACEMENT.block_ui,
            animation: ngx_spinner_1.SPINNER_ANIMATIONS.spin_3,
            size: "3rem",
            color: "#1574b3"
        };
    }
    ProjectsListForUserComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subject = new rxjs_1.Subject();
        this.isAddVisible = false;
        this.queryModel = new user_profile_project_query_model_1.UserProfileProjectQueryModel();
        if (this.userId != null)
            this.id = this.userId;
        this.loading = true;
        this.queryModel.UserProfileId = this.id;
        this.queryModel.Take = 10;
        this.userProfileProjectService.get(this.queryModel).subscribe(function (response) {
            _this.emploees = response.Result;
            _this.subject.next({ from: "component", response: response });
            _this.loading = false;
        });
        this.subscription = this.subject.asObservable().subscribe(function (response) {
            if (response.from == "tablebuttons") {
                _this.queryModel = response.response;
                if (_this.userId != null)
                    _this.id = _this.userId;
                _this.loading = true;
                _this.queryModel.UserProfileId = _this.id;
                _this.userProfileProjectService.get(_this.queryModel).subscribe(function (response) {
                    _this.emploees = response.Result;
                    _this.loading = false;
                });
            }
        });
    };
    ProjectsListForUserComponent.prototype.getTime = function (currentEmploee) {
        if (currentEmploee.DateFinishWork == null)
            return 0;
        if (currentEmploee.DateStartWork == null)
            return 0;
        var date1 = new Date(Date.parse(currentEmploee.DateStartWork.toString()));
        var date2 = new Date();
        var date3 = new Date(Date.parse(currentEmploee.DateFinishWork.toString()));
        var timeDiff = (date3 > date1) ? Math.abs(date3.getTime() - date1.getTime()) : Math.abs(date2.getTime() - date1.getTime());
        return Math.ceil(timeDiff / (1000 * 3600 * 24));
    };
    ProjectsListForUserComponent.prototype.showEmploeesDialog = function (emploee) {
        var dialogRef = this.dialog.open(projects_emploees_component_1.ProjectsEmploeesComponent, {
            width: '1050px',
            data: { projectId: emploee.ProjectId, projectName: emploee.ProjectName, userId: this.userId }
        });
    };
    ProjectsListForUserComponent.prototype.goBack = function () {
        this.location.back();
    };
    __decorate([
        core_1.Input('userId'),
        __metadata("design:type", Number)
    ], ProjectsListForUserComponent.prototype, "userId", void 0);
    ProjectsListForUserComponent = __decorate([
        core_1.Component({
            selector: 'projects-list-for-user',
            template: __webpack_require__("./ClientApp/app/components/projects/projects-list-for-user/projects-list-for-user.component.html"),
            styles: [__webpack_require__("./ClientApp/app/components/projects/projects-list-for-user/projects-list-for-user.component.css")]
        }),
        __metadata("design:paramtypes", [projects_service_1.ProjectsService,
            user_storage_service_1.UserStorageService,
            forms_1.FormBuilder,
            material_1.MatDialog,
            user_profile_project_service_1.UserProfileProjectService,
            common_1.Location])
    ], ProjectsListForUserComponent);
    return ProjectsListForUserComponent;
}());
exports.ProjectsListForUserComponent = ProjectsListForUserComponent;


/***/ }),

/***/ "./ClientApp/app/components/projects/projects-list/projects-list.component.css":
/***/ (function(module, exports) {

module.exports = "   .my-table-striped > tbody > tr:nth-of-type(odd) {\r\n    background-color: #f9f9f9 !important;\r\n  }\r\n\r\n  .cancel:hover {\r\n    cursor: pointer;\r\n}\r\n\r\n  .cancel {\r\n    border-width: 1px;\r\n    border-color: black;\r\n    border-style: solid;\r\n    padding-left: 3px;\r\n    padding-right: 3px;\r\n}\r\n\r\n  .fa-angle-left:hover {\r\n  cursor: pointer;\r\n}\r\n\r\n  .fa-angle-right:hover {\r\n  cursor: pointer;\r\n}\r\n\r\n  .fa-angle-left {\r\n  vertical-align: super;\r\n}\r\n\r\n  .fa-angle-right {\r\n  vertical-align: super;\r\n}\r\n\r\n  .scroll-in-modal {\r\n  height: 500px; overflow-y: auto; overflow-x: hidden;\r\n}\r\n\r\n  .btn-toggle {\r\n  position: relative;\r\n  right: -5px !important\r\n}\r\n\r\n  .btn-toggle-in-modal {\r\n  position: relative;\r\n  right: -5px !important;\r\n}\r\n\r\n  .dropdown-menu.pull-right {\r\n  right: 10px !important;\r\n}\r\n\r\n  .link:hover {\r\n  cursor: pointer;\r\n}"

/***/ }),

/***/ "./ClientApp/app/components/projects/projects-list/projects-list.component.html":
/***/ (function(module, exports) {

module.exports = "<modal-wrapper [dialogRef]=\"dialogRef\">\r\n\r\n    <div [className]=\"getClassForTable()\" *ngIf=\"projects\">\r\n        <div class=\"row\">\r\n            <div class=\"col-md-6\">\r\n                <h2 style=\"color: #73879C;\">Projects</h2>\r\n            </div>\r\n            <div class=\"col-md-6 text-right\">\r\n                <a href=\"javascript:;\" class=\"user-profile dropdown-toggle\" data-toggle=\"dropdown\" aria-expanded=\"false\" *permission=\"['Super_Admin', 'Admin', 'ProjectManager']\">\r\n                    <button [className]=\"getClassForToggleButton()\">\r\n                        <span class=\"fa fa-plus\"></span>\r\n                    </button>\r\n                </a>\r\n                <ul class=\"dropdown-menu dropdown-usermenu pull-right\">\r\n                    <li>\r\n                        <a (click)=\"createProjectDialog()\" class=\"side-menu-link\">\r\n                            Add new Project\r\n                        </a>\r\n                    </li>\r\n                </ul>\r\n            </div>\r\n        </div>\r\n        <div class=\"row\">\r\n            <div class=\"col-md-12\">\r\n                <div id=\"datatable-responsive_wrapper\" class=\"dataTables_wrapper form-inline dt-bootstrap no-footer\">\r\n                    <table class=\"table my-table-striped table-bordered projects\">\r\n                        <thead style=\"color: #73879C;\">\r\n                            <tr>\r\n                                <th style=\"width: 20%\">Project Name</th>\r\n                                <th>Team Members</th>\r\n                                <th>Date of start</th>\r\n                                <th>Comment</th>\r\n                                <th></th>\r\n                            </tr>\r\n                        </thead>\r\n                        <tbody>\r\n                            <ngx-spinner [visible]=\"loading\" [config]=\"spinnerConfig\"></ngx-spinner>\r\n                            <tr *ngFor=\"let project of projects; let i = index\">\r\n                                <td class=\"link\"  (click)=\"showEmploeesDialog(project)\">\r\n                                    <a>{{project.Name}}</a>\r\n                                </td>\r\n                                <td>\r\n                                    <ul class=\"list-inline\">\r\n                                        <li *ngIf=\"project.EmploeesAvatars.length > 5 && numbers[i][0] > 0\" (click)=\"decrementIndexes(i)\">\r\n\r\n                                            <i class=\"fa fa-angle-left fa-2x\"></i>\r\n                                        </li>\r\n                                        <div style=\"display: inline-block;\" *ngFor=\"let avatar of project.EmploeesAvatars; let j = index\">\r\n                                            <li *ngIf=\"j >= numbers[i][0] && j <= numbers[i][1]\">\r\n                                                <div class=\"black-tooltip\">\r\n                                                    <img [src]=\"avatar\" class=\"avatar\" alt=\"Avatar\">\r\n                                                    <span class=\"tooltiptext\">{{project.EmploeesPositions[j]}}</span>\r\n                                                </div>\r\n                                            </li>\r\n                                        </div>\r\n\r\n                                        <li *ngIf=\"project.EmploeesAvatars.length > 5 && numbers[i][1] < projects[i].EmploeesAvatars.length - 1\" (click)=\"incrementIndexes(i)\">\r\n                                            <i class=\"fa fa-angle-right fa-2x \"></i>\r\n                                        </li>\r\n                                    </ul>\r\n                                </td>\r\n                                <td>\r\n                                    {{project.DateBegin| date:'MM/dd/yyyy'}}\r\n                                </td>\r\n                                <td>\r\n                                    {{project.Comment}}\r\n                                </td>\r\n                                <td style=\"text-align:right\">\r\n                                    <a class=\"btn btn-primary black-tooltip\" (click)=\"showClient(project)\" *permission=\"['Super_Admin', 'Admin', 'ProjectManager']\">\r\n                                        <i class=\"fa fa-male\"></i>\r\n                                        <span class=\"tooltiptext\">{{getToolTipText(project)}}</span>\r\n                                    </a>\r\n                                    <a class=\"btn btn-primary black-tooltip\" (click)=\"showEmploeesDialog(project)\">\r\n                                        <i class=\"fa fa-eye\"></i>\r\n                                        <span class=\"tooltiptext\">View</span>\r\n                                    </a>\r\n                                    <a class=\"btn btn-primary black-tooltip\" (click)=\"editProjectDialog(project, i)\" *permission=\"['Super_Admin', 'Admin', 'ProjectManager']\">\r\n                                        <i class=\"fa fa-pencil\"></i>\r\n                                        <span class=\"tooltiptext\">Edit</span>\r\n                                    </a>\r\n                                    <a class=\"btn btn-default black-tooltip\" (click)=\"confirmDeleteDialog(project.Id, i)\" *permission=\"['Super_Admin', 'Admin', 'ProjectManager']\">\r\n                                        <i class=\"fa fa-trash-o\"></i>\r\n                                        <span class=\"tooltiptext\">Delete</span>\r\n                                    </a>\r\n                                </td>\r\n                            </tr>\r\n                        </tbody>\r\n                    </table>\r\n\r\n                    <table-buttons [subject]=\"subject\">\r\n                    </table-buttons>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</modal-wrapper>"

/***/ }),

/***/ "./ClientApp/app/components/projects/projects-list/projects-list.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var common_1 = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
var forms_1 = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
var ngx_spinner_1 = __webpack_require__("./node_modules/@hardpool/ngx-spinner/fesm5/hardpool-ngx-spinner.js");
var user_storage_service_1 = __webpack_require__("./ClientApp/app/services/user-storage.service.ts");
var project_model_1 = __webpack_require__("./ClientApp/app/models/project.model.ts");
var projects_service_1 = __webpack_require__("./ClientApp/app/services/projects.service.ts");
var project_query_model_1 = __webpack_require__("./ClientApp/app/models/query-models/project-query.model.ts");
var clients_service_1 = __webpack_require__("./ClientApp/app/services/clients.service.ts");
var client_query_model_1 = __webpack_require__("./ClientApp/app/models/query-models/client-query.model.ts");
var users_service_1 = __webpack_require__("./ClientApp/app/services/users.service.ts");
var material_1 = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
var projects_emploees_component_1 = __webpack_require__("./ClientApp/app/components/projects/projects-emploees/projects-emploees.component.ts");
var projects_edit_component_1 = __webpack_require__("./ClientApp/app/components/projects/projects-edit/projects-edit.component.ts");
var delete_confirmation_component_1 = __webpack_require__("./ClientApp/app/components/modals/delete-confirmation/delete-confirmation.component.ts");
var rxjs_1 = __webpack_require__("./node_modules/rxjs/Rx.js");
var projects_create_component_1 = __webpack_require__("./ClientApp/app/components/projects/projects-create/projects-create.component.ts");
var user_profile_project_service_1 = __webpack_require__("./ClientApp/app/services/user-profile-project.service.ts");
var clients_info_component_1 = __webpack_require__("./ClientApp/app/components/clients/clients-info/clients-info.component.ts");
var ProjectsListComponent = /** @class */ (function () {
    function ProjectsListComponent(projectService, clientsService, userStorageService, usersService, userProfileProject, route, fBuilder, dialog, location, dialogRef, data) {
        this.projectService = projectService;
        this.clientsService = clientsService;
        this.userStorageService = userStorageService;
        this.usersService = usersService;
        this.userProfileProject = userProfileProject;
        this.route = route;
        this.fBuilder = fBuilder;
        this.dialog = dialog;
        this.location = location;
        this.dialogRef = dialogRef;
        this.data = data;
        this.newProject = new project_model_1.Project();
        this.projects = new Array();
        this.clients = new Array();
        this.loading = false;
        this.spinnerConfig = {
            placement: ngx_spinner_1.SPINNER_PLACEMENT.block_ui,
            animation: ngx_spinner_1.SPINNER_ANIMATIONS.spin_3,
            size: "3rem",
            color: "#1574b3"
        };
    }
    ProjectsListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subject = new rxjs_1.Subject();
        this.queryModel = new project_query_model_1.ProjectQueryModel();
        this.queryModel.Take = 10;
        this.isAddVisible = false;
        if (this.data != undefined && this.data != null) {
            this.clientId = this.data.clientId;
        }
        if (this.clientId != null)
            this.queryModel.ClientId = this.clientId;
        this.queryModel.UserId = this.userStorageService.getId();
        this.loading = true;
        this.projectService.get(this.queryModel).subscribe(function (response) {
            _this.projects = response.Result;
            _this.subject.next({ from: "component", response: response });
            _this.loading = false;
            _this.numbers = new Array(_this.projects.length);
            for (var index = 0; index < _this.numbers.length; index++) {
                _this.numbers[index] = new Array(2);
                _this.numbers[index][0] = 0;
                _this.numbers[index][1] = Math.min(4, _this.projects[index].EmploeesAvatars.length - 1);
            }
            _this.projects.forEach(function (element) {
                if (element.DateBegin != null) {
                    element.DateBegin = new Date(Date.parse(element.DateBegin.toString()));
                    element.DateBegin = (element.DateBegin.getUTCFullYear() > 2010) ? element.DateBegin : null;
                }
                if (element.DateEnd != null) {
                    element.DateEnd = new Date(Date.parse(element.DateEnd.toString()));
                    element.DateEnd = (element.DateEnd.getUTCFullYear() > 2010) ? element.DateEnd : null;
                }
            });
            var queryModelClients = new client_query_model_1.ClientQueryModel();
            queryModelClients.Take = 10;
            _this.clientsService.get(queryModelClients).subscribe(function (resp) {
                _this.clients = resp.Result;
                _this.loading = false;
            });
        });
        this.subscription = this.subject.asObservable().subscribe(function (response) {
            if (response.from == "tablebuttons") {
                _this.queryModel = response.response;
                if (_this.clientId != null)
                    _this.queryModel.ClientId = _this.clientId;
                _this.queryModel.UserId = _this.userStorageService.getId();
                _this.loading = true;
                _this.projectService.get(_this.queryModel).subscribe(function (response) {
                    _this.projects = response.Result;
                    _this.loading = false;
                    _this.numbers = new Array(_this.projects.length);
                    for (var index = 0; index < _this.numbers.length; index++) {
                        _this.numbers[index] = new Array(2);
                        _this.numbers[index][0] = 0;
                        _this.numbers[index][1] = Math.min(4, _this.projects[index].EmploeesAvatars.length - 1);
                    }
                    _this.projects.forEach(function (element) {
                        if (element.DateBegin != null) {
                            element.DateBegin = new Date(Date.parse(element.DateBegin.toString()));
                            element.DateBegin = (element.DateBegin.getUTCFullYear() > 2010) ? element.DateBegin : null;
                        }
                        if (element.DateEnd != null) {
                            element.DateEnd = new Date(Date.parse(element.DateEnd.toString()));
                            element.DateEnd = (element.DateEnd.getUTCFullYear() > 2010) ? element.DateEnd : null;
                        }
                    });
                    var queryModelClients = new client_query_model_1.ClientQueryModel();
                    queryModelClients.Take = 10;
                    _this.clientsService.get(queryModelClients).subscribe(function (resp) {
                        _this.clients = resp.Result;
                        _this.loading = false;
                    });
                });
            }
        });
        this.initForm();
    };
    ProjectsListComponent.prototype.initForm = function () {
        this.newProjectForm = this.fBuilder.group({
            Name: ['', [
                    forms_1.Validators.required
                ]],
            BeginDate: [],
            Users: [],
            EndDate: [],
            Comment: [],
            selectClient: ['', [
                    forms_1.Validators.required
                ]],
        });
    };
    ProjectsListComponent.prototype.confirmDeleteDialog = function (id, index) {
        var _this = this;
        var dialogConfig = new material_1.MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.position = { top: '0' };
        dialogConfig.autoFocus = false;
        this.dialog.open(delete_confirmation_component_1.DeleteConfirmationComponent, dialogConfig)
            .afterClosed().subscribe(function (dialogResult) {
            if (dialogResult)
                _this.delete(id, index);
        });
    };
    ProjectsListComponent.prototype.delete = function (index, indexOnArray) {
        var _this = this;
        this.projectService.delete(index).subscribe(function (result) {
            _this.queryModel.UserId = _this.userStorageService.getId();
            _this.loading = true;
            _this.projectService.get(_this.queryModel).subscribe(function (response) {
                _this.projects = response.Result;
                _this.subject.next({ from: "component", response: response });
                _this.loading = false;
                var queryModelClients = new client_query_model_1.ClientQueryModel();
                _this.clientsService.get(queryModelClients).subscribe(function (resp) {
                    _this.clients = resp.Result;
                    _this.loading = false;
                });
                _this.status = "Deleted";
            });
        });
    };
    ProjectsListComponent.prototype.menuAddNew = function () {
        this.isAddVisible = true;
        this.newProject = new project_model_1.Project();
    };
    ProjectsListComponent.prototype.getTime = function (currentProject) {
        var date1 = new Date(Date.parse(currentProject.DateBegin.toString()));
        var date2 = new Date();
        var date3 = new Date(Date.parse(currentProject.DateEnd.toString()));
        var timeDiff = (date3 > date1) ? Math.abs(date3.getTime() - date1.getTime()) : Math.abs(date2.getTime() - date1.getTime());
        return Math.ceil(timeDiff / (1000 * 3600 * 24));
    };
    ProjectsListComponent.prototype.showEmploeesDialog = function (project) {
        var _this = this;
        var dialogRef = this.dialog.open(projects_emploees_component_1.ProjectsEmploeesComponent, {
            width: '1500px',
            data: { projectId: project.Id, projectName: project.Name }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.isAddVisible = false;
            if (_this.clientId != null)
                _this.queryModel.ClientId = _this.clientId;
            _this.queryModel.UserId = _this.userStorageService.getId();
            _this.projectService.get(_this.queryModel).subscribe(function (response) {
                _this.projects = response.Result;
            });
            _this.initForm();
        });
    };
    ProjectsListComponent.prototype.editProjectDialog = function (project, i) {
        var _this = this;
        var dialogRef = this.dialog.open(projects_edit_component_1.ProjectsEditComponent, {
            width: '800px',
            data: { projectId: project.Id, projectName: project.Name, clientId: (this.data != undefined && this.data != null) ? this.data.clientId : null }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.isAddVisible = false;
            if (_this.clientId != null)
                _this.queryModel.ClientId = _this.clientId;
            _this.queryModel.UserId = _this.userStorageService.getId();
            _this.projectService.get(_this.queryModel).subscribe(function (response) {
                _this.projects = response.Result;
            });
            _this.initForm();
        });
    };
    ProjectsListComponent.prototype.createProjectDialog = function () {
        var _this = this;
        var dialogRef2 = this.dialog.open(projects_create_component_1.ProjectsCreateComponent, {
            width: '800px',
            data: { fromProjectPage: true, clientId: this.clientId }
        });
        dialogRef2.afterClosed().subscribe(function (result) {
            if (_this.clientId != null)
                _this.queryModel.ClientId = _this.clientId;
            _this.queryModel.UserId = _this.userStorageService.getId();
            _this.loading = true;
            _this.projectService.get(_this.queryModel).subscribe(function (response) {
                _this.projects = response.Result;
                _this.loading = false;
                _this.numbers = new Array(_this.projects.length);
                for (var index = 0; index < _this.numbers.length; index++) {
                    _this.numbers[index] = new Array(2);
                    _this.numbers[index][0] = 0;
                    _this.numbers[index][1] = Math.min(4, _this.projects[index].EmploeesAvatars.length - 1);
                }
                _this.projects.forEach(function (element) {
                    if (element.DateBegin != null) {
                        element.DateBegin = new Date(Date.parse(element.DateBegin.toString()));
                        element.DateBegin = (element.DateBegin.getUTCFullYear() > 2010) ? element.DateBegin : null;
                    }
                    if (element.DateEnd != null) {
                        element.DateEnd = new Date(Date.parse(element.DateEnd.toString()));
                        element.DateEnd = (element.DateEnd.getUTCFullYear() > 2010) ? element.DateEnd : null;
                    }
                });
            });
            _this.initForm();
        });
    };
    ProjectsListComponent.prototype.goBack = function () {
        this.location.back();
    };
    ProjectsListComponent.prototype.showClient = function (project) {
        if (project.ClientId != null && project.ClientId != undefined) {
            var dialogRef = this.dialog.open(clients_info_component_1.ClientsInfoComponent, {
                width: '800px',
                data: { clientId: project.ClientId, fullInfo: true }
            });
        }
    };
    ProjectsListComponent.prototype.cancel = function () {
        if (this.dialogRef != null && this.dialogRef != undefined)
            this.dialogRef.close();
    };
    ProjectsListComponent.prototype.keyEvent = function (event) {
        if (event.keyCode === 13) {
            this.cancel();
        }
        if (event.keyCode === 27) {
            this.cancel();
        }
    };
    ProjectsListComponent.prototype.decrementIndexes = function (i) {
        if (this.numbers[i][0] > 0) {
            this.numbers[i][0]--;
            this.numbers[i][1]--;
        }
    };
    ProjectsListComponent.prototype.incrementIndexes = function (i) {
        if (this.numbers[i][1] < this.projects[i].EmploeesAvatars.length - 1) {
            this.numbers[i][0]++;
            this.numbers[i][1]++;
        }
    };
    ProjectsListComponent.prototype.getClassForTable = function () {
        if (this.data != undefined && this.data != null) {
            return "card x_panel scroll-in-modal";
        }
        else
            return "card x_panel";
    };
    ProjectsListComponent.prototype.getClassForClientButton = function (project) {
        if (project.ClientId != null && project.ClientId != undefined) {
            return "btn btn-primary black-tooltip";
        }
        else
            return "btn btn-primary black-tooltip disabled";
    };
    ProjectsListComponent.prototype.getToolTipText = function (project) {
        if (project.ClientId != null && project.ClientId != undefined) {
            return "Client";
        }
        else
            return "Client not exist";
    };
    ProjectsListComponent.prototype.getClassForToggleButton = function () {
        if (this.data != undefined && this.data != null) {
            return "btn btn-primary btn-toggle-in-modal";
        }
        else
            return "btn btn-primary btn-toggle";
    };
    __decorate([
        core_1.Input('clientId'),
        __metadata("design:type", Number)
    ], ProjectsListComponent.prototype, "clientId", void 0);
    __decorate([
        core_1.HostListener('window:keyup', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [KeyboardEvent]),
        __metadata("design:returntype", void 0)
    ], ProjectsListComponent.prototype, "keyEvent", null);
    ProjectsListComponent = __decorate([
        core_1.Component({
            selector: 'projects-list',
            template: __webpack_require__("./ClientApp/app/components/projects/projects-list/projects-list.component.html"),
            styles: [__webpack_require__("./ClientApp/app/components/projects/projects-list/projects-list.component.css")]
        }),
        __param(9, core_1.Optional()),
        __param(10, core_1.Optional()), __param(10, core_1.Inject(material_1.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [projects_service_1.ProjectsService,
            clients_service_1.ClientsService,
            user_storage_service_1.UserStorageService,
            users_service_1.UsersService,
            user_profile_project_service_1.UserProfileProjectService,
            router_1.ActivatedRoute,
            forms_1.FormBuilder,
            material_1.MatDialog,
            common_1.Location,
            material_1.MatDialogRef, Object])
    ], ProjectsListComponent);
    return ProjectsListComponent;
}());
exports.ProjectsListComponent = ProjectsListComponent;


/***/ }),

/***/ "./ClientApp/app/components/projects/projects-routing.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var permission_guard_1 = __webpack_require__("./ClientApp/app/guards/permission.guard.ts");
var projects_list_component_1 = __webpack_require__("./ClientApp/app/components/projects/projects-list/projects-list.component.ts");
var projects_emploees_component_1 = __webpack_require__("./ClientApp/app/components/projects/projects-emploees/projects-emploees.component.ts");
var projects_edit_component_1 = __webpack_require__("./ClientApp/app/components/projects/projects-edit/projects-edit.component.ts");
var projects_emploees_edit_component_1 = __webpack_require__("./ClientApp/app/components/projects/projects-emploees-edit/projects-emploees-edit.component.ts");
var routes = [
    { path: ':id/emploees', component: projects_emploees_component_1.ProjectsEmploeesComponent, canActivate: [permission_guard_1.PermissionGuard], data: { roles: ['Super_Admin', 'Admin', 'ProjectManager'], forCurrentUser: false } },
    { path: '', component: projects_list_component_1.ProjectsListComponent, canActivate: [permission_guard_1.PermissionGuard], data: { roles: ['Super_Admin', 'Admin', 'ProjectManager', 'HumanResource'], forCurrentUser: false } },
    { path: ':id/edit', component: projects_edit_component_1.ProjectsEditComponent, canActivate: [permission_guard_1.PermissionGuard], data: { roles: ['Super_Admin', 'Admin', 'ProjectManager'], forCurrentUser: false } },
    { path: ':id/emploees/:e_id/edit', component: projects_emploees_edit_component_1.ProjectsEmploeesEditComponent, canActivate: [permission_guard_1.PermissionGuard], data: { roles: ['Super_Admin', 'Admin', 'ProjectManager'], forCurrentUser: false } }
];
var ProjectsRoutingModule = /** @class */ (function () {
    function ProjectsRoutingModule() {
    }
    ProjectsRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            providers: [permission_guard_1.PermissionGuard],
            exports: [router_1.RouterModule]
        })
    ], ProjectsRoutingModule);
    return ProjectsRoutingModule;
}());
exports.ProjectsRoutingModule = ProjectsRoutingModule;


/***/ }),

/***/ "./ClientApp/app/components/projects/projects.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var projects_list_component_1 = __webpack_require__("./ClientApp/app/components/projects/projects-list/projects-list.component.ts");
var projects_emploees_component_1 = __webpack_require__("./ClientApp/app/components/projects/projects-emploees/projects-emploees.component.ts");
var projects_edit_component_1 = __webpack_require__("./ClientApp/app/components/projects/projects-edit/projects-edit.component.ts");
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var shared_module_1 = __webpack_require__("./ClientApp/app/modules/shared.module.ts");
var projects_routing_module_1 = __webpack_require__("./ClientApp/app/components/projects/projects-routing.module.ts");
var projects_emploees_edit_component_1 = __webpack_require__("./ClientApp/app/components/projects/projects-emploees-edit/projects-emploees-edit.component.ts");
var projects_list_for_user_component_1 = __webpack_require__("./ClientApp/app/components/projects/projects-list-for-user/projects-list-for-user.component.ts");
var ProjectsModule = /** @class */ (function () {
    function ProjectsModule() {
    }
    ProjectsModule = __decorate([
        core_1.NgModule({
            declarations: [
                projects_list_component_1.ProjectsListComponent,
                projects_emploees_component_1.ProjectsEmploeesComponent,
                projects_edit_component_1.ProjectsEditComponent,
                projects_emploees_edit_component_1.ProjectsEmploeesEditComponent,
                projects_list_for_user_component_1.ProjectsListForUserComponent,
            ],
            imports: [
                projects_routing_module_1.ProjectsRoutingModule,
                shared_module_1.SharedModule
            ],
            exports: [router_1.RouterModule,
                projects_list_component_1.ProjectsListComponent,
                projects_list_for_user_component_1.ProjectsListForUserComponent,
                projects_edit_component_1.ProjectsEditComponent],
            providers: []
        })
    ], ProjectsModule);
    return ProjectsModule;
}());
exports.ProjectsModule = ProjectsModule;


/***/ }),

/***/ "./ClientApp/app/components/work-activity/overtimes/overtimes-edit/overtimes-edit.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"card x_panel\">\r\n    <div id=\"divDataBody\" class=\"container entity\">\r\n        <div class=\"row formTitle\">\r\n            <div class=\"col-md-6\">\r\n                <h2 class=\"title\">Update work on weekend</h2>\r\n            </div>\r\n            <div class=\"col-md-6 text-right\">\r\n                <div class=\"row\">\r\n                    <div class=\"col-md-4\">\r\n                    </div>\r\n                    <div class=\"col-md-4\">\r\n                    </div>\r\n                    <div class=\"col-md-4 text-right\">\r\n                        <div class=\"row\">\r\n                            <div class=\"col-md-3\">\r\n\r\n                            </div>\r\n                            <div class=\"col-md-3\">\r\n\r\n                            </div>\r\n                            <div class=\"col-md-3\">\r\n                                <button class=\"go-back btn btn-round btn-primary\" (click)=\"goBack()\">\r\n                                    <i class=\"fa fa-arrow-left\"></i>\r\n                                    Back\r\n                                </button>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"row\">\r\n            <div class=\"col-md-4\">\r\n\r\n            </div>\r\n            <div class=\"col-md-4\">\r\n                <form name=\"addpost\" class=\"form-horizontal  container-fluid\">\r\n                    <div class=\"col-md-12 col-sm-12 col-xs-12 form-group has-feedback black-tooltip date-field\">\r\n                        <mat-datepicker #picker1></mat-datepicker>\r\n                        <input type=\"text\" class=\"form-control has-feedback-left\" id=\"inputSuccess6\" [matDatepicker]=\"picker1\" placeholder=\"Start Date\" name=\"BeginDate\" [(ngModel)]=\"overtime.DateBegin\">\r\n                        <mat-datepicker-toggle class=\"left\" matSuffix [for]=\"picker1\"></mat-datepicker-toggle>\r\n                        <span class=\"tooltiptext\">\r\n                            Start Date\r\n                        </span>\r\n                    </div>\r\n                    <div class=\"col-md-12 col-sm-12 col-xs-12 form-group has-feedback black-tooltip date-field\">\r\n                        <mat-datepicker #picker2></mat-datepicker>\r\n                        <input type=\"text\" class=\"form-control has-feedback-left\" id=\"inputSuccess6\" [matDatepicker]=\"picker2\" placeholder=\"End Date\" name=\"EndDate\" [(ngModel)]=\"overtime.DateEnd\">\r\n                        <mat-datepicker-toggle class=\"left\" matSuffix [for]=\"picker2\"></mat-datepicker-toggle>\r\n                        <span class=\"tooltiptext\">\r\n                            End Date\r\n                        </span>\r\n                    </div>\r\n                    <div class=\"col-md-12 col-sm-12 col-xs-12 form-group has-feedback black-tooltip\">\r\n                        <input type=\"text\" class=\"form-control has-feedback-left form-control-small\" id=\"inputSuccess12\" placeholder=\"Comment\" name=\"Comment\" [(ngModel)]=\"overtime.Comment\">\r\n                        <span class=\"fa fa-comment form-control-feedback left\" aria-hidden=\"true\"></span>\r\n                        <span class=\"tooltiptext\">\r\n                            Comment\r\n                        </span>\r\n                    </div>\r\n                    <div class=\"col-md-12 col-sm-12 col-xs-12 form-group has-feedback black-tooltip\">\r\n                        <input type=\"text\" class=\"form-control  has-feedback-left\" id=\"inputSuccess12\" placeholder=\"Count days\" name=\"CountDays\" [(ngModel)]=\"overtime.CountDays\">\r\n                        <span class=\"fa fa-calculator form-control-feedback left\" aria-hidden=\"true\"></span>\r\n                        <span class=\"error-message\" *ngIf=\"cntDayErMsg\">\r\n                            {{cntDayErMsg}}\r\n                        </span>\r\n                        <span class=\"tooltiptext\">\r\n                            CountDays\r\n                        </span>\r\n\r\n                    </div>\r\n                    <div class=\"col-md-12 col-sm-12 col-xs-12 form-group has-feedback\">\r\n\r\n                    </div>\r\n                    <div class=\"col-md-8 col-md-offset-2 col-xs-12 \">\r\n                        <div class=\"col-md-12 col-xs-12\">\r\n                            <div class=\"form-group col-md-12 col-xs-12 text-center\">\r\n                                <button class=\"btn btn-primary alignCenterBtn\" (click)=\"updateOvertime(overtime)\">Save</button>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </form>\r\n            </div>\r\n            <div class=\"col-md-4\">\r\n\r\n            </div>\r\n\r\n\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "./ClientApp/app/components/work-activity/overtimes/overtimes-edit/overtimes-edit.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var common_1 = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
var user_storage_service_1 = __webpack_require__("./ClientApp/app/services/user-storage.service.ts");
var overtime_service_1 = __webpack_require__("./ClientApp/app/services/overtime.service.ts");
var overtime_model_1 = __webpack_require__("./ClientApp/app/models/overtime.model.ts");
var OvertimesEditComponent = /** @class */ (function () {
    function OvertimesEditComponent(overtimeService, location, route, userStorageService) {
        this.overtimeService = overtimeService;
        this.location = location;
        this.route = route;
        this.userStorageService = userStorageService;
        this.overtime = new overtime_model_1.Overtime();
    }
    OvertimesEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.id = +params['id'];
            _this.overtimeService.getById(_this.id).subscribe(function (responce) {
                _this.overtime = responce;
                _this.overtime.DateBegin = new Date(Date.parse(_this.overtime.DateBegin.toString()));
                _this.overtime.DateEnd = new Date(Date.parse(_this.overtime.DateEnd.toString()));
            });
        });
    };
    OvertimesEditComponent.prototype.updateOvertime = function (newOvertime) {
        var _this = this;
        if (this.isVacationsFormValid(newOvertime)) {
            this.overtime.DateBegin = new Date(Date.parse(this.overtime.DateBegin.toString()));
            this.overtime.DateBegin.setMinutes(this.overtime.DateBegin.getMinutes() - this.overtime.DateBegin.getTimezoneOffset());
            this.overtime.DateEnd = new Date(Date.parse(this.overtime.DateEnd.toString()));
            this.overtime.DateEnd.setMinutes(this.overtime.DateEnd.getMinutes() - this.overtime.DateEnd.getTimezoneOffset());
            this.overtimeService.update(this.overtime).subscribe(function (response) {
                _this.location.back();
            });
        }
    };
    ;
    OvertimesEditComponent.prototype.isVacationsFormValid = function (newOvertime) {
        if (newOvertime.DateBegin == null) {
            this.beginDateErMsg = "Begin Date is required field";
            return false;
        }
        else if (newOvertime.DateEnd == null) {
            this.endDateErMsg = "End Date is required field";
            return false;
        }
        else if (newOvertime.DateEnd.getTime() < newOvertime.DateBegin.getTime()) {
            this.endDateErMsg = "End Date should be more than Begin Date";
            return false;
        }
        else if (newOvertime.CountDays < 1) {
            this.cntDayErMsg = "Count should more than 1";
            return false;
        }
        this.beginDateErMsg = null;
        this.endDateErMsg = null;
        return true;
    };
    OvertimesEditComponent.prototype.goBack = function () {
        this.location.back();
    };
    OvertimesEditComponent = __decorate([
        core_1.Component({
            template: __webpack_require__("./ClientApp/app/components/work-activity/overtimes/overtimes-edit/overtimes-edit.component.html")
        }),
        __metadata("design:paramtypes", [overtime_service_1.OvertimeService,
            common_1.Location,
            router_1.ActivatedRoute,
            user_storage_service_1.UserStorageService])
    ], OvertimesEditComponent);
    return OvertimesEditComponent;
}());
exports.OvertimesEditComponent = OvertimesEditComponent;


/***/ }),

/***/ "./ClientApp/app/components/work-activity/overtimes/overtimes-list/overtimes-list.component.css":
/***/ (function(module, exports) {

module.exports = "td, th {\r\n    border-top: 0px !important;\r\n    border-bottom: 0px !important;\r\n  }"

/***/ }),

/***/ "./ClientApp/app/components/work-activity/overtimes/overtimes-list/overtimes-list.component.html":
/***/ (function(module, exports) {

module.exports = "<user-overtimes>\r\n    \r\n</user-overtimes>\r\n"

/***/ }),

/***/ "./ClientApp/app/components/work-activity/overtimes/overtimes-list/overtimes-list.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var common_1 = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
var user_storage_service_1 = __webpack_require__("./ClientApp/app/services/user-storage.service.ts");
var overtime_model_1 = __webpack_require__("./ClientApp/app/models/overtime.model.ts");
var user_model_1 = __webpack_require__("./ClientApp/app/models/user.model.ts");
var overtime_service_1 = __webpack_require__("./ClientApp/app/services/overtime.service.ts");
var users_service_1 = __webpack_require__("./ClientApp/app/services/users.service.ts");
var OvertimesListComponent = /** @class */ (function () {
    function OvertimesListComponent(overtimeService, userStorageService, usersService, location) {
        this.overtimeService = overtimeService;
        this.userStorageService = userStorageService;
        this.usersService = usersService;
        this.location = location;
        this.overtimes = new Array();
        this.newOvertime = new overtime_model_1.Overtime();
        this.users = new Array();
        this.selectedUser = new user_model_1.User();
    }
    OvertimesListComponent.prototype.ngOnInit = function () {
    };
    OvertimesListComponent = __decorate([
        core_1.Component({
            template: __webpack_require__("./ClientApp/app/components/work-activity/overtimes/overtimes-list/overtimes-list.component.html"),
            styles: [__webpack_require__("./ClientApp/app/components/work-activity/overtimes/overtimes-list/overtimes-list.component.css")]
        }),
        __metadata("design:paramtypes", [overtime_service_1.OvertimeService,
            user_storage_service_1.UserStorageService,
            users_service_1.UsersService,
            common_1.Location])
    ], OvertimesListComponent);
    return OvertimesListComponent;
}());
exports.OvertimesListComponent = OvertimesListComponent;


/***/ }),

/***/ "./ClientApp/app/components/work-activity/overtimes/overtimes-user-list/overtimes-user-list.component.css":
/***/ (function(module, exports) {

module.exports = "   .my-table-striped > tbody > tr:nth-of-type(odd) {\r\n    background-color: #f9f9f9 !important;\r\n  }\r\n\r\n  .link:hover {\r\n    cursor: pointer;\r\n  }\r\n\r\n  input:-moz-read-only {\r\n    background-color: white;\r\n    color: black;\r\n    cursor: pointer;\r\n}\r\n\r\n  input:read-only {\r\n    background-color: white;\r\n    color: black;\r\n    cursor: pointer;\r\n}"

/***/ }),

/***/ "./ClientApp/app/components/work-activity/overtimes/overtimes-user-list/overtimes-user-list.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"card x_panel\">\r\n    <div class=\"row\">\r\n        <div class=\"col-md-6\">\r\n            <h2>{{ 'Work on weekends' }}</h2>\r\n        </div>\r\n        <div class=\"col-md-6 text-right\">\r\n            <div class=\"row\">\r\n                <div class=\"col-md-8\">\r\n\r\n                </div>\r\n\r\n                <div class=\"col-md-4 text-right toggle-div\" *isCurrentUserOrHasRole=\"{ id: userId, roles: ['Super_Admin', 'Admin']}\">\r\n                    <a href=\"javascript:;\" class=\"user-profile dropdown-toggle\" data-toggle=\"dropdown\" aria-expanded=\"false\">\r\n                        <button class=\"btn btn-primary toggle-button\">\r\n                            <span class=\"fa fa-plus\"></span>\r\n                        </button>\r\n                    </a>\r\n                    <ul class=\"dropdown-menu dropdown-usermenu pull-right\">\r\n                        <li>\r\n                            <a (click)=\"menuAddNew()\" class=\"side-menu-link\">\r\n                                Add working day(s)\r\n                            </a>\r\n                        </li>\r\n                    </ul>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div id=\"datatable-responsive_wrapper\" class=\"dataTables_wrapper form-inline dt-bootstrap no-footer\">\r\n        <div class=\"row\">\r\n            <div class=\"col-md-12\">\r\n                <form [formGroup]=\"newOvertimeForm\" (submit)=\"add(newOvertime)\">\r\n                    <table class=\"table my-table-striped table-bordered projects\" [formGroup]=\"newOvertimeForm\" (submit)=\"add(newOvertime)\">\r\n                        <thead style=\"color: #73879C;\">\r\n                            <tr>\r\n                                <th *ngIf=\"userId == null\">User</th>\r\n                                <th style=\"width:19%\">Count</th>\r\n                                <th>Begin Date</th>\r\n                                <th>End Date</th>\r\n                                <th>Comment</th>\r\n                                <th *isCurrentUserOrHasRole=\"{ id: userId, roles: ['Super_Admin', 'Admin']}\" style=\"width:12%\"></th>\r\n                            </tr>\r\n                        </thead>\r\n                        <tbody>\r\n                            <tr *ngIf=\"isAddVisible\">\r\n                                <td *ngIf=\"userId == null\">\r\n                                    <select class=\"select2_single form-control\" [(ngModel)]=\"newOvertime.UserProfileId\" formControlName=\"SelectedUser\" tabindex=\"-1\">\r\n                                        <option *ngFor=\"let selectUser of users; let i = index\" [value]=\"selectUser.UserProfileId\">\r\n                                            {{ selectUser.FirstName }} {{ selectUser.LastName }}\r\n                                        </option>\r\n                                    </select>\r\n                                </td>\r\n                                <td>\r\n                                    <div class=\"col-md-12 col-sm-12 col-xs-12 form-group has-feedback  black-tooltip\">\r\n                                        <input type=\"text\" class=\"form-control has-feedback-left\" id=\"inputSuccess12\" placeholder=\"Count days\" formControlName=\"CountDays\" [(ngModel)]=\"newOvertime.CountDays\" style=\"width: inherit;\" disabled>\r\n                                        <span class=\"fa fa-calculator form-control-feedback left\" aria-hidden=\"true\"></span>\r\n                                        <span class=\"tooltiptext\">\r\n                                            Count\r\n                                        </span>\r\n                                    </div>\r\n                                </td>\r\n                                <td>\r\n                                    <div class=\"col-md-12 col-sm-12 col-xs-12 form-group has-feedback black-tooltip date-field\">\r\n                                        <mat-datepicker #picker1></mat-datepicker>\r\n                                        <input type=\"text\" class=\"form-control has-feedback-left form-control-small\" id=\"inputSuccess7\" [matDatepicker]=\"picker1\" placeholder=\"Begin Date\" [min]=\"minVacationDate\" [max]=\"maxVacationDate\" formControlName=\"BeginDate\" [(ngModel)]=\"newOvertime.DateBegin\" (ngModelChange)=\"calcOvertimeDays(newOvertime)\" (click)=\"picker1.open()\" readonly>\r\n                                        <mat-datepicker-toggle class=\"left\" matSuffix [for]=\"picker1\"></mat-datepicker-toggle>\r\n                                        <span class=\"tooltiptext\">\r\n                                            Start of work at home\r\n                                        </span>\r\n                                    </div>\r\n                                    <div class=\"error-message\" *ngIf=\"newOvertimeForm.get('BeginDate').errors\">\r\n                                        <span class=\"error-message\" *ngIf=\"newOvertimeForm.get('BeginDate').errors.required && submitAttempt\">\r\n                                            Start Date is required\r\n                                        </span>\r\n                                    </div>\r\n                                    <span class=\"error-message\" *ngIf=\"isBeginDateIncorrect\">\r\n                                        Start Date should be more than today\r\n                                    </span>\r\n                                </td>\r\n                                <td>\r\n                                    <div class=\"col-md-12 col-sm-12 col-xs-12 form-group has-feedback black-tooltip date-field\">\r\n                                        <mat-datepicker #picker2></mat-datepicker>\r\n                                        <input type=\"text\" class=\"form-control has-feedback-left form-control-small\" id=\"inputSuccess8\" [matDatepicker]=\"picker2\" placeholder=\"End Date\" [min]=\"minVacationDate\" [max]=\"maxVacationDate\" formControlName=\"EndDate\" [(ngModel)]=\"newOvertime.DateEnd\" (ngModelChange)=\"calcOvertimeDays(newOvertime)\" (click)=\"picker2.open()\" readonly>\r\n                                        <mat-datepicker-toggle class=\"left\" matSuffix [for]=\"picker2\"></mat-datepicker-toggle>\r\n                                        <span class=\"tooltiptext\">\r\n                                            End of work at home\r\n                                        </span>\r\n                                    </div>\r\n                                    <div class=\"error-message\" *ngIf=\"newOvertimeForm.get('EndDate').errors\">\r\n                                        <span class=\"error-message\" *ngIf=\"newOvertimeForm.get('EndDate').errors.required && submitAttempt\">\r\n                                            End Date is required\r\n                                        </span>\r\n                                    </div>\r\n                                    <span class=\"error-message\" *ngIf=\"isEndDateIncorrect\">\r\n                                        End Date should be more than Begin Date and than today\r\n                                    </span>\r\n                                </td>\r\n                                <td>\r\n                                    <div class=\"col-md-12 col-sm-12 col-xs-12 form-group has-feedback black-tooltip\">\r\n                                        <input type=\"text\" class=\"form-control has-feedback-left form-control-small\" id=\"inputSuccess12\" placeholder=\"Comment\" formControlName=\"Comment\" [(ngModel)]=\"newOvertime.Comment\">\r\n                                        <span class=\"fa fa-comment form-control-feedback left\" aria-hidden=\"true\"></span>\r\n                                        <span class=\"tooltiptext\">\r\n                                            Comment\r\n                                        </span>\r\n                                    </div>\r\n                                </td>\r\n                                <td style=\"text-align:right\">\r\n                                    <button type=\"submit\" class=\"btn btn-primary black-tooltip\">\r\n                                        <i class=\"fa fa-check\"></i>\r\n                                        <span class=\"tooltiptext\">Save</span>\r\n                                    </button>\r\n                                    <button class=\"btn btn-default black-tooltip\" (click)=\"isAddVisible = false\">\r\n                                        <i class=\"fa fa-close\"></i>\r\n                                        <span class=\"tooltiptext\">Cancel</span>\r\n                                    </button>\r\n                                </td>\r\n                            </tr>\r\n                            <ngx-spinner [visible]=\"loading\" [config]=\"spinnerConfig\"></ngx-spinner>\r\n                            <tr *ngFor=\"let overtime of overtimes; let i = index\">\r\n                                <td *ngIf=\"userId == null\" class=\"link\" (click)=\"goToUser(overtime)\"><span>{{overtime.UserProfile.FirstName}} {{overtime.UserProfile.LastName}}</span></td>\r\n                                <td><span>{{overtime.CountDays}}</span></td>\r\n                                <td><span>{{overtime.DateBegin | date: 'MM/dd/yyyy'}}</span></td>\r\n                                <td><span>{{overtime.DateEnd| date: 'MM/dd/yyyy'}}</span></td>\r\n                                <td class=\"ellipsis\">{{overtime.Comment}}</td>\r\n                                <td [id]=\"userId\" *isCurrentUserOrHasRole=\"{ id: userId, roles: ['Super_Admin', 'Admin']}\" style=\"text-align:right\">\r\n                                    <a class=\"btn btn-primary black-tooltip\" routerLink=\"/workactivities/overtimes/{{overtime.Id}}/edit\">\r\n                                        <i class=\"fa fa-edit\"></i>\r\n                                        <span class=\"tooltiptext\">Edit</span>\r\n                                    </a>\r\n                                    <a class=\"btn btn-default black-tooltip\" (click)=\"confirmDeleteDialog(overtime.Id, i)\">\r\n                                        <i class=\"fa fa-trash\"></i>\r\n                                        <span class=\"tooltiptext\">Delete</span>\r\n                                    </a>\r\n                                </td>\r\n                            </tr>\r\n                        </tbody>\r\n                    </table>\r\n                    <table-buttons [subject]=\"subject\">\r\n\r\n                    </table-buttons>\r\n                </form>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "./ClientApp/app/components/work-activity/overtimes/overtimes-user-list/overtimes-user-list.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var common_1 = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
var user_storage_service_1 = __webpack_require__("./ClientApp/app/services/user-storage.service.ts");
var overtime_model_1 = __webpack_require__("./ClientApp/app/models/overtime.model.ts");
var overtime_service_1 = __webpack_require__("./ClientApp/app/services/overtime.service.ts");
var overtime_query_model_1 = __webpack_require__("./ClientApp/app/models/query-models/overtime-query.model.ts");
var user_model_1 = __webpack_require__("./ClientApp/app/models/user.model.ts");
var users_service_1 = __webpack_require__("./ClientApp/app/services/users.service.ts");
var user_query_model_1 = __webpack_require__("./ClientApp/app/models/query-models/user-query.model.ts");
var forms_1 = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
var ngx_spinner_1 = __webpack_require__("./node_modules/@hardpool/ngx-spinner/fesm5/hardpool-ngx-spinner.js");
var material_1 = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
var delete_confirmation_component_1 = __webpack_require__("./ClientApp/app/components/modals/delete-confirmation/delete-confirmation.component.ts");
var rxjs_1 = __webpack_require__("./node_modules/rxjs/Rx.js");
var OvertimeUserListComponent = /** @class */ (function () {
    function OvertimeUserListComponent(route, userStorageService, overtimeService, usersService, fBuilder, location, dialog, router) {
        this.route = route;
        this.userStorageService = userStorageService;
        this.overtimeService = overtimeService;
        this.usersService = usersService;
        this.fBuilder = fBuilder;
        this.location = location;
        this.dialog = dialog;
        this.router = router;
        this.overtimes = new Array();
        this.newOvertime = new overtime_model_1.Overtime();
        this.users = new Array();
        this.selectedUser = new user_model_1.User();
        this.isBeginDateIncorrect = false;
        this.isEndDateIncorrect = false;
        this.loading = false;
        this.spinnerConfig = {
            placement: ngx_spinner_1.SPINNER_PLACEMENT.block_ui,
            animation: ngx_spinner_1.SPINNER_ANIMATIONS.spin_3,
            size: "3rem",
            color: "#1574b3"
        };
    }
    ;
    OvertimeUserListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subject = new rxjs_1.Subject();
        this.isAddVisible = false;
        this.id = this.userId;
        this.queryModel = new overtime_query_model_1.OvertimeQueryModel();
        this.queryModel.Take = 10;
        if (this.id != null)
            this.queryModel.UserId = this.id;
        this.loading = true;
        this.overtimeService.get(this.queryModel).subscribe(function (response) {
            _this.overtimes = response.Result;
            _this.subject.next({ from: "component", response: response });
            _this.overtimes.forEach(function (value, index, array) {
                value.DateBegin = new Date(Date.parse(value.DateBegin.toString()));
                value.DateEnd = new Date(Date.parse(value.DateEnd.toString()));
            });
            _this.overtimes.sort(function (x, y) {
                if (x.DateBegin > y.DateBegin)
                    return -1;
                if (x.DateBegin < y.DateBegin)
                    return 1;
                return 0;
            });
            _this.loading = false;
        });
        this.usersService.get(new user_query_model_1.UserQueryModel()).subscribe(function (response) {
            _this.users = response.Result;
        });
        this.subscription = this.subject.asObservable().subscribe(function (response) {
            if (response.fron == "tablebuttons") {
                _this.queryModel = response.response;
                _this.id = _this.userId;
                if (_this.id != null)
                    _this.queryModel.UserId = _this.id;
                _this.loading = true;
                _this.overtimeService.get(_this.queryModel).subscribe(function (response) {
                    _this.overtimes = response.Result;
                    _this.overtimes.forEach(function (value, index, array) {
                        value.DateBegin = new Date(Date.parse(value.DateBegin.toString()));
                        value.DateEnd = new Date(Date.parse(value.DateEnd.toString()));
                    });
                    _this.overtimes.sort(function (x, y) {
                        if (x.DateBegin > y.DateBegin)
                            return -1;
                        if (x.DateBegin < y.DateBegin)
                            return 1;
                        return 0;
                    });
                    _this.loading = false;
                });
            }
        });
        this.initDates();
        this.initForm();
    };
    OvertimeUserListComponent.prototype.initForm = function () {
        this.newOvertimeForm = this.fBuilder.group({
            CountDays: ['', forms_1.Validators.min(1)],
            BeginDate: ['', [
                    forms_1.Validators.required
                ]],
            EndDate: ['', [
                    forms_1.Validators.required
                ]],
            Comment: [],
            SelectedUser: []
        });
    };
    OvertimeUserListComponent.prototype.initDates = function () {
        //Allow begin date vacation and end date vacation
        //only in previous or in the next year
        this.minOvertimeDate = new Date(new Date().getFullYear(), 0, 1); //Start of the year
        this.minOvertimeDate.setFullYear(this.minOvertimeDate.getFullYear() - 1);
        this.maxOvertimeDate = new Date(new Date().getFullYear(), 11, 31); //End of the year
        this.maxOvertimeDate.setFullYear(this.maxOvertimeDate.getFullYear() + 1);
    };
    OvertimeUserListComponent.prototype.delete = function (index, indexOnArray) {
        var _this = this;
        this.overtimeService.delete(index).subscribe(function (result) {
            _this.usersService.updateVacDays(_this.overtimes[indexOnArray].CountDays);
            _this.queryModel.Take = 10;
            if (_this.id != null)
                _this.queryModel.UserId = _this.id;
            _this.loading = true;
            _this.overtimeService.get(_this.queryModel).subscribe(function (response) {
                _this.overtimes = response.Result;
                _this.subject.next({ from: "component", response: response });
                _this.overtimes.forEach(function (value, index, array) {
                    value.DateBegin = new Date(Date.parse(value.DateBegin.toString()));
                    value.DateEnd = new Date(Date.parse(value.DateEnd.toString()));
                });
                _this.overtimes.sort(function (x, y) {
                    if (x.DateBegin > y.DateBegin)
                        return -1;
                    if (x.DateBegin < y.DateBegin)
                        return 1;
                    return 0;
                });
                _this.loading = false;
            });
            _this.usersService.get(new user_query_model_1.UserQueryModel()).subscribe(function (response) {
                _this.users = response.Result;
            });
            _this.status = "Deleted";
        });
    };
    OvertimeUserListComponent.prototype.confirmDeleteDialog = function (id, index) {
        var _this = this;
        var dialogConfig = new material_1.MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.position = { top: '0' };
        dialogConfig.autoFocus = false;
        this.dialog.open(delete_confirmation_component_1.DeleteConfirmationComponent, dialogConfig)
            .afterClosed().subscribe(function (dialogResult) {
            if (dialogResult)
                _this.delete(id, index);
        });
    };
    OvertimeUserListComponent.prototype.add = function (newOvertime) {
        var _this = this;
        if (this.newOvertimeForm.valid && !this.isBeginDateIncorrect && !this.isEndDateIncorrect) {
            this.submitAttempt = false;
            newOvertime.DateBegin = new Date(Date.parse(newOvertime.DateBegin.toString()));
            newOvertime.DateBegin.setMinutes(newOvertime.DateBegin.getMinutes() - newOvertime.DateBegin.getTimezoneOffset());
            newOvertime.DateEnd = new Date(Date.parse(newOvertime.DateEnd.toString()));
            newOvertime.DateEnd.setMinutes(newOvertime.DateEnd.getMinutes() - newOvertime.DateEnd.getTimezoneOffset());
            newOvertime.UserProfileId = (this.id != null && this.id != 0 && this.id != undefined) ? this.id : newOvertime.UserProfileId;
            this.overtimeService.create(newOvertime).subscribe(function (response) {
                _this.newOvertime = response;
                if (_this.newOvertime.Id != 0) {
                    _this.usersService.updateVacDays(_this.newOvertime.CountDays * (-1));
                    _this.queryModel = new overtime_query_model_1.OvertimeQueryModel();
                    _this.queryModel.UserId = _this.id;
                    _this.overtimeService.get(_this.queryModel).subscribe(function (response) {
                        _this.overtimes = response.Result;
                        _this.subject.next({ from: "component", response: response });
                        _this.overtimes.forEach(function (value, index, array) {
                            value.DateBegin = new Date(Date.parse(value.DateBegin.toString()));
                            value.DateEnd = new Date(Date.parse(value.DateEnd.toString()));
                        });
                    });
                    _this.isAddVisible = false;
                }
            });
        }
        else {
            this.submitAttempt = true;
        }
    };
    OvertimeUserListComponent.prototype.calcOvertimeDays = function (newOvertime) {
        var currentDate = new Date();
        currentDate.setHours(0);
        currentDate.setMinutes(0);
        currentDate.setSeconds(0);
        this.isBeginDateIncorrect = false;
        this.isEndDateIncorrect = false;
        if (newOvertime.DateBegin && newOvertime.DateEnd) {
            if (newOvertime.DateEnd.getTime() < newOvertime.DateBegin.getTime()) {
                this.isEndDateIncorrect = true;
            }
            else {
                this.newOvertime.CountDays = ((newOvertime.DateEnd.getTime() - newOvertime.DateBegin.getTime()) / 86400000) + 1;
            }
        }
    };
    OvertimeUserListComponent.prototype.menuAddNew = function () {
        this.isAddVisible = true;
        this.newOvertime = new overtime_model_1.Overtime();
    };
    OvertimeUserListComponent.prototype.goBack = function () {
        this.location.back();
    };
    OvertimeUserListComponent.prototype.goToUser = function (overtime) {
        this.router.navigateByUrl('/users/' + overtime.UserProfileId + '/info');
    };
    __decorate([
        core_1.Input('userId'),
        __metadata("design:type", Number)
    ], OvertimeUserListComponent.prototype, "userId", void 0);
    OvertimeUserListComponent = __decorate([
        core_1.Component({
            selector: 'user-overtimes',
            template: __webpack_require__("./ClientApp/app/components/work-activity/overtimes/overtimes-user-list/overtimes-user-list.component.html"),
            styles: [__webpack_require__("./ClientApp/app/components/work-activity/overtimes/overtimes-user-list/overtimes-user-list.component.css")]
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            user_storage_service_1.UserStorageService,
            overtime_service_1.OvertimeService,
            users_service_1.UsersService,
            forms_1.FormBuilder,
            common_1.Location,
            material_1.MatDialog,
            router_1.Router])
    ], OvertimeUserListComponent);
    return OvertimeUserListComponent;
}());
exports.OvertimeUserListComponent = OvertimeUserListComponent;


/***/ }),

/***/ "./ClientApp/app/components/work-activity/sickdays/sickdays-edit/sickdays-edit.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"card x_panel\" *ngIf=\"sickDay\">\r\n    <div id=\"divDataBody\" class=\"container entity\">\r\n        <div class=\"row formTitle\">\r\n            <div class=\"col-md-6\">\r\n                <h2 class=\"title\">Update sick day</h2>\r\n            </div>\r\n        </div>\r\n        <div class=\"row\">\r\n            <div class=\"col-md-4\">\r\n\r\n            </div>\r\n            <div class=\"col-md-4\">\r\n                <form name=\"addpost\" class=\"form-horizontal  container-fluid\">\r\n                    <div class=\"col-md-12 col-sm-12 col-xs-12 form-group has-feedback black-tooltip date-field\">\r\n                        <mat-datepicker #picker1></mat-datepicker>\r\n                        <input type=\"text\" class=\"form-control has-feedback-left\" id=\"inputSuccess6\" [matDatepicker]=\"picker1\" placeholder=\"Start Date\" name=\"BeginDate\" [(ngModel)]=\"sickDay.DateBegin\">\r\n                        <mat-datepicker-toggle class=\"left\" matSuffix [for]=\"picker1\"></mat-datepicker-toggle>\r\n                        <span class=\"tooltiptext\">\r\n                            Start Date\r\n                        </span>\r\n                    </div>\r\n                    <div class=\"col-md-12 col-sm-12 col-xs-12 form-group has-feedback black-tooltip date-field\">\r\n                        <mat-datepicker #picker2></mat-datepicker>\r\n                        <input type=\"text\" class=\"form-control has-feedback-left\" id=\"inputSuccess6\" [matDatepicker]=\"picker2\" placeholder=\"End Date\" name=\"EndDate\" [(ngModel)]=\"sickDay.DateEnd\">\r\n                        <mat-datepicker-toggle class=\"left\" matSuffix [for]=\"picker2\"></mat-datepicker-toggle>\r\n                        <span class=\"tooltiptext\">\r\n                            End Date\r\n                        </span>\r\n                    </div>\r\n\r\n                    <div class=\"col-md-12 col-sm-12 col-xs-12 form-group has-feedback black-tooltip\">\r\n                        <input type=\"text\" class=\"form-control has-feedback-left form-control-small\" id=\"inputSuccess12\" placeholder=\"Comment\" name=\"Comment\" [(ngModel)]=\"sickDay.Comment\">\r\n                        <span class=\"fa fa-comment form-control-feedback left\" aria-hidden=\"true\"></span>\r\n                        <span class=\"tooltiptext\">\r\n                            Comment\r\n                        </span>\r\n                    </div>\r\n                    <div class=\"col-md-12 col-sm-12 col-xs-12 form-group has-feedback black-tooltip\">\r\n                        <input type=\"text\" class=\"form-control has-feedback-left\" id=\"inputSuccess12\" placeholder=\"Count days\" name=\"CountDays\" [(ngModel)]=\"sickDay.CountDays\">\r\n                        <span class=\"fa fa-calculator form-control-feedback left\" aria-hidden=\"true\"></span>\r\n                        <span class=\"error-message\" *ngIf=\"cntDayErMsg\">\r\n                            {{cntDayErMsg}}\r\n                        </span>\r\n                        <span class=\"tooltiptext\">\r\n                            CountDays\r\n                        </span>\r\n\r\n                    </div>\r\n                    <div class=\"col-md-12 col-sm-12 col-xs-12 form-group has-feedback\">\r\n\r\n                    </div>\r\n                    <div class=\"col-md-8 col-md-offset-2 col-xs-12 \">\r\n                        <div class=\"col-md-12 col-xs-12\">\r\n                            <div class=\"form-group col-md-12 col-xs-12  text-center\">\r\n                                <button class=\"btn btn-primary alignCenterBtn\" (click)=\"updateSickDay(sickDay)\">Save</button>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </form>\r\n            </div>\r\n            <div class=\"col-md-4\">\r\n\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "./ClientApp/app/components/work-activity/sickdays/sickdays-edit/sickdays-edit.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var common_1 = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
var user_storage_service_1 = __webpack_require__("./ClientApp/app/services/user-storage.service.ts");
var sick_day_service_1 = __webpack_require__("./ClientApp/app/services/sick-day.service.ts");
var SickDaysEditComponent = /** @class */ (function () {
    function SickDaysEditComponent(sickDayService, location, route, userStorageService) {
        this.sickDayService = sickDayService;
        this.location = location;
        this.route = route;
        this.userStorageService = userStorageService;
    }
    SickDaysEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.id = +params['id'];
            _this.sickDayService.getById(_this.id).subscribe(function (responce) {
                _this.sickDay = responce;
                _this.sickDay.DateBegin = new Date(Date.parse(_this.sickDay.DateBegin.toString()));
                _this.sickDay.DateEnd = new Date(Date.parse(_this.sickDay.DateEnd.toString()));
            });
        });
    };
    SickDaysEditComponent.prototype.updateSickDay = function (newSickDay) {
        var _this = this;
        if (this.isVacationsFormValid(newSickDay)) {
            this.sickDay.DateBegin = new Date(Date.parse(this.sickDay.DateBegin.toString()));
            this.sickDay.DateBegin.setMinutes(this.sickDay.DateBegin.getMinutes() - this.sickDay.DateBegin.getTimezoneOffset());
            this.sickDay.DateEnd = new Date(Date.parse(this.sickDay.DateEnd.toString()));
            this.sickDay.DateEnd.setMinutes(this.sickDay.DateEnd.getMinutes() - this.sickDay.DateEnd.getTimezoneOffset());
            this.sickDayService.update(this.sickDay).subscribe(function (response) {
                _this.location.back();
            });
        }
    };
    ;
    SickDaysEditComponent.prototype.isVacationsFormValid = function (newSickDay) {
        if (newSickDay.DateBegin == null) {
            this.beginDateErMsg = "Begin Date is required field";
            return false;
        }
        else if (newSickDay.DateEnd == null) {
            this.endDateErMsg = "End Date is required field";
            return false;
        }
        else if (newSickDay.DateEnd.getTime() < newSickDay.DateBegin.getTime()) {
            this.endDateErMsg = "End Date should be more than Begin Date";
            return false;
        }
        else if (newSickDay.CountDays < 1) {
            this.cntDayErMsg = "Count should more than 1";
            return false;
        }
        this.beginDateErMsg = null;
        this.endDateErMsg = null;
        return true;
    };
    SickDaysEditComponent.prototype.goBack = function () {
        this.location.back();
    };
    SickDaysEditComponent = __decorate([
        core_1.Component({
            template: __webpack_require__("./ClientApp/app/components/work-activity/sickdays/sickdays-edit/sickdays-edit.component.html")
        }),
        __metadata("design:paramtypes", [sick_day_service_1.SickDayService,
            common_1.Location,
            router_1.ActivatedRoute,
            user_storage_service_1.UserStorageService])
    ], SickDaysEditComponent);
    return SickDaysEditComponent;
}());
exports.SickDaysEditComponent = SickDaysEditComponent;


/***/ }),

/***/ "./ClientApp/app/components/work-activity/sickdays/sickdays-list/sickdays-list.component.css":
/***/ (function(module, exports) {

module.exports = "td, th {\r\n    border-top: 0px !important;\r\n    border-bottom: 0px !important;\r\n  }"

/***/ }),

/***/ "./ClientApp/app/components/work-activity/sickdays/sickdays-list/sickdays-list.component.html":
/***/ (function(module, exports) {

module.exports = "<user-sickdays>\r\n    \r\n</user-sickdays>\r\n"

/***/ }),

/***/ "./ClientApp/app/components/work-activity/sickdays/sickdays-list/sickdays-list.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var common_1 = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
var user_storage_service_1 = __webpack_require__("./ClientApp/app/services/user-storage.service.ts");
var sick_day_model_1 = __webpack_require__("./ClientApp/app/models/sick-day.model.ts");
var user_model_1 = __webpack_require__("./ClientApp/app/models/user.model.ts");
var sick_day_service_1 = __webpack_require__("./ClientApp/app/services/sick-day.service.ts");
var users_service_1 = __webpack_require__("./ClientApp/app/services/users.service.ts");
var SickDaysListComponent = /** @class */ (function () {
    function SickDaysListComponent(sickDayService, userStorageService, usersService, location) {
        this.sickDayService = sickDayService;
        this.userStorageService = userStorageService;
        this.usersService = usersService;
        this.location = location;
        this.sickDays = new Array();
        this.newSickDays = new sick_day_model_1.SickDay();
        this.users = new Array();
        this.selectedUser = new user_model_1.User();
    }
    SickDaysListComponent = __decorate([
        core_1.Component({
            template: __webpack_require__("./ClientApp/app/components/work-activity/sickdays/sickdays-list/sickdays-list.component.html"),
            styles: [__webpack_require__("./ClientApp/app/components/work-activity/sickdays/sickdays-list/sickdays-list.component.css")]
        }),
        __metadata("design:paramtypes", [sick_day_service_1.SickDayService,
            user_storage_service_1.UserStorageService,
            users_service_1.UsersService,
            common_1.Location])
    ], SickDaysListComponent);
    return SickDaysListComponent;
}());
exports.SickDaysListComponent = SickDaysListComponent;


/***/ }),

/***/ "./ClientApp/app/components/work-activity/sickdays/sickdays-user-list/sickdays-user-list.component.css":
/***/ (function(module, exports) {

module.exports = "   .my-table-striped > tbody > tr:nth-of-type(odd) {\r\n    background-color: #f9f9f9 !important;\r\n  }\r\n\r\n  .link:hover {\r\n    cursor: pointer;\r\n  }\r\n\r\n  input:-moz-read-only {\r\n    background-color: white;\r\n    color: black;\r\n    cursor: pointer;\r\n}\r\n\r\n  input:read-only {\r\n    background-color: white;\r\n    color: black;\r\n    cursor: pointer;\r\n}"

/***/ }),

/***/ "./ClientApp/app/components/work-activity/sickdays/sickdays-user-list/sickdays-user-list.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"card x_panel\">\r\n    <div class=\"row\">\r\n        <div class=\"col-md-6\">\r\n            <h2>Sick Days</h2>\r\n        </div>\r\n        <div class=\"col-md-6 text-right\">\r\n            <div class=\"row\">\r\n                <div class=\"col-md-8\">\r\n\r\n                </div>\r\n\r\n                <div class=\"col-md-4 text-right toggle-div\" *isCurrentUserOrHasRole=\"{ id: userId, roles: ['Super_Admin', 'Admin']}\">\r\n                    <a href=\"javascript:;\" class=\"user-profile dropdown-toggle\" data-toggle=\"dropdown\" aria-expanded=\"false\">\r\n                        <button class=\"btn btn-primary toggle-button\">\r\n                            <span class=\"fa fa-plus\"></span>\r\n                        </button>\r\n                    </a>\r\n                    <ul class=\"dropdown-menu dropdown-usermenu pull-right\">\r\n                        <li>\r\n                            <a (click)=\"menuAddNew()\" class=\"side-menu-link\">\r\n                                Add sick day(s)\r\n                            </a>\r\n                        </li>\r\n                    </ul>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div id=\"datatable-responsive_wrapper\" class=\"dataTables_wrapper form-inline dt-bootstrap no-footer\">\r\n            <div class=\"row\">\r\n                <div class=\"col-md-12\">\r\n                    <form [formGroup]=\"newSickDayForm\" (submit)=\"add(newSickDay)\">\r\n                        <table class=\"table my-table-striped table-bordered projects\" [formGroup]=\"newSickDayForm\" (submit)=\"add(newSickDay)\">\r\n                            <thead style=\"color: #73879C;\">\r\n                                <tr>\r\n                                    <th *ngIf=\"userId == null\">User</th>\r\n                                    <th style=\"width:19%\">Count</th>\r\n                                    <th>Begin Date</th>\r\n                                    <th>End Date</th>\r\n                                    <th>Comment</th>\r\n                                    <th *isCurrentUserOrHasRole=\"{ id: userId, roles: ['Super_Admin', 'Admin']}\" style=\"width:12%\"></th>\r\n                                </tr>\r\n                            </thead>\r\n                            <tbody>\r\n                                <tr *ngIf=\"isAddVisible\">\r\n                                    <td *ngIf=\"userId == null\">\r\n                                        <select class=\"select2_single form-control\" [(ngModel)]=\"newSickDay.UserProfileId\" formControlName=\"SelectedUser\" tabindex=\"-1\">\r\n                                            <option *ngFor=\"let selectUser of users; let i = index\" [value]=\"selectUser.UserProfileId\">\r\n                                                {{ selectUser.FirstName }} {{ selectUser.LastName }}\r\n                                            </option>\r\n                                        </select>\r\n                                    </td>\r\n                                    <td style=\"width:19%\">\r\n                                        <div class=\"col-md-12 col-sm-12 col-xs-12 form-group has-feedback  black-tooltip\">\r\n                                            <input type=\"text\" class=\"form-control has-feedback-left\" id=\"inputSuccess12\" placeholder=\"Count days\" formControlName=\"CountDays\" [(ngModel)]=\"newSickDay.CountDays\" style=\"width: inherit;\"\r\n                                            disabled>\r\n                                            <span class=\"fa fa-calculator form-control-feedback left\" aria-hidden=\"true\"></span>\r\n                                            <span class=\"tooltiptext\">\r\n                                                Count\r\n                                            </span>\r\n                                        </div>\r\n\r\n                                    </td>\r\n                                    <td>\r\n                                        <div class=\"col-md-12 col-sm-12 col-xs-12 form-group has-feedback black-tooltip date-field\">\r\n                                            <mat-datepicker #picker1></mat-datepicker>\r\n                                            <input type=\"text\" class=\"form-control has-feedback-left form-control-small\" id=\"inputSuccess7\" [matDatepicker]=\"picker1\" placeholder=\"Begin Date\" [min]=\"minSickDayDate\" [max]=\"maxSickDayDate\" formControlName=\"BeginDate\" [(ngModel)]=\"newSickDay.DateBegin\" (ngModelChange)=\"calcSickDayDays(newSickDay)\" (click)=\"picker1.open()\" readonly>\r\n                                            <mat-datepicker-toggle class=\"left\" matSuffix [for]=\"picker1\"></mat-datepicker-toggle>\r\n                                            <span class=\"tooltiptext\">\r\n                                                Start of work\r\n                                            </span>\r\n                                        </div>\r\n                                        <div class=\"error-message\" *ngIf=\"newSickDayForm.get('BeginDate').errors\">\r\n                                            <span class=\"error-message\" *ngIf=\"newSickDayForm.get('BeginDate').errors.required && submitAttempt\">\r\n                                                Start Date is required\r\n                                            </span>\r\n                                        </div>\r\n                                        <span class=\"error-message\" *ngIf=\"isBeginDateIncorrect\">\r\n                                            Start Date should be more than today\r\n                                        </span>\r\n                                    </td>\r\n                                    <td>\r\n                                        <div class=\"col-md-12 col-sm-12 col-xs-12 form-group has-feedback black-tooltip date-field\">\r\n                                            <mat-datepicker #picker2></mat-datepicker>\r\n                                            <input type=\"text\" class=\"form-control has-feedback-left form-control-small\" id=\"inputSuccess8\" [matDatepicker]=\"picker2\" placeholder=\"End Date\" [min]=\"minSickDayDate\" [max]=\"maxSickDayDate\" formControlName=\"EndDate\" [(ngModel)]=\"newSickDay.DateEnd\" (ngModelChange)=\"calcSickDayDays(newSickDay)\" (click)=\"picker2.open()\" readonly>\r\n                                            <mat-datepicker-toggle class=\"left\" matSuffix [for]=\"picker2\"></mat-datepicker-toggle>\r\n                                            <span class=\"tooltiptext\">\r\n                                                End of vacation\r\n                                            </span>\r\n                                        </div>\r\n                                        <div class=\"error-message\" *ngIf=\"newSickDayForm.get('EndDate').errors\">\r\n                                            <span class=\"error-message\" *ngIf=\"newSickDayForm.get('EndDate').errors.required && submitAttempt\">\r\n                                                End Date is required\r\n                                            </span>\r\n                                        </div>\r\n                                        <span class=\"error-message\" *ngIf=\"isEndDateIncorrect\">\r\n                                            End Date should be more than Begin Date and than today\r\n                                        </span>\r\n                                    </td>\r\n                                    <td>\r\n\r\n                                        <div class=\"col-md-12 col-sm-12 col-xs-12 form-group has-feedback  black-tooltip\">\r\n                                            <input type=\"text\" class=\"form-control has-feedback-left form-control-small\" id=\"inputSuccess12\" placeholder=\"Comment\" formControlName=\"Comment\" [(ngModel)]=\"newSickDay.Comment\">\r\n                                            <span class=\"fa fa-comment form-control-feedback left\" aria-hidden=\"true\"></span>\r\n                                            <span class=\"tooltiptext\">\r\n                                                Comment\r\n                                            </span>\r\n                                        </div>\r\n                                    </td>\r\n                                    <td style=\"text-align:right; width:12%\">\r\n                                        <button type=\"submit\" class=\"btn btn-primary black-tooltip\">\r\n                                            <i class=\"fa fa-check\"></i>\r\n                                            <span class=\"tooltiptext\">Save</span>\r\n                                        </button>\r\n                                        <button class=\"btn btn-default black-tooltip\" (click)=\"isAddVisible = false\">\r\n                                            <i class=\"fa fa-close\"></i>\r\n                                            <span class=\"tooltiptext\">Cancel</span>\r\n                                        </button>\r\n                                    </td>\r\n                                </tr>\r\n                                <ngx-spinner [visible]=\"loading\" [config]=\"spinnerConfig\"></ngx-spinner>\r\n                                <tr *ngFor=\"let sickDay of sickDays; let i = index\">\r\n                                    <td *ngIf=\"userId == null\" class=\"link\" (click)=\"goToUser(sickDay)\">\r\n                                        <span>\r\n                                            {{sickDay.UserProfile.FirstName}} {{sickDay.UserProfile.LastName}}\r\n                                        </span>\r\n                                    </td>\r\n                                    <td><span>{{sickDay.CountDays}}</span></td>\r\n                                    <td><span>{{sickDay.DateBegin | date:'MM/dd/yyyy'}}</span></td>\r\n                                    <td><span>{{sickDay.DateEnd | date:'MM/dd/yyyy'}}</span></td>\r\n                                    <td class=\"ellipsis\">{{sickDay.Comment}}</td>\r\n                                    <td *isCurrentUserOrHasRole=\"{ id: userId, roles: ['Super_Admin', 'Admin']}\" style=\"text-align:right\">\r\n                                        <a class=\"btn btn-primary black-tooltip\" routerLink=\"/workactivities/sickDays/{{sickDay.Id}}/edit\">\r\n                                            <i class=\"fa fa-edit\"></i>\r\n                                            <span class=\"tooltiptext\">Edit</span>\r\n                                        </a>\r\n                                        <a class=\"btn btn-default black-tooltip\" (click)=\"confirmDeleteDialog(sickDay.Id, i)\">\r\n                                            <i class=\"fa fa-trash\"></i>\r\n                                            <span class=\"tooltiptext\">Delete</span>\r\n                                        </a>\r\n                                    </td>\r\n                                </tr>\r\n                            </tbody>\r\n                        </table>\r\n                        <table-buttons [subject]=\"subject\">\r\n\r\n                        </table-buttons>\r\n                    </form>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n"

/***/ }),

/***/ "./ClientApp/app/components/work-activity/sickdays/sickdays-user-list/sickdays-user-list.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var common_1 = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
var user_storage_service_1 = __webpack_require__("./ClientApp/app/services/user-storage.service.ts");
var sick_day_model_1 = __webpack_require__("./ClientApp/app/models/sick-day.model.ts");
var sick_day_service_1 = __webpack_require__("./ClientApp/app/services/sick-day.service.ts");
var sick_day_query_model_1 = __webpack_require__("./ClientApp/app/models/query-models/sick-day-query.model.ts");
var users_service_1 = __webpack_require__("./ClientApp/app/services/users.service.ts");
var user_query_model_1 = __webpack_require__("./ClientApp/app/models/query-models/user-query.model.ts");
var user_model_1 = __webpack_require__("./ClientApp/app/models/user.model.ts");
var forms_1 = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
var material_1 = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
var ngx_spinner_1 = __webpack_require__("./node_modules/@hardpool/ngx-spinner/fesm5/hardpool-ngx-spinner.js");
var delete_confirmation_component_1 = __webpack_require__("./ClientApp/app/components/modals/delete-confirmation/delete-confirmation.component.ts");
var rxjs_1 = __webpack_require__("./node_modules/rxjs/Rx.js");
var SickDaysUserListComponent = /** @class */ (function () {
    function SickDaysUserListComponent(route, userStorageService, sickDayService, usersService, fBuilder, dialog, location, router) {
        this.route = route;
        this.userStorageService = userStorageService;
        this.sickDayService = sickDayService;
        this.usersService = usersService;
        this.fBuilder = fBuilder;
        this.dialog = dialog;
        this.location = location;
        this.router = router;
        this.sickDays = new Array();
        this.newSickDay = new sick_day_model_1.SickDay();
        this.users = new Array();
        this.selectedUser = new user_model_1.User();
        this.isBeginDateIncorrect = false;
        this.isEndDateIncorrect = false;
        this.loading = false;
        this.spinnerConfig = {
            placement: ngx_spinner_1.SPINNER_PLACEMENT.block_ui,
            animation: ngx_spinner_1.SPINNER_ANIMATIONS.spin_3,
            size: "3rem",
            color: "#1574b3"
        };
    }
    ;
    SickDaysUserListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subject = new rxjs_1.Subject();
        this.isAddVisible = false;
        this.id = this.userId;
        this.queryModel = new sick_day_query_model_1.SickDayQueryModel();
        this.queryModel.Take = 10;
        if (this.id != null)
            this.queryModel.UserId = this.id;
        this.loading = true;
        this.sickDayService.get(this.queryModel).subscribe(function (response) {
            _this.sickDays = response.Result;
            _this.subject.next({ from: "component", response: response });
            _this.sickDays.forEach(function (value, index, array) {
                value.DateBegin = new Date(Date.parse(value.DateBegin.toString()));
                value.DateEnd = new Date(Date.parse(value.DateEnd.toString()));
            });
            _this.sickDays.sort(function (x, y) {
                if (x.DateBegin > y.DateBegin)
                    return -1;
                if (x.DateBegin < y.DateBegin)
                    return 1;
                return 0;
            });
            _this.loading = false;
        });
        this.usersService.get(new user_query_model_1.UserQueryModel()).subscribe(function (response) {
            _this.users = response.Result;
        });
        this.subscription = this.subject.asObservable().subscribe(function (response) {
            if (response.fron == "tablebuttons") {
                _this.queryModel = response.response;
                _this.id = _this.userId;
                if (_this.id != null)
                    _this.queryModel.UserId = _this.id;
                _this.loading = true;
                _this.sickDayService.get(_this.queryModel).subscribe(function (response) {
                    _this.sickDays = response.Result;
                    _this.sickDays.forEach(function (value, index, array) {
                        value.DateBegin = new Date(Date.parse(value.DateBegin.toString()));
                        value.DateEnd = new Date(Date.parse(value.DateEnd.toString()));
                    });
                    _this.sickDays.sort(function (x, y) {
                        if (x.DateBegin > y.DateBegin)
                            return -1;
                        if (x.DateBegin < y.DateBegin)
                            return 1;
                        return 0;
                    });
                    _this.loading = false;
                });
                _this.usersService.get(new user_query_model_1.UserQueryModel()).subscribe(function (response) {
                    _this.users = response.Result;
                });
            }
        });
        this.isMyPage = (this.id == this.userStorageService.getId() || this.isAdmin);
        this.initDates();
        this.initForm();
    };
    SickDaysUserListComponent.prototype.initForm = function () {
        this.newSickDayForm = this.fBuilder.group({
            CountDays: ['', forms_1.Validators.min(1)],
            BeginDate: ['', [
                    forms_1.Validators.required
                ]],
            EndDate: ['', [
                    forms_1.Validators.required
                ]],
            Comment: [],
            SelectedUser: []
        });
    };
    SickDaysUserListComponent.prototype.initDates = function () {
        //Allow begin date vacation and end date vacation
        //only in previous or in the next year
        this.minSickDayDate = new Date(new Date().getFullYear(), 0, 1); //Start of the year
        this.minSickDayDate.setFullYear(this.minSickDayDate.getFullYear() - 1);
        this.maxSickDayDate = new Date(new Date().getFullYear(), 11, 31); //End of the year
        this.maxSickDayDate.setFullYear(this.maxSickDayDate.getFullYear() + 1);
    };
    SickDaysUserListComponent.prototype.delete = function (index, indexOnArray) {
        var _this = this;
        this.sickDayService.delete(index).subscribe(function (result) {
            _this.queryModel.Take = 10;
            if (_this.id != null)
                _this.queryModel.UserId = _this.id;
            _this.loading = true;
            _this.sickDayService.get(_this.queryModel).subscribe(function (response) {
                _this.sickDays = response.Result;
                _this.subject.next({ from: "component", response: response });
                _this.sickDays.forEach(function (value, index, array) {
                    value.DateBegin = new Date(Date.parse(value.DateBegin.toString()));
                    value.DateEnd = new Date(Date.parse(value.DateEnd.toString()));
                });
                _this.sickDays.sort(function (x, y) {
                    if (x.DateBegin > y.DateBegin)
                        return -1;
                    if (x.DateBegin < y.DateBegin)
                        return 1;
                    return 0;
                });
                _this.loading = false;
            });
            _this.usersService.get(new user_query_model_1.UserQueryModel()).subscribe(function (response) {
                _this.users = response.Result;
            });
            _this.status = "Deleted";
        });
    };
    SickDaysUserListComponent.prototype.confirmDeleteDialog = function (id, index) {
        var _this = this;
        var dialogConfig = new material_1.MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.position = { top: '0' };
        dialogConfig.autoFocus = false;
        this.dialog.open(delete_confirmation_component_1.DeleteConfirmationComponent, dialogConfig)
            .afterClosed().subscribe(function (dialogResult) {
            if (dialogResult)
                _this.delete(id, index);
        });
    };
    SickDaysUserListComponent.prototype.add = function (newSickDay) {
        var _this = this;
        if (this.newSickDayForm.valid && !this.isBeginDateIncorrect && !this.isEndDateIncorrect) {
            this.submitAttempt = false;
            newSickDay.DateBegin = new Date(Date.parse(newSickDay.DateBegin.toString()));
            newSickDay.DateBegin.setMinutes(newSickDay.DateBegin.getMinutes() - newSickDay.DateBegin.getTimezoneOffset());
            newSickDay.DateEnd = new Date(Date.parse(newSickDay.DateEnd.toString()));
            newSickDay.DateEnd.setMinutes(newSickDay.DateEnd.getMinutes() - newSickDay.DateEnd.getTimezoneOffset());
            newSickDay.UserProfileId = (this.id != null && this.id != 0 && this.id != undefined) ? this.id : newSickDay.UserProfileId;
            this.sickDayService.create(newSickDay).subscribe(function (response) {
                _this.newSickDay = response;
                if (_this.newSickDay.Id != 0) {
                    _this.queryModel = new sick_day_query_model_1.SickDayQueryModel();
                    _this.queryModel.UserId = _this.id;
                    _this.sickDayService.get(_this.queryModel).subscribe(function (response) {
                        _this.sickDays = response.Result;
                        _this.subject.next({ from: "component", response: response });
                        _this.sickDays.forEach(function (value, index, array) {
                            value.DateBegin = new Date(Date.parse(value.DateBegin.toString()));
                            value.DateEnd = new Date(Date.parse(value.DateEnd.toString()));
                        });
                    });
                    _this.isAddVisible = false;
                }
            });
        }
        else {
            this.submitAttempt = true;
        }
    };
    SickDaysUserListComponent.prototype.calcSickDayDays = function (newSickDay) {
        var currentDate = new Date();
        currentDate.setHours(0);
        currentDate.setMinutes(0);
        currentDate.setSeconds(0);
        this.isBeginDateIncorrect = false;
        this.isEndDateIncorrect = false;
        if (newSickDay.DateBegin && newSickDay.DateEnd) {
            if (newSickDay.DateEnd.getTime() < newSickDay.DateBegin.getTime()) {
                this.isEndDateIncorrect = true;
            }
            else {
                this.newSickDay.CountDays = ((newSickDay.DateEnd.getTime() - newSickDay.DateBegin.getTime()) / 86400000) + 1;
            }
        }
    };
    SickDaysUserListComponent.prototype.menuAddNew = function () {
        this.isAddVisible = true;
        this.newSickDay = new sick_day_model_1.SickDay();
    };
    SickDaysUserListComponent.prototype.goBack = function () {
        this.location.back();
    };
    SickDaysUserListComponent.prototype.goToUser = function (sickday) {
        this.router.navigateByUrl('/users/' + sickday.UserProfileId + '/info');
    };
    __decorate([
        core_1.Input('userId'),
        __metadata("design:type", Number)
    ], SickDaysUserListComponent.prototype, "userId", void 0);
    SickDaysUserListComponent = __decorate([
        core_1.Component({
            selector: 'user-sickdays',
            template: __webpack_require__("./ClientApp/app/components/work-activity/sickdays/sickdays-user-list/sickdays-user-list.component.html"),
            styles: [__webpack_require__("./ClientApp/app/components/work-activity/sickdays/sickdays-user-list/sickdays-user-list.component.css")]
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            user_storage_service_1.UserStorageService,
            sick_day_service_1.SickDayService,
            users_service_1.UsersService,
            forms_1.FormBuilder,
            material_1.MatDialog,
            common_1.Location,
            router_1.Router])
    ], SickDaysUserListComponent);
    return SickDaysUserListComponent;
}());
exports.SickDaysUserListComponent = SickDaysUserListComponent;


/***/ }),

/***/ "./ClientApp/app/components/work-activity/sizevacations/sizevacations-list.component.css":
/***/ (function(module, exports) {

module.exports = "  .my-table-striped > tbody > tr:nth-of-type(odd) {\r\n    background-color: #f9f9f9 !important;\r\n  }"

/***/ }),

/***/ "./ClientApp/app/components/work-activity/sizevacations/sizevacations-list.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"card\">\r\n    <div class=\"row\">\r\n        <div class=\"col-md-6\">\r\n            <h2>{{ 'Size of vacation' }}</h2>\r\n        </div>\r\n        <div class=\"col-md-6 text-right\">\r\n            <div class=\"row\">\r\n                <div class=\"col-md-4\">\r\n\r\n                </div>\r\n\r\n                <div class=\"col-md-8 text-right\" *permission=\"['Super_Admin', 'Admin']\">\r\n                    <a href=\"javascript:;\" class=\"user-profile dropdown-toggle\" data-toggle=\"dropdown\" aria-expanded=\"false\">\r\n                        <button class=\"btn btn-primary toggle-button\">\r\n                            <span class=\"fa fa-plus\"></span>\r\n                        </button>\r\n                    </a>\r\n                    <ul class=\"dropdown-menu dropdown-usermenu pull-right\">\r\n                        <li>\r\n                            <a (click)=\"menuAddNew()\" class=\"side-menu-link\">\r\n                                Add New\r\n                            </a>\r\n                        </li>\r\n                    </ul>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div id=\"datatable-responsive_wrapper\" class=\"dataTables_wrapper form-inline dt-bootstrap no-footer\">\r\n        <div class=\"row\">\r\n            <div class=\"col-md-12\">\r\n                <table class=\"table my-table-striped table-bordered projects\">\r\n                    <thead>\r\n                        <tr>\r\n                            <th>Year</th>\r\n                            <th>Count of day</th>\r\n                            <th></th>\r\n                        </tr>\r\n                    </thead>\r\n                    <tbody>\r\n                        <tr *ngIf=\"isAddVisible\">\r\n                            <td>\r\n                                <mat-form-field>\r\n                                    <input matInput placeholder=\"Year\" name=\"Year\" [(ngModel)]=\"newSizeVacation.Year\" type=\"number\">\r\n                                </mat-form-field>\r\n                            </td>\r\n                            <td>\r\n                                <mat-form-field>\r\n                                    <input matInput placeholder=\"Count days\" name=\"CountDays\" [(ngModel)]=\"newSizeVacation.CountDays\" type=\"number\">\r\n                                </mat-form-field>\r\n                            </td>\r\n                            <td>\r\n                                <button type=\"submit\" class=\"btn btn-success alignCenterBtn \" (click)=\"add(newSizeVacation)\">Save</button>\r\n                            </td>\r\n                        </tr>\r\n                        <ngx-spinner [visible]=\"loading\" [config]=\"spinnerConfig\"></ngx-spinner>\r\n                        <tr *ngFor=\"let sizev of sizevacations; let i = index\">\r\n                            <td><span>{{sizev.Year}}</span></td>\r\n                            <td><span>{{sizev.CountDays}}</span></td>\r\n                            <td *permission=\"['Super_Admin', 'Admin']\">\r\n                                <a class=\"btn btn-default black-tooltip\" (click)=\"delete(sizev.Id, i)\">\r\n                                    <i class=\"fa fa-trash-o\"></i>\r\n                                    <span class=\"tooltiptext\">Delete</span>\r\n                                </a>\r\n                            </td>\r\n                        </tr>\r\n                    </tbody>\r\n                </table>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n"

/***/ }),

/***/ "./ClientApp/app/components/work-activity/sizevacations/sizevacations-list.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var common_1 = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
var user_storage_service_1 = __webpack_require__("./ClientApp/app/services/user-storage.service.ts");
var size_vacation_model_1 = __webpack_require__("./ClientApp/app/models/size-vacation.model.ts");
var size_vacations_service_1 = __webpack_require__("./ClientApp/app/services/size-vacations.service.ts");
var size_vacation_query_model_1 = __webpack_require__("./ClientApp/app/models/query-models/size-vacation-query.model.ts");
var ngx_spinner_1 = __webpack_require__("./node_modules/@hardpool/ngx-spinner/fesm5/hardpool-ngx-spinner.js");
var SizeVacationsListComponent = /** @class */ (function () {
    function SizeVacationsListComponent(sizeVacationService, userStorageService, location) {
        this.sizeVacationService = sizeVacationService;
        this.userStorageService = userStorageService;
        this.location = location;
        this.sizevacations = new Array();
        this.newSizeVacation = new size_vacation_model_1.SizeVacation();
        this.loading = false;
    }
    ;
    SizeVacationsListComponent.prototype.delete = function (index, indexOnArray) {
        var _this = this;
        this.sizeVacationService.delete(index).subscribe(function (result) {
            _this.sizevacations.splice(indexOnArray, 1);
            _this.status = "Deleted";
        });
    };
    SizeVacationsListComponent.prototype.add = function (newSizeVacation) {
        var _this = this;
        if (newSizeVacation.Year < 2050 && newSizeVacation.Year > 2000 && newSizeVacation.CountDays < 365 && newSizeVacation.CountDays > -1) {
            this.sizeVacationService.create(newSizeVacation).subscribe(function (result) {
                _this.newSizeVacation = result;
                if (_this.newSizeVacation.Id != 0) {
                    _this.sizeVacationService.get(new size_vacation_query_model_1.SizeVacationQueryModel()).subscribe(function (response) {
                        _this.sizevacations = response.Result;
                        _this.sizevacations.sort(function (x) { return x.Year; }).reverse();
                    });
                    _this.isAddVisible = false;
                }
            });
        }
    };
    SizeVacationsListComponent.prototype.menuAddNew = function () {
        this.isAddVisible = true;
        this.newSizeVacation = new size_vacation_model_1.SizeVacation();
    };
    SizeVacationsListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.spinnerConfig = {
            placement: ngx_spinner_1.SPINNER_PLACEMENT.block_ui,
            animation: ngx_spinner_1.SPINNER_ANIMATIONS.spin_3,
            size: "3rem",
            color: "#1574b3"
        };
        this.loading = true;
        this.isAdmin = this.userStorageService.hasRole('Admin');
        this.isUser = this.userStorageService.hasRole('User');
        this.sizeVacationService.get(new size_vacation_query_model_1.SizeVacationQueryModel()).subscribe(function (response) {
            _this.sizevacations = response.Result;
            _this.sizevacations.sort(function (x, y) {
                if (x.Year > y.Year)
                    return -1;
                if (x.Year < y.Year)
                    return 1;
                return 0;
            });
            _this.loading = false;
        });
    };
    SizeVacationsListComponent.prototype.goBack = function () {
        this.location.back();
    };
    SizeVacationsListComponent = __decorate([
        core_1.Component({
            template: __webpack_require__("./ClientApp/app/components/work-activity/sizevacations/sizevacations-list.component.html"),
            styles: [__webpack_require__("./ClientApp/app/components/work-activity/sizevacations/sizevacations-list.component.css")]
        }),
        __metadata("design:paramtypes", [size_vacations_service_1.SizeVacationsService,
            user_storage_service_1.UserStorageService,
            common_1.Location])
    ], SizeVacationsListComponent);
    return SizeVacationsListComponent;
}());
exports.SizeVacationsListComponent = SizeVacationsListComponent;


/***/ }),

/***/ "./ClientApp/app/components/work-activity/vacations/vacations-edit/vacations-edit.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"card x_panel\">\r\n    <div id=\"divDataBody\" class=\"container entity\">\r\n        <div class=\"row formTitle\">\r\n            <div class=\"col-md-6\">\r\n                <h2 class=\"title\">Update vacation</h2>\r\n            </div>\r\n        </div>\r\n        <div class=\"row\">\r\n            <div class=\"col-md-4\">\r\n\r\n            </div>\r\n            <div class=\"col-md-4\">\r\n                <form name=\"addpost\" class=\"form-horizontal  container-fluid\">\r\n                    <div class=\"col-md-12 col-sm-12 col-xs-12 form-group has-feedback black-tooltip date-field\">\r\n                        <mat-datepicker #picker1></mat-datepicker>\r\n                        <input type=\"text\" class=\"form-control has-feedback-left\" id=\"inputSuccess6\" [matDatepicker]=\"picker1\" placeholder=\"Start Date\" name=\"BeginDate\" [(ngModel)]=\"vacation.DateBegin\">\r\n                        <mat-datepicker-toggle class=\"left\" matSuffix [for]=\"picker1\"></mat-datepicker-toggle>\r\n                        <span class=\"tooltiptext\">\r\n                            Start Date\r\n                        </span>\r\n                    </div>\r\n                    <div class=\"col-md-12 col-sm-12 col-xs-12 form-group has-feedback black-tooltip date-field\">\r\n                        <mat-datepicker #picker2></mat-datepicker>\r\n                        <input type=\"text\" class=\"form-control has-feedback-left\" id=\"inputSuccess6\" [matDatepicker]=\"picker2\" placeholder=\"End Date\" name=\"EndDate\" [(ngModel)]=\"vacation.DateEnd\">\r\n                        <mat-datepicker-toggle class=\"left\" matSuffix [for]=\"picker2\"></mat-datepicker-toggle>\r\n                        <span class=\"tooltiptext\">\r\n                            End Date\r\n                        </span>\r\n                    </div>\r\n                    <div class=\"col-md-12 col-sm-12 col-xs-12 form-group has-feedback black-tooltip\">\r\n                        <input type=\"text\" class=\"form-control has-feedback-left form-control-small\" id=\"inputSuccess12\" placeholder=\"Comment\" name=\"Comment\" [(ngModel)]=\"vacation.Comment\">\r\n                        <span class=\"fa fa-comment form-control-feedback left\" aria-hidden=\"true\"></span>\r\n                        <span class=\"tooltiptext\">\r\n                            Comment\r\n                        </span>\r\n                    </div>\r\n                    <div class=\"col-md-12 col-sm-12 col-xs-12 form-group has-feedback black-tooltip\">\r\n                        <input type=\"text\" class=\"form-control  has-feedback-left\" id=\"inputSuccess12\" placeholder=\"Count days\" name=\"CountDays\" [(ngModel)]=\"vacation.CountDays\">\r\n                        <span class=\"fa fa-calculator form-control-feedback left\" aria-hidden=\"true\"></span>\r\n                        <span class=\"error-message\" *ngIf=\"cntDayErMsg\">\r\n                            {{cntDayErMsg}}\r\n                        </span>\r\n                        <span class=\"tooltiptext\">\r\n                            CountDays\r\n                        </span>\r\n\r\n                    </div>\r\n                    <div class=\"col-md-12 col-sm-12 col-xs-12 form-group has-feedback\">\r\n\r\n                    </div>\r\n                    <div class=\"col-md-8 col-md-offset-2 col-xs-12 \">\r\n                        <div class=\"col-md-12 col-xs-12\">\r\n                            <div class=\"form-group col-md-12 col-xs-12  text-center\">\r\n                                <button class=\"btn btn-primary alignCenterBtn\" (click)=\"updateVacation(vacation)\">Save</button>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </form>\r\n            </div>\r\n            <div class=\"col-md-4\">\r\n\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "./ClientApp/app/components/work-activity/vacations/vacations-edit/vacations-edit.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var common_1 = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
var user_storage_service_1 = __webpack_require__("./ClientApp/app/services/user-storage.service.ts");
var vacation_service_1 = __webpack_require__("./ClientApp/app/services/vacation.service.ts");
var vacation_model_1 = __webpack_require__("./ClientApp/app/models/vacation.model.ts");
var VacationsEditComponent = /** @class */ (function () {
    function VacationsEditComponent(vacationService, location, route, userStorageService) {
        this.vacationService = vacationService;
        this.location = location;
        this.route = route;
        this.userStorageService = userStorageService;
        this.vacation = new vacation_model_1.Vacation();
    }
    VacationsEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.id = +params['id'];
            _this.vacationService.getById(_this.id).subscribe(function (responce) {
                _this.vacation = responce;
                _this.vacation.DateBegin = new Date(Date.parse(_this.vacation.DateBegin.toString()));
                _this.vacation.DateEnd = new Date(Date.parse(_this.vacation.DateEnd.toString()));
            });
        });
    };
    VacationsEditComponent.prototype.updateVacation = function (vacation) {
        var _this = this;
        if (this.isVacationsFormValid(vacation)) {
            this.vacation.DateBegin = new Date(Date.parse(this.vacation.DateBegin.toString()));
            this.vacation.DateBegin.setMinutes(this.vacation.DateBegin.getMinutes() - this.vacation.DateBegin.getTimezoneOffset());
            this.vacation.DateEnd = new Date(Date.parse(this.vacation.DateEnd.toString()));
            this.vacation.DateEnd.setMinutes(this.vacation.DateEnd.getMinutes() - this.vacation.DateEnd.getTimezoneOffset());
            this.vacationService.update(this.vacation).subscribe(function (response) {
                _this.location.back();
            });
        }
    };
    ;
    VacationsEditComponent.prototype.calcVacationDays = function (vacation) {
        if (vacation.DateBegin && vacation.DateEnd) {
            if (vacation.DateEnd.getTime() <= vacation.DateBegin.getTime()) {
                this.endDateErMsg = "End Date should be more than Begin Date";
            }
            else {
                this.vacation.CountDays = ((vacation.DateEnd.getTime() - vacation.DateBegin.getTime()) / 86400000) + 1;
                this.endDateErMsg = null;
            }
        }
    };
    VacationsEditComponent.prototype.isVacationsFormValid = function (newVacation) {
        if (newVacation.DateBegin == null) {
            this.beginDateErMsg = "Begin Date is required field";
            return false;
        }
        else if (newVacation.DateEnd == null) {
            this.endDateErMsg = "End Date is required field";
            return false;
        }
        else if (newVacation.DateEnd.getTime() < newVacation.DateBegin.getTime()) {
            this.endDateErMsg = "End Date should be more than Begin Date";
            return false;
        }
        else if (newVacation.CountDays < 1) {
            this.cntDayErMsg = "Count should more than 1";
            return false;
        }
        this.beginDateErMsg = null;
        this.endDateErMsg = null;
        return true;
    };
    VacationsEditComponent.prototype.goBack = function () {
        this.location.back();
    };
    VacationsEditComponent = __decorate([
        core_1.Component({
            template: __webpack_require__("./ClientApp/app/components/work-activity/vacations/vacations-edit/vacations-edit.component.html")
        }),
        __metadata("design:paramtypes", [vacation_service_1.VacationService,
            common_1.Location,
            router_1.ActivatedRoute,
            user_storage_service_1.UserStorageService])
    ], VacationsEditComponent);
    return VacationsEditComponent;
}());
exports.VacationsEditComponent = VacationsEditComponent;


/***/ }),

/***/ "./ClientApp/app/components/work-activity/vacations/vacations-list/vacations-list.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./ClientApp/app/components/work-activity/vacations/vacations-list/vacations-list.component.html":
/***/ (function(module, exports) {

module.exports = "<user-vacations>\r\n    \r\n</user-vacations>\r\n"

/***/ }),

/***/ "./ClientApp/app/components/work-activity/vacations/vacations-list/vacations-list.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var common_1 = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
var user_storage_service_1 = __webpack_require__("./ClientApp/app/services/user-storage.service.ts");
var vacation_model_1 = __webpack_require__("./ClientApp/app/models/vacation.model.ts");
var user_model_1 = __webpack_require__("./ClientApp/app/models/user.model.ts");
var vacation_service_1 = __webpack_require__("./ClientApp/app/services/vacation.service.ts");
var users_service_1 = __webpack_require__("./ClientApp/app/services/users.service.ts");
var VacationsListComponent = /** @class */ (function () {
    function VacationsListComponent(vacationService, userStorageService, usersService, location) {
        this.vacationService = vacationService;
        this.userStorageService = userStorageService;
        this.usersService = usersService;
        this.location = location;
        this.vacations = new Array();
        this.newVacation = new vacation_model_1.Vacation();
        this.users = new Array();
        this.selectedUser = new user_model_1.User();
    }
    VacationsListComponent = __decorate([
        core_1.Component({
            template: __webpack_require__("./ClientApp/app/components/work-activity/vacations/vacations-list/vacations-list.component.html"),
            styles: [__webpack_require__("./ClientApp/app/components/work-activity/vacations/vacations-list/vacations-list.component.css")]
        }),
        __metadata("design:paramtypes", [vacation_service_1.VacationService,
            user_storage_service_1.UserStorageService,
            users_service_1.UsersService,
            common_1.Location])
    ], VacationsListComponent);
    return VacationsListComponent;
}());
exports.VacationsListComponent = VacationsListComponent;


/***/ }),

/***/ "./ClientApp/app/components/work-activity/vacations/vacations-user-list/vacations-user-list.component.css":
/***/ (function(module, exports) {

module.exports = "   .my-table-striped > tbody > tr:nth-of-type(odd) {\r\n    background-color: #f9f9f9 !important;\r\n  }\r\n\r\n  .link:hover {\r\n    cursor: pointer;\r\n  }\r\n\r\n  input:-moz-read-only {\r\n    background-color: white;\r\n    color: black;\r\n    cursor: pointer;\r\n}\r\n\r\n  input:read-only {\r\n    background-color: white;\r\n    color: black;\r\n    cursor: pointer;\r\n}"

/***/ }),

/***/ "./ClientApp/app/components/work-activity/vacations/vacations-user-list/vacations-user-list.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"card x_panel\">\r\n    <div class=\"row\">\r\n        <div class=\"col-md-6\">\r\n            <h2>Vacations</h2>\r\n        </div>\r\n        <div class=\"col-md-6 text-right\">\r\n            <div class=\"row\">\r\n                <div class=\"col-md-8\">\r\n\r\n                </div>\r\n\r\n                <div class=\"col-md-4 text-right toggle-div\" *isCurrentUserOrHasRole=\"{ id: userId, roles: ['Super_Admin', 'Admin']}\">\r\n                    <a href=\"javascript:;\" class=\"user-profile dropdown-toggle\" data-toggle=\"dropdown\" aria-expanded=\"false\">\r\n                        <button class=\"btn btn-primary toggle-button\">\r\n                            <span class=\"fa fa-plus\"></span>\r\n                        </button>\r\n                    </a>\r\n                    <ul class=\"dropdown-menu dropdown-usermenu pull-right\">\r\n                        <li>\r\n                            <a (click)=\"menuAddNew()\" class=\"side-menu-link\">\r\n                                Add vacation day(s)\r\n                            </a>\r\n                        </li>\r\n                    </ul>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div id=\"datatable-responsive_wrapper\" class=\"dataTables_wrapper form-inline dt-bootstrap no-footer\">\r\n        <div class=\"row\">\r\n            <div class=\"col-md-12\">\r\n                <form [formGroup]=\"newVacationForm\" (submit)=\"add(newVacation)\">\r\n                    <table class=\"table my-table-striped table-bordered projects\" [formGroup]=\"newVacationForm\" (submit)=\"add(newVacation)\">\r\n                        <thead style=\"color: #73879C;\">\r\n                            <tr>\r\n                                <th *ngIf=\"userId == null\">User</th>\r\n                                <th>Count</th>\r\n                                <th>Begin Date</th>\r\n                                <th>End Date</th>\r\n                                <th>Comment</th>\r\n                                <th>Status</th>\r\n                                <th style=\"width:19%\" *isCurrentUserOrHasRole=\"{ id: userId, roles: ['Super_Admin', 'Admin']}\"></th>\r\n                            </tr>\r\n                        </thead>\r\n                        <tbody>\r\n                            <tr *ngIf=\"isAddVisible\">\r\n                                <td *ngIf=\"userId == null\">\r\n                                    <select class=\"select2_single form-control\" [(ngModel)]=\"newVacation.UserProfileId\" formControlName=\"SelectedUser\" tabindex=\"-1\">\r\n                                        <option *ngFor=\"let selectUser of users; let i = index\" [value]=\"selectUser.UserProfileId\">\r\n                                            {{ selectUser.FirstName }} {{ selectUser.LastName }}\r\n                                        </option>\r\n                                    </select>\r\n                                </td>\r\n                                <td>\r\n                                    <div class=\"col-md-12 col-sm-12 col-xs-12 form-group has-feedback  black-tooltip\">\r\n                                        <input type=\"text\" class=\"form-control has-feedback-left\" id=\"inputSuccess12\" placeholder=\"Count\" formControlName=\"CountDays\" [(ngModel)]=\"newVacation.CountDays\" style=\"width: inherit;\" disabled>\r\n                                        <span class=\"fa fa-calculator form-control-feedback left\" aria-hidden=\"true\"></span>\r\n                                        <span class=\"tooltiptext\">\r\n                                            Count\r\n                                        </span>\r\n                                    </div>\r\n                                </td>\r\n                                <td>\r\n                                    <div class=\"col-md-12 col-sm-12 col-xs-12 form-group has-feedback black-tooltip date-field\">\r\n                                        <mat-datepicker #picker1></mat-datepicker>\r\n                                        <input type=\"text\" class=\"form-control has-feedback-left form-control-small\" id=\"inputSuccess7\" [matDatepicker]=\"picker1\" placeholder=\"Begin Date\" [min]=\"minVacationDate\" [max]=\"maxVacationDate\" formControlName=\"BeginDate\" [(ngModel)]=\"newVacation.DateBegin\" (ngModelChange)=\"calcVacationDays(newVacation)\" (click)=\"picker1.open()\" readonly>\r\n                                        <mat-datepicker-toggle class=\"left\" matSuffix [for]=\"picker1\"></mat-datepicker-toggle>\r\n                                        <span class=\"tooltiptext\">\r\n                                            Start of vacation\r\n                                        </span>\r\n                                    </div>\r\n                                    <div class=\"error-message\" *ngIf=\"newVacationForm.get('BeginDate').errors\">\r\n                                        <span class=\"error-message\" *ngIf=\"newVacationForm.get('BeginDate').errors.required && submitAttempt\">\r\n                                            Start Date is required\r\n                                        </span>\r\n                                    </div>\r\n                                    <span class=\"error-message\" *ngIf=\"isBeginDateIncorrect\">\r\n                                        Start Date should be more than today\r\n                                    </span>\r\n                                </td>\r\n                                <td>\r\n                                    <div class=\"col-md-12 col-sm-12 col-xs-12 form-group has-feedback black-tooltip date-field\">\r\n                                        <mat-datepicker #picker2></mat-datepicker>\r\n                                        <input type=\"text\" class=\"form-control has-feedback-left form-control-small\" id=\"inputSuccess8\" [matDatepicker]=\"picker2\" placeholder=\"End Date\" [min]=\"minVacationDate\" [max]=\"maxVacationDate\" formControlName=\"EndDate\" [(ngModel)]=\"newVacation.DateEnd\" (ngModelChange)=\"calcVacationDays(newVacation)\" (click)=\"picker2.open()\" readonly>\r\n                                        <mat-datepicker-toggle class=\"left\" matSuffix [for]=\"picker2\"></mat-datepicker-toggle>\r\n                                        <span class=\"tooltiptext\">\r\n                                            End of vacation\r\n                                        </span>\r\n                                    </div>\r\n                                    <div class=\"error-message\" *ngIf=\"newVacationForm.get('EndDate').errors\">\r\n                                        <span class=\"error-message\" *ngIf=\"newVacationForm.get('EndDate').errors.required && submitAttempt\">\r\n                                            End Date is required\r\n                                        </span>\r\n                                    </div>\r\n                                    <span class=\"error-message\" *ngIf=\"isEndDateIncorrect\">\r\n                                        End Date should be more than Begin Date and than today\r\n                                    </span>\r\n                                </td>\r\n                                <td>\r\n\r\n                                    <div class=\"col-md-12 col-sm-12 col-xs-12 form-group has-feedback  black-tooltip\">\r\n                                        <input type=\"text\" class=\"form-control has-feedback-left form-control-small\" id=\"inputSuccess12\" placeholder=\"Comment\" formControlName=\"Comment\" [(ngModel)]=\"newVacation.Comment\">\r\n                                        <span class=\"fa fa-comment form-control-feedback left\" aria-hidden=\"true\"></span>\r\n                                        <span class=\"tooltiptext\">\r\n                                            Comment\r\n                                        </span>\r\n                                    </div>\r\n\r\n\r\n                                </td>\r\n                                <td></td>\r\n                                <td  style=\"width:19%\" style=\"text-align:right;\">\r\n                                    <button type=\"submit\" class=\"btn btn-primary black-tooltip\">\r\n                                        <i class=\"fa fa-check\"></i>\r\n                                        <span class=\"tooltiptext\">Save</span>\r\n                                    </button>\r\n                                    <button class=\"btn btn-default black-tooltip\" (click)=\"isAddVisible = false\">\r\n                                        <i class=\"fa fa-close\"></i>\r\n                                        <span class=\"tooltiptext\">Cancel</span>\r\n                                    </button>\r\n                                </td>\r\n                            </tr>\r\n                            <ngx-spinner [visible]=\"loading\" [config]=\"spinnerConfig\"></ngx-spinner>\r\n                            <tr *ngFor=\"let vacation of vacations; let i = index\">\r\n                                <td *ngIf=\"userId == null\" class=\"link\" (click)=\"goToUser(vacation)\" ><span>{{vacation.UserProfile.FirstName}} {{vacation.UserProfile.LastName}}</span></td>\r\n                                <td><span>{{vacation.CountDays}}</span></td>\r\n                                <td><span>{{vacation.DateBegin.toDateString() }}</span></td>\r\n                                <td><span>{{vacation.DateEnd.toDateString() }}</span></td>\r\n                                <td class=\"ellipsis\">{{vacation.Comment}}</td>\r\n                                <td>{{vacation.Status}}</td>\r\n                                <td style=\"width:19%\" *isCurrentUserOrHasRole=\"{ id: userId, roles: ['Super_Admin', 'Admin']}\" style=\"text-align:right\">\r\n                                    <a class=\"btn btn-primary black-tooltip\" (click)=\"confirmVacation(vacation)\" *ngIf=\"vacation.Status == 'IsWaiting' && isAdmin\">\r\n                                        <i class=\"fa fa-check\"></i>\r\n                                        <span class=\"tooltiptext\">Confirm</span>\r\n                                    </a>\r\n                                    <a class=\"btn btn-default black-tooltip\" (click)=\"rejectVacation(vacation)\" *ngIf=\"vacation.Status == 'IsWaiting' && isAdmin\">\r\n                                        <i class=\"fa fa-close\"></i>\r\n                                        <span class=\"tooltiptext\">Reject</span>\r\n                                    </a>\r\n                                    <a class=\"btn btn-primary black-tooltip\" routerLink=\"/workactivities/vacations/{{vacation.Id}}/edit\">\r\n                                        <i class=\"fa fa-edit\"></i>\r\n                                        <span class=\"tooltiptext\">Edit</span>\r\n                                    </a>\r\n                                    <a class=\"btn btn-default black-tooltip\" (click)=\"confirmDeleteDialog(vacation.Id, i)\">\r\n                                        <i class=\"fa fa-trash\"></i>\r\n                                        <span class=\"tooltiptext\">Delete</span>\r\n                                    </a>\r\n                                </td>\r\n                            </tr>\r\n                        </tbody>\r\n                    </table>\r\n                </form>\r\n                <table-buttons [subject]=\"subject\">\r\n\r\n                </table-buttons>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n"

/***/ }),

/***/ "./ClientApp/app/components/work-activity/vacations/vacations-user-list/vacations-user-list.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var user_storage_service_1 = __webpack_require__("./ClientApp/app/services/user-storage.service.ts");
var vacation_model_1 = __webpack_require__("./ClientApp/app/models/vacation.model.ts");
var vacation_service_1 = __webpack_require__("./ClientApp/app/services/vacation.service.ts");
var users_service_1 = __webpack_require__("./ClientApp/app/services/users.service.ts");
var material_1 = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
var delete_confirmation_component_1 = __webpack_require__("./ClientApp/app/components/modals/delete-confirmation/delete-confirmation.component.ts");
var forms_1 = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
var vacation_query_model_1 = __webpack_require__("./ClientApp/app/models/query-models/vacation.query.model.ts");
var user_model_1 = __webpack_require__("./ClientApp/app/models/user.model.ts");
var user_query_model_1 = __webpack_require__("./ClientApp/app/models/query-models/user-query.model.ts");
var ngx_spinner_1 = __webpack_require__("./node_modules/@hardpool/ngx-spinner/fesm5/hardpool-ngx-spinner.js");
var common_1 = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
var rxjs_1 = __webpack_require__("./node_modules/rxjs/Rx.js");
var VacationsUserListComponent = /** @class */ (function () {
    function VacationsUserListComponent(route, userStorageService, vacationService, dialog, usersService, fBuilder, location, router) {
        this.route = route;
        this.userStorageService = userStorageService;
        this.vacationService = vacationService;
        this.dialog = dialog;
        this.usersService = usersService;
        this.fBuilder = fBuilder;
        this.location = location;
        this.router = router;
        this.vacations = new Array();
        this.newVacation = new vacation_model_1.Vacation();
        this.isBeginDateIncorrect = false;
        this.isEndDateIncorrect = false;
        this.selectedUser = new user_model_1.User();
        this.users = new Array();
        this.loading = false;
        this.isWaitingExist = false;
        this.spinnerConfig = {
            placement: ngx_spinner_1.SPINNER_PLACEMENT.block_ui,
            animation: ngx_spinner_1.SPINNER_ANIMATIONS.spin_3,
            size: "3rem",
            color: "#1574b3"
        };
        this.isAddVisible = false;
    }
    ;
    VacationsUserListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isAdmin = this.userStorageService.hasPermission(["Admin", "Super_Admin"]);
        this.subject = new rxjs_1.Subject();
        this.id = this.userId;
        this.queryModel = new vacation_query_model_1.VacationQueryModel();
        if (this.id != null)
            this.queryModel.UserId = this.id;
        this.queryModel.Take = 10;
        this.queryModel.Skip = 0;
        this.loading = true;
        this.vacationService.get(this.queryModel).subscribe(function (response) {
            _this.vacations = response.Result;
            _this.subject.next({ from: "component", response: response });
            _this.vacations.forEach(function (value, index, array) {
                value.DateBegin = new Date(Date.parse(value.DateBegin.toString()));
                value.DateEnd = new Date(Date.parse(value.DateEnd.toString()));
                value.CreatedDate = new Date(Date.parse(value.CreatedDate.toString()));
                value.Status = value.CreatedDate.setTime(value.CreatedDate.getTime() + 48 * 60 * 60 * 1000) < Date.now() ? "Confirmed" : value.Status;
                if (value.Status == "IsWaiting")
                    _this.isWaitingExist = true;
            });
            _this.vacations.sort(function (x, y) {
                if (x.DateBegin > y.DateBegin)
                    return -1;
                if (x.DateBegin < y.DateBegin)
                    return 1;
                return 0;
            });
            _this.loading = false;
        });
        this.subscription = this.subject.asObservable().subscribe(function (response) {
            if (response.from == "tablebuttons") {
                _this.queryModel = response.response;
                if (_this.id != null)
                    _this.queryModel.UserId = _this.id;
                _this.loading = true;
                _this.vacationService.get(_this.queryModel).subscribe(function (response) {
                    _this.vacations = response.Result;
                    _this.vacations.forEach(function (value, index, array) {
                        value.DateBegin = new Date(Date.parse(value.DateBegin.toString()));
                        value.DateEnd = new Date(Date.parse(value.DateEnd.toString()));
                        value.CreatedDate = new Date(Date.parse(value.CreatedDate.toString()));
                        value.Status = value.CreatedDate.setTime(value.CreatedDate.getTime() + 48 * 60 * 60 * 1000) < Date.now() ? "Confirmed" : value.Status;
                    });
                    _this.vacations.sort(function (x, y) {
                        if (x.DateBegin > y.DateBegin)
                            return -1;
                        if (x.DateBegin < y.DateBegin)
                            return 1;
                        return 0;
                    });
                    _this.loading = false;
                });
            }
        });
        this.usersService.get(new user_query_model_1.UserQueryModel()).subscribe(function (response) {
            _this.users = response.Result;
        });
        this.initDates();
        this.initForm();
    };
    VacationsUserListComponent.prototype.initForm = function () {
        this.newVacationForm = this.fBuilder.group({
            CountDays: ['', forms_1.Validators.min(1)],
            BeginDate: ['', [
                    forms_1.Validators.required
                ]],
            EndDate: ['', [
                    forms_1.Validators.required
                ]],
            Comment: [],
            SelectedUser: []
        });
    };
    VacationsUserListComponent.prototype.initDates = function () {
        //Allow begin date vacation and end date vacation
        //only in previous or in the next year
        this.minVacationDate = new Date(new Date().getFullYear(), 0, 1); //Start of the year
        this.minVacationDate.setFullYear(this.minVacationDate.getFullYear() - 1);
        this.maxVacationDate = new Date(new Date().getFullYear(), 11, 31); //End of the year
        this.maxVacationDate.setFullYear(this.maxVacationDate.getFullYear() + 1);
    };
    VacationsUserListComponent.prototype.delete = function (id, index) {
        var _this = this;
        this.vacationService.delete(id).subscribe(function (result) {
            _this.usersService.updateVacDays(_this.vacations[index].CountDays * (-1));
            if (_this.id != null)
                _this.queryModel.UserId = _this.id;
            _this.queryModel.Take = 10;
            _this.queryModel.Skip = 0;
            _this.loading = true;
            _this.vacationService.get(_this.queryModel).subscribe(function (response) {
                _this.vacations = response.Result;
                _this.subject.next({ from: "component", response: response });
                _this.vacations.forEach(function (value, index, array) {
                    value.DateBegin = new Date(Date.parse(value.DateBegin.toString()));
                    value.DateEnd = new Date(Date.parse(value.DateEnd.toString()));
                    value.CreatedDate = new Date(Date.parse(value.CreatedDate.toString()));
                    value.Status = value.CreatedDate.setTime(value.CreatedDate.getTime() + 48 * 60 * 60 * 1000) < Date.now() ? "Confirmed" : value.Status;
                    if (value.Status == "IsWaiting")
                        _this.isWaitingExist = true;
                });
                _this.vacations.sort(function (x, y) {
                    if (x.DateBegin > y.DateBegin)
                        return -1;
                    if (x.DateBegin < y.DateBegin)
                        return 1;
                    return 0;
                });
                _this.loading = false;
            });
            _this.status = "Deleted";
        });
    };
    VacationsUserListComponent.prototype.confirmDeleteDialog = function (id, index) {
        var _this = this;
        var dialogConfig = new material_1.MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.position = { top: '0' };
        dialogConfig.autoFocus = false;
        this.dialog.open(delete_confirmation_component_1.DeleteConfirmationComponent, dialogConfig)
            .afterClosed().subscribe(function (dialogResult) {
            if (dialogResult)
                _this.delete(id, index);
        });
    };
    VacationsUserListComponent.prototype.add = function (newVacation) {
        var _this = this;
        if (this.newVacationForm.valid && !this.isBeginDateIncorrect && !this.isEndDateIncorrect) {
            this.submitAttempt = false;
            newVacation.DateBegin = new Date(Date.parse(newVacation.DateBegin.toString()));
            newVacation.DateBegin.setMinutes(newVacation.DateBegin.getMinutes() - newVacation.DateBegin.getTimezoneOffset());
            newVacation.DateEnd = new Date(Date.parse(newVacation.DateEnd.toString()));
            newVacation.DateEnd.setMinutes(newVacation.DateEnd.getMinutes() - newVacation.DateEnd.getTimezoneOffset());
            newVacation.CreatedDate = new Date();
            newVacation.CreatedDate.setMinutes(newVacation.CreatedDate.getMinutes() - newVacation.CreatedDate.getTimezoneOffset());
            newVacation.UserProfileId = (this.id != null && this.id != 0 && this.id != undefined) ? this.id : newVacation.UserProfileId;
            newVacation.Status = "IsWaiting";
            this.vacationService.create(newVacation).subscribe(function (result) {
                _this.newVacation = result;
                if (_this.newVacation.Id != 0) {
                    _this.usersService.updateVacDays(_this.newVacation.CountDays);
                    _this.queryModel.UserId = _this.id;
                    _this.vacationService.get(_this.queryModel).subscribe(function (response) {
                        _this.vacations = response.Result;
                        _this.subject.next({ from: "component", response: response });
                        _this.vacations.forEach(function (value, index, array) {
                            value.DateBegin = new Date(Date.parse(value.DateBegin.toString()));
                            value.DateEnd = new Date(Date.parse(value.DateEnd.toString()));
                            value.CreatedDate = new Date(Date.parse(value.CreatedDate.toString()));
                            value.Status = value.CreatedDate.setTime(value.CreatedDate.getTime() + 48 * 60 * 60 * 1000) < Date.now() ? "Confirmed" : value.Status;
                        });
                    });
                    _this.isAddVisible = false;
                }
            });
        }
        else {
            this.submitAttempt = true;
        }
    };
    VacationsUserListComponent.prototype.calcVacationDays = function (newVacation) {
        var currentDate = new Date();
        currentDate.setHours(0);
        currentDate.setMinutes(0);
        currentDate.setSeconds(0);
        this.isBeginDateIncorrect = false;
        this.isEndDateIncorrect = false;
        if (newVacation.DateBegin && newVacation.DateEnd) {
            if (newVacation.DateEnd.getTime() < newVacation.DateBegin.getTime()) {
                this.isEndDateIncorrect = true;
            }
            else {
                this.newVacation.CountDays = ((newVacation.DateEnd.getTime() - newVacation.DateBegin.getTime()) / 86400000) + 1;
            }
        }
    };
    VacationsUserListComponent.prototype.menuAddNew = function () {
        this.isAddVisible = true;
        this.newVacation = new vacation_model_1.Vacation();
    };
    VacationsUserListComponent.prototype.goBack = function () {
        this.location.back();
    };
    VacationsUserListComponent.prototype.confirmVacation = function (vacation) {
        var _this = this;
        this.isWaitingExist = false;
        vacation.DateBegin = new Date(Date.parse(vacation.DateBegin.toString()));
        vacation.DateBegin.setMinutes(vacation.DateBegin.getMinutes() - vacation.DateBegin.getTimezoneOffset());
        vacation.DateEnd = new Date(Date.parse(vacation.DateEnd.toString()));
        vacation.DateEnd.setMinutes(vacation.DateEnd.getMinutes() - vacation.DateEnd.getTimezoneOffset());
        vacation.Status = "Confirmed";
        this.vacationService.update(vacation).subscribe(function (response) {
            _this.vacations.forEach(function (value, index, array) {
                value.Status = value.CreatedDate.setTime(value.CreatedDate.getTime() + 48 * 60 * 60 * 1000) < Date.now() ? "Confirmed" : value.Status;
                if (value.Status == "IsWaiting")
                    _this.isWaitingExist = true;
            });
        });
    };
    VacationsUserListComponent.prototype.rejectVacation = function (vacation) {
        var _this = this;
        this.isWaitingExist = false;
        vacation.DateBegin = new Date(Date.parse(vacation.DateBegin.toString()));
        vacation.DateBegin.setMinutes(vacation.DateBegin.getMinutes() - vacation.DateBegin.getTimezoneOffset());
        vacation.DateEnd = new Date(Date.parse(vacation.DateEnd.toString()));
        vacation.DateEnd.setMinutes(vacation.DateEnd.getMinutes() - vacation.DateEnd.getTimezoneOffset());
        vacation.Status = "Rejected";
        this.vacationService.update(vacation).subscribe(function (response) {
            _this.vacations.forEach(function (value, index, array) {
                value.Status = value.CreatedDate.setTime(value.CreatedDate.getTime() + 48 * 60 * 60 * 1000) < Date.now() ? "Confirmed" : value.Status;
                if (value.Status == "IsWaiting")
                    _this.isWaitingExist = true;
            });
        });
    };
    VacationsUserListComponent.prototype.goToUser = function (vacation) {
        this.router.navigateByUrl('/users/' + vacation.UserProfileId + '/info');
    };
    __decorate([
        core_1.Input('userId'),
        __metadata("design:type", Number)
    ], VacationsUserListComponent.prototype, "userId", void 0);
    VacationsUserListComponent = __decorate([
        core_1.Component({
            selector: 'user-vacations',
            template: __webpack_require__("./ClientApp/app/components/work-activity/vacations/vacations-user-list/vacations-user-list.component.html"),
            styles: [__webpack_require__("./ClientApp/app/components/work-activity/vacations/vacations-user-list/vacations-user-list.component.css")]
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            user_storage_service_1.UserStorageService,
            vacation_service_1.VacationService,
            material_1.MatDialog,
            users_service_1.UsersService,
            forms_1.FormBuilder,
            common_1.Location,
            router_1.Router])
    ], VacationsUserListComponent);
    return VacationsUserListComponent;
}());
exports.VacationsUserListComponent = VacationsUserListComponent;


/***/ }),

/***/ "./ClientApp/app/components/work-activity/work-activity-routing.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var workactivities_list_component_1 = __webpack_require__("./ClientApp/app/components/work-activity/workactivites/workactivities-list.component.ts");
var vacations_list_component_1 = __webpack_require__("./ClientApp/app/components/work-activity/vacations/vacations-list/vacations-list.component.ts");
var vacations_edit_component_1 = __webpack_require__("./ClientApp/app/components/work-activity/vacations/vacations-edit/vacations-edit.component.ts");
var sickdays_list_component_1 = __webpack_require__("./ClientApp/app/components/work-activity/sickdays/sickdays-list/sickdays-list.component.ts");
var sickdays_edit_component_1 = __webpack_require__("./ClientApp/app/components/work-activity/sickdays/sickdays-edit/sickdays-edit.component.ts");
var overtimes_list_component_1 = __webpack_require__("./ClientApp/app/components/work-activity/overtimes/overtimes-list/overtimes-list.component.ts");
var overtimes_edit_component_1 = __webpack_require__("./ClientApp/app/components/work-activity/overtimes/overtimes-edit/overtimes-edit.component.ts");
var sizevacations_list_component_1 = __webpack_require__("./ClientApp/app/components/work-activity/sizevacations/sizevacations-list.component.ts");
var permission_guard_1 = __webpack_require__("./ClientApp/app/guards/permission.guard.ts");
var work_at_home_list_component_1 = __webpack_require__("./ClientApp/app/components/work-activity/work-at-home/work-at-home-list/work-at-home-list.component.ts");
var routes = [
    { path: '', component: workactivities_list_component_1.WorkActivitiesListComponent, canActivate: [permission_guard_1.PermissionGuard], data: { roles: ['Super_Admin', 'Admin', 'HumanResource', 'ProjectManager', 'Developer'], forCurrentUser: true } },
    {
        path: 'vacations', children: [
            { path: '', component: vacations_list_component_1.VacationsListComponent, canActivate: [permission_guard_1.PermissionGuard], data: { roles: ['Super_Admin', 'Admin', 'HumanResource', 'ProjectManager'], forCurrentUser: false } },
            { path: ':id/edit', component: vacations_edit_component_1.VacationsEditComponent, canActivate: [permission_guard_1.PermissionGuard], data: { roles: ['Super_Admin', 'Admin', 'HumanResource', 'Developer'], forCurrentUser: true } }
        ]
    },
    {
        path: 'sickDays', children: [
            { path: '', component: sickdays_list_component_1.SickDaysListComponent, canActivate: [permission_guard_1.PermissionGuard], data: { roles: ['Super_Admin', 'Admin', 'HumanResource', 'ProjectManager'], forCurrentUser: false } },
            { path: ':id/edit', component: sickdays_edit_component_1.SickDaysEditComponent, canActivate: [permission_guard_1.PermissionGuard], data: { roles: ['Super_Admin', 'Admin', 'HumanResource', 'Developer'], forCurrentUser: true } }
        ]
    },
    {
        path: 'overtimes', children: [
            { path: '', component: overtimes_list_component_1.OvertimesListComponent, canActivate: [permission_guard_1.PermissionGuard], data: { roles: ['Super_Admin', 'Admin', 'HumanResource', 'ProjectManager'], forCurrentUser: false } },
            { path: ':id/edit', component: overtimes_edit_component_1.OvertimesEditComponent, canActivate: [permission_guard_1.PermissionGuard], data: { roles: ['Super_Admin', 'Admin', 'HumanResource', 'Developer'], forCurrentUser: true } }
        ]
    },
    {
        path: 'sizeVacations', children: [
            { path: '', component: sizevacations_list_component_1.SizeVacationsListComponent, canActivate: [permission_guard_1.PermissionGuard], data: { roles: ['Super_Admin', 'Admin', 'HumanResource', 'ProjectManager', 'Developer'], forCurrentUser: true } }
        ]
    },
    {
        path: 'workathome', children: [
            { path: '', component: work_at_home_list_component_1.WorkAtHomeListComponent, canActivate: [permission_guard_1.PermissionGuard], data: { roles: ['Super_Admin', 'Admin', 'HumanResource', 'ProjectManager'], forCurrentUser: false } }
        ]
    }
];
var WorkActivityRoutingModule = /** @class */ (function () {
    function WorkActivityRoutingModule() {
    }
    WorkActivityRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            providers: [],
            exports: [router_1.RouterModule]
        })
    ], WorkActivityRoutingModule);
    return WorkActivityRoutingModule;
}());
exports.WorkActivityRoutingModule = WorkActivityRoutingModule;


/***/ }),

/***/ "./ClientApp/app/components/work-activity/work-activity.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var ag_grid_angular_1 = __webpack_require__("./node_modules/ag-grid-angular/main.js");
var shared_module_1 = __webpack_require__("./ClientApp/app/modules/shared.module.ts");
var work_activity_routing_module_1 = __webpack_require__("./ClientApp/app/components/work-activity/work-activity-routing.module.ts");
var workactivities_list_component_1 = __webpack_require__("./ClientApp/app/components/work-activity/workactivites/workactivities-list.component.ts");
var vacations_list_component_1 = __webpack_require__("./ClientApp/app/components/work-activity/vacations/vacations-list/vacations-list.component.ts");
var vacations_edit_component_1 = __webpack_require__("./ClientApp/app/components/work-activity/vacations/vacations-edit/vacations-edit.component.ts");
var sickdays_list_component_1 = __webpack_require__("./ClientApp/app/components/work-activity/sickdays/sickdays-list/sickdays-list.component.ts");
var sickdays_edit_component_1 = __webpack_require__("./ClientApp/app/components/work-activity/sickdays/sickdays-edit/sickdays-edit.component.ts");
var overtimes_list_component_1 = __webpack_require__("./ClientApp/app/components/work-activity/overtimes/overtimes-list/overtimes-list.component.ts");
var overtimes_edit_component_1 = __webpack_require__("./ClientApp/app/components/work-activity/overtimes/overtimes-edit/overtimes-edit.component.ts");
var sizevacations_list_component_1 = __webpack_require__("./ClientApp/app/components/work-activity/sizevacations/sizevacations-list.component.ts");
var overtimes_user_list_component_1 = __webpack_require__("./ClientApp/app/components/work-activity/overtimes/overtimes-user-list/overtimes-user-list.component.ts");
var sickdays_user_list_component_1 = __webpack_require__("./ClientApp/app/components/work-activity/sickdays/sickdays-user-list/sickdays-user-list.component.ts");
var vacations_user_list_component_1 = __webpack_require__("./ClientApp/app/components/work-activity/vacations/vacations-user-list/vacations-user-list.component.ts");
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var work_at_home_list_component_1 = __webpack_require__("./ClientApp/app/components/work-activity/work-at-home/work-at-home-list/work-at-home-list.component.ts");
var work_at_home_user_list_component_1 = __webpack_require__("./ClientApp/app/components/work-activity/work-at-home/work-at-home-user-list/work-at-home-user-list.component.ts");
var WorkActivityModule = /** @class */ (function () {
    function WorkActivityModule() {
    }
    WorkActivityModule = __decorate([
        core_1.NgModule({
            declarations: [workactivities_list_component_1.WorkActivitiesListComponent,
                vacations_list_component_1.VacationsListComponent,
                vacations_edit_component_1.VacationsEditComponent,
                sickdays_list_component_1.SickDaysListComponent,
                sickdays_edit_component_1.SickDaysEditComponent,
                overtimes_list_component_1.OvertimesListComponent,
                overtimes_edit_component_1.OvertimesEditComponent,
                sizevacations_list_component_1.SizeVacationsListComponent,
                overtimes_user_list_component_1.OvertimeUserListComponent,
                sickdays_user_list_component_1.SickDaysUserListComponent,
                vacations_user_list_component_1.VacationsUserListComponent,
                work_at_home_list_component_1.WorkAtHomeListComponent,
                work_at_home_user_list_component_1.WorkAtHomeUserListComponent
            ],
            imports: [shared_module_1.SharedModule,
                ag_grid_angular_1.AgGridModule.withComponents([workactivities_list_component_1.WorkActivitiesListComponent]),
                work_activity_routing_module_1.WorkActivityRoutingModule],
            exports: [router_1.RouterModule,
                overtimes_user_list_component_1.OvertimeUserListComponent,
                sickdays_user_list_component_1.SickDaysUserListComponent,
                vacations_user_list_component_1.VacationsUserListComponent,
                work_at_home_user_list_component_1.WorkAtHomeUserListComponent],
            providers: [],
        })
    ], WorkActivityModule);
    return WorkActivityModule;
}());
exports.WorkActivityModule = WorkActivityModule;


/***/ }),

/***/ "./ClientApp/app/components/work-activity/work-at-home/work-at-home-list/work-at-home-list.component.css":
/***/ (function(module, exports) {

module.exports = "td, th {\r\n    border-top: 0px !important;\r\n    border-bottom: 0px !important;\r\n  }"

/***/ }),

/***/ "./ClientApp/app/components/work-activity/work-at-home/work-at-home-list/work-at-home-list.component.html":
/***/ (function(module, exports) {

module.exports = "<user-work-at-home>\r\n    \r\n</user-work-at-home>"

/***/ }),

/***/ "./ClientApp/app/components/work-activity/work-at-home/work-at-home-list/work-at-home-list.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var WorkAtHomeListComponent = /** @class */ (function () {
    function WorkAtHomeListComponent() {
    }
    WorkAtHomeListComponent.prototype.ngOnInit = function () { };
    WorkAtHomeListComponent = __decorate([
        core_1.Component({
            template: __webpack_require__("./ClientApp/app/components/work-activity/work-at-home/work-at-home-list/work-at-home-list.component.html"),
            styles: [__webpack_require__("./ClientApp/app/components/work-activity/work-at-home/work-at-home-list/work-at-home-list.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], WorkAtHomeListComponent);
    return WorkAtHomeListComponent;
}());
exports.WorkAtHomeListComponent = WorkAtHomeListComponent;


/***/ }),

/***/ "./ClientApp/app/components/work-activity/work-at-home/work-at-home-user-list/work-at-home-user-list.component.css":
/***/ (function(module, exports) {

module.exports = "   .my-table-striped > tbody > tr:nth-of-type(odd) {\r\n    background-color: #f9f9f9 !important;\r\n  }\r\n\r\n  .link:hover {\r\n    cursor: pointer;\r\n  }"

/***/ }),

/***/ "./ClientApp/app/components/work-activity/work-at-home/work-at-home-user-list/work-at-home-user-list.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"card x_panel\">\r\n    <div class=\"row\">\r\n        <div class=\"col-md-6\">\r\n            <h2>Work at home</h2>\r\n        </div>\r\n        <div class=\"col-md-6 text-right\" *ngIf=\"(userId != undefined && userId != null)\">\r\n            <div class=\"row\">\r\n                <div class=\"col-md-8\">\r\n\r\n                </div>\r\n\r\n                <div *ngIf=\"!isAtHome\">\r\n                    <div class=\"col-md-4 text-right toggle-div\" *isCurrentUserOrHasRole=\"{ id: userId, roles: ['Super_Admin', 'Admin']}\">\r\n                        <a href=\"javascript:;\" class=\"user-profile dropdown-toggle\" data-toggle=\"dropdown\" aria-expanded=\"false\">\r\n                            <button class=\"btn btn-primary toggle-button\">\r\n                                <span class=\"fa fa-plus\"></span>\r\n                            </button>\r\n                        </a>\r\n                        <ul class=\"dropdown-menu dropdown-usermenu pull-right\">\r\n                            <li>\r\n                                <a (click)=\"add()\" class=\"side-menu-link\">\r\n                                    Add Work at home\r\n                                </a>\r\n                            </li>\r\n                        </ul>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div id=\"datatable-responsive_wrapper\" class=\"dataTables_wrapper form-inline dt-bootstrap no-footer\">\r\n        <div class=\"row\">\r\n            <div class=\"col-md-12\">\r\n                <table class=\"table my-table-striped table-bordered projects\">\r\n                    <thead style=\"color: #73879C;\">\r\n                        <tr>\r\n                            <th *ngIf=\"userId == null\">User</th>\r\n                            <th>Date</th>\r\n                            <th>Comment</th>\r\n                            <th></th>\r\n                        </tr>\r\n                    </thead>\r\n                    <tbody>\r\n                        <ngx-spinner [visible]=\"loading\" [config]=\"spinnerConfig\"></ngx-spinner>\r\n                        <tr *ngFor=\"let work of workAtHome; let i = index\">\r\n                            <td class=\"link\" (click)=\"goToUser(work)\" *ngIf=\"userId == null\">\r\n                                <span>\r\n                                    {{work.UserProfile.FirstName}} {{work.UserProfile.LastName}}\r\n                                </span>\r\n                            </td>\r\n                            <td><span>{{work.Date | date:'MM/dd/yyyy'}}</span></td>\r\n                            <td *ngIf=\"editId != work.Id\"><span>{{work.Comment}}</span></td>\r\n                            <td *ngIf=\"editId == work.Id\">\r\n                                <textarea name=\"\" id=\"\" cols=\"30\" rows=\"2\" [(ngModel)]=\"work.Comment\">\r\n                                    {{work.Comment}}\r\n                                </textarea>\r\n                            </td>\r\n                            <td *isCurrentUserOrHasRole=\"{ id: userId, roles: ['Super_Admin', 'Admin']}\" style=\"text-align:right\">\r\n                                <a *ngIf=\"editId == work.Id\" class=\"btn btn-primary black-tooltip\" (click)=\"edit(work)\">\r\n                                    <i class=\"fa fa-check\"></i>\r\n                                    <span class=\"tooltiptext\">Save</span>\r\n                                </a>\r\n                                <a *ngIf=\"editId != work.Id\" class=\"btn btn-primary black-tooltip\" (click)=\"edit(work)\">\r\n                                    <i class=\"fa fa-edit\"></i>\r\n                                    <span class=\"tooltiptext\">Edit</span>\r\n                                </a>\r\n                                <a class=\"btn btn-default black-tooltip\" (click)=\"confirmDeleteDialog(work.Id, i)\">\r\n                                    <i class=\"fa fa-trash\"></i>\r\n                                    <span class=\"tooltiptext\">Del</span>\r\n                                </a>\r\n                            </td>\r\n                        </tr>\r\n                    </tbody>\r\n                </table>\r\n                <table-buttons [subject]=\"subject\">\r\n\r\n                </table-buttons>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n"

/***/ }),

/***/ "./ClientApp/app/components/work-activity/work-at-home/work-at-home-user-list/work-at-home-user-list.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var ngx_spinner_1 = __webpack_require__("./node_modules/@hardpool/ngx-spinner/fesm5/hardpool-ngx-spinner.js");
var work_at_home_model_1 = __webpack_require__("./ClientApp/app/models/work-at-home.model.ts");
var user_model_1 = __webpack_require__("./ClientApp/app/models/user.model.ts");
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var user_storage_service_1 = __webpack_require__("./ClientApp/app/services/user-storage.service.ts");
var users_service_1 = __webpack_require__("./ClientApp/app/services/users.service.ts");
var forms_1 = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
var material_1 = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
var work_at_home_query_model_1 = __webpack_require__("./ClientApp/app/models/query-models/work-at-home-query.model.ts");
var work_at_home_service_1 = __webpack_require__("./ClientApp/app/services/work-at-home.service.ts");
var user_query_model_1 = __webpack_require__("./ClientApp/app/models/query-models/user-query.model.ts");
var common_1 = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
var rxjs_1 = __webpack_require__("./node_modules/rxjs/Rx.js");
var delete_confirmation_component_1 = __webpack_require__("./ClientApp/app/components/modals/delete-confirmation/delete-confirmation.component.ts");
var WorkAtHomeUserListComponent = /** @class */ (function () {
    function WorkAtHomeUserListComponent(route, userStorageService, workAtHomeService, usersService, fBuilder, dialog, location, router) {
        this.route = route;
        this.userStorageService = userStorageService;
        this.workAtHomeService = workAtHomeService;
        this.usersService = usersService;
        this.fBuilder = fBuilder;
        this.dialog = dialog;
        this.location = location;
        this.router = router;
        this.workAtHome = new Array();
        this.newWorkAtHome = new work_at_home_model_1.WorkAtHome();
        this.users = new Array();
        this.selectedUser = new user_model_1.User();
        this.isBeginDateIncorrect = false;
        this.isEndDateIncorrect = false;
        this.loading = false;
        this.editText = 'Edit';
        this.editId = -1;
        this.spinnerConfig = {
            placement: ngx_spinner_1.SPINNER_PLACEMENT.block_ui,
            animation: ngx_spinner_1.SPINNER_ANIMATIONS.spin_3,
            size: "3rem",
            color: "#1574b3"
        };
    }
    WorkAtHomeUserListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subject = new rxjs_1.Subject();
        var thisDay = new Date();
        this.isAddVisible = false;
        this.isAdmin = this.userStorageService.hasRole('Admin');
        this.isUser = this.userStorageService.hasRole('User');
        this.id = this.userId;
        this.queryModel = new work_at_home_query_model_1.WorkAtHomeQueryModel();
        if (this.id != null)
            this.queryModel.UserId = this.id;
        this.loading = true;
        this.isAtHome = false;
        this.workAtHomeService.get(this.queryModel).subscribe(function (response) {
            _this.workAtHome = response.Result;
            _this.subject.next({ from: "component", response: response });
            _this.workAtHome.forEach(function (value, index, array) {
                value.Date = new Date(Date.parse(value.Date.toString()));
                if (value.Date.getFullYear() == thisDay.getFullYear() && value.Date.getMonth() == thisDay.getMonth() && value.Date.getDay() == thisDay.getDay()) {
                    _this.isAtHome = true;
                }
            });
            _this.loading = false;
        });
        this.usersService.get(new user_query_model_1.UserQueryModel()).subscribe(function (response) {
            _this.users = response.Result;
        });
        this.subscription = this.subject.asObservable().subscribe(function (response) {
            if (response.from == "tablebuttons") {
                _this.queryModel = response.response;
                if (_this.id != null)
                    _this.queryModel.UserId = _this.id;
                _this.loading = true;
                _this.loading = true;
                _this.isAtHome = false;
                _this.workAtHomeService.get(_this.queryModel).subscribe(function (response) {
                    _this.workAtHome = response.Result;
                    _this.workAtHome.forEach(function (value, index, array) {
                        value.Date = new Date(Date.parse(value.Date.toString()));
                        if (value.Date.getFullYear() == thisDay.getFullYear() && value.Date.getMonth() == thisDay.getMonth() && value.Date.getDay() == thisDay.getDay()) {
                            _this.isAtHome = true;
                        }
                    });
                    _this.loading = false;
                });
                _this.usersService.get(new user_query_model_1.UserQueryModel()).subscribe(function (response) {
                    _this.users = response.Result;
                });
            }
        });
        this.isMyPage = (this.id == this.userStorageService.getId() || this.isAdmin);
    };
    WorkAtHomeUserListComponent.prototype.delete = function (id, index) {
        var _this = this;
        this.isAtHome = false;
        this.workAtHomeService.delete(id).subscribe(function (result) {
            _this.workAtHome.splice(index, 1);
            var thisDay = new Date();
            _this.workAtHome.forEach(function (value, index, array) {
                value.Date = new Date(Date.parse(value.Date.toString()));
                if (value.Date.getFullYear() == thisDay.getFullYear() && value.Date.getMonth() == thisDay.getMonth() && value.Date.getDay() == thisDay.getDay()) {
                    _this.isAtHome = true;
                }
            });
        });
    };
    WorkAtHomeUserListComponent.prototype.confirmDeleteDialog = function (id, index) {
        var _this = this;
        var dialogConfig = new material_1.MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.position = { top: '0' };
        dialogConfig.autoFocus = false;
        this.dialog.open(delete_confirmation_component_1.DeleteConfirmationComponent, dialogConfig)
            .afterClosed().subscribe(function (dialogResult) {
            if (dialogResult)
                _this.delete(id, index);
        });
    };
    WorkAtHomeUserListComponent.prototype.add = function () {
        var _this = this;
        this.newWorkAtHome.Date = new Date();
        this.newWorkAtHome.UserProfileId = this.id;
        this.newWorkAtHome.Comment = '';
        this.workAtHomeService.create(this.newWorkAtHome).subscribe(function (response) {
            _this.newWorkAtHome = response;
            _this.subject.next({ from: "component", response: response });
            if (_this.newWorkAtHome.Id != 0) {
                _this.isAtHome = true;
                _this.queryModel = new work_at_home_query_model_1.WorkAtHomeQueryModel();
                _this.queryModel.UserId = _this.id;
                _this.workAtHomeService.get(_this.queryModel).subscribe(function (response) {
                    _this.workAtHome = response.Result;
                    _this.workAtHome.forEach(function (value, index, array) {
                        value.Date = new Date(Date.parse(value.Date.toString()));
                    });
                });
                _this.isAddVisible = false;
            }
        });
    };
    WorkAtHomeUserListComponent.prototype.edit = function (work) {
        var _this = this;
        if (this.editText == 'Edit') {
            this.editText = 'Save';
            this.editId = work.Id;
        }
        else {
            this.editText = 'Edit';
            this.workAtHomeService.update(work).subscribe(function (response) {
                _this.editId = -1;
            });
        }
    };
    WorkAtHomeUserListComponent.prototype.goBack = function () {
        this.location.back();
    };
    WorkAtHomeUserListComponent.prototype.goToUser = function (work) {
        this.router.navigateByUrl('/users/' + work.UserProfileId + '/info');
    };
    __decorate([
        core_1.Input('userId'),
        __metadata("design:type", Number)
    ], WorkAtHomeUserListComponent.prototype, "userId", void 0);
    WorkAtHomeUserListComponent = __decorate([
        core_1.Component({
            selector: 'user-work-at-home',
            template: __webpack_require__("./ClientApp/app/components/work-activity/work-at-home/work-at-home-user-list/work-at-home-user-list.component.html"),
            styles: [__webpack_require__("./ClientApp/app/components/work-activity/work-at-home/work-at-home-user-list/work-at-home-user-list.component.css")]
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            user_storage_service_1.UserStorageService,
            work_at_home_service_1.WorkAtHomeService,
            users_service_1.UsersService,
            forms_1.FormBuilder,
            material_1.MatDialog,
            common_1.Location,
            router_1.Router])
    ], WorkAtHomeUserListComponent);
    return WorkAtHomeUserListComponent;
}());
exports.WorkAtHomeUserListComponent = WorkAtHomeUserListComponent;


/***/ }),

/***/ "./ClientApp/app/components/work-activity/workactivites/workactivities-list.component.css":
/***/ (function(module, exports) {

module.exports = "  .my-table-striped > tbody > tr:nth-of-type(odd) {\r\n    background-color: #f9f9f9 !important;\r\n  }\r\n\r\n  .link:hover {\r\n    cursor: pointer;\r\n  }"

/***/ }),

/***/ "./ClientApp/app/components/work-activity/workactivites/workactivities-list.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"card x_panel\">\r\n    <div class=\"row\">\r\n        <div class=\"col-md-6\">\r\n            <h2>Work Activities</h2>\r\n        </div>\r\n        <div class=\"col-md-6 text-right\">\r\n            <div class=\"row\">\r\n                <div class=\"col-md-4\">\r\n\r\n                </div>\r\n\r\n                <div class=\"col-md-4\">\r\n\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div id=\"datatable-responsive_wrapper\" class=\"dataTables_wrapper form-inline dt-bootstrap no-footer\">\r\n        <div class=\"row\">\r\n            <div class=\"col-md-12\">\r\n                <table class=\"table my-table-striped table-bordered projects\">\r\n                    <thead style=\"color: #73879C;\">\r\n                        <tr>\r\n                            <th>Name</th>\r\n                            <th>Type</th>\r\n                            <th>Count Days</th>\r\n                            <th>Date Begin</th>\r\n                            <th>Date End</th>\r\n                            <th>Comment</th>\r\n                        </tr>\r\n                    </thead>\r\n                    <tbody>\r\n                        <ngx-spinner [visible]=\"loading\" [config]=\"spinnerConfig\"></ngx-spinner>\r\n                        <tr *ngFor=\"let workActivityItem of workActivity; let i = index\">\r\n                            <td class=\"link\" (click)=\"goToUser(workActivityItem)\"><span>{{workActivityItem.Name}}</span></td>\r\n                            <td><span>{{workActivityItem.Type}}</span></td>\r\n                            <td><span>{{workActivityItem.CountDays}}</span></td>\r\n                            <td><span>{{workActivityItem.DateBegin| date:'MM/dd/yyyy'}}</span></td>\r\n                            <td><span>{{workActivityItem.DateEnd| date:'MM/dd/yyyy'}}</span></td>\r\n                            <td class=\"ellipsis\"><span>{{workActivityItem.Comment}}</span></td>\r\n                        </tr>\r\n                    </tbody>\r\n                </table>\r\n                <table-buttons [subject]=\"subject\">\r\n\r\n                </table-buttons>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n"

/***/ }),

/***/ "./ClientApp/app/components/work-activity/workactivites/workactivities-list.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var work_activity_service_1 = __webpack_require__("./ClientApp/app/services/work-activity.service.ts");
var work_activity_query_model_1 = __webpack_require__("./ClientApp/app/models/query-models/work-activity-query.model.ts");
var ngx_spinner_1 = __webpack_require__("./node_modules/@hardpool/ngx-spinner/fesm5/hardpool-ngx-spinner.js");
var common_1 = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
var rxjs_1 = __webpack_require__("./node_modules/rxjs/Rx.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var WorkActivitiesListComponent = /** @class */ (function () {
    function WorkActivitiesListComponent(workActivityService, location, router) {
        this.workActivityService = workActivityService;
        this.location = location;
        this.router = router;
        this.workActivity = new Array();
        this.spinnerConfig = {
            placement: ngx_spinner_1.SPINNER_PLACEMENT.block_ui,
            animation: ngx_spinner_1.SPINNER_ANIMATIONS.spin_3,
            size: "3rem",
            color: "#1574b3"
        };
    }
    ;
    WorkActivitiesListComponent.prototype.dateFormatter = function (params) {
        if (params.value)
            return new Date(params.value).toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
    };
    WorkActivitiesListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subject = new rxjs_1.Subject();
        this.queryModel = new work_activity_query_model_1.WorkActivityQueryModel();
        this.queryModel.Take = 10;
        this.loading = true;
        this.workActivityService.get(this.queryModel).subscribe(function (response) {
            _this.workActivity = response.Result;
            _this.subject.next({ from: "component", response: response });
            _this.loading = false;
        });
        this.subscription = this.subject.asObservable().subscribe(function (response) {
            if (response.from == "tablebuttons") {
                _this.queryModel = response.response;
                _this.loading = true;
                _this.workActivityService.get(_this.queryModel).subscribe(function (response) {
                    _this.workActivity = response.Result;
                    _this.loading = false;
                });
            }
        });
    };
    WorkActivitiesListComponent.prototype.goBack = function () {
        this.location.back();
    };
    WorkActivitiesListComponent.prototype.goToUser = function (workActivity) {
        this.router.navigateByUrl('/users/' + workActivity.UserProfileId + '/info');
    };
    WorkActivitiesListComponent = __decorate([
        core_1.Component({
            template: __webpack_require__("./ClientApp/app/components/work-activity/workactivites/workactivities-list.component.html"),
            styles: [__webpack_require__("./ClientApp/app/components/work-activity/workactivites/workactivities-list.component.css")]
        }),
        __metadata("design:paramtypes", [work_activity_service_1.WorkActivityService,
            common_1.Location,
            router_1.Router])
    ], WorkActivitiesListComponent);
    return WorkActivitiesListComponent;
}());
exports.WorkActivitiesListComponent = WorkActivitiesListComponent;


/***/ }),

/***/ "./ClientApp/app/models/overtime.model.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Overtime = /** @class */ (function () {
    function Overtime() {
    }
    return Overtime;
}());
exports.Overtime = Overtime;


/***/ }),

/***/ "./ClientApp/app/models/query-models/overtime-query.model.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var base_query_model_1 = __webpack_require__("./ClientApp/app/models/query-models/base-query.model.ts");
var OvertimeQueryModel = /** @class */ (function (_super) {
    __extends(OvertimeQueryModel, _super);
    function OvertimeQueryModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return OvertimeQueryModel;
}(base_query_model_1.BaseQueryModel));
exports.OvertimeQueryModel = OvertimeQueryModel;


/***/ }),

/***/ "./ClientApp/app/models/query-models/sick-day-query.model.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var base_query_model_1 = __webpack_require__("./ClientApp/app/models/query-models/base-query.model.ts");
var SickDayQueryModel = /** @class */ (function (_super) {
    __extends(SickDayQueryModel, _super);
    function SickDayQueryModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SickDayQueryModel;
}(base_query_model_1.BaseQueryModel));
exports.SickDayQueryModel = SickDayQueryModel;


/***/ }),

/***/ "./ClientApp/app/models/query-models/size-vacation-query.model.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var base_query_model_1 = __webpack_require__("./ClientApp/app/models/query-models/base-query.model.ts");
var SizeVacationQueryModel = /** @class */ (function (_super) {
    __extends(SizeVacationQueryModel, _super);
    function SizeVacationQueryModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SizeVacationQueryModel;
}(base_query_model_1.BaseQueryModel));
exports.SizeVacationQueryModel = SizeVacationQueryModel;


/***/ }),

/***/ "./ClientApp/app/models/query-models/user-profile-project-query.model.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var base_query_model_1 = __webpack_require__("./ClientApp/app/models/query-models/base-query.model.ts");
var UserProfileProjectQueryModel = /** @class */ (function (_super) {
    __extends(UserProfileProjectQueryModel, _super);
    function UserProfileProjectQueryModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return UserProfileProjectQueryModel;
}(base_query_model_1.BaseQueryModel));
exports.UserProfileProjectQueryModel = UserProfileProjectQueryModel;


/***/ }),

/***/ "./ClientApp/app/models/query-models/user-query.model.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var base_query_model_1 = __webpack_require__("./ClientApp/app/models/query-models/base-query.model.ts");
var UserQueryModel = /** @class */ (function (_super) {
    __extends(UserQueryModel, _super);
    function UserQueryModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return UserQueryModel;
}(base_query_model_1.BaseQueryModel));
exports.UserQueryModel = UserQueryModel;


/***/ }),

/***/ "./ClientApp/app/models/query-models/vacation.query.model.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var base_query_model_1 = __webpack_require__("./ClientApp/app/models/query-models/base-query.model.ts");
var VacationQueryModel = /** @class */ (function (_super) {
    __extends(VacationQueryModel, _super);
    function VacationQueryModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return VacationQueryModel;
}(base_query_model_1.BaseQueryModel));
exports.VacationQueryModel = VacationQueryModel;


/***/ }),

/***/ "./ClientApp/app/models/query-models/work-activity-query.model.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var base_query_model_1 = __webpack_require__("./ClientApp/app/models/query-models/base-query.model.ts");
var WorkActivityQueryModel = /** @class */ (function (_super) {
    __extends(WorkActivityQueryModel, _super);
    function WorkActivityQueryModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return WorkActivityQueryModel;
}(base_query_model_1.BaseQueryModel));
exports.WorkActivityQueryModel = WorkActivityQueryModel;


/***/ }),

/***/ "./ClientApp/app/models/query-models/work-at-home-query.model.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var base_query_model_1 = __webpack_require__("./ClientApp/app/models/query-models/base-query.model.ts");
var WorkAtHomeQueryModel = /** @class */ (function (_super) {
    __extends(WorkAtHomeQueryModel, _super);
    function WorkAtHomeQueryModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return WorkAtHomeQueryModel;
}(base_query_model_1.BaseQueryModel));
exports.WorkAtHomeQueryModel = WorkAtHomeQueryModel;


/***/ }),

/***/ "./ClientApp/app/models/sick-day.model.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var SickDay = /** @class */ (function () {
    function SickDay() {
    }
    return SickDay;
}());
exports.SickDay = SickDay;


/***/ }),

/***/ "./ClientApp/app/models/size-vacation.model.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var SizeVacation = /** @class */ (function () {
    function SizeVacation() {
    }
    return SizeVacation;
}());
exports.SizeVacation = SizeVacation;


/***/ }),

/***/ "./ClientApp/app/models/user-profile-project.model.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var UserProfileProject = /** @class */ (function () {
    function UserProfileProject() {
    }
    return UserProfileProject;
}());
exports.UserProfileProject = UserProfileProject;


/***/ }),

/***/ "./ClientApp/app/models/vacation.model.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Vacation = /** @class */ (function () {
    function Vacation() {
    }
    return Vacation;
}());
exports.Vacation = Vacation;


/***/ }),

/***/ "./ClientApp/app/models/work-at-home.model.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var WorkAtHome = /** @class */ (function () {
    function WorkAtHome() {
    }
    return WorkAtHome;
}());
exports.WorkAtHome = WorkAtHome;


/***/ })

});
//# sourceMappingURL=common.chunk.js.map