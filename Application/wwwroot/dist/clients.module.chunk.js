webpackJsonp(["clients.module"],{

/***/ "./ClientApp/app/components/clients/clients-edit/clients-edit.component.css":
/***/ (function(module, exports) {

module.exports = ".cancel:hover {\r\n    cursor: pointer;\r\n}\r\n\r\n.cancel {\r\n    border-width: 1px;\r\n    border-color: black;\r\n    border-style: solid;\r\n    padding-left: 3px;\r\n    padding-right: 3px;\r\n}"

/***/ }),

/***/ "./ClientApp/app/components/clients/clients-edit/clients-edit.component.html":
/***/ (function(module, exports) {

module.exports = "<modal-wrapper [dialogRef]=\"dialogRef\">\r\n\r\n\r\n    <div class=\"card x_panel\" *ngIf=\"client\">\r\n        <div id=\"divDataBody\" class=\"container entity\">\r\n            <div class=\"row\">\r\n                    <div class=\"col-md-12 form-title\">\r\n                            <h2 style=\"color: #73879C;\">Update Client`s info</h2>\r\n                        </div>\r\n                <div class=\"col-md-12 col-lg-12\">\r\n                    <form name=\"addpost\" class=\"form-horizontal  container-fluid\">\r\n                        <div class=\"col-md-12 col-sm-12 col-xs-12 form-group has-feedback black-tooltip\">\r\n                            <input type=\"text\" class=\"form-control has-feedback-left\" id=\"inputSuccess2\" placeholder=\"Organization\" [(ngModel)]=\"client.OrganizationName\" name=\"Organization\" autocomplete=\"off\">\r\n                            <span class=\"fa fa-bank form-control-feedback left\" aria-hidden=\"true\">\r\n                            </span>\r\n                            <span class=\"tooltiptext\">\r\n                                Organization\r\n                            </span>\r\n                        </div>\r\n                        <div class=\"col-md-12 col-sm-12 col-xs-12 form-group has-feedback black-tooltip\">\r\n                            <input type=\"text\" class=\"form-control has-feedback-left\" id=\"inputSuccess2\" placeholder=\"Description\" [(ngModel)]=\"client.Description\" name=\"Description\" autocomplete=\"off\">\r\n                            <span class=\"fa fa-list-ul form-control-feedback left\" aria-hidden=\"true\"></span>\r\n                            <span class=\"tooltiptext\">\r\n                                Description\r\n                            </span>\r\n                        </div>\r\n                        <div class=\"col-md-12 col-sm-12 col-xs-12 form-group has-feedback black-tooltip\">\r\n                            <input type=\"text\" class=\"form-control has-feedback-left\" id=\"inputSuccess2\" placeholder=\"Comment\" [(ngModel)]=\"client.Comment\" name=\"Comment\" autocomplete=\"off\">\r\n                            <span class=\"fa fa-comment form-control-feedback left\" aria-hidden=\"true\"></span>\r\n                            <span class=\"tooltiptext\">\r\n                                Comment\r\n                            </span>\r\n                        </div>\r\n                        <div class=\"col-md-12 col-xs-12\">\r\n                            <div class=\"form-group col-md-6 col-xs-6 text-center\">\r\n                                <button class=\"btn btn-primary alignCenterBtn black-tooltip\" (click)=\"updateClient()\">\r\n                                    Save\r\n                                </button>\r\n                            </div>\r\n                            <div class=\"form-group col-md-6 col-xs-6 text-center\">\r\n                                <button class=\"btn btn-primary alignCenterBtn black-tooltip\" (click)=\"cancel()\">\r\n                                    Cancel\r\n                                </button>\r\n                            </div>\r\n                        </div>\r\n                    </form>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</modal-wrapper>"

/***/ }),

/***/ "./ClientApp/app/components/clients/clients-edit/clients-edit.component.ts":
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
var clients_service_1 = __webpack_require__("./ClientApp/app/services/clients.service.ts");
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var common_1 = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
var material_1 = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
var ClientsEditComponent = /** @class */ (function () {
    function ClientsEditComponent(clientService, location, route, dialogRef, data) {
        this.clientService = clientService;
        this.location = location;
        this.route = route;
        this.dialogRef = dialogRef;
        this.data = data;
    }
    ClientsEditComponent.prototype.keyEvent = function (event) {
        console.log(event);
        if (event.keyCode === 13) {
            this.updateClient();
        }
        if (event.keyCode === 27) {
            this.cancel();
        }
    };
    ClientsEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.id = this.data.clientId;
        this.clientService.getById(this.id).subscribe(function (response) {
            _this.client = response;
        });
    };
    ClientsEditComponent.prototype.updateClient = function () {
        var _this = this;
        this.clientService.update(this.client).subscribe(function (response) {
            if (_this.dialogRef != null && _this.dialogRef != undefined)
                _this.dialogRef.close();
        });
    };
    ClientsEditComponent.prototype.cancel = function () {
        if (this.dialogRef != null && this.dialogRef != undefined)
            this.dialogRef.close();
    };
    __decorate([
        core_1.HostListener('window:keyup', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [KeyboardEvent]),
        __metadata("design:returntype", void 0)
    ], ClientsEditComponent.prototype, "keyEvent", null);
    ClientsEditComponent = __decorate([
        core_1.Component({
            selector: 'clients-edit',
            template: __webpack_require__("./ClientApp/app/components/clients/clients-edit/clients-edit.component.html"),
            styles: [__webpack_require__("./ClientApp/app/components/clients/clients-edit/clients-edit.component.css")]
        }),
        __param(4, core_1.Inject(material_1.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [clients_service_1.ClientsService,
            common_1.Location,
            router_1.ActivatedRoute,
            material_1.MatDialogRef, Object])
    ], ClientsEditComponent);
    return ClientsEditComponent;
}());
exports.ClientsEditComponent = ClientsEditComponent;


/***/ }),

/***/ "./ClientApp/app/components/clients/clients-list/clients-list.component.css":
/***/ (function(module, exports) {

module.exports = "   /* .circle-border{\r\n     border-width: 2px;\r\n     border-color: white;\r\n     border-radius: 50%;\r\n     border-style: solid;\r\n   } */\r\n\r\n   .my-table-striped > tbody > tr:nth-of-type(odd) {\r\n    background-color: #f9f9f9 !important;\r\n  }\r\n\r\n   .link:hover {\r\n    cursor: pointer;\r\n  }"

/***/ }),

/***/ "./ClientApp/app/components/clients/clients-list/clients-list.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"card x_panel\">\r\n    <div class=\"row\">\r\n        <div class=\"col-md-6\">\r\n            <h2>Clients</h2>\r\n        </div>\r\n        <div class=\"col-md-6 text-right\">\r\n            <div class=\"row\">\r\n                <div class=\"col-md-8\">\r\n\r\n                </div>\r\n\r\n                <div class=\"col-md-4 text-right toggle-div\">\r\n                    <a href=\"javascript:;\" class=\"user-profile dropdown-toggle\" data-toggle=\"dropdown\" aria-expanded=\"false\" *permission=\"['Super_Admin', 'Admin', 'ProjectManager']\">\r\n                        <button class=\"btn btn-primary toggle-button\">\r\n                            <span class=\"fa fa-plus\"></span>\r\n                        </button>\r\n                    </a>\r\n                    <ul class=\"dropdown-menu dropdown-usermenu pull-right\">\r\n                        <li>\r\n                            <a (click)=\"createClientDialog()\" class=\"side-menu-link\">\r\n                                Add new Client\r\n                            </a>\r\n                        </li>\r\n                    </ul>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div id=\"datatable-responsive_wrapper\" class=\"dataTables_wrapper form-inline dt-bootstrap no-footer\">\r\n        <div class=\"row\">\r\n            <div class=\"col-md-12\">\r\n                <table class=\"table my-table-striped table-bordered projects\">\r\n                    <thead style=\"color: #73879C;\">\r\n                        <tr>\r\n                            <th>Organization</th>\r\n                            <th>Description</th>\r\n                            <th>Count of projects</th>\r\n                            <th>Comment</th>\r\n                            <th></th>\r\n                        </tr>\r\n                    </thead>\r\n                    <tbody>\r\n                        <ngx-spinner [visible]=\"loading\" [config]=\"spinnerConfig\"></ngx-spinner>\r\n                        <tr *ngFor=\"let client of clients; let i = index\">\r\n                            <td>\r\n                                <span class=\"link\" (click)=\"showClientInfoDialog(client)\">\r\n                                    {{client.OrganizationName}}\r\n                                </span>\r\n                            </td>\r\n                            <td>\r\n                                {{client.Description}}\r\n                            </td>\r\n                            <td>\r\n                                {{client.ProjectsCount}}\r\n                            </td>\r\n                            <td>\r\n                                {{client.Comment}}\r\n                            </td>\r\n                            <td style=\"text-align:right\">\r\n                                <a class=\"btn btn-primary black-tooltip\" (click)=\"showClientInfoDialog(client)\">\r\n                                    <i class=\"fa fa-info\"></i>\r\n                                    <span class=\"tooltiptext\">Contacts</span>\r\n                                </a>\r\n                                <a class=\"btn btn-primary black-tooltip\" (click)=\"showProjectsDialog(client)\">\r\n                                    <i class=\"fa fa-file\"></i>\r\n                                    <span class=\"tooltiptext\">Projects</span>\r\n                                </a>\r\n                                <a class=\"btn btn-primary black-tooltip\" (click)=\"addProjectDialog(client)\">\r\n                                    <i class=\"fa fa-plus\"></i>\r\n                                    <span class=\"tooltiptext\">Add Project</span>\r\n                                </a>\r\n                                <a class=\"btn btn-primary black-tooltip\" (click)=\"editClientDialog(client, i)\">\r\n                                    <i class=\"fa fa-pencil\"></i>\r\n                                    <span class=\"tooltiptext\">Edit</span>\r\n                                </a>\r\n                                <a class=\"btn btn-default black-tooltip\" (click)=\"confirmDeleteDialog(client.Id, i)\">\r\n                                    <i class=\"fa fa-trash-o\"></i>\r\n                                    <span class=\"tooltiptext\">Delete</span>\r\n                                </a>\r\n                            </td>\r\n                        </tr>\r\n                    </tbody>\r\n                </table>\r\n                <table-buttons [subject]=\"subject\">\r\n                </table-buttons>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "./ClientApp/app/components/clients/clients-list/clients-list.component.ts":
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
var client_model_1 = __webpack_require__("./ClientApp/app/models/client.model.ts");
var clients_service_1 = __webpack_require__("./ClientApp/app/services/clients.service.ts");
var client_query_model_1 = __webpack_require__("./ClientApp/app/models/query-models/client-query.model.ts");
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var common_1 = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
var forms_1 = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
var material_1 = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
var ngx_spinner_1 = __webpack_require__("./node_modules/@hardpool/ngx-spinner/fesm5/hardpool-ngx-spinner.js");
var user_storage_service_1 = __webpack_require__("./ClientApp/app/services/user-storage.service.ts");
var clients_edit_component_1 = __webpack_require__("./ClientApp/app/components/clients/clients-edit/clients-edit.component.ts");
var delete_confirmation_component_1 = __webpack_require__("./ClientApp/app/components/modals/delete-confirmation/delete-confirmation.component.ts");
var rxjs_1 = __webpack_require__("./node_modules/rxjs/Rx.js");
var clients_create_component_1 = __webpack_require__("./ClientApp/app/components/clients/clients-create/clients-create.component.ts");
var clients_info_component_1 = __webpack_require__("./ClientApp/app/components/clients/clients-info/clients-info.component.ts");
var projects_list_component_1 = __webpack_require__("./ClientApp/app/components/projects/projects-list/projects-list.component.ts");
var projects_create_component_1 = __webpack_require__("./ClientApp/app/components/projects/projects-create/projects-create.component.ts");
var ClientsListComponent = /** @class */ (function () {
    function ClientsListComponent(clientsService, userStorageService, route, fBuilder, dialog, location) {
        this.clientsService = clientsService;
        this.userStorageService = userStorageService;
        this.route = route;
        this.fBuilder = fBuilder;
        this.dialog = dialog;
        this.location = location;
        this.newClient = new client_model_1.Client();
        this.clients = new Array();
        this.loading = false;
        this.phoneNumberMask = ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];
        this.spinnerConfig = {
            placement: ngx_spinner_1.SPINNER_PLACEMENT.block_ui,
            animation: ngx_spinner_1.SPINNER_ANIMATIONS.spin_3,
            size: "3rem",
            color: "#1574b3"
        };
    }
    ClientsListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subject = new rxjs_1.Subject();
        this.queryModel = new client_query_model_1.ClientQueryModel();
        this.queryModel.Take = 10;
        this.loading = true;
        this.clientsService.get(this.queryModel).subscribe(function (response) {
            _this.clients = response.Result;
            _this.subject.next({ from: "component", response: response });
            _this.loading = false;
        });
        this.subscription = this.subject.asObservable().subscribe(function (response) {
            if (response.from == "tablebuttons") {
                _this.queryModel = response.response;
                _this.loading = true;
                _this.clientsService.get(_this.queryModel).subscribe(function (response) {
                    _this.clients = response.Result;
                    _this.loading = false;
                });
            }
        });
        this.initForm();
    };
    ClientsListComponent.prototype.initForm = function () {
        this.newClientForm = this.fBuilder.group({
            Organization: ['', [
                    forms_1.Validators.required
                ]],
            FirstName: ['', []],
            LastName: ['', []],
            CommunicationChannel: ['', []],
            Email: ['', [
                    forms_1.Validators.pattern(/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/),
                ]],
            Phone: ['', []],
            Description: ['']
        });
    };
    ClientsListComponent.prototype.confirmDeleteDialog = function (id, index) {
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
    ClientsListComponent.prototype.delete = function (index, indexOnArray) {
        var _this = this;
        this.clientsService.delete(index).subscribe(function (result) {
            _this.loading = true;
            _this.clientsService.get(_this.queryModel).subscribe(function (response) {
                _this.clients = response.Result;
                _this.loading = false;
                _this.status = "Deleted";
            });
        });
    };
    ClientsListComponent.prototype.editClientDialog = function (client, i) {
        var _this = this;
        var dialogRef = this.dialog.open(clients_edit_component_1.ClientsEditComponent, {
            width: '800px',
            data: { clientId: client.Id }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.clientsService.get(_this.queryModel).subscribe(function (response) {
                _this.clients = response.Result;
                // this.subject.next(response);
            });
            _this.initForm();
        });
    };
    ClientsListComponent.prototype.createClientDialog = function () {
        var _this = this;
        var dialogRef = this.dialog.open(clients_create_component_1.ClientsCreateComponent, {
            width: '800px',
            data: { fromClientPage: true }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.clientsService.get(_this.queryModel).subscribe(function (response) {
                _this.clients = response.Result;
                // this.subject.next(response);
            });
            _this.initForm();
        });
    };
    ClientsListComponent.prototype.showClientInfoDialog = function (client) {
        var dialogRef = this.dialog.open(clients_info_component_1.ClientsInfoComponent, {
            width: '800px',
            data: { clientId: client.Id, fullInfo: false }
        });
    };
    ClientsListComponent.prototype.showProjectsDialog = function (client) {
        var _this = this;
        var dialogRef = this.dialog.open(projects_list_component_1.ProjectsListComponent, {
            width: '1400px',
            data: { clientId: client.Id, fullInfo: false }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.clientsService.get(_this.queryModel).subscribe(function (response) {
                _this.clients = response.Result;
                // this.subject.next(response);
            });
            _this.initForm();
        });
    };
    ClientsListComponent.prototype.addProjectDialog = function (client) {
        var _this = this;
        var dialogRef = this.dialog.open(projects_create_component_1.ProjectsCreateComponent, {
            width: '800px',
            data: { fromProjectPage: false, clientId: client.Id }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.clientsService.get(_this.queryModel).subscribe(function (response) {
                _this.clients = response.Result;
            });
            _this.initForm();
        });
    };
    ClientsListComponent.prototype.goBack = function () {
        this.location.back();
    };
    ClientsListComponent = __decorate([
        core_1.Component({
            selector: 'clients-list',
            template: __webpack_require__("./ClientApp/app/components/clients/clients-list/clients-list.component.html"),
            styles: [__webpack_require__("./ClientApp/app/components/clients/clients-list/clients-list.component.css")]
        }),
        __metadata("design:paramtypes", [clients_service_1.ClientsService,
            user_storage_service_1.UserStorageService,
            router_1.ActivatedRoute,
            forms_1.FormBuilder,
            material_1.MatDialog,
            common_1.Location])
    ], ClientsListComponent);
    return ClientsListComponent;
}());
exports.ClientsListComponent = ClientsListComponent;


/***/ }),

/***/ "./ClientApp/app/components/clients/clients-projects-by-client/clients-projects-by-client.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./ClientApp/app/components/clients/clients-projects-by-client/clients-projects-by-client.component.html":
/***/ (function(module, exports) {

module.exports = "<projects-list [clientId]=\"clientId\" *ngIf=\"clientId\">\r\n\r\n</projects-list>"

/***/ }),

/***/ "./ClientApp/app/components/clients/clients-projects-by-client/clients-projects-by-client.component.ts":
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
var ClientsProjectsByClientComponent = /** @class */ (function () {
    function ClientsProjectsByClientComponent(userStorageService, route, router) {
        this.userStorageService = userStorageService;
        this.route = route;
        this.router = router;
    }
    ClientsProjectsByClientComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.clientId = +params['id'];
        });
    };
    ClientsProjectsByClientComponent = __decorate([
        core_1.Component({
            selector: 'clients-projects-by-client',
            template: __webpack_require__("./ClientApp/app/components/clients/clients-projects-by-client/clients-projects-by-client.component.html"),
            styles: [__webpack_require__("./ClientApp/app/components/clients/clients-projects-by-client/clients-projects-by-client.component.css")]
        }),
        __metadata("design:paramtypes", [user_storage_service_1.UserStorageService,
            router_1.ActivatedRoute,
            router_1.Router])
    ], ClientsProjectsByClientComponent);
    return ClientsProjectsByClientComponent;
}());
exports.ClientsProjectsByClientComponent = ClientsProjectsByClientComponent;


/***/ }),

/***/ "./ClientApp/app/components/clients/clients-routing.module.ts":
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
var clients_list_component_1 = __webpack_require__("./ClientApp/app/components/clients/clients-list/clients-list.component.ts");
var clients_info_component_1 = __webpack_require__("./ClientApp/app/components/clients/clients-info/clients-info.component.ts");
var clients_edit_component_1 = __webpack_require__("./ClientApp/app/components/clients/clients-edit/clients-edit.component.ts");
var routes = [
    { path: ':id/info', component: clients_info_component_1.ClientsInfoComponent, canActivate: [permission_guard_1.PermissionGuard], data: { roles: ['Super_Admin', 'Admin', 'ProjectManager'], forCurrentUser: false } },
    { path: '', component: clients_list_component_1.ClientsListComponent, canActivate: [permission_guard_1.PermissionGuard], data: { roles: ['Super_Admin', 'Admin', 'ProjectManager'], forCurrentUser: false } },
    { path: ':id/edit', component: clients_edit_component_1.ClientsEditComponent, canActivate: [permission_guard_1.PermissionGuard], data: { roles: ['Super_Admin', 'Admin', 'ProjectManager'], forCurrentUser: false } },
];
var ClientsRoutingModule = /** @class */ (function () {
    function ClientsRoutingModule() {
    }
    ClientsRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            providers: [permission_guard_1.PermissionGuard],
            exports: [router_1.RouterModule]
        })
    ], ClientsRoutingModule);
    return ClientsRoutingModule;
}());
exports.ClientsRoutingModule = ClientsRoutingModule;


/***/ }),

/***/ "./ClientApp/app/components/clients/clients.module.ts":
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
var clients_list_component_1 = __webpack_require__("./ClientApp/app/components/clients/clients-list/clients-list.component.ts");
var clients_edit_component_1 = __webpack_require__("./ClientApp/app/components/clients/clients-edit/clients-edit.component.ts");
var clients_projects_by_client_component_1 = __webpack_require__("./ClientApp/app/components/clients/clients-projects-by-client/clients-projects-by-client.component.ts");
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var shared_module_1 = __webpack_require__("./ClientApp/app/modules/shared.module.ts");
var clients_routing_module_1 = __webpack_require__("./ClientApp/app/components/clients/clients-routing.module.ts");
var projects_module_1 = __webpack_require__("./ClientApp/app/components/projects/projects.module.ts");
var ClientsModule = /** @class */ (function () {
    function ClientsModule() {
    }
    ClientsModule = __decorate([
        core_1.NgModule({
            declarations: [
                clients_list_component_1.ClientsListComponent,
                clients_edit_component_1.ClientsEditComponent,
                clients_projects_by_client_component_1.ClientsProjectsByClientComponent,
            ],
            imports: [
                clients_routing_module_1.ClientsRoutingModule,
                shared_module_1.SharedModule,
                projects_module_1.ProjectsModule
            ],
            exports: [router_1.RouterModule],
            providers: [],
        })
    ], ClientsModule);
    return ClientsModule;
}());
exports.ClientsModule = ClientsModule;


/***/ })

});
//# sourceMappingURL=clients.module.chunk.js.map