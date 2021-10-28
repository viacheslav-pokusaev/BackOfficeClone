webpackJsonp(["users.module"],{

/***/ "./ClientApp/app/components/users/user-feedback-create/user-feedback-create.component.css":
/***/ (function(module, exports) {

module.exports = ".my-table-striped > tbody > tr:nth-of-type(odd) {\r\n    background-color: #f9f9f9 !important;\r\n  }"

/***/ }),

/***/ "./ClientApp/app/components/users/user-feedback-create/user-feedback-create.component.html":
/***/ (function(module, exports) {

module.exports = "<modal-wrapper [dialogRef]=\"dialogRef\">\r\n    <ngx-spinner [visible]=\"loading\" [config]=\"spinnerConfig\"></ngx-spinner>\r\n    <div class=\"card x_panel\" *ngIf=\"!loading\">\r\n        <div id=\"divDataBody\" class=\"container entity\">\r\n            <div class=\"row\">\r\n                <div class=\"col-md-12 form-title\">\r\n                    <h2 style=\"color: #73879C;\">Create Project </h2>\r\n                </div>\r\n                <div class=\"col-md-12 col-lg-12\">\r\n                    <form name=\"addfeedback\" class=\"form-horizontal  container-fluid\">\r\n                        <div class=\"form-group col-md-12 col-xs-12  black-tooltip\">\r\n                            <select class=\"select2_single form-control\" [(ngModel)]=\"feedback.ProjectName\" name=\"selectProject\" tabindex=\"-1\">\r\n                                <option *ngFor=\"let project of projects; let i = index\" [value]=\"project.Name\">\r\n                                    {{ project.Name }}\r\n                                </option>\r\n                            </select>\r\n                            <span class=\"tooltiptext\">\r\n                                Project Name\r\n                            </span>\r\n                        </div>\r\n                        <div class=\"col-md-12 col-sm-12 col-xs-12 form-group has-feedback black-tooltip\">\r\n                            <input type=\"text\" class=\"form-control has-feedback-left\" id=\"inputSuccess2\" placeholder=\"Position\" [(ngModel)]=\"feedback.Position\" name=\"Position\" autocomplete=\"off\">\r\n                            <span class=\"fa fa-comment form-control-feedback left\" aria-hidden=\"true\"></span>\r\n                            <span class=\"tooltiptext\">\r\n                                Position\r\n                            </span>\r\n                        </div>\r\n                        <div class=\"col-md-12 col-sm-12 col-xs-12 form-group has-feedback black-tooltip\">\r\n                            <input type=\"text\" class=\"form-control has-feedback-left\" id=\"inputSuccess2\" placeholder=\"Feedback\" [(ngModel)]=\"feedback.Feedback\" name=\"Feedback\" autocomplete=\"off\">\r\n                            <span class=\"fa fa-comment form-control-feedback left\" aria-hidden=\"true\"></span>\r\n                            <span class=\"tooltiptext\">\r\n                                Feedback\r\n                            </span>\r\n                        </div>\r\n                        <div class=\"col-md-12 col-xs-12\">\r\n                            <div class=\"form-group col-md-6 col-xs-6 text-center\">\r\n                                <button class=\"btn btn-primary alignCenterBtn black-tooltip\" (click)=\"createFeedback()\">\r\n                                    Create\r\n                                </button>\r\n                            </div>\r\n                            <div class=\"form-group col-md-6 col-xs-6 text-center\">\r\n                                <button class=\"btn btn-primary alignCenterBtn black-tooltip\" (click)=\"cancel()\">\r\n                                    Cancel\r\n                                </button>\r\n                            </div>\r\n                        </div>\r\n                    </form>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</modal-wrapper>"

/***/ }),

/***/ "./ClientApp/app/components/users/user-feedback-create/user-feedback-create.component.ts":
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
var material_1 = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
var ngx_spinner_1 = __webpack_require__("./node_modules/@hardpool/ngx-spinner/fesm5/hardpool-ngx-spinner.js");
var feedback_model_1 = __webpack_require__("./ClientApp/app/models/feedback.model.ts");
var feedback_service_1 = __webpack_require__("./ClientApp/app/services/feedback.service.ts");
var projects_service_1 = __webpack_require__("./ClientApp/app/services/projects.service.ts");
var project_query_model_1 = __webpack_require__("./ClientApp/app/models/query-models/project-query.model.ts");
var UserFeedbackCreateComponent = /** @class */ (function () {
    function UserFeedbackCreateComponent(dialogRef, data, feedbackService, projectService) {
        var _this = this;
        this.dialogRef = dialogRef;
        this.data = data;
        this.feedbackService = feedbackService;
        this.projectService = projectService;
        this.loading = false;
        this.feedback = new feedback_model_1.Feedback();
        this.spinnerConfig = {
            placement: ngx_spinner_1.SPINNER_PLACEMENT.block_ui,
            animation: ngx_spinner_1.SPINNER_ANIMATIONS.spin_3,
            size: "3rem",
            color: "#1574b3"
        };
        this.loading = true;
        this.feedback.UserId = data.userId;
        this.feedback.AuthorId = data.authorId;
        this.projectService.get(new project_query_model_1.ProjectQueryModel()).subscribe(function (response) {
            _this.projects = response.Result;
            _this.loading = false;
        });
    }
    UserFeedbackCreateComponent.prototype.createFeedback = function () {
        var _this = this;
        this.feedbackService.addFeedback(this.feedback).subscribe(function (response) {
            _this.cancel();
        });
    };
    UserFeedbackCreateComponent.prototype.cancel = function () {
        if (this.dialogRef != null && this.dialogRef != undefined)
            this.dialogRef.close();
    };
    UserFeedbackCreateComponent = __decorate([
        core_1.Component({
            selector: 'user-feedback-create',
            template: __webpack_require__("./ClientApp/app/components/users/user-feedback-create/user-feedback-create.component.html"),
            styles: [__webpack_require__("./ClientApp/app/components/users/user-feedback-create/user-feedback-create.component.css")]
        }),
        __param(1, core_1.Inject(material_1.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [material_1.MatDialogRef, Object, feedback_service_1.FeedbackService, projects_service_1.ProjectsService])
    ], UserFeedbackCreateComponent);
    return UserFeedbackCreateComponent;
}());
exports.UserFeedbackCreateComponent = UserFeedbackCreateComponent;


/***/ }),

/***/ "./ClientApp/app/components/users/user-feedbacks/user-feedbacks.component.css":
/***/ (function(module, exports) {

module.exports = ".my-table-striped > tbody > tr:nth-of-type(odd) {\r\n    background-color: #f9f9f9 !important;\r\n  }"

/***/ }),

/***/ "./ClientApp/app/components/users/user-feedbacks/user-feedbacks.component.html":
/***/ (function(module, exports) {

module.exports = "<modal-wrapper [dialogRef]=\"dialogRef\">\r\n    <div id=\"datatable-responsive_wrapper\" class=\"dataTables_wrapper form-inline dt-bootstrap no-footer\">\r\n        <div class=\"row\">\r\n            <div class=\"col-md-12 col-sm-12 col-xs-12 text-center\" *ngIf=\"feedbacks?.length == 0\">\r\n                <div class=\"title_left\">\r\n                    <h3> Nobody left feedback about this employee </h3>\r\n                </div>\r\n            </div>\r\n            <ngx-spinner [visible]=\"loading\" [config]=\"spinnerConfig\"></ngx-spinner>\r\n            <ng-container *ngIf=\"!loading\">\r\n                <table class=\"table my-table-striped table-bordered projects\" *ngIf=\"feedbacks?.length != 0\">\r\n                    <thead class=\"text-primary\">\r\n                        <tr>\r\n                            <th>Author</th>\r\n                            <th>Project Name</th>\r\n                            <th>Position</th>\r\n                            <th>Feedback</th>\r\n                            <th></th>\r\n                        </tr>\r\n                    </thead>\r\n                    <tbody>\r\n                        <tr *ngFor=\"let feedback of feedbacks; let i = index\">\r\n                            <td><span>{{feedback.AuthorFullName}}</span></td>\r\n                            <td><span>{{feedback.ProjectName}}</span></td>\r\n                            <td><span>{{feedback.Position}}</span></td>\r\n                            <td><span>{{feedback.Feedback}}</span></td>\r\n                            <td style=\"text-align:right\">\r\n                                <a class=\"btn btn-primary black-tooltip\" (click)=\"editFeedbackDialog(feedback)\">\r\n                                    <i class=\"fa fa-pencil\"></i>\r\n                                    <span class=\"tooltiptext\">Edit</span>\r\n                                </a>\r\n                                <a class=\"btn btn-default black-tooltip\" (click)=\"confirmDeleteDialog(feedback)\">\r\n                                    <i class=\"fa fa-trash-o\"></i>\r\n                                    <span class=\"tooltiptext\">Delete</span>\r\n                                </a>\r\n                            </td>\r\n                        </tr>\r\n                    </tbody>\r\n                </table>\r\n            </ng-container>\r\n            \r\n        </div>\r\n    </div>\r\n</modal-wrapper>"

/***/ }),

/***/ "./ClientApp/app/components/users/user-feedbacks/user-feedbacks.component.ts":
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
var material_1 = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
var ngx_spinner_1 = __webpack_require__("./node_modules/@hardpool/ngx-spinner/fesm5/hardpool-ngx-spinner.js");
var delete_confirmation_component_1 = __webpack_require__("./ClientApp/app/components/modals/delete-confirmation/delete-confirmation.component.ts");
var feedback_service_1 = __webpack_require__("./ClientApp/app/services/feedback.service.ts");
var users_feedback_edit_component_1 = __webpack_require__("./ClientApp/app/components/users/users-feedback-edit/users-feedback-edit.component.ts");
var users_service_1 = __webpack_require__("./ClientApp/app/services/users.service.ts");
var UserFeedbacksComponent = /** @class */ (function () {
    function UserFeedbacksComponent(dialogRef, data, feedbackService, dialog, usersService) {
        var _this = this;
        this.dialogRef = dialogRef;
        this.data = data;
        this.feedbackService = feedbackService;
        this.dialog = dialog;
        this.usersService = usersService;
        this.loading = false;
        this.spinnerConfig = {
            placement: ngx_spinner_1.SPINNER_PLACEMENT.block_ui,
            animation: ngx_spinner_1.SPINNER_ANIMATIONS.spin_3,
            size: "3rem",
            color: "#1574b3"
        };
        this.userId = data.userId;
        this.loading = true;
        this.feedbackService.getByUserId(this.userId).subscribe(function (feedbacks) {
            _this.feedbacks = feedbacks;
            _this.loading = false;
        });
    }
    UserFeedbacksComponent.prototype.editFeedbackDialog = function (feedback) {
        var _this = this;
        var dialogRes = this.dialog.open(users_feedback_edit_component_1.UsersFeedbackEditComponent, {
            width: '1050px',
            data: {
                feedback: {
                    Id: feedback.Id,
                    ProjectName: feedback.ProjectName,
                    Position: feedback.Position,
                    Feedback: feedback.Feedback
                }
            }
        }).afterClosed().subscribe(function (dialogResult) {
            if (dialogResult) {
                _this.feedbackService.getByUserId(_this.userId).subscribe(function (feedbacks) {
                    _this.feedbacks = feedbacks;
                });
            }
        });
    };
    UserFeedbacksComponent.prototype.confirmDeleteDialog = function (feedback) {
        var _this = this;
        var dialogConfig = new material_1.MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.position = { top: '0' };
        dialogConfig.autoFocus = false;
        this.dialog.open(delete_confirmation_component_1.DeleteConfirmationComponent, dialogConfig)
            .afterClosed().subscribe(function (dialogResult) {
            if (dialogResult)
                _this.delete(feedback);
        });
    };
    UserFeedbacksComponent.prototype.delete = function (feedback) {
        var _this = this;
        this.feedbackService.removeFeedback(feedback.Id).subscribe(function (response) {
            _this.feedbackService.getByUserId(_this.userId).subscribe(function (feedbacks) {
                _this.feedbacks = feedbacks;
            });
        });
    };
    UserFeedbacksComponent = __decorate([
        core_1.Component({
            selector: 'user-feedbacks',
            template: __webpack_require__("./ClientApp/app/components/users/user-feedbacks/user-feedbacks.component.html"),
            styles: [__webpack_require__("./ClientApp/app/components/users/user-feedbacks/user-feedbacks.component.css")]
        }),
        __param(1, core_1.Inject(material_1.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [material_1.MatDialogRef, Object, feedback_service_1.FeedbackService, material_1.MatDialog, users_service_1.UsersService])
    ], UserFeedbacksComponent);
    return UserFeedbacksComponent;
}());
exports.UserFeedbacksComponent = UserFeedbacksComponent;


/***/ }),

/***/ "./ClientApp/app/components/users/users-avatar-select-modal/users-avatar-select-modal.component.css":
/***/ (function(module, exports) {

module.exports = ".cancel:hover {\r\n    cursor: pointer;\r\n}\r\n\r\n.cancel {\r\n    border-width: 1px;\r\n    border-color: black;\r\n    border-style: solid;\r\n    padding-left: 3px;\r\n    padding-right: 3px;\r\n}"

/***/ }),

/***/ "./ClientApp/app/components/users/users-avatar-select-modal/users-avatar-select-modal.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"card x_panel\">\r\n    <div id=\"divDataBody\" class=\"container entity\">\r\n        <div class=\"row formTitle\">\r\n            <div class=\"col-md-5\">\r\n                <h2 class=\"title\">Select image </h2>\r\n            </div>\r\n            <div class=\"col-md-1 pull-right\" (click)=\"cancel()\">\r\n                <i class=\"fa fa-times cancel\"></i>\r\n            </div>\r\n        </div>\r\n        <div class=\"\">\r\n            <fancy-image-uploader [options]=\"options\" (onUpload)=\"onUpload($event)\"></fancy-image-uploader>\r\n        </div>\r\n        <br>\r\n        <br>\r\n        <br>\r\n        <div class=\"row\">\r\n            <div class=\"form-group col-md-6 col-xs-6\">\r\n                <button class=\"btn btn-primary alignCenterBtn black-tooltip\" (click)=\"confirm()\">\r\n                    Ok\r\n                </button>\r\n            </div>\r\n            <div class=\"form-group col-md-6 col-xs-6\">\r\n                <button class=\"btn btn-primary alignCenterBtn black-tooltip\" (click)=\"cancel()\">\r\n                    Cancel\r\n                </button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "./ClientApp/app/components/users/users-avatar-select-modal/users-avatar-select-modal.component.ts":
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
var material_1 = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
var UsersAvatarSelectModalComponent = /** @class */ (function () {
    function UsersAvatarSelectModalComponent(dialogRef) {
        this.dialogRef = dialogRef;
        this.options = {
            thumbnailHeight: 350,
            thumbnailWidth: 350,
            uploadUrl: '/api/uploadImage',
            allowedImageTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/jpg'],
            maxImageSize: 0.5
        };
    }
    UsersAvatarSelectModalComponent.prototype.onUpload = function (file) {
        this.link = JSON.parse(file.response)["link"];
    };
    UsersAvatarSelectModalComponent.prototype.ngOnInit = function () { };
    UsersAvatarSelectModalComponent.prototype.keyEvent = function (event) {
        if (event.keyCode === 13) {
            this.confirm();
        }
        if (event.keyCode === 27) {
            this.cancel();
        }
    };
    UsersAvatarSelectModalComponent.prototype.confirm = function () {
        this.dialogRef.close({ link: this.link });
    };
    UsersAvatarSelectModalComponent.prototype.cancel = function () {
        this.dialogRef.close();
    };
    __decorate([
        core_1.HostListener('window:keyup', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [KeyboardEvent]),
        __metadata("design:returntype", void 0)
    ], UsersAvatarSelectModalComponent.prototype, "keyEvent", null);
    UsersAvatarSelectModalComponent = __decorate([
        core_1.Component({
            selector: 'users-avatar-select-modal',
            template: __webpack_require__("./ClientApp/app/components/users/users-avatar-select-modal/users-avatar-select-modal.component.html"),
            styles: [__webpack_require__("./ClientApp/app/components/users/users-avatar-select-modal/users-avatar-select-modal.component.css")]
        }),
        __metadata("design:paramtypes", [material_1.MatDialogRef])
    ], UsersAvatarSelectModalComponent);
    return UsersAvatarSelectModalComponent;
}());
exports.UsersAvatarSelectModalComponent = UsersAvatarSelectModalComponent;


/***/ }),

/***/ "./ClientApp/app/components/users/users-change-password/users-change-password.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"card x_panel\">\r\n    <div id=\"divDataBody\" class=\"container entity\">\r\n        <div class=\"row formTitle\">\r\n            <div class=\"col-md-6\">\r\n                <h2 class=\"title\">Change Password</h2>\r\n            </div>\r\n            <div class=\"col-md-6 text-right\">\r\n                <div class=\"row\">\r\n                    <div class=\"col-md-4\">\r\n                    </div>\r\n                    <div class=\"col-md-4\">\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <form name=\"addpost\" class=\"form-horizontal  container-fluid\">\r\n            <div class=\"col-md-8 col-md-offset-2 col-xs-12 \">\r\n                <div class=\"col-md-6 col-xs-6\">\r\n                    <div class=\"form-group col-md-12 col-xs-12\">\r\n                        <mat-form-field style=\"width: 100%\">\r\n                            <input matInput type=\"password\" placeholder=\"Old Password\" name=\"OldPassword\" [(ngModel)]=\"change.OldPassword\">\r\n                        </mat-form-field>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"col-md-8 col-md-offset-2 col-xs-12 \">\r\n                <div class=\"col-md-6 col-xs-6\">\r\n                    <div class=\"form-group col-md-12 col-xs-12\">\r\n                        <mat-form-field style=\"width: 100%\">\r\n                            <input matInput type=\"password\" placeholder=\"New Password\" name=\"NewPassword\" [(ngModel)]=\"change.NewPassword\">\r\n                        </mat-form-field>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"col-md-8 col-md-offset-2 col-xs-12 \">\r\n                <div class=\"col-md-6 col-xs-6\">\r\n                    <div class=\"form-group col-md-12 col-xs-12\">\r\n                        <mat-form-field style=\"width: 100%\">\r\n                            <input matInput type=\"password\" placeholder=\"Confirm new password\" name=\"Confirm\" [(ngModel)]=\"change.ConfirmNewPassword\">\r\n                        </mat-form-field>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"col-md-8 col-md-offset-2 col-xs-12 \">\r\n                <div class=\"col-md-12 col-xs-12\">\r\n                    <div class=\"form-group col-md-12 col-xs-12\">\r\n                        <button type=\"submit\" class=\"btn btn-success alignCenterBtn \" (click)=\"saveChange()\">Change password</button>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </form>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "./ClientApp/app/components/users/users-change-password/users-change-password.component.ts":
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
var users_service_1 = __webpack_require__("./ClientApp/app/services/users.service.ts");
var change_password_model_1 = __webpack_require__("./ClientApp/app/models/change-password.model.ts");
var user_storage_service_1 = __webpack_require__("./ClientApp/app/services/user-storage.service.ts");
var UsersChangePasswordComponent = /** @class */ (function () {
    function UsersChangePasswordComponent(userStorageService, usersService, location) {
        this.userStorageService = userStorageService;
        this.usersService = usersService;
        this.location = location;
        this.change = new change_password_model_1.ChangePassword();
    }
    UsersChangePasswordComponent.prototype.ngOnInit = function () {
    };
    UsersChangePasswordComponent.prototype.saveChange = function () {
        var _this = this;
        this.change.UserProfileID = this.userStorageService.getId();
        this.usersService.changePassword(this.change).subscribe(function (response) {
            _this.location.back();
        });
    };
    UsersChangePasswordComponent.prototype.goBack = function () {
        this.location.back();
    };
    UsersChangePasswordComponent = __decorate([
        core_1.Component({
            template: __webpack_require__("./ClientApp/app/components/users/users-change-password/users-change-password.component.html")
        }),
        __metadata("design:paramtypes", [user_storage_service_1.UserStorageService,
            users_service_1.UsersService,
            common_1.Location])
    ], UsersChangePasswordComponent);
    return UsersChangePasswordComponent;
}());
exports.UsersChangePasswordComponent = UsersChangePasswordComponent;


/***/ }),

/***/ "./ClientApp/app/components/users/users-edit/users-edit.component.css":
/***/ (function(module, exports) {

module.exports = ".update-button {\r\n    margin-top: 15px;\r\n}\r\n\r\ninput:disabled {\r\n    background-color: white;\r\n    color: black;\r\n    cursor: pointer;\r\n}"

/***/ }),

/***/ "./ClientApp/app/components/users/users-edit/users-edit.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"card x_panel\">\r\n    <div id=\"divDataBody\" class=\"container entity\">\r\n        <div class=\"row formTitle\">\r\n            <div class=\"col-md-6\">\r\n                <h2 class=\"title\">{{titleStatus}}</h2>\r\n                <br>\r\n            </div>\r\n        </div>\r\n        <ngx-spinner [visible]=\"loading\" [config]=\"spinnerConfig\"></ngx-spinner>\r\n        <div class=\"row\">\r\n            <div class=\"col-md-3 col-lg-3\">\r\n                <img [src]=\"user.Avatar\" alt=\"\" class=\"img-responsive avatar-view\"\r\n                     style=\"width: -webkit-fill-available;\">\r\n                <br>\r\n                <div class=\"text-center\">\r\n                    <button class=\"btn btn-primary\" (click)=\"showModalSelectAvatar()\">\r\n                        Change Avatar\r\n                    </button>\r\n                </div>\r\n            </div>\r\n            <div class=\"col-md-9 col-lg-9\">\r\n                <div class=\"row\">\r\n                    <div class=\"col-md-9 col-lg-9 col-sm-9\">\r\n                        <form class=\"form-horizontal form-label-left input_mask\" [formGroup]=\"userForm\" (submit)=\"updateUser()\">\r\n                            <div class=\"col-md-12 col-sm-12 col-xs-12 form-group has-feedback  black-tooltip\">\r\n                                <input type=\"text\" class=\"form-control has-feedback-left\" id=\"inputSuccess2\" placeholder=\"First Name\" [(ngModel)]=\"user.FirstName\" formControlName=\"FirstName\">\r\n                                <span class=\"fa fa-user form-control-feedback left\" aria-hidden=\"true\"></span>\r\n                                <div class=\"error-message\" *ngIf=\"userForm.get('FirstName').errors\">\r\n                                    <span *ngIf=\"userForm.get('FirstName').errors.minlength\">First Name is too short</span>\r\n                                    <span *ngIf=\"userForm.get('FirstName').errors.required\">First Name is required</span>\r\n                                </div>\r\n                                <span class=\"tooltiptext\">\r\n                                    FirstName\r\n                                </span>\r\n                            </div>\r\n                            <div class=\"col-md-12 col-sm-12 col-xs-12 form-group has-feedback black-tooltip\">\r\n                                <input type=\"text\" class=\"form-control has-feedback-left\" id=\"inputSuccess3\" placeholder=\"Last Name\" [(ngModel)]=\"user.LastName\" formControlName=\"LastName\">\r\n                                <span class=\"fa fa-user form-control-feedback left\" aria-hidden=\"true\"></span>\r\n                                <div class=\"error-message\" *ngIf=\"userForm.get('LastName').errors\">\r\n                                    <span *ngIf=\"userForm.get('LastName').errors.minlength\">Last Name is too short</span>\r\n                                    <span *ngIf=\"userForm.get('LastName').errors.required\">Last Name is required</span>\r\n                                </div>\r\n                                <span class=\"tooltiptext\">\r\n                                    LastName\r\n                                </span>\r\n                            </div>\r\n                            <div class=\"col-md-12 col-sm-12 col-xs-12 form-group has-feedback black-tooltip\">\r\n                                <input type=\"text\" class=\"form-control has-feedback-left\" id=\"inputSuccess4\" placeholder=\"Email\" [(ngModel)]=\"user.Email\" formControlName=\"Email\">\r\n                                <span class=\"fa fa-envelope form-control-feedback left\" aria-hidden=\"true\"></span>\r\n                                <div class=\"error-message\" *ngIf=\"userForm.get('Email').errors\">\r\n                                    <span *ngIf=\"userForm.get('Email').errors.pattern\">Email contains prohibited characters</span>\r\n                                    <span *ngIf=\"userForm.get('Email').errors.required\">Email is required</span>\r\n                                </div>\r\n                                <span class=\"tooltiptext\">\r\n                                    Email\r\n                                </span>\r\n                            </div>\r\n                            <div class=\"col-md-12 col-sm-12 col-xs-12 form-group has-feedback black-tooltip\">\r\n                                <input type=\"text\" class=\"form-control has-feedback-left\" id=\"inputSuccess5\" formControlName=\"Phone\" placeholder=\"Phone\" [(ngModel)]=\"user.Phone\">\r\n                                <span class=\"fa fa-phone form-control-feedback left\" aria-hidden=\"true\"></span>\r\n                                <div class=\"error-message\" *ngIf=\"userForm.get('Phone').errors\">\r\n                                    <span *ngIf=\"userForm.get('Phone').errors.required\">Phone number is required</span>\r\n                                </div>\r\n                                <span class=\"tooltiptext\">\r\n                                    Phone\r\n                                </span>\r\n                            </div>\r\n                            <div class=\"col-md-12 col-sm-12 col-xs-12 form-group has-feedback black-tooltip date-field\">\r\n                                <mat-datepicker #picker1 disabled=\"false\"></mat-datepicker>\r\n                                <input type=\"text\" class=\"form-control has-feedback-left\" id=\"inputSuccess6\" [matDatepicker]=\"picker1\" placeholder=\"Beginning work\" [min]=\"beginWorkMin\" [max]=\"beginWorkMax\" formControlName=\"DateBeginWork\" [(ngModel)]=\"user.DateBeginWork\" disabled>\r\n                                <mat-datepicker-toggle class=\"left\" matSuffix [for]=\"picker1\"></mat-datepicker-toggle>\r\n                                <span class=\"tooltiptext\">\r\n                                    Start of work\r\n                                </span>\r\n                            </div>\r\n\r\n                            <div class=\"col-md-12 col-sm-12 col-xs-12 form-group has-feedback black-tooltip date-field\">\r\n                                <mat-datepicker #picker2 disabled=\"false\"></mat-datepicker>\r\n                                <input type=\"text\" class=\"form-control has-feedback-left\" id=\"inputSuccess7\" [matDatepicker]=\"picker2\" placeholder=\"Beginning trial work\" [min]=\"beginWorkMin\" [max]=\"beginWorkMax\" formControlName=\"DateBeginTrialWork\" [(ngModel)]=\"user.DateBeginTrialWork\" disabled>\r\n                                <mat-datepicker-toggle class=\"left\" matSuffix [for]=\"picker2\"></mat-datepicker-toggle>\r\n                                <span class=\"tooltiptext\">\r\n                                    Start of trial work\r\n                                </span>\r\n                            </div>\r\n\r\n                            <div class=\"col-md-12 col-sm-12 col-xs-12  form-group has-feedback black-tooltip date-field\">\r\n                                <mat-datepicker #picker disabled=\"false\"></mat-datepicker>\r\n                                <input type=\"text\" class=\"form-control has-feedback-left\" id=\"inputSuccess7\" [matDatepicker]=\"picker\" placeholder=\"Birthday\" [min]=\"birthdayMin\" [max]=\"birthdayMax\" formControlName=\"Birthday\" [(ngModel)]=\"user.DateBirthday\" disabled>\r\n                                <mat-datepicker-toggle class=\"left\" matSuffix [for]=\"picker\"></mat-datepicker-toggle>\r\n                                <span class=\"tooltiptext\">\r\n                                    Birthday\r\n                                </span>\r\n                            </div>\r\n                            <div class=\"col-md-12 col-sm-12 col-xs-12 form-group has-feedback black-tooltip\">\r\n                                <span class=\"fa fa-skype form-control-feedback left\" aria-hidden=\"true\"></span>\r\n                                <input type=\"text\" class=\"form-control has-feedback-left\" id=\"inputSuccess8\" placeholder=\"Skype\" formControlName=\"Skype\" [(ngModel)]=\"user.Skype\">\r\n                                <span class=\"tooltiptext\">\r\n                                    Skype\r\n                                </span>\r\n                            </div>\r\n                            <div class=\"col-md-12 col-sm-12 col-xs-12 form-group has-feedback black-tooltip\">\r\n                                <span class=\"fa fa-map-marker form-control-feedback left\" aria-hidden=\"true\"></span>\r\n                                <input type=\"text\" class=\"form-control has-feedback-left\" id=\"inputSuccess9\" placeholder=\"Address\" formControlName=\"ResidentialAddress\" [(ngModel)]=\"user.ResidentialAddress\">\r\n                                <span class=\"tooltiptext\">\r\n                                    Address\r\n                                </span>\r\n                            </div>\r\n                            <div class=\"col-md-12 col-sm-12 col-xs-12 form-group has-feedback black-tooltip\">\r\n                                <span class=\"fa fa-database form-control-feedback left\" aria-hidden=\"true\"></span>\r\n                                <input type=\"text\" class=\"form-control has-feedback-left\" id=\"inputSuccess10\" placeholder=\"Skills\" formControlName=\"Skills\" [(ngModel)]=\"user.Skills\">\r\n                                <span class=\"tooltiptext\">\r\n                                    Skills\r\n                                </span>\r\n                            </div>\r\n                            <div class=\"col-md-12 col-sm-12 col-xs-12 form-group has-feedback black-tooltip\">\r\n                                <span class=\"fa fa-coffee form-control-feedback left\" aria-hidden=\"true\"></span>\r\n                                <input type=\"text\" class=\"form-control has-feedback-left\" id=\"inputSuccess11\" placeholder=\"Hobbies\" formControlName=\"Hobbies\" [(ngModel)]=\"user.Hobbies\">\r\n                                <span class=\"tooltiptext\">\r\n                                    Hobbies\r\n                                </span>\r\n                            </div>\r\n                            <div class=\"col-md-12 col-sm-12 col-xs-12 form-group has-feedback black-tooltip\">\r\n                                <span class=\"fa fa-list-ul form-control-feedback left\" aria-hidden=\"true\"></span>\r\n                                <input type=\"text\" class=\"form-control has-feedback-left\" id=\"inputSuccess11\" placeholder=\"Wishes\" formControlName=\"Wishes\" [(ngModel)]=\"user.Wishes\">\r\n                                <span class=\"tooltiptext\">\r\n                                    Wishes\r\n                                </span>\r\n                            </div>\r\n                            <div class=\"col-md-12 col-sm-12 col-xs-12 form-group has-feedback black-tooltip\">\r\n                                <span class=\"fa fa-comment form-control-feedback left\" aria-hidden=\"true\"></span>\r\n                                <input type=\"text\" class=\"form-control has-feedback-left\" id=\"inputSuccess12\" placeholder=\"Comment\" formControlName=\"Comment\" [(ngModel)]=\"user.Comment\">\r\n                                <span class=\"tooltiptext\">\r\n                                    Comment\r\n                                </span>\r\n                            </div>\r\n                            <div class=\"col-md-12 col-sm-12 col-xs-12 black-tooltip\" *permission=\"['Super_Admin', 'Admin']\">\r\n                                <select class=\"select2_single form-control\" [(ngModel)]=\"user.Role\" formControlName=\"Role\" tabindex=\"-1\">\r\n                                    <option *ngFor=\"let role of roles; let i = index\" [value]=\"role\">\r\n                                        {{ role }}\r\n                                    </option>\r\n                                </select>\r\n                                <span class=\"tooltiptext\">\r\n                                    Role\r\n                                </span>\r\n                            </div>\r\n                            <div class=\"col-md-6 col-xs-6 update-button\">\r\n                                <div class=\"text-center\">\r\n                                    <button type=\"submit\" class=\"btn btn-primary alignCenterBtn black-tooltip\" [disabled]=\"!userForm.dirty && imageWasLoad == false\">\r\n                                        Update\r\n                                    </button>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"col-md-6 col-xs-6 update-button\">\r\n                                <div class=\"text-center\">\r\n                                    <button type=\"submit\" class=\"btn btn-primary alignCenterBtn black-tooltip\" (click)=\"cancel()\">\r\n                                        Cancel\r\n                                    </button>\r\n                                </div>\r\n                            </div>\r\n                            <div class=\"col-md-12 col-xs-12\">\r\n                                <div class=\"text-center\">\r\n                                    <button class=\"btn btn-success alignCenterBtn\" *isCurrentUserOrHasRole=\"{ id: id, roles: ['Super_Admin', 'Admin']}\" (click)=\"changePassword()\">\r\n                                        Change password\r\n                                    </button>\r\n                                </div>\r\n                            </div>\r\n                        </form>\r\n                    </div>\r\n                    <div class=\"col-md-3 col-lg-3 col-sm-3\">\r\n\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "./ClientApp/app/components/users/users-edit/users-edit.component.ts":
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
var user_model_1 = __webpack_require__("./ClientApp/app/models/user.model.ts");
var users_service_1 = __webpack_require__("./ClientApp/app/services/users.service.ts");
var forms_1 = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
var material_1 = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
var users_avatar_select_modal_component_1 = __webpack_require__("./ClientApp/app/components/users/users-avatar-select-modal/users-avatar-select-modal.component.ts");
var ngx_spinner_1 = __webpack_require__("./node_modules/@hardpool/ngx-spinner/fesm5/hardpool-ngx-spinner.js");
var UsersEditComponent = /** @class */ (function () {
    function UsersEditComponent(usersService, location, route, userStorageService, fBuilder, router, dialog) {
        this.usersService = usersService;
        this.location = location;
        this.route = route;
        this.userStorageService = userStorageService;
        this.fBuilder = fBuilder;
        this.router = router;
        this.dialog = dialog;
        this.user = new user_model_1.User();
        this.roles = [];
        this.phoneNumberMask = ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];
        this.birthdayMin = new Date(new Date().getUTCFullYear() - 60, 0, 1);
        this.birthdayMax = new Date(new Date().getUTCFullYear() - 18, 0, 1);
        this.beginWorkMin = new Date(2015, 0, 1); //Start date of the company
        this.beginWorkMax = new Date();
        this.loading = false;
        this.imageWasLoad = false;
    }
    UsersEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.spinnerConfig = {
            placement: ngx_spinner_1.SPINNER_PLACEMENT.block_ui,
            animation: ngx_spinner_1.SPINNER_ANIMATIONS.spin_3,
            size: "3rem",
            color: "#1574b3"
        };
        this.loading = true;
        this.initForm();
        this.route.params.subscribe(function (params) {
            _this.titleStatus = "Update Info";
            _this.id = +params['id'];
            _this.usersService.getById(_this.id).subscribe(function (response) {
                _this.user = response;
                _this.roles = _this.addRoles();
                _this.loading = false;
            });
        });
        this.isAdmin = this.userStorageService.hasRole('Admin');
    };
    UsersEditComponent.prototype.initForm = function () {
        this.userForm = this.fBuilder.group({
            Phone: ['', [
                    forms_1.Validators.required
                ]],
            Email: ['', [
                    forms_1.Validators.required, forms_1.Validators.pattern(/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/),
                ]],
            FirstName: ['', [
                    forms_1.Validators.required, forms_1.Validators.minLength(2)
                ]],
            LastName: ['', [
                    forms_1.Validators.required, forms_1.Validators.minLength(2)
                ]],
            DateBeginWork: [],
            DateBeginTrialWork: [],
            Birthday: [],
            Comment: [],
            Role: [],
            Skype: [],
            ResidentialAddress: [],
            Skills: [],
            Hobbies: [],
            Wishes: []
        });
    };
    UsersEditComponent.prototype.updateUser = function () {
        var _this = this;
        if (this.userForm.valid) {
            if (this.user.DateBeginWork != null) {
                this.user.DateBeginWork = new Date(Date.parse(this.user.DateBeginWork.toString()));
                this.user.DateBeginWork.setMinutes(this.user.DateBeginWork.getMinutes() - this.user.DateBeginWork.getTimezoneOffset());
            }
            else
                this.user.DateBeginWork = null;
            if (this.user.DateBeginTrialWork != null) {
                this.user.DateBeginTrialWork = new Date(Date.parse(this.user.DateBeginTrialWork.toString()));
                this.user.DateBeginTrialWork.setMinutes(this.user.DateBeginTrialWork.getMinutes() - this.user.DateBeginTrialWork.getTimezoneOffset());
            }
            else
                this.user.DateBeginTrialWork = null;
            this.user.DateBirthday = new Date(Date.parse(this.user.DateBirthday.toString()));
            this.user.DateBirthday.setMinutes(this.user.DateBirthday.getMinutes() - this.user.DateBirthday.getTimezoneOffset());
            this.usersService.update(this.user).subscribe(function (response) {
                if (response) {
                    _this.user = response;
                    _this.user.DateBirthday = new Date(Date.parse(_this.user.DateBirthday.toString()));
                    _this.user.DateBeginWork = _this.user.DateBeginWork != null ? new Date(Date.parse(_this.user.DateBeginWork.toString())) : null;
                    _this.user.DateBeginTrialWork = _this.user.DateBeginTrialWork != null ? new Date(Date.parse(_this.user.DateBeginTrialWork.toString())) : null;
                    _this.status = "Updated";
                    _this.userStorageService.init().subscribe(function (response) {
                        _this.router.navigateByUrl('users/' + _this.id + '/info');
                    });
                }
                else
                    alert("Server responded with error");
            });
        }
    };
    ;
    UsersEditComponent.prototype.process = function (event) {
        console.log(event);
    };
    UsersEditComponent.prototype.changePassword = function () {
        this.router.navigate(['users/changePassword']);
    };
    UsersEditComponent.prototype.goBack = function () {
        this.location.back();
    };
    UsersEditComponent.prototype.showModalSelectAvatar = function () {
        var _this = this;
        var dialogRef = this.dialog.open(users_avatar_select_modal_component_1.UsersAvatarSelectModalComponent, {});
        dialogRef.afterClosed().subscribe(function (result) {
            if (result.link != undefined) {
                _this.user.Avatar = result.link;
                _this.imageWasLoad = true;
            }
        });
    };
    UsersEditComponent.prototype.addRoles = function () {
        if (this.userStorageService.hasRole('Super_Admin')) {
            if (this.id == this.userStorageService.getId())
                return ['Super_Admin', 'Admin', 'ProjectManager', 'Developer', 'HumanResource'];
            else
                return ['Admin', 'ProjectManager', 'Developer', 'HumanResource'];
        }
        else if (this.userStorageService.hasRole('Admin')) {
            if (this.id == this.userStorageService.getId())
                return ['Admin', 'ProjectManager', 'Developer', 'HumanResource'];
            else
                return ['ProjectManager', 'Developer', 'HumanResource'];
        }
        else
            return [];
    };
    UsersEditComponent.prototype.cancel = function () {
        this.location.back();
    };
    UsersEditComponent = __decorate([
        core_1.Component({
            template: __webpack_require__("./ClientApp/app/components/users/users-edit/users-edit.component.html"),
            styles: [__webpack_require__("./ClientApp/app/components/users/users-edit/users-edit.component.css")]
        }),
        __metadata("design:paramtypes", [users_service_1.UsersService,
            common_1.Location,
            router_1.ActivatedRoute,
            user_storage_service_1.UserStorageService,
            forms_1.FormBuilder,
            router_1.Router,
            material_1.MatDialog])
    ], UsersEditComponent);
    return UsersEditComponent;
}());
exports.UsersEditComponent = UsersEditComponent;


/***/ }),

/***/ "./ClientApp/app/components/users/users-feedback-edit/users-feedback-edit.component.css":
/***/ (function(module, exports) {

module.exports = ".cancel:hover {\r\n    cursor: pointer;\r\n}\r\n\r\n.cancel {\r\n    border-width: 1px;\r\n    border-color: black;\r\n    border-style: solid;\r\n    padding-left: 3px;\r\n    padding-right: 3px;\r\n}\r\n"

/***/ }),

/***/ "./ClientApp/app/components/users/users-feedback-edit/users-feedback-edit.component.html":
/***/ (function(module, exports) {

module.exports = "<modal-wrapper [dialogRef]=\"dialogRef\">\r\n    <ngx-spinner [visible]=\"loading\" [config]=\"spinnerConfig\"></ngx-spinner>\r\n    <div class=\"card x_panel\" *ngIf=\"feedback && !loading\">\r\n        <div id=\"divDataBody\" class=\"container entity\">\r\n            <div class=\"row\">\r\n                <div class=\"col-md-12  form-title\">\r\n                    <h2 style=\"color: #73879C;\">Edit feedback </h2>\r\n                </div>\r\n                <div class=\"col-md-12 col-lg-12\">\r\n                    <form name=\"addpost\" class=\"form-horizontal  container-fluid\">\r\n                        <div class=\"form-group col-md-12 col-xs-12  black-tooltip\">\r\n                            <select class=\"select2_single form-control\" [(ngModel)]=\"feedback.ProjectName\" name=\"selectProject\" tabindex=\"-1\">\r\n                                <option *ngFor=\"let project of projects; let i = index\" [value]=\"project.Name\" [selected]=\"i == 0\">\r\n                                    {{ project.Name }}\r\n                                </option>\r\n                            </select>\r\n                            <span class=\"tooltiptext\">\r\n                                Project Name\r\n                            </span>\r\n                        </div>\r\n                        <div class=\"col-md-12 col-sm-12 col-xs-12 form-group has-feedback  black-tooltip\">\r\n                            <input type=\"text\" class=\"form-control has-feedback-left\" id=\"inputSuccess2\" placeholder=\"Position\" [(ngModel)]=\"feedback.Position\" name=\"Position\" autocomplete=\"off\">\r\n                            <span class=\"fa fa-comment form-control-feedback left\" aria-hidden=\"true\"></span>\r\n                            <span class=\"tooltiptext\">\r\n                                Position\r\n                            </span>\r\n                        </div>\r\n                        <div class=\"col-md-12 col-sm-12 col-xs-12 form-group has-feedback  black-tooltip\">\r\n                            <input type=\"text\" class=\"form-control has-feedback-left\" id=\"inputSuccess2\" placeholder=\"Feedback\" [(ngModel)]=\"feedback.Feedback\" name=\"Feedback\" autocomplete=\"off\">\r\n                            <span class=\"fa fa-comment form-control-feedback left\" aria-hidden=\"true\"></span>\r\n                            <span class=\"tooltiptext\">\r\n                                Feedback\r\n                            </span>\r\n                        </div>\r\n                        <div class=\"col-md-12 col-xs-12\">\r\n                            <div class=\"form-group col-md-6 col-xs-6 text-center\">\r\n                                <button class=\"btn btn-primary alignCenterBtn black-tooltip\" (click)=\"updateFeedback()\">\r\n                                    Save\r\n                                </button>\r\n                            </div>\r\n                            <div class=\"form-group col-md-6 col-xs-6 text-center\">\r\n                                <button class=\"btn btn-primary alignCenterBtn black-tooltip\" (click)=\"cancel()\">\r\n                                    Cancel\r\n                                </button>\r\n                            </div>\r\n                        </div>\r\n                    </form>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</modal-wrapper>"

/***/ }),

/***/ "./ClientApp/app/components/users/users-feedback-edit/users-feedback-edit.component.ts":
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
var material_1 = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
var feedback_model_1 = __webpack_require__("./ClientApp/app/models/feedback.model.ts");
var feedback_service_1 = __webpack_require__("./ClientApp/app/services/feedback.service.ts");
var project_query_model_1 = __webpack_require__("./ClientApp/app/models/query-models/project-query.model.ts");
var ngx_spinner_1 = __webpack_require__("./node_modules/@hardpool/ngx-spinner/fesm5/hardpool-ngx-spinner.js");
var UsersFeedbackEditComponent = /** @class */ (function () {
    function UsersFeedbackEditComponent(feedbackService, projectService, dialogRef, data) {
        var _this = this;
        this.feedbackService = feedbackService;
        this.projectService = projectService;
        this.dialogRef = dialogRef;
        this.data = data;
        this.loading = false;
        this.spinnerConfig = {
            placement: ngx_spinner_1.SPINNER_PLACEMENT.block_ui,
            animation: ngx_spinner_1.SPINNER_ANIMATIONS.spin_3,
            size: "3rem",
            color: "#1574b3"
        };
        this.feedback = data.feedback;
        this.originalFeedback = new feedback_model_1.Feedback();
        this.originalFeedback.ProjectName = this.feedback.ProjectName;
        this.originalFeedback.Position = this.feedback.Position;
        this.originalFeedback.Feedback = this.feedback.Feedback;
        this.loading = true;
        this.projectService.get(new project_query_model_1.ProjectQueryModel()).subscribe(function (response) {
            _this.projects = response.Result;
            _this.loading = false;
        });
    }
    UsersFeedbackEditComponent.prototype.keyEvent = function (event) {
        if (event.keyCode === 13) {
            this.updateFeedback();
        }
        if (event.keyCode === 27) {
            this.cancel();
        }
    };
    UsersFeedbackEditComponent.prototype.updateFeedback = function () {
        var _this = this;
        this.feedbackService.updateFeedback(this.feedback).subscribe(function (response) {
            if (_this.dialogRef != null && _this.dialogRef != undefined)
                _this.dialogRef.close(_this.feedback);
        });
    };
    UsersFeedbackEditComponent.prototype.cancel = function () {
        console.log(this.feedback);
        console.log(this.originalFeedback);
        if (this.dialogRef != null && this.dialogRef != undefined) {
            this.feedback = this.originalFeedback;
            this.dialogRef.close();
        }
    };
    __decorate([
        core_1.HostListener('window:keyup', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [KeyboardEvent]),
        __metadata("design:returntype", void 0)
    ], UsersFeedbackEditComponent.prototype, "keyEvent", null);
    UsersFeedbackEditComponent = __decorate([
        core_1.Component({
            selector: 'users-feedback-edit',
            template: __webpack_require__("./ClientApp/app/components/users/users-feedback-edit/users-feedback-edit.component.html"),
            styles: [__webpack_require__("./ClientApp/app/components/users/users-feedback-edit/users-feedback-edit.component.css")]
        }),
        __param(3, core_1.Inject(material_1.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [feedback_service_1.FeedbackService,
            projects_service_1.ProjectsService,
            material_1.MatDialogRef, Object])
    ], UsersFeedbackEditComponent);
    return UsersFeedbackEditComponent;
}());
exports.UsersFeedbackEditComponent = UsersFeedbackEditComponent;


/***/ }),

/***/ "./ClientApp/app/components/users/users-info/users-info.component.css":
/***/ (function(module, exports) {

module.exports = "li .glyphicon {\r\n    margin-right: 10px;\r\n}\r\n\r\n/* Highlighting rules for nav menu items */\r\n\r\nli.link-active a,\r\nli.link-active a:hover,\r\nli.link-active a:focus {\r\n    background-color: #4189C7;\r\n    color: white;\r\n}\r\n\r\nbody {\r\n    background-color: #f6f7f7;\r\n}\r\n\r\n/* Keep the nav menu independent of scrolling and on top of other items */\r\n\r\n.main-nav {\r\n    position: fixed;\r\n    top: 0;\r\n    left: 0;\r\n    right: 0;\r\n    z-index: 1;\r\n}\r\n\r\n.navbar-inverse {\r\n    background-color: #1d2b38;\r\n}\r\n\r\n.navbar-brand {\r\n    font-size: 22px;\r\n}\r\n\r\n.navbar-nav li a {\r\n    color: white;\r\n    font-size: 18px;\r\n}\r\n\r\n.navbar-nav li a:hover {\r\n        background-color: #4189C7;\r\n    }\r\n\r\n.container-bg-color {\r\n    background-color: #dcdcdc;\r\n}\r\n\r\n@media (min-width: 768px) {\r\n    /* On small screens, convert the nav menu to a vertical sidebar */\r\n    .main-nav {\r\n        height: 100%;\r\n        width: calc(15% - 20px);\r\n    }\r\n\r\n    .navbar {\r\n        border-radius: 0px;\r\n        border-width: 0px;\r\n        height: 100%;\r\n    }\r\n\r\n    .navbar-header {\r\n        float: none;\r\n    }\r\n\r\n    .navbar-collapse {\r\n        border-top: 1px solid #444;\r\n        padding: 0px;\r\n    }\r\n\r\n    .navbar ul {\r\n        float: none;\r\n    }\r\n\r\n    .navbar li {\r\n        float: none;\r\n        font-size: 15px;\r\n        margin: 6px;\r\n    }\r\n\r\n        .navbar li a {\r\n            padding: 10px 16px;\r\n            border-radius: 4px;\r\n        }\r\n\r\n    .navbar a {\r\n        /* If a menu item's text is too long, truncate it */\r\n        width: 100%;\r\n        white-space: nowrap;\r\n        overflow: hidden;\r\n        text-overflow: ellipsis;\r\n    }\r\n}\r\n\r\n.nav img {\r\n    float: left;\r\n    margin-right: 10px;\r\n}\r\n\r\n.main-panel {\r\n    padding: 25px;\r\n}\r\n\r\n/* .sidebar-wrapper {\r\n    width: 300px;\r\n} */\r\n\r\n.profile {\r\n    margin-top: 28px !important;\r\n}\r\n\r\nli > .fa {\r\n    margin-right: 6px;\r\n}"

/***/ }),

/***/ "./ClientApp/app/components/users/users-info/users-info.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"card x_panel\" *ngIf=\"currentUserId\">\r\n    <div class=\"row\">\r\n        <ngx-spinner [visible]=\"loading\" [config]=\"spinnerConfig\"></ngx-spinner>\r\n        <div class=\"col-md-12 col-sm-12 col-xs-12\">\r\n            <div class=\"x_panel\">\r\n                <div class=\"x_title\">\r\n                    <h2>User Profile</h2>\r\n                    <ul class=\"nav navbar-right panel_toolbox\">\r\n                        <li class=\"dropdown\">\r\n                            <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-expanded=\"false\"><i class=\"fa fa-wrench\"></i></a>\r\n                            <ul class=\"dropdown-menu\" role=\"menu\">\r\n                                <li>\r\n                                    <a (click)=\"settings()\">Settings</a>\r\n                                </li>\r\n                            </ul>\r\n                        </li>\r\n                    </ul>\r\n                    <div class=\"clearfix\"></div>\r\n                </div>\r\n                <div class=\"x_content\">\r\n                    <div class=\"col-md-3 col-sm-3 col-xs-12 profile_left\">\r\n                        <div class=\"profile_img\">\r\n                            <div id=\"crop-avatar\">\r\n                                <img class=\"img-responsive avatar-view\" *ngIf=\"user\" [src]=\"user.Avatar\" alt=\"Avatar\" title=\"Change the avatar\">\r\n                            </div>\r\n                        </div>\r\n                        <h3>{{user.FirstName}} {{user.LastName}}</h3>\r\n                        <ul class=\"list-unstyled user_data\">\r\n                            <li *ngIf=\"user.DateBirthday\">\r\n                                <i class=\"fa fa-birthday-cake black-tooltip\">\r\n                                    <span class=\"tooltiptext\">\r\n                                        Birthday\r\n                                    </span>\r\n                                </i>\r\n                                {{user.DateBirthday | date:'MM/dd/yyyy'}}\r\n                            </li>\r\n                            <li *ngIf=\"user.Email\">\r\n                                <i class=\"fa fa-envelope-o black-tooltip\">\r\n                                    <span class=\"tooltiptext\">\r\n                                        Email\r\n                                    </span>\r\n                                </i>{{user.Email}}\r\n                            </li>\r\n                            <li *ngIf=\"user.Phone\">\r\n                                <i class=\"fa fa-phone black-tooltip\">\r\n                                    <span class=\"tooltiptext\">\r\n                                        Phone\r\n                                    </span>\r\n                                </i>{{user.Phone}}\r\n                            </li>\r\n                            <li *ngIf=\"user.Skype\">\r\n                                <i class=\"fa fa-skype black-tooltip\">\r\n                                    <span class=\"tooltiptext\">\r\n                                        Skype\r\n                                    </span>\r\n                                </i>{{user.Skype}}\r\n                            </li>\r\n                            <li *ngIf=\"user.DateBeginWork\">\r\n                                <i class=\"fa fa-calendar black-tooltip\">\r\n                                    <span class=\"tooltiptext\">\r\n                                        Start of work\r\n                                    </span>\r\n                                </i>{{user.DateBeginWork != null ? (user.DateBeginWork | date:'MM/dd/yyyy') : \"not exist\"}}\r\n                            </li>\r\n                            <li *ngIf=\"user.DateBeginTrialWork != null\">\r\n                                    <i class=\"fa fa-calendar black-tooltip\">\r\n                                        <span class=\"tooltiptext\">\r\n                                            Start of trial work\r\n                                        </span>\r\n                                    </i>{{user.DateBeginTrialWork | date:'MM/dd/yyyy'}}\r\n                            </li>\r\n                            <li *ngIf=\"user.ResidentialAddress\">\r\n                                <i class=\"fa fa-map-marker black-tooltip\">\r\n                                    <span class=\"tooltiptext\">\r\n                                        Address\r\n                                    </span>\r\n                                </i>{{user.ResidentialAddress}}\r\n                            </li>\r\n                            <li *ngIf=\"user.Skills\">\r\n                                <i class=\"fa fa-database black-tooltip\">\r\n                                    <span class=\"tooltiptext\">\r\n                                        Skills\r\n                                    </span>\r\n                                </i>{{user.Skills}}\r\n                            </li>\r\n                            <li *ngIf=\"user.Hobbies\">\r\n                                <i class=\"fa fa-coffee black-tooltip\">\r\n                                    <span class=\"tooltiptext\">\r\n                                        Hobbies\r\n                                    </span>\r\n                                </i>{{user.Hobbies}}\r\n                            </li>\r\n                            <li *ngIf=\"user.Wishes\">\r\n                                <i class=\"fa fa-list-ul black-tooltip\">\r\n                                    <span class=\"tooltiptext\">\r\n                                        Wishes\r\n                                    </span>\r\n                                </i>{{user.Wishes}}\r\n                            </li>\r\n                        </ul>\r\n                        <div class=\"text-center\">\r\n                            <a class=\"btn btn-success\" (click)=\"settings()\"><i class=\"fa fa-edit m-right-xs\"></i>Settings</a>\r\n                        </div>\r\n                        <br>\r\n                    </div>\r\n                    <div class=\"col-md-9 col-sm-9 col-xs-12\">\r\n                        <div class=\"\" role=\"tabpanel\" data-example-id=\"togglable-tabs\">\r\n                            <ul id=\"myTab\" class=\"nav nav-tabs bar_tabs\" role=\"tablist\">\r\n                                <li role=\"presentation\" class=\"active\" (click)=\"setCurrentTab(1)\">\r\n                                    <a href=\"#tab_content1\" id=\"Projects\" role=\"tab\" data-toggle=\"tab\" aria-expanded=\"true\">Projects</a>\r\n                                </li>\r\n                                <li role=\"presentation\" class=\"\" (click)=\"setCurrentTab(2)\">\r\n                                    <a href=\"#tab_content2\" role=\"tab\" id=\"Vacations\" data-toggle=\"tab\" aria-expanded=\"false\">Vacations</a>\r\n                                </li>\r\n                                <li role=\"presentation\" class=\"\" (click)=\"setCurrentTab(3)\">\r\n                                    <a href=\"#tab_content3\" role=\"tab\" id=\"Sick-Days\" data-toggle=\"tab\" aria-expanded=\"false\">Sick days</a>\r\n                                </li>\r\n                                <li role=\"presentation\" class=\"\" (click)=\"setCurrentTab(4)\">\r\n                                    <a href=\"#tab_content4\" role=\"tab\" id=\"Work-on-weekends\" data-toggle=\"tab\" aria-expanded=\"false\">Work on weekends</a>\r\n                                </li>\r\n                                <li role=\"presentation\" class=\"\" (click)=\"setCurrentTab(5)\">\r\n                                    <a href=\"#tab_content5\" role=\"tab\" id=\"Work-at-home\" data-toggle=\"tab\" aria-expanded=\"false\">Work at home</a>\r\n                                </li>\r\n                                <li role=\"presentation\" class=\"\" (click)=\"setCurrentTab(6)\">\r\n                                    <a href=\"#tab_content6\" role=\"tab\" id=\"Studying\" data-toggle=\"tab\" aria-expanded=\"false\">Studying</a>\r\n                                </li>\r\n                            </ul>\r\n                            <div id=\"myTabContent\" class=\"tab-content\">\r\n                                <div role=\"tabpanel\" class=\"tab-pane fade active in\" id=\"tab_content1\" aria-labelledby=\"Projects\">\r\n                                    <div *ngIf=\"indexOfCurrentTab == 1\">\r\n                                        <projects-list-for-user [userId]=\"currentUserId\" *isCurrentUserOrHasRole=\"{ id: currentUserId, roles: ['Super_Admin', 'Admin']}\"></projects-list-for-user>\r\n                                    </div>\r\n                                </div>\r\n\r\n                                <div role=\"tabpanel\" class=\"tab-pane fade\" id=\"tab_content2\" aria-labelledby=\"Vacations\">\r\n                                    <div *ngIf=\"indexOfCurrentTab == 2\">\r\n\r\n                                        <div class=\"row\">\r\n                                            <div class=\"col-md-4 col-lg-4 col-sm-4\">\r\n                                            </div>\r\n                                            <div class=\"col-md-4 col-lg-4 col-sm-4\">\r\n                                            <span style=\" font-size: 14pt;\">Available days :{{countVacationDayInfo}}</span> <span *ngIf=\"countBorrowedDayInfo != ''\" style=\" font-size: 14pt;\">{{countBorrowedDayInfo}}</span>\r\n                                        </div>\r\n                                    </div>\r\n                                    <user-vacations [userId]=\"currentUserId\" *isCurrentUserOrHasRole=\"{ id: currentUserId, roles: ['Super_Admin', 'Admin']}\"></user-vacations>\r\n                                    <user-vacations-statistic [userId]=\"currentUserId\" *isCurrentUserOrHasRole=\"{ id: currentUserId, roles: ['Super_Admin', 'Admin']}\">                 </user-vacations-statistic>\r\n                                </div>\r\n                                </div>\r\n\r\n                                <div role=\"tabpanel\" class=\"tab-pane fade\" id=\"tab_content3\" aria-labelledby=\"Sick-Days\">\r\n                                    <div *ngIf=\"indexOfCurrentTab == 3\">\r\n                                        <user-sickdays [userId]=\"currentUserId\" *isCurrentUserOrHasRole=\"{ id: currentUserId, roles: ['Super_Admin', 'Admin']}\"></user-sickdays>\r\n                                    </div>\r\n                                </div>\r\n\r\n                                <div role=\"tabpanel\" class=\"tab-pane fade\" id=\"tab_content4\" aria-labelledby=\"Work-on-weekends\">\r\n                                    <div *ngIf=\"indexOfCurrentTab == 4\">\r\n                                        <user-overtimes [userId]=\"currentUserId\" *isCurrentUserOrHasRole=\"{ id: currentUserId, roles: ['Super_Admin', 'Admin']}\"></user-overtimes>\r\n                                    </div>\r\n                                </div>\r\n\r\n                                <div role=\"tabpanel\" class=\"tab-pane fade\" id=\"tab_content5\" aria-labelledby=\"Work-at-home\">\r\n                                    <div *ngIf=\"indexOfCurrentTab == 5\">\r\n                                        <user-work-at-home [userId]=\"currentUserId\" *isCurrentUserOrHasRole=\"{ id: currentUserId, roles: ['Super_Admin', 'Admin']}\"></user-work-at-home>\r\n                                    </div>\r\n                                </div>\r\n\r\n                                <div role=\"tabpanel\" class=\"tab-pane fade\" id=\"tab_content6\" aria-labelledby=\"Studying\">\r\n                                    <div *ngIf=\"indexOfCurrentTab == 6\">\r\n\r\n                                    </div>\r\n                                </div>\r\n\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "./ClientApp/app/components/users/users-info/users-info.component.ts":
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
var user_model_1 = __webpack_require__("./ClientApp/app/models/user.model.ts");
var users_service_1 = __webpack_require__("./ClientApp/app/services/users.service.ts");
var user_storage_service_1 = __webpack_require__("./ClientApp/app/services/user-storage.service.ts");
var ngx_spinner_1 = __webpack_require__("./node_modules/@hardpool/ngx-spinner/fesm5/hardpool-ngx-spinner.js");
var UsersInfoComponent = /** @class */ (function () {
    function UsersInfoComponent(usersService, route, location, router, userStorageService) {
        this.usersService = usersService;
        this.route = route;
        this.location = location;
        this.router = router;
        this.userStorageService = userStorageService;
        this.user = new user_model_1.User();
        this.countVacationDayInfo = '';
        this.countBorrowedDayInfo = '';
        this.loading = false;
        this.indexOfCurrentTab = 1;
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
        };
    }
    UsersInfoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.spinnerConfig = {
            placement: ngx_spinner_1.SPINNER_PLACEMENT.block_ui,
            animation: ngx_spinner_1.SPINNER_ANIMATIONS.spin_3,
            size: "3rem",
            color: "#1574b3"
        };
        this.route.params.subscribe(function (params) {
            _this.loading = true;
            if (+params['id'] == 0) {
                _this.currentUserId = _this.userStorageService.getId();
                _this.router.navigateByUrl('/users/' + _this.currentUserId + '/info');
            }
            else {
                _this.currentUserId = +params['id'];
            }
            if (_this.userStorageService.getId() == _this.currentUserId) {
                _this.user = _this.userStorageService.getUser();
                _this.user.DateBirthday = new Date(Date.parse(_this.user.DateBirthday.toString()));
                _this.user.DateBeginWork = _this.user.DateBeginWork != null ? new Date(Date.parse(_this.user.DateBeginWork.toString())) : null;
                _this.user.DateBeginTrialWork = _this.user.DateBeginTrialWork != null ? new Date(Date.parse(_this.user.DateBeginTrialWork.toString())) : null;
                _this.countVacationDay = _this.userStorageService.getUser().CountAvailableVacationDay;
                _this.getInfoAboutFreeVacationDays(_this.countVacationDay);
                _this.loading = false;
            }
            else {
                _this.usersService.getById(_this.currentUserId).subscribe(function (response) {
                    _this.user = response;
                    _this.user.DateBirthday = new Date(Date.parse(_this.user.DateBirthday.toString()));
                    _this.user.DateBeginWork = _this.user.DateBeginWork != null ? new Date(Date.parse(_this.user.DateBeginWork.toString())) : null;
                    _this.user.DateBeginTrialWork = _this.user.DateBeginTrialWork != null ? new Date(Date.parse(_this.user.DateBeginTrialWork.toString())) : null;
                    _this.countVacationDay = response.CountAvailableVacationDay;
                    _this.getInfoAboutFreeVacationDays(_this.countVacationDay);
                    _this.loading = false;
                });
            }
        });
        this.subscription = this.usersService.getVacDays().subscribe(function (response) {
            _this.countVacationDay -= response.count;
            _this.getInfoAboutFreeVacationDays(_this.countVacationDay);
        });
    };
    UsersInfoComponent.prototype.signOut = function () {
        var _this = this;
        this.usersService.signOut().subscribe(function (response) {
            var resp = response;
            _this.router.navigate([""]).then(function (result) {
                document.location.href = document.baseURI;
            });
        });
    };
    UsersInfoComponent.prototype.settings = function () {
        var currentUserId = this.userStorageService.getId();
        this.router.navigateByUrl('/users/' + this.currentUserId + '/edit');
    };
    UsersInfoComponent.prototype.getInfoAboutFreeVacationDays = function (count) {
        var res = '';
        if (count < 0) {
            res += '(';
            res += (count * (-1)).toString();
            res += ' - overspending)';
            this.countVacationDayInfo = '0';
            this.countBorrowedDayInfo = res;
        }
        else {
            this.countVacationDayInfo = count.toString();
            this.countBorrowedDayInfo = '';
        }
    };
    UsersInfoComponent.prototype.setCurrentTab = function (i) {
        this.indexOfCurrentTab = i;
    };
    UsersInfoComponent = __decorate([
        core_1.Component({
            selector: 'user-info',
            template: __webpack_require__("./ClientApp/app/components/users/users-info/users-info.component.html"),
            styles: [__webpack_require__("./ClientApp/app/components/users/users-info/users-info.component.css")]
        }),
        __metadata("design:paramtypes", [users_service_1.UsersService,
            router_1.ActivatedRoute,
            common_1.Location,
            router_1.Router,
            user_storage_service_1.UserStorageService])
    ], UsersInfoComponent);
    return UsersInfoComponent;
}());
exports.UsersInfoComponent = UsersInfoComponent;


/***/ }),

/***/ "./ClientApp/app/components/users/users-list/users-list.component.css":
/***/ (function(module, exports) {

module.exports = ".link:hover {\r\n    cursor: pointer;\r\n}"

/***/ }),

/***/ "./ClientApp/app/components/users/users-list/users-list.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"card x_panel\">\r\n    <div class=\"x_content\">\r\n        <ngx-spinner [visible]=\"loading\" [config]=\"spinnerConfig\"></ngx-spinner>\r\n        <div class=\"row\" *ngIf=\"users\">\r\n            <div class=\"col-md-12 col-sm-12 col-xs-12 text-center\">\r\n                <div class=\"title_left\">\r\n                    <h3>Colleagues </h3>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"clearfix\"></div>\r\n            <div class=\"col-md-4 col-sm-4 col-xs-12 profile_details\" *ngFor=\"let user of users\">\r\n                <div class=\"well profile_view\">\r\n                    <div class=\"col-sm-12\">\r\n                        <div class=\"left col-xs-5\">\r\n                            <h3 class=\"link\" *permission=\"['Developer', 'ProjectManager', 'HumanResource']\" (click)=\"showInfo(user)\">{{user.FirstName}} {{user.LastName}}</h3>\r\n                            <h3 class=\"link\" *permission=\"['Super_Admin', 'Admin']\" (click)=\"viewProfile(user)\">{{user.FirstName}} {{user.LastName}}</h3>\r\n                            <ul class=\"list-unstyled\">\r\n                                <li> Birthday: {{user.DateBirthday| date:'MM/dd/yyyy'}}</li>\r\n                                <li> Email: {{user.Email}}</li>\r\n                                <li> Phone: {{user.Phone}}</li>\r\n                                <li> Skype: {{user.Skype}}</li>\r\n                                <li class=\"black-tooltip-wishes\"> Wishes: {{getSubStr(user.Wishes)}}\r\n                                    <span class=\"tooltiptext\" *ngIf=\"IsToltiptextVisible(user)\">\r\n                                        {{user.Wishes}}\r\n                                    </span>\r\n                                </li>\r\n                            </ul>\r\n                        </div>\r\n                        <div class=\"right col-xs-7 text-center link\">\r\n                            <div class=\"row\">\r\n                                <div *permission=\"['Developer', 'ProjectManager', 'HumanResource']\" (click)=\"showInfo(user)\" class=\"col-md-10 col-sm-10 col-lg-10\">\r\n                                    <img [src]=\"user.Avatar\" alt=\"\" class=\"img-circle img-responsive\" style=\"width: 185.55px !important; height: 185.55px !important;\">\r\n                                </div>\r\n                                <div *permission=\"['Super_Admin', 'Admin']\" (click)=\"viewProfile(user)\" class=\"col-md-10 col-sm-10 col-lg-10\">\r\n                                        <img [src]=\"user.Avatar\" alt=\"\" class=\"img-circle img-responsive\" style=\"width: 185.55px !important; height: 185.55px !important;\">\r\n                                    </div>\r\n                                <div class=\"col-md-2 col-sm-2 col-lg-2\">\r\n                                    <a *permission=\"['Super_Admin', 'Admin']\" class=\"btn btn-primary btn-xs\" routerLink=\"/users/{{user.UserProfileId}}/edit\">\r\n                                        <i class=\"fa fa-edit\"></i>Edit\r\n                                    </a>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"col-xs-12 bottom\">\r\n                        <div class=\"col-xs-12 col-sm-12 emphasis\">\r\n                            <a *permission=\"['Super_Admin', 'Admin']\" class=\"btn btn-primary btn-xs\" routerLink=\"/users/{{user.UserProfileId}}/info\">\r\n                                <i class=\"fa fa-info\"></i>View Profile\r\n                            </a>\r\n                            <button *permission=\"['Developer', 'ProjectManager', 'HumanResource']\" type=\"button\" class=\"btn btn-primary btn-xs\" (click)=\"showInfo(user)\">\r\n                                <i class=\"fa fa-user\"> </i> View Profile\r\n                            </button>\r\n                            <button *permission=\"['Super_Admin', 'Admin', 'HumanResource', 'ProjectManager']\" type=\"button\" class=\"btn btn-primary btn-xs\" (click)=\"addFeedback(user.UserProfileId)\">\r\n                                <i class=\"fa fa-user\"> </i> Add feedback\r\n                            </button>\r\n                            <button *permission=\"['Super_Admin', 'Admin', 'HumanResource', 'ProjectManager']\" type=\"button\" class=\"btn btn-primary btn-xs\" (click)=\"showFeedbacks(user.UserProfileId)\">\r\n                                <i class=\"fa fa-user\"> </i> View feedbacks\r\n                            </button>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <table-buttons [subject]=\"subject\" [array]=\"[9, 18, 27, 36]\">\r\n\r\n            </table-buttons>\r\n        </div>\r\n    </div>\r\n</div>\r\n"

/***/ }),

/***/ "./ClientApp/app/components/users/users-list/users-list.component.ts":
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
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var users_service_1 = __webpack_require__("./ClientApp/app/services/users.service.ts");
var user_storage_service_1 = __webpack_require__("./ClientApp/app/services/user-storage.service.ts");
var user_query_model_1 = __webpack_require__("./ClientApp/app/models/query-models/user-query.model.ts");
var ngx_spinner_1 = __webpack_require__("./node_modules/@hardpool/ngx-spinner/fesm5/hardpool-ngx-spinner.js");
var rxjs_1 = __webpack_require__("./node_modules/rxjs/Rx.js");
var material_1 = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
var users_short_info_component_1 = __webpack_require__("./ClientApp/app/components/users/users-short-info/users-short-info.component.ts");
var user_feedback_create_component_1 = __webpack_require__("./ClientApp/app/components/users/user-feedback-create/user-feedback-create.component.ts");
var user_feedbacks_component_1 = __webpack_require__("./ClientApp/app/components/users/user-feedbacks/user-feedbacks.component.ts");
var UsersListComponent = /** @class */ (function () {
    function UsersListComponent(usersService, location, router, userStorageService, dialog) {
        this.usersService = usersService;
        this.location = location;
        this.router = router;
        this.userStorageService = userStorageService;
        this.dialog = dialog;
        this.users = new Array();
        this.testlist = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        this.spinnerConfig = {
            placement: ngx_spinner_1.SPINNER_PLACEMENT.block_ui,
            animation: ngx_spinner_1.SPINNER_ANIMATIONS.spin_3,
            size: "3rem",
            color: "#1574b3"
        };
    }
    UsersListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subject = new rxjs_1.Subject();
        this.queryModel = new user_query_model_1.UserQueryModel();
        this.queryModel.Take = 9;
        this.loading = true;
        this.usersService.get(this.queryModel).subscribe(function (response) {
            _this.users = response.Result;
            _this.subject.next({ from: "component", response: response });
            _this.loading = false;
        });
        this.subscription = this.subject.asObservable().subscribe(function (response) {
            if (response.from == "tablebuttons") {
                _this.queryModel = response.response;
                _this.loading = true;
                _this.usersService.get(_this.queryModel).subscribe(function (response) {
                    _this.users = response.Result;
                    _this.loading = false;
                });
            }
        });
    };
    UsersListComponent.prototype.delete = function (index, indexOnArray) {
        var _this = this;
        this.usersService.delete(index).subscribe(function (result) {
            _this.users.splice(indexOnArray, 1);
            _this.status = "Deleted";
            _this.location.back();
        });
    };
    UsersListComponent.prototype.dateFormatter = function (params) {
        if (params.value)
            return new Date(params.value).toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
    };
    UsersListComponent.prototype.goBack = function () {
        this.location.back();
    };
    UsersListComponent.prototype.showInfo = function (user) {
        var dialogRef = this.dialog.open(users_short_info_component_1.UsersShortInfoComponent, {
            width: '1050px',
            data: { user: user }
        });
        dialogRef.afterClosed().subscribe(function (result) {
        });
    };
    UsersListComponent.prototype.viewProfile = function (user) {
        this.router.navigateByUrl('/users/' + user.UserProfileId + '/info');
    };
    UsersListComponent.prototype.getSubStr = function (str) {
        if (str != null) {
            if (str.length > 40)
                return str.substr(0, 40) + "...";
            else
                return str;
        }
        else
            return "";
    };
    UsersListComponent.prototype.IsToltiptextVisible = function (user) {
        return user.Wishes != null ? user.Wishes.length >= 40 : false;
    };
    UsersListComponent.prototype.addFeedback = function (userId) {
        var currentUserId = this.userStorageService.getId();
        var dialogRes = this.dialog.open(user_feedback_create_component_1.UserFeedbackCreateComponent, {
            width: '1050px',
            data: { authorId: currentUserId, userId: userId }
        });
    };
    UsersListComponent.prototype.showFeedbacks = function (userId) {
        var dialogRes = this.dialog.open(user_feedbacks_component_1.UserFeedbacksComponent, {
            width: '1050px',
            data: { userId: userId }
        });
    };
    UsersListComponent = __decorate([
        core_1.Component({
            template: __webpack_require__("./ClientApp/app/components/users/users-list/users-list.component.html"),
            styles: [__webpack_require__("./ClientApp/app/components/users/users-list/users-list.component.css")]
        }),
        __metadata("design:paramtypes", [users_service_1.UsersService,
            common_1.Location,
            router_1.Router,
            user_storage_service_1.UserStorageService,
            material_1.MatDialog])
    ], UsersListComponent);
    return UsersListComponent;
}());
exports.UsersListComponent = UsersListComponent;


/***/ }),

/***/ "./ClientApp/app/components/users/users-projects-by-user/users-projects-by-user.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./ClientApp/app/components/users/users-projects-by-user/users-projects-by-user.component.html":
/***/ (function(module, exports) {

module.exports = "<projects-list>\r\n\r\n</projects-list>"

/***/ }),

/***/ "./ClientApp/app/components/users/users-projects-by-user/users-projects-by-user.component.ts":
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
var UsersProjectsByUserComponent = /** @class */ (function () {
    function UsersProjectsByUserComponent(userStorageService, route, router) {
        this.userStorageService = userStorageService;
        this.route = route;
        this.router = router;
    }
    UsersProjectsByUserComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.userId = +params['id'];
        });
    };
    UsersProjectsByUserComponent = __decorate([
        core_1.Component({
            selector: 'users-projects-by-user',
            template: __webpack_require__("./ClientApp/app/components/users/users-projects-by-user/users-projects-by-user.component.html"),
            styles: [__webpack_require__("./ClientApp/app/components/users/users-projects-by-user/users-projects-by-user.component.css")]
        }),
        __metadata("design:paramtypes", [user_storage_service_1.UserStorageService,
            router_1.ActivatedRoute,
            router_1.Router])
    ], UsersProjectsByUserComponent);
    return UsersProjectsByUserComponent;
}());
exports.UsersProjectsByUserComponent = UsersProjectsByUserComponent;


/***/ }),

/***/ "./ClientApp/app/components/users/users-routing.module.ts":
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
var users_list_component_1 = __webpack_require__("./ClientApp/app/components/users/users-list/users-list.component.ts");
var users_edit_component_1 = __webpack_require__("./ClientApp/app/components/users/users-edit/users-edit.component.ts");
var permission_guard_1 = __webpack_require__("./ClientApp/app/guards/permission.guard.ts");
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var users_change_password_component_1 = __webpack_require__("./ClientApp/app/components/users/users-change-password/users-change-password.component.ts");
var users_projects_by_user_component_1 = __webpack_require__("./ClientApp/app/components/users/users-projects-by-user/users-projects-by-user.component.ts");
var users_info_component_1 = __webpack_require__("./ClientApp/app/components/users/users-info/users-info.component.ts");
var users_table_component_1 = __webpack_require__("./ClientApp/app/components/users/users-table/users-table.component.ts");
var routes = [
    { path: ':id/info', component: users_info_component_1.UsersInfoComponent, canActivate: [permission_guard_1.PermissionGuard], data: { roles: ['Super_Admin', 'Admin'], forCurrentUser: true } },
    { path: '', component: users_list_component_1.UsersListComponent, canActivate: [permission_guard_1.PermissionGuard], data: { roles: ['Super_Admin', 'Admin', 'HumanResource', 'ProjectManager', 'Developer'], forCurrentUser: true } },
    { path: 'table', component: users_table_component_1.UsersTableComponent, canActivate: [permission_guard_1.PermissionGuard], data: { roles: ['Super_Admin', 'Admin', 'HumanResource', 'ProjectManager', 'Developer'], forCurrentUser: true } },
    { path: ':id/edit', component: users_edit_component_1.UsersEditComponent, canActivate: [permission_guard_1.PermissionGuard], data: { roles: ['Super_Admin', 'Admin', 'Developer'], forCurrentUser: true } },
    { path: 'changePassword', component: users_change_password_component_1.UsersChangePasswordComponent, canActivate: [permission_guard_1.PermissionGuard], data: { roles: ['Super_Admin', 'Admin', 'HumanResource', 'ProjectManager', 'Developer'], forCurrentUser: true } },
    { path: ':id/projects', component: users_projects_by_user_component_1.UsersProjectsByUserComponent, canActivate: [permission_guard_1.PermissionGuard], data: { roles: ['Super_Admin', 'Admin'], forCurrentUser: true } }
];
var UsersRoutingModule = /** @class */ (function () {
    function UsersRoutingModule() {
    }
    UsersRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            providers: [permission_guard_1.PermissionGuard],
            exports: [router_1.RouterModule]
        })
    ], UsersRoutingModule);
    return UsersRoutingModule;
}());
exports.UsersRoutingModule = UsersRoutingModule;


/***/ }),

/***/ "./ClientApp/app/components/users/users-short-info/users-short-info.component.css":
/***/ (function(module, exports) {

module.exports = ".my-table-striped > tbody > tr:nth-of-type(odd) {\r\n    background-color: #f9f9f9 !important;\r\n  }"

/***/ }),

/***/ "./ClientApp/app/components/users/users-short-info/users-short-info.component.html":
/***/ (function(module, exports) {

module.exports = "<modal-wrapper [dialogRef]=\"dialogRef\">\r\n        <div id=\"datatable-responsive_wrapper\" class=\"dataTables_wrapper form-inline dt-bootstrap no-footer\">\r\n    <div class=\"row\" *ngIf=\"data.user && emploees\">\r\n        <div class=\"col-md-12 col-lg-12 col-sm-12\">\r\n            <!-- Date of start of work: {{data.user.DateBeginWork != null ? (data.user.DateBeginWork | date:'MM/dd/yyyy') : \"not exist\"}}\r\n                <br>\r\n                Date of start of trial work: {{data.user.DateBeginTrialWork | date:'MM/dd/yyyy'}} -->\r\n                <table class=\"table my-table-striped table-bordered projects\">\r\n            <thead class=\"text-primary\">\r\n                <tr>\r\n                    <th>Project</th>\r\n                    <th>Position</th>\r\n                </tr>\r\n            </thead>\r\n            <tbody>\r\n                <ngx-spinner [visible]=\"loading\" [config]=\"spinnerConfig\"></ngx-spinner>\r\n                <tr *ngFor=\"let emploee of emploees; let i = index\">\r\n                    <td><span>{{emploee.ProjectName}}</span></td>\r\n                    <td><span>{{emploee.Position}}</span></td>\r\n                </tr>\r\n            </tbody>\r\n        </table>\r\n    </div>\r\n</div>\r\n        </div>\r\n</modal-wrapper>"

/***/ }),

/***/ "./ClientApp/app/components/users/users-short-info/users-short-info.component.ts":
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
var user_profile_project_query_model_1 = __webpack_require__("./ClientApp/app/models/query-models/user-profile-project-query.model.ts");
var user_profile_project_service_1 = __webpack_require__("./ClientApp/app/services/user-profile-project.service.ts");
var material_1 = __webpack_require__("./node_modules/@angular/material/esm5/material.es5.js");
var ngx_spinner_1 = __webpack_require__("./node_modules/@hardpool/ngx-spinner/fesm5/hardpool-ngx-spinner.js");
var UsersShortInfoComponent = /** @class */ (function () {
    function UsersShortInfoComponent(userProfileProjectService, dialogRef, data) {
        this.userProfileProjectService = userProfileProjectService;
        this.dialogRef = dialogRef;
        this.data = data;
        this.loading = false;
        this.spinnerConfig = {
            placement: ngx_spinner_1.SPINNER_PLACEMENT.block_ui,
            animation: ngx_spinner_1.SPINNER_ANIMATIONS.spin_3,
            size: "3rem",
            color: "#1574b3"
        };
    }
    UsersShortInfoComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log(this.data.user);
        this.loading = true;
        var userProfileQueryModel = new user_profile_project_query_model_1.UserProfileProjectQueryModel();
        userProfileQueryModel.UserProfileId = this.data.user.UserProfileId;
        this.userProfileProjectService.get(userProfileQueryModel).subscribe(function (response) {
            _this.emploees = response.Result;
            _this.loading = false;
        });
    };
    UsersShortInfoComponent = __decorate([
        core_1.Component({
            selector: 'users-short-info',
            template: __webpack_require__("./ClientApp/app/components/users/users-short-info/users-short-info.component.html"),
            styles: [__webpack_require__("./ClientApp/app/components/users/users-short-info/users-short-info.component.css")]
        }),
        __param(2, core_1.Inject(material_1.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [user_profile_project_service_1.UserProfileProjectService,
            material_1.MatDialogRef, Object])
    ], UsersShortInfoComponent);
    return UsersShortInfoComponent;
}());
exports.UsersShortInfoComponent = UsersShortInfoComponent;


/***/ }),

/***/ "./ClientApp/app/components/users/users-table/users-table.component.css":
/***/ (function(module, exports) {

module.exports = "\r\n"

/***/ }),

/***/ "./ClientApp/app/components/users/users-table/users-table.component.html":
/***/ (function(module, exports) {

module.exports = "    <div class=\"card x_panel\">\r\n    <div class=\"row\">\r\n        <div class=\"col-md-6\">\r\n            <h2>Users</h2>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"row\">\r\n        <div class=\"col-md-12\">\r\n            <table class=\"table table-hover\">\r\n                <thead class=\"text-primary\">\r\n                    <tr>\r\n                        <th>First Name</th>\r\n                        <th>Last Name</th>\r\n                        <th>Phone</th>\r\n                        <th>Email</th>\r\n                        <th>Skype</th>\r\n                        <th>Date Birthday</th>\r\n                        <th>Date Begin Work</th>\r\n                        <th>Comment</th>\r\n                    </tr>\r\n                </thead>\r\n                <tbody>\r\n                    <ngx-spinner [visible]=\"loading\" [config]=\"spinnerConfig\"></ngx-spinner>\r\n                    <tr *ngFor=\"let user of users; let i = index\">\r\n                        <td><span>{{user.FirstName}}</span></td>\r\n                        <td><span>{{user.LastName}}</span></td>\r\n                        <td><span>{{user.Phone}}</span></td>\r\n                        <td><span>{{user.Email}}</span></td>\r\n                        <td><span>{{user.Skype}}</span></td>\r\n                        <td><span>{{user.DateBirthday| date:'MM/dd/yyyy'}}</span></td>\r\n                        <td><span>{{user.DateBeginWork| date:'MM/dd/yyyy'}}</span></td>\r\n                        <td><span>{{user.Comment}}</span></td>\r\n                        <td *permission=\"['Super_Admin', 'Admin']\">\r\n                            <a class=\"btn btn-primary black-tooltip\" routerLink=\"/users/{{user.UserProfileId}}/edit\">\r\n                                <i class=\"fa fa-edit\"></i>\r\n                                <span class=\"tooltiptext\">Edit</span>\r\n                            </a>\r\n                            <a class=\"btn btn-info black-tooltip\" routerLink=\"/users/{{user.UserProfileId}}/info\">\r\n                                <i class=\"fa fa-info\"></i>\r\n                                <span class=\"tooltiptext\">Info</span>\r\n                            </a>\r\n                        </td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n    </div>\r\n</div>\r\n"

/***/ }),

/***/ "./ClientApp/app/components/users/users-table/users-table.component.ts":
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
var users_service_1 = __webpack_require__("./ClientApp/app/services/users.service.ts");
var user_query_model_1 = __webpack_require__("./ClientApp/app/models/query-models/user-query.model.ts");
var ngx_spinner_1 = __webpack_require__("./node_modules/@hardpool/ngx-spinner/fesm5/hardpool-ngx-spinner.js");
var constants_1 = __webpack_require__("./ClientApp/app/constants/constants.ts");
var UsersTableComponent = /** @class */ (function () {
    function UsersTableComponent(usersService) {
        this.usersService = usersService;
        this.users = new Array();
        this.spinnerConfig = {
            placement: ngx_spinner_1.SPINNER_PLACEMENT.block_ui,
            animation: ngx_spinner_1.SPINNER_ANIMATIONS.spin_3,
            size: constants_1.SPINNER_COFIG_CONST_OBJ.SIZE,
            color: constants_1.SPINNER_COFIG_CONST_OBJ.COLOR
        };
    }
    UsersTableComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.queryModel = new user_query_model_1.UserQueryModel();
        this.queryModel.Take = constants_1.QUERY_MODEL_CONST_OBJ.TAKE;
        this.loading = true;
        this.usersService.get(this.queryModel).subscribe(function (response) {
            _this.users = response.Result;
            _this.loading = !_this.loading;
        });
    };
    UsersTableComponent = __decorate([
        core_1.Component({
            template: __webpack_require__("./ClientApp/app/components/users/users-table/users-table.component.html"),
            styles: [__webpack_require__("./ClientApp/app/components/users/users-table/users-table.component.css")]
        }),
        __metadata("design:paramtypes", [users_service_1.UsersService])
    ], UsersTableComponent);
    return UsersTableComponent;
}());
exports.UsersTableComponent = UsersTableComponent;


/***/ }),

/***/ "./ClientApp/app/components/users/users-vacations-statistic-list/users-vacations-statistic-list.component.css":
/***/ (function(module, exports) {

module.exports = ".my-table-striped > tbody > tr:nth-of-type(odd) {\r\n  background-color: #f9f9f9 !important;\r\n}"

/***/ }),

/***/ "./ClientApp/app/components/users/users-vacations-statistic-list/users-vacations-statistic-list.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"card x_panel\">\r\n    <div class=\"row\">\r\n        <div class=\"col-md-6\">\r\n            <h2>Vacations history</h2>\r\n        </div>\r\n    </div>\r\n    <div id=\"datatable-responsive_wrapper\" class=\"dataTables_wrapper form-inline dt-bootstrap no-footer\">\r\n        <div class=\"row\">\r\n            <div class=\"col-md-12\">\r\n                <table class=\"table my-table-striped table-bordered projects\">\r\n                    <thead class=\"text-primary\">\r\n                        <tr>\r\n                            <th>Year</th>\r\n                            <th>Accumulated Days</th>\r\n                            <th>Available Days</th>\r\n                            <th>Spent Days</th>\r\n                            <th>Count vacation days in this year</th>\r\n                        </tr>\r\n                    </thead>\r\n                    <tbody>\r\n                        <ngx-spinner [visible]=\"loading\" [config]=\"spinnerConfig\"></ngx-spinner>\r\n                        <tr *ngFor=\"let year of listVacation; let i = index\">\r\n                            <td><span>{{year.Year}}</span></td>\r\n                            <td><span>{{year.AccumulatedDays}}</span></td>\r\n                            <td><span>{{year.AvailableDays}}</span></td>\r\n                            <td><span>{{year.KilledDays}}</span></td>\r\n                            <td><span>{{year.CountDays}}</span></td>\r\n                        </tr>\r\n                    </tbody>\r\n                </table>\r\n                <table-buttons [subject]=\"subject\">\r\n\r\n                </table-buttons>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n"

/***/ }),

/***/ "./ClientApp/app/components/users/users-vacations-statistic-list/users-vacations-statistic-list.component.ts":
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
var users_service_1 = __webpack_require__("./ClientApp/app/services/users.service.ts");
var ngx_spinner_1 = __webpack_require__("./node_modules/@hardpool/ngx-spinner/fesm5/hardpool-ngx-spinner.js");
var rxjs_1 = __webpack_require__("./node_modules/rxjs/Rx.js");
var list_vacation_query_model_1 = __webpack_require__("./ClientApp/app/models/query-models/list-vacation-query.model.ts");
var UsersVacationsStatisticListComponent = /** @class */ (function () {
    function UsersVacationsStatisticListComponent(usersService, userStorageService, route) {
        this.usersService = usersService;
        this.userStorageService = userStorageService;
        this.route = route;
        this.loading = false;
    }
    UsersVacationsStatisticListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.spinnerConfig = {
            placement: ngx_spinner_1.SPINNER_PLACEMENT.block_ui,
            animation: ngx_spinner_1.SPINNER_ANIMATIONS.spin_3,
            size: "3rem",
            color: "#1574b3"
        };
        this.loading = true;
        this.isAddVisible = false;
        this.id = this.userId;
        this.subject = new rxjs_1.Subject();
        this.queryModel = new list_vacation_query_model_1.ListVacationQueryModel();
        this.queryModel.userId = this.id;
        this.queryModel.Take = 10;
        this.usersService.getVacationDays(this.queryModel).subscribe(function (response) {
            _this.listVacation = response.Result;
            _this.subject.next(response);
            _this.loading = false;
        });
        this.subscription = this.subject.asObservable().subscribe(function (response) {
            _this.loading = true;
            _this.isAddVisible = false;
            _this.id = _this.userId;
            _this.queryModel = new list_vacation_query_model_1.ListVacationQueryModel();
            _this.queryModel.userId = _this.id;
            _this.queryModel.Take = 10;
            _this.usersService.getVacationDays(_this.queryModel).subscribe(function (response) {
                _this.listVacation = response.Result;
                _this.loading = false;
            });
        });
        this.vacationSubscription = this.usersService.getVacDays().subscribe(function (response) {
            _this.loading = true;
            _this.usersService.getVacationDays(_this.queryModel).subscribe(function (responce) {
                _this.listVacation = responce.Result;
                _this.loading = false;
            });
        });
    };
    __decorate([
        core_1.Input('userId'),
        __metadata("design:type", Number)
    ], UsersVacationsStatisticListComponent.prototype, "userId", void 0);
    UsersVacationsStatisticListComponent = __decorate([
        core_1.Component({
            selector: 'user-vacations-statistic',
            template: __webpack_require__("./ClientApp/app/components/users/users-vacations-statistic-list/users-vacations-statistic-list.component.html"),
            styles: [__webpack_require__("./ClientApp/app/components/users/users-vacations-statistic-list/users-vacations-statistic-list.component.css")]
        }),
        __metadata("design:paramtypes", [users_service_1.UsersService,
            user_storage_service_1.UserStorageService,
            router_1.ActivatedRoute])
    ], UsersVacationsStatisticListComponent);
    return UsersVacationsStatisticListComponent;
}());
exports.UsersVacationsStatisticListComponent = UsersVacationsStatisticListComponent;


/***/ }),

/***/ "./ClientApp/app/components/users/users.module.ts":
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
var users_list_component_1 = __webpack_require__("./ClientApp/app/components/users/users-list/users-list.component.ts");
var users_edit_component_1 = __webpack_require__("./ClientApp/app/components/users/users-edit/users-edit.component.ts");
var users_info_component_1 = __webpack_require__("./ClientApp/app/components/users/users-info/users-info.component.ts");
var users_change_password_component_1 = __webpack_require__("./ClientApp/app/components/users/users-change-password/users-change-password.component.ts");
var users_vacations_statistic_list_component_1 = __webpack_require__("./ClientApp/app/components/users/users-vacations-statistic-list/users-vacations-statistic-list.component.ts");
var users_routing_module_1 = __webpack_require__("./ClientApp/app/components/users/users-routing.module.ts");
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var shared_module_1 = __webpack_require__("./ClientApp/app/modules/shared.module.ts");
var work_activity_module_1 = __webpack_require__("./ClientApp/app/components/work-activity/work-activity.module.ts");
var projects_module_1 = __webpack_require__("./ClientApp/app/components/projects/projects.module.ts");
var users_projects_by_user_component_1 = __webpack_require__("./ClientApp/app/components/users/users-projects-by-user/users-projects-by-user.component.ts");
var users_avatar_select_modal_component_1 = __webpack_require__("./ClientApp/app/components/users/users-avatar-select-modal/users-avatar-select-modal.component.ts");
var ng2_fancy_image_uploader_1 = __webpack_require__("./node_modules/ng2-fancy-image-uploader/dist/index.js");
var users_short_info_component_1 = __webpack_require__("./ClientApp/app/components/users/users-short-info/users-short-info.component.ts");
var user_feedbacks_component_1 = __webpack_require__("./ClientApp/app/components/users/user-feedbacks/user-feedbacks.component.ts");
var user_feedback_create_component_1 = __webpack_require__("./ClientApp/app/components/users/user-feedback-create/user-feedback-create.component.ts");
var users_feedback_edit_component_1 = __webpack_require__("./ClientApp/app/components/users/users-feedback-edit/users-feedback-edit.component.ts");
var users_table_component_1 = __webpack_require__("./ClientApp/app/components/users/users-table/users-table.component.ts");
var UsersModule = /** @class */ (function () {
    function UsersModule() {
    }
    UsersModule = __decorate([
        core_1.NgModule({
            declarations: [
                users_list_component_1.UsersListComponent,
                users_info_component_1.UsersInfoComponent,
                users_edit_component_1.UsersEditComponent,
                users_change_password_component_1.UsersChangePasswordComponent,
                users_vacations_statistic_list_component_1.UsersVacationsStatisticListComponent,
                users_projects_by_user_component_1.UsersProjectsByUserComponent,
                users_avatar_select_modal_component_1.UsersAvatarSelectModalComponent,
                users_short_info_component_1.UsersShortInfoComponent,
                user_feedbacks_component_1.UserFeedbacksComponent,
                user_feedback_create_component_1.UserFeedbackCreateComponent,
                users_feedback_edit_component_1.UsersFeedbackEditComponent,
                users_table_component_1.UsersTableComponent
            ],
            imports: [
                users_routing_module_1.UsersRoutingModule,
                shared_module_1.SharedModule,
                work_activity_module_1.WorkActivityModule,
                projects_module_1.ProjectsModule,
                ng2_fancy_image_uploader_1.FancyImageUploaderModule
            ],
            exports: [router_1.RouterModule
            ],
            providers: [],
            entryComponents: [users_avatar_select_modal_component_1.UsersAvatarSelectModalComponent, users_short_info_component_1.UsersShortInfoComponent, user_feedbacks_component_1.UserFeedbacksComponent, user_feedback_create_component_1.UserFeedbackCreateComponent, users_feedback_edit_component_1.UsersFeedbackEditComponent]
        })
    ], UsersModule);
    return UsersModule;
}());
exports.UsersModule = UsersModule;


/***/ }),

/***/ "./ClientApp/app/constants/constants.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SPINNER_COFIG_CONST_OBJ = {
    SIZE: "3rem",
    COLOR: "#1574b3"
};
exports.QUERY_MODEL_CONST_OBJ = {
    TAKE: null
};
exports.FROM_COMPONENT = "component";


/***/ }),

/***/ "./ClientApp/app/models/feedback.model.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Feedback = /** @class */ (function () {
    function Feedback() {
    }
    return Feedback;
}());
exports.Feedback = Feedback;


/***/ }),

/***/ "./ClientApp/app/models/query-models/list-vacation-query.model.ts":
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
var ListVacationQueryModel = /** @class */ (function (_super) {
    __extends(ListVacationQueryModel, _super);
    function ListVacationQueryModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ListVacationQueryModel;
}(base_query_model_1.BaseQueryModel));
exports.ListVacationQueryModel = ListVacationQueryModel;


/***/ }),

/***/ "./node_modules/cropperjs/dist/cropper.js":
/***/ (function(module, exports, __webpack_require__) {

/*!
 * Cropper.js v1.5.12
 * https://fengyuanchen.github.io/cropperjs
 *
 * Copyright 2015-present Chen Fengyuan
 * Released under the MIT license
 *
 * Date: 2021-06-12T08:00:17.411Z
 */

(function (global, factory) {
   true ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Cropper = factory());
}(this, (function () { 'use strict';

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);

      if (enumerableOnly) {
        symbols = symbols.filter(function (sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
      }

      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var IS_BROWSER = typeof window !== 'undefined' && typeof window.document !== 'undefined';
  var WINDOW = IS_BROWSER ? window : {};
  var IS_TOUCH_DEVICE = IS_BROWSER && WINDOW.document.documentElement ? 'ontouchstart' in WINDOW.document.documentElement : false;
  var HAS_POINTER_EVENT = IS_BROWSER ? 'PointerEvent' in WINDOW : false;
  var NAMESPACE = 'cropper'; // Actions

  var ACTION_ALL = 'all';
  var ACTION_CROP = 'crop';
  var ACTION_MOVE = 'move';
  var ACTION_ZOOM = 'zoom';
  var ACTION_EAST = 'e';
  var ACTION_WEST = 'w';
  var ACTION_SOUTH = 's';
  var ACTION_NORTH = 'n';
  var ACTION_NORTH_EAST = 'ne';
  var ACTION_NORTH_WEST = 'nw';
  var ACTION_SOUTH_EAST = 'se';
  var ACTION_SOUTH_WEST = 'sw'; // Classes

  var CLASS_CROP = "".concat(NAMESPACE, "-crop");
  var CLASS_DISABLED = "".concat(NAMESPACE, "-disabled");
  var CLASS_HIDDEN = "".concat(NAMESPACE, "-hidden");
  var CLASS_HIDE = "".concat(NAMESPACE, "-hide");
  var CLASS_INVISIBLE = "".concat(NAMESPACE, "-invisible");
  var CLASS_MODAL = "".concat(NAMESPACE, "-modal");
  var CLASS_MOVE = "".concat(NAMESPACE, "-move"); // Data keys

  var DATA_ACTION = "".concat(NAMESPACE, "Action");
  var DATA_PREVIEW = "".concat(NAMESPACE, "Preview"); // Drag modes

  var DRAG_MODE_CROP = 'crop';
  var DRAG_MODE_MOVE = 'move';
  var DRAG_MODE_NONE = 'none'; // Events

  var EVENT_CROP = 'crop';
  var EVENT_CROP_END = 'cropend';
  var EVENT_CROP_MOVE = 'cropmove';
  var EVENT_CROP_START = 'cropstart';
  var EVENT_DBLCLICK = 'dblclick';
  var EVENT_TOUCH_START = IS_TOUCH_DEVICE ? 'touchstart' : 'mousedown';
  var EVENT_TOUCH_MOVE = IS_TOUCH_DEVICE ? 'touchmove' : 'mousemove';
  var EVENT_TOUCH_END = IS_TOUCH_DEVICE ? 'touchend touchcancel' : 'mouseup';
  var EVENT_POINTER_DOWN = HAS_POINTER_EVENT ? 'pointerdown' : EVENT_TOUCH_START;
  var EVENT_POINTER_MOVE = HAS_POINTER_EVENT ? 'pointermove' : EVENT_TOUCH_MOVE;
  var EVENT_POINTER_UP = HAS_POINTER_EVENT ? 'pointerup pointercancel' : EVENT_TOUCH_END;
  var EVENT_READY = 'ready';
  var EVENT_RESIZE = 'resize';
  var EVENT_WHEEL = 'wheel';
  var EVENT_ZOOM = 'zoom'; // Mime types

  var MIME_TYPE_JPEG = 'image/jpeg'; // RegExps

  var REGEXP_ACTIONS = /^e|w|s|n|se|sw|ne|nw|all|crop|move|zoom$/;
  var REGEXP_DATA_URL = /^data:/;
  var REGEXP_DATA_URL_JPEG = /^data:image\/jpeg;base64,/;
  var REGEXP_TAG_NAME = /^img|canvas$/i; // Misc
  // Inspired by the default width and height of a canvas element.

  var MIN_CONTAINER_WIDTH = 200;
  var MIN_CONTAINER_HEIGHT = 100;

  var DEFAULTS = {
    // Define the view mode of the cropper
    viewMode: 0,
    // 0, 1, 2, 3
    // Define the dragging mode of the cropper
    dragMode: DRAG_MODE_CROP,
    // 'crop', 'move' or 'none'
    // Define the initial aspect ratio of the crop box
    initialAspectRatio: NaN,
    // Define the aspect ratio of the crop box
    aspectRatio: NaN,
    // An object with the previous cropping result data
    data: null,
    // A selector for adding extra containers to preview
    preview: '',
    // Re-render the cropper when resize the window
    responsive: true,
    // Restore the cropped area after resize the window
    restore: true,
    // Check if the current image is a cross-origin image
    checkCrossOrigin: true,
    // Check the current image's Exif Orientation information
    checkOrientation: true,
    // Show the black modal
    modal: true,
    // Show the dashed lines for guiding
    guides: true,
    // Show the center indicator for guiding
    center: true,
    // Show the white modal to highlight the crop box
    highlight: true,
    // Show the grid background
    background: true,
    // Enable to crop the image automatically when initialize
    autoCrop: true,
    // Define the percentage of automatic cropping area when initializes
    autoCropArea: 0.8,
    // Enable to move the image
    movable: true,
    // Enable to rotate the image
    rotatable: true,
    // Enable to scale the image
    scalable: true,
    // Enable to zoom the image
    zoomable: true,
    // Enable to zoom the image by dragging touch
    zoomOnTouch: true,
    // Enable to zoom the image by wheeling mouse
    zoomOnWheel: true,
    // Define zoom ratio when zoom the image by wheeling mouse
    wheelZoomRatio: 0.1,
    // Enable to move the crop box
    cropBoxMovable: true,
    // Enable to resize the crop box
    cropBoxResizable: true,
    // Toggle drag mode between "crop" and "move" when click twice on the cropper
    toggleDragModeOnDblclick: true,
    // Size limitation
    minCanvasWidth: 0,
    minCanvasHeight: 0,
    minCropBoxWidth: 0,
    minCropBoxHeight: 0,
    minContainerWidth: MIN_CONTAINER_WIDTH,
    minContainerHeight: MIN_CONTAINER_HEIGHT,
    // Shortcuts of events
    ready: null,
    cropstart: null,
    cropmove: null,
    cropend: null,
    crop: null,
    zoom: null
  };

  var TEMPLATE = '<div class="cropper-container" touch-action="none">' + '<div class="cropper-wrap-box">' + '<div class="cropper-canvas"></div>' + '</div>' + '<div class="cropper-drag-box"></div>' + '<div class="cropper-crop-box">' + '<span class="cropper-view-box"></span>' + '<span class="cropper-dashed dashed-h"></span>' + '<span class="cropper-dashed dashed-v"></span>' + '<span class="cropper-center"></span>' + '<span class="cropper-face"></span>' + '<span class="cropper-line line-e" data-cropper-action="e"></span>' + '<span class="cropper-line line-n" data-cropper-action="n"></span>' + '<span class="cropper-line line-w" data-cropper-action="w"></span>' + '<span class="cropper-line line-s" data-cropper-action="s"></span>' + '<span class="cropper-point point-e" data-cropper-action="e"></span>' + '<span class="cropper-point point-n" data-cropper-action="n"></span>' + '<span class="cropper-point point-w" data-cropper-action="w"></span>' + '<span class="cropper-point point-s" data-cropper-action="s"></span>' + '<span class="cropper-point point-ne" data-cropper-action="ne"></span>' + '<span class="cropper-point point-nw" data-cropper-action="nw"></span>' + '<span class="cropper-point point-sw" data-cropper-action="sw"></span>' + '<span class="cropper-point point-se" data-cropper-action="se"></span>' + '</div>' + '</div>';

  /**
   * Check if the given value is not a number.
   */

  var isNaN = Number.isNaN || WINDOW.isNaN;
  /**
   * Check if the given value is a number.
   * @param {*} value - The value to check.
   * @returns {boolean} Returns `true` if the given value is a number, else `false`.
   */

  function isNumber(value) {
    return typeof value === 'number' && !isNaN(value);
  }
  /**
   * Check if the given value is a positive number.
   * @param {*} value - The value to check.
   * @returns {boolean} Returns `true` if the given value is a positive number, else `false`.
   */

  var isPositiveNumber = function isPositiveNumber(value) {
    return value > 0 && value < Infinity;
  };
  /**
   * Check if the given value is undefined.
   * @param {*} value - The value to check.
   * @returns {boolean} Returns `true` if the given value is undefined, else `false`.
   */

  function isUndefined(value) {
    return typeof value === 'undefined';
  }
  /**
   * Check if the given value is an object.
   * @param {*} value - The value to check.
   * @returns {boolean} Returns `true` if the given value is an object, else `false`.
   */

  function isObject(value) {
    return _typeof(value) === 'object' && value !== null;
  }
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  /**
   * Check if the given value is a plain object.
   * @param {*} value - The value to check.
   * @returns {boolean} Returns `true` if the given value is a plain object, else `false`.
   */

  function isPlainObject(value) {
    if (!isObject(value)) {
      return false;
    }

    try {
      var _constructor = value.constructor;
      var prototype = _constructor.prototype;
      return _constructor && prototype && hasOwnProperty.call(prototype, 'isPrototypeOf');
    } catch (error) {
      return false;
    }
  }
  /**
   * Check if the given value is a function.
   * @param {*} value - The value to check.
   * @returns {boolean} Returns `true` if the given value is a function, else `false`.
   */

  function isFunction(value) {
    return typeof value === 'function';
  }
  var slice = Array.prototype.slice;
  /**
   * Convert array-like or iterable object to an array.
   * @param {*} value - The value to convert.
   * @returns {Array} Returns a new array.
   */

  function toArray(value) {
    return Array.from ? Array.from(value) : slice.call(value);
  }
  /**
   * Iterate the given data.
   * @param {*} data - The data to iterate.
   * @param {Function} callback - The process function for each element.
   * @returns {*} The original data.
   */

  function forEach(data, callback) {
    if (data && isFunction(callback)) {
      if (Array.isArray(data) || isNumber(data.length)
      /* array-like */
      ) {
          toArray(data).forEach(function (value, key) {
            callback.call(data, value, key, data);
          });
        } else if (isObject(data)) {
        Object.keys(data).forEach(function (key) {
          callback.call(data, data[key], key, data);
        });
      }
    }

    return data;
  }
  /**
   * Extend the given object.
   * @param {*} target - The target object to extend.
   * @param {*} args - The rest objects for merging to the target object.
   * @returns {Object} The extended object.
   */

  var assign = Object.assign || function assign(target) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    if (isObject(target) && args.length > 0) {
      args.forEach(function (arg) {
        if (isObject(arg)) {
          Object.keys(arg).forEach(function (key) {
            target[key] = arg[key];
          });
        }
      });
    }

    return target;
  };
  var REGEXP_DECIMALS = /\.\d*(?:0|9){12}\d*$/;
  /**
   * Normalize decimal number.
   * Check out {@link https://0.30000000000000004.com/}
   * @param {number} value - The value to normalize.
   * @param {number} [times=100000000000] - The times for normalizing.
   * @returns {number} Returns the normalized number.
   */

  function normalizeDecimalNumber(value) {
    var times = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100000000000;
    return REGEXP_DECIMALS.test(value) ? Math.round(value * times) / times : value;
  }
  var REGEXP_SUFFIX = /^width|height|left|top|marginLeft|marginTop$/;
  /**
   * Apply styles to the given element.
   * @param {Element} element - The target element.
   * @param {Object} styles - The styles for applying.
   */

  function setStyle(element, styles) {
    var style = element.style;
    forEach(styles, function (value, property) {
      if (REGEXP_SUFFIX.test(property) && isNumber(value)) {
        value = "".concat(value, "px");
      }

      style[property] = value;
    });
  }
  /**
   * Check if the given element has a special class.
   * @param {Element} element - The element to check.
   * @param {string} value - The class to search.
   * @returns {boolean} Returns `true` if the special class was found.
   */

  function hasClass(element, value) {
    return element.classList ? element.classList.contains(value) : element.className.indexOf(value) > -1;
  }
  /**
   * Add classes to the given element.
   * @param {Element} element - The target element.
   * @param {string} value - The classes to be added.
   */

  function addClass(element, value) {
    if (!value) {
      return;
    }

    if (isNumber(element.length)) {
      forEach(element, function (elem) {
        addClass(elem, value);
      });
      return;
    }

    if (element.classList) {
      element.classList.add(value);
      return;
    }

    var className = element.className.trim();

    if (!className) {
      element.className = value;
    } else if (className.indexOf(value) < 0) {
      element.className = "".concat(className, " ").concat(value);
    }
  }
  /**
   * Remove classes from the given element.
   * @param {Element} element - The target element.
   * @param {string} value - The classes to be removed.
   */

  function removeClass(element, value) {
    if (!value) {
      return;
    }

    if (isNumber(element.length)) {
      forEach(element, function (elem) {
        removeClass(elem, value);
      });
      return;
    }

    if (element.classList) {
      element.classList.remove(value);
      return;
    }

    if (element.className.indexOf(value) >= 0) {
      element.className = element.className.replace(value, '');
    }
  }
  /**
   * Add or remove classes from the given element.
   * @param {Element} element - The target element.
   * @param {string} value - The classes to be toggled.
   * @param {boolean} added - Add only.
   */

  function toggleClass(element, value, added) {
    if (!value) {
      return;
    }

    if (isNumber(element.length)) {
      forEach(element, function (elem) {
        toggleClass(elem, value, added);
      });
      return;
    } // IE10-11 doesn't support the second parameter of `classList.toggle`


    if (added) {
      addClass(element, value);
    } else {
      removeClass(element, value);
    }
  }
  var REGEXP_CAMEL_CASE = /([a-z\d])([A-Z])/g;
  /**
   * Transform the given string from camelCase to kebab-case
   * @param {string} value - The value to transform.
   * @returns {string} The transformed value.
   */

  function toParamCase(value) {
    return value.replace(REGEXP_CAMEL_CASE, '$1-$2').toLowerCase();
  }
  /**
   * Get data from the given element.
   * @param {Element} element - The target element.
   * @param {string} name - The data key to get.
   * @returns {string} The data value.
   */

  function getData(element, name) {
    if (isObject(element[name])) {
      return element[name];
    }

    if (element.dataset) {
      return element.dataset[name];
    }

    return element.getAttribute("data-".concat(toParamCase(name)));
  }
  /**
   * Set data to the given element.
   * @param {Element} element - The target element.
   * @param {string} name - The data key to set.
   * @param {string} data - The data value.
   */

  function setData(element, name, data) {
    if (isObject(data)) {
      element[name] = data;
    } else if (element.dataset) {
      element.dataset[name] = data;
    } else {
      element.setAttribute("data-".concat(toParamCase(name)), data);
    }
  }
  /**
   * Remove data from the given element.
   * @param {Element} element - The target element.
   * @param {string} name - The data key to remove.
   */

  function removeData(element, name) {
    if (isObject(element[name])) {
      try {
        delete element[name];
      } catch (error) {
        element[name] = undefined;
      }
    } else if (element.dataset) {
      // #128 Safari not allows to delete dataset property
      try {
        delete element.dataset[name];
      } catch (error) {
        element.dataset[name] = undefined;
      }
    } else {
      element.removeAttribute("data-".concat(toParamCase(name)));
    }
  }
  var REGEXP_SPACES = /\s\s*/;

  var onceSupported = function () {
    var supported = false;

    if (IS_BROWSER) {
      var once = false;

      var listener = function listener() {};

      var options = Object.defineProperty({}, 'once', {
        get: function get() {
          supported = true;
          return once;
        },

        /**
         * This setter can fix a `TypeError` in strict mode
         * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Getter_only}
         * @param {boolean} value - The value to set
         */
        set: function set(value) {
          once = value;
        }
      });
      WINDOW.addEventListener('test', listener, options);
      WINDOW.removeEventListener('test', listener, options);
    }

    return supported;
  }();
  /**
   * Remove event listener from the target element.
   * @param {Element} element - The event target.
   * @param {string} type - The event type(s).
   * @param {Function} listener - The event listener.
   * @param {Object} options - The event options.
   */


  function removeListener(element, type, listener) {
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    var handler = listener;
    type.trim().split(REGEXP_SPACES).forEach(function (event) {
      if (!onceSupported) {
        var listeners = element.listeners;

        if (listeners && listeners[event] && listeners[event][listener]) {
          handler = listeners[event][listener];
          delete listeners[event][listener];

          if (Object.keys(listeners[event]).length === 0) {
            delete listeners[event];
          }

          if (Object.keys(listeners).length === 0) {
            delete element.listeners;
          }
        }
      }

      element.removeEventListener(event, handler, options);
    });
  }
  /**
   * Add event listener to the target element.
   * @param {Element} element - The event target.
   * @param {string} type - The event type(s).
   * @param {Function} listener - The event listener.
   * @param {Object} options - The event options.
   */

  function addListener(element, type, listener) {
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    var _handler = listener;
    type.trim().split(REGEXP_SPACES).forEach(function (event) {
      if (options.once && !onceSupported) {
        var _element$listeners = element.listeners,
            listeners = _element$listeners === void 0 ? {} : _element$listeners;

        _handler = function handler() {
          delete listeners[event][listener];
          element.removeEventListener(event, _handler, options);

          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          listener.apply(element, args);
        };

        if (!listeners[event]) {
          listeners[event] = {};
        }

        if (listeners[event][listener]) {
          element.removeEventListener(event, listeners[event][listener], options);
        }

        listeners[event][listener] = _handler;
        element.listeners = listeners;
      }

      element.addEventListener(event, _handler, options);
    });
  }
  /**
   * Dispatch event on the target element.
   * @param {Element} element - The event target.
   * @param {string} type - The event type(s).
   * @param {Object} data - The additional event data.
   * @returns {boolean} Indicate if the event is default prevented or not.
   */

  function dispatchEvent(element, type, data) {
    var event; // Event and CustomEvent on IE9-11 are global objects, not constructors

    if (isFunction(Event) && isFunction(CustomEvent)) {
      event = new CustomEvent(type, {
        detail: data,
        bubbles: true,
        cancelable: true
      });
    } else {
      event = document.createEvent('CustomEvent');
      event.initCustomEvent(type, true, true, data);
    }

    return element.dispatchEvent(event);
  }
  /**
   * Get the offset base on the document.
   * @param {Element} element - The target element.
   * @returns {Object} The offset data.
   */

  function getOffset(element) {
    var box = element.getBoundingClientRect();
    return {
      left: box.left + (window.pageXOffset - document.documentElement.clientLeft),
      top: box.top + (window.pageYOffset - document.documentElement.clientTop)
    };
  }
  var location = WINDOW.location;
  var REGEXP_ORIGINS = /^(\w+:)\/\/([^:/?#]*):?(\d*)/i;
  /**
   * Check if the given URL is a cross origin URL.
   * @param {string} url - The target URL.
   * @returns {boolean} Returns `true` if the given URL is a cross origin URL, else `false`.
   */

  function isCrossOriginURL(url) {
    var parts = url.match(REGEXP_ORIGINS);
    return parts !== null && (parts[1] !== location.protocol || parts[2] !== location.hostname || parts[3] !== location.port);
  }
  /**
   * Add timestamp to the given URL.
   * @param {string} url - The target URL.
   * @returns {string} The result URL.
   */

  function addTimestamp(url) {
    var timestamp = "timestamp=".concat(new Date().getTime());
    return url + (url.indexOf('?') === -1 ? '?' : '&') + timestamp;
  }
  /**
   * Get transforms base on the given object.
   * @param {Object} obj - The target object.
   * @returns {string} A string contains transform values.
   */

  function getTransforms(_ref) {
    var rotate = _ref.rotate,
        scaleX = _ref.scaleX,
        scaleY = _ref.scaleY,
        translateX = _ref.translateX,
        translateY = _ref.translateY;
    var values = [];

    if (isNumber(translateX) && translateX !== 0) {
      values.push("translateX(".concat(translateX, "px)"));
    }

    if (isNumber(translateY) && translateY !== 0) {
      values.push("translateY(".concat(translateY, "px)"));
    } // Rotate should come first before scale to match orientation transform


    if (isNumber(rotate) && rotate !== 0) {
      values.push("rotate(".concat(rotate, "deg)"));
    }

    if (isNumber(scaleX) && scaleX !== 1) {
      values.push("scaleX(".concat(scaleX, ")"));
    }

    if (isNumber(scaleY) && scaleY !== 1) {
      values.push("scaleY(".concat(scaleY, ")"));
    }

    var transform = values.length ? values.join(' ') : 'none';
    return {
      WebkitTransform: transform,
      msTransform: transform,
      transform: transform
    };
  }
  /**
   * Get the max ratio of a group of pointers.
   * @param {string} pointers - The target pointers.
   * @returns {number} The result ratio.
   */

  function getMaxZoomRatio(pointers) {
    var pointers2 = _objectSpread2({}, pointers);

    var maxRatio = 0;
    forEach(pointers, function (pointer, pointerId) {
      delete pointers2[pointerId];
      forEach(pointers2, function (pointer2) {
        var x1 = Math.abs(pointer.startX - pointer2.startX);
        var y1 = Math.abs(pointer.startY - pointer2.startY);
        var x2 = Math.abs(pointer.endX - pointer2.endX);
        var y2 = Math.abs(pointer.endY - pointer2.endY);
        var z1 = Math.sqrt(x1 * x1 + y1 * y1);
        var z2 = Math.sqrt(x2 * x2 + y2 * y2);
        var ratio = (z2 - z1) / z1;

        if (Math.abs(ratio) > Math.abs(maxRatio)) {
          maxRatio = ratio;
        }
      });
    });
    return maxRatio;
  }
  /**
   * Get a pointer from an event object.
   * @param {Object} event - The target event object.
   * @param {boolean} endOnly - Indicates if only returns the end point coordinate or not.
   * @returns {Object} The result pointer contains start and/or end point coordinates.
   */

  function getPointer(_ref2, endOnly) {
    var pageX = _ref2.pageX,
        pageY = _ref2.pageY;
    var end = {
      endX: pageX,
      endY: pageY
    };
    return endOnly ? end : _objectSpread2({
      startX: pageX,
      startY: pageY
    }, end);
  }
  /**
   * Get the center point coordinate of a group of pointers.
   * @param {Object} pointers - The target pointers.
   * @returns {Object} The center point coordinate.
   */

  function getPointersCenter(pointers) {
    var pageX = 0;
    var pageY = 0;
    var count = 0;
    forEach(pointers, function (_ref3) {
      var startX = _ref3.startX,
          startY = _ref3.startY;
      pageX += startX;
      pageY += startY;
      count += 1;
    });
    pageX /= count;
    pageY /= count;
    return {
      pageX: pageX,
      pageY: pageY
    };
  }
  /**
   * Get the max sizes in a rectangle under the given aspect ratio.
   * @param {Object} data - The original sizes.
   * @param {string} [type='contain'] - The adjust type.
   * @returns {Object} The result sizes.
   */

  function getAdjustedSizes(_ref4) // or 'cover'
  {
    var aspectRatio = _ref4.aspectRatio,
        height = _ref4.height,
        width = _ref4.width;
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'contain';
    var isValidWidth = isPositiveNumber(width);
    var isValidHeight = isPositiveNumber(height);

    if (isValidWidth && isValidHeight) {
      var adjustedWidth = height * aspectRatio;

      if (type === 'contain' && adjustedWidth > width || type === 'cover' && adjustedWidth < width) {
        height = width / aspectRatio;
      } else {
        width = height * aspectRatio;
      }
    } else if (isValidWidth) {
      height = width / aspectRatio;
    } else if (isValidHeight) {
      width = height * aspectRatio;
    }

    return {
      width: width,
      height: height
    };
  }
  /**
   * Get the new sizes of a rectangle after rotated.
   * @param {Object} data - The original sizes.
   * @returns {Object} The result sizes.
   */

  function getRotatedSizes(_ref5) {
    var width = _ref5.width,
        height = _ref5.height,
        degree = _ref5.degree;
    degree = Math.abs(degree) % 180;

    if (degree === 90) {
      return {
        width: height,
        height: width
      };
    }

    var arc = degree % 90 * Math.PI / 180;
    var sinArc = Math.sin(arc);
    var cosArc = Math.cos(arc);
    var newWidth = width * cosArc + height * sinArc;
    var newHeight = width * sinArc + height * cosArc;
    return degree > 90 ? {
      width: newHeight,
      height: newWidth
    } : {
      width: newWidth,
      height: newHeight
    };
  }
  /**
   * Get a canvas which drew the given image.
   * @param {HTMLImageElement} image - The image for drawing.
   * @param {Object} imageData - The image data.
   * @param {Object} canvasData - The canvas data.
   * @param {Object} options - The options.
   * @returns {HTMLCanvasElement} The result canvas.
   */

  function getSourceCanvas(image, _ref6, _ref7, _ref8) {
    var imageAspectRatio = _ref6.aspectRatio,
        imageNaturalWidth = _ref6.naturalWidth,
        imageNaturalHeight = _ref6.naturalHeight,
        _ref6$rotate = _ref6.rotate,
        rotate = _ref6$rotate === void 0 ? 0 : _ref6$rotate,
        _ref6$scaleX = _ref6.scaleX,
        scaleX = _ref6$scaleX === void 0 ? 1 : _ref6$scaleX,
        _ref6$scaleY = _ref6.scaleY,
        scaleY = _ref6$scaleY === void 0 ? 1 : _ref6$scaleY;
    var aspectRatio = _ref7.aspectRatio,
        naturalWidth = _ref7.naturalWidth,
        naturalHeight = _ref7.naturalHeight;
    var _ref8$fillColor = _ref8.fillColor,
        fillColor = _ref8$fillColor === void 0 ? 'transparent' : _ref8$fillColor,
        _ref8$imageSmoothingE = _ref8.imageSmoothingEnabled,
        imageSmoothingEnabled = _ref8$imageSmoothingE === void 0 ? true : _ref8$imageSmoothingE,
        _ref8$imageSmoothingQ = _ref8.imageSmoothingQuality,
        imageSmoothingQuality = _ref8$imageSmoothingQ === void 0 ? 'low' : _ref8$imageSmoothingQ,
        _ref8$maxWidth = _ref8.maxWidth,
        maxWidth = _ref8$maxWidth === void 0 ? Infinity : _ref8$maxWidth,
        _ref8$maxHeight = _ref8.maxHeight,
        maxHeight = _ref8$maxHeight === void 0 ? Infinity : _ref8$maxHeight,
        _ref8$minWidth = _ref8.minWidth,
        minWidth = _ref8$minWidth === void 0 ? 0 : _ref8$minWidth,
        _ref8$minHeight = _ref8.minHeight,
        minHeight = _ref8$minHeight === void 0 ? 0 : _ref8$minHeight;
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    var maxSizes = getAdjustedSizes({
      aspectRatio: aspectRatio,
      width: maxWidth,
      height: maxHeight
    });
    var minSizes = getAdjustedSizes({
      aspectRatio: aspectRatio,
      width: minWidth,
      height: minHeight
    }, 'cover');
    var width = Math.min(maxSizes.width, Math.max(minSizes.width, naturalWidth));
    var height = Math.min(maxSizes.height, Math.max(minSizes.height, naturalHeight)); // Note: should always use image's natural sizes for drawing as
    // imageData.naturalWidth === canvasData.naturalHeight when rotate % 180 === 90

    var destMaxSizes = getAdjustedSizes({
      aspectRatio: imageAspectRatio,
      width: maxWidth,
      height: maxHeight
    });
    var destMinSizes = getAdjustedSizes({
      aspectRatio: imageAspectRatio,
      width: minWidth,
      height: minHeight
    }, 'cover');
    var destWidth = Math.min(destMaxSizes.width, Math.max(destMinSizes.width, imageNaturalWidth));
    var destHeight = Math.min(destMaxSizes.height, Math.max(destMinSizes.height, imageNaturalHeight));
    var params = [-destWidth / 2, -destHeight / 2, destWidth, destHeight];
    canvas.width = normalizeDecimalNumber(width);
    canvas.height = normalizeDecimalNumber(height);
    context.fillStyle = fillColor;
    context.fillRect(0, 0, width, height);
    context.save();
    context.translate(width / 2, height / 2);
    context.rotate(rotate * Math.PI / 180);
    context.scale(scaleX, scaleY);
    context.imageSmoothingEnabled = imageSmoothingEnabled;
    context.imageSmoothingQuality = imageSmoothingQuality;
    context.drawImage.apply(context, [image].concat(_toConsumableArray(params.map(function (param) {
      return Math.floor(normalizeDecimalNumber(param));
    }))));
    context.restore();
    return canvas;
  }
  var fromCharCode = String.fromCharCode;
  /**
   * Get string from char code in data view.
   * @param {DataView} dataView - The data view for read.
   * @param {number} start - The start index.
   * @param {number} length - The read length.
   * @returns {string} The read result.
   */

  function getStringFromCharCode(dataView, start, length) {
    var str = '';
    length += start;

    for (var i = start; i < length; i += 1) {
      str += fromCharCode(dataView.getUint8(i));
    }

    return str;
  }
  var REGEXP_DATA_URL_HEAD = /^data:.*,/;
  /**
   * Transform Data URL to array buffer.
   * @param {string} dataURL - The Data URL to transform.
   * @returns {ArrayBuffer} The result array buffer.
   */

  function dataURLToArrayBuffer(dataURL) {
    var base64 = dataURL.replace(REGEXP_DATA_URL_HEAD, '');
    var binary = atob(base64);
    var arrayBuffer = new ArrayBuffer(binary.length);
    var uint8 = new Uint8Array(arrayBuffer);
    forEach(uint8, function (value, i) {
      uint8[i] = binary.charCodeAt(i);
    });
    return arrayBuffer;
  }
  /**
   * Transform array buffer to Data URL.
   * @param {ArrayBuffer} arrayBuffer - The array buffer to transform.
   * @param {string} mimeType - The mime type of the Data URL.
   * @returns {string} The result Data URL.
   */

  function arrayBufferToDataURL(arrayBuffer, mimeType) {
    var chunks = []; // Chunk Typed Array for better performance (#435)

    var chunkSize = 8192;
    var uint8 = new Uint8Array(arrayBuffer);

    while (uint8.length > 0) {
      // XXX: Babel's `toConsumableArray` helper will throw error in IE or Safari 9
      // eslint-disable-next-line prefer-spread
      chunks.push(fromCharCode.apply(null, toArray(uint8.subarray(0, chunkSize))));
      uint8 = uint8.subarray(chunkSize);
    }

    return "data:".concat(mimeType, ";base64,").concat(btoa(chunks.join('')));
  }
  /**
   * Get orientation value from given array buffer.
   * @param {ArrayBuffer} arrayBuffer - The array buffer to read.
   * @returns {number} The read orientation value.
   */

  function resetAndGetOrientation(arrayBuffer) {
    var dataView = new DataView(arrayBuffer);
    var orientation; // Ignores range error when the image does not have correct Exif information

    try {
      var littleEndian;
      var app1Start;
      var ifdStart; // Only handle JPEG image (start by 0xFFD8)

      if (dataView.getUint8(0) === 0xFF && dataView.getUint8(1) === 0xD8) {
        var length = dataView.byteLength;
        var offset = 2;

        while (offset + 1 < length) {
          if (dataView.getUint8(offset) === 0xFF && dataView.getUint8(offset + 1) === 0xE1) {
            app1Start = offset;
            break;
          }

          offset += 1;
        }
      }

      if (app1Start) {
        var exifIDCode = app1Start + 4;
        var tiffOffset = app1Start + 10;

        if (getStringFromCharCode(dataView, exifIDCode, 4) === 'Exif') {
          var endianness = dataView.getUint16(tiffOffset);
          littleEndian = endianness === 0x4949;

          if (littleEndian || endianness === 0x4D4D
          /* bigEndian */
          ) {
              if (dataView.getUint16(tiffOffset + 2, littleEndian) === 0x002A) {
                var firstIFDOffset = dataView.getUint32(tiffOffset + 4, littleEndian);

                if (firstIFDOffset >= 0x00000008) {
                  ifdStart = tiffOffset + firstIFDOffset;
                }
              }
            }
        }
      }

      if (ifdStart) {
        var _length = dataView.getUint16(ifdStart, littleEndian);

        var _offset;

        var i;

        for (i = 0; i < _length; i += 1) {
          _offset = ifdStart + i * 12 + 2;

          if (dataView.getUint16(_offset, littleEndian) === 0x0112
          /* Orientation */
          ) {
              // 8 is the offset of the current tag's value
              _offset += 8; // Get the original orientation value

              orientation = dataView.getUint16(_offset, littleEndian); // Override the orientation with its default value

              dataView.setUint16(_offset, 1, littleEndian);
              break;
            }
        }
      }
    } catch (error) {
      orientation = 1;
    }

    return orientation;
  }
  /**
   * Parse Exif Orientation value.
   * @param {number} orientation - The orientation to parse.
   * @returns {Object} The parsed result.
   */

  function parseOrientation(orientation) {
    var rotate = 0;
    var scaleX = 1;
    var scaleY = 1;

    switch (orientation) {
      // Flip horizontal
      case 2:
        scaleX = -1;
        break;
      // Rotate left 180°

      case 3:
        rotate = -180;
        break;
      // Flip vertical

      case 4:
        scaleY = -1;
        break;
      // Flip vertical and rotate right 90°

      case 5:
        rotate = 90;
        scaleY = -1;
        break;
      // Rotate right 90°

      case 6:
        rotate = 90;
        break;
      // Flip horizontal and rotate right 90°

      case 7:
        rotate = 90;
        scaleX = -1;
        break;
      // Rotate left 90°

      case 8:
        rotate = -90;
        break;
    }

    return {
      rotate: rotate,
      scaleX: scaleX,
      scaleY: scaleY
    };
  }

  var render = {
    render: function render() {
      this.initContainer();
      this.initCanvas();
      this.initCropBox();
      this.renderCanvas();

      if (this.cropped) {
        this.renderCropBox();
      }
    },
    initContainer: function initContainer() {
      var element = this.element,
          options = this.options,
          container = this.container,
          cropper = this.cropper;
      var minWidth = Number(options.minContainerWidth);
      var minHeight = Number(options.minContainerHeight);
      addClass(cropper, CLASS_HIDDEN);
      removeClass(element, CLASS_HIDDEN);
      var containerData = {
        width: Math.max(container.offsetWidth, minWidth >= 0 ? minWidth : MIN_CONTAINER_WIDTH),
        height: Math.max(container.offsetHeight, minHeight >= 0 ? minHeight : MIN_CONTAINER_HEIGHT)
      };
      this.containerData = containerData;
      setStyle(cropper, {
        width: containerData.width,
        height: containerData.height
      });
      addClass(element, CLASS_HIDDEN);
      removeClass(cropper, CLASS_HIDDEN);
    },
    // Canvas (image wrapper)
    initCanvas: function initCanvas() {
      var containerData = this.containerData,
          imageData = this.imageData;
      var viewMode = this.options.viewMode;
      var rotated = Math.abs(imageData.rotate) % 180 === 90;
      var naturalWidth = rotated ? imageData.naturalHeight : imageData.naturalWidth;
      var naturalHeight = rotated ? imageData.naturalWidth : imageData.naturalHeight;
      var aspectRatio = naturalWidth / naturalHeight;
      var canvasWidth = containerData.width;
      var canvasHeight = containerData.height;

      if (containerData.height * aspectRatio > containerData.width) {
        if (viewMode === 3) {
          canvasWidth = containerData.height * aspectRatio;
        } else {
          canvasHeight = containerData.width / aspectRatio;
        }
      } else if (viewMode === 3) {
        canvasHeight = containerData.width / aspectRatio;
      } else {
        canvasWidth = containerData.height * aspectRatio;
      }

      var canvasData = {
        aspectRatio: aspectRatio,
        naturalWidth: naturalWidth,
        naturalHeight: naturalHeight,
        width: canvasWidth,
        height: canvasHeight
      };
      this.canvasData = canvasData;
      this.limited = viewMode === 1 || viewMode === 2;
      this.limitCanvas(true, true);
      canvasData.width = Math.min(Math.max(canvasData.width, canvasData.minWidth), canvasData.maxWidth);
      canvasData.height = Math.min(Math.max(canvasData.height, canvasData.minHeight), canvasData.maxHeight);
      canvasData.left = (containerData.width - canvasData.width) / 2;
      canvasData.top = (containerData.height - canvasData.height) / 2;
      canvasData.oldLeft = canvasData.left;
      canvasData.oldTop = canvasData.top;
      this.initialCanvasData = assign({}, canvasData);
    },
    limitCanvas: function limitCanvas(sizeLimited, positionLimited) {
      var options = this.options,
          containerData = this.containerData,
          canvasData = this.canvasData,
          cropBoxData = this.cropBoxData;
      var viewMode = options.viewMode;
      var aspectRatio = canvasData.aspectRatio;
      var cropped = this.cropped && cropBoxData;

      if (sizeLimited) {
        var minCanvasWidth = Number(options.minCanvasWidth) || 0;
        var minCanvasHeight = Number(options.minCanvasHeight) || 0;

        if (viewMode > 1) {
          minCanvasWidth = Math.max(minCanvasWidth, containerData.width);
          minCanvasHeight = Math.max(minCanvasHeight, containerData.height);

          if (viewMode === 3) {
            if (minCanvasHeight * aspectRatio > minCanvasWidth) {
              minCanvasWidth = minCanvasHeight * aspectRatio;
            } else {
              minCanvasHeight = minCanvasWidth / aspectRatio;
            }
          }
        } else if (viewMode > 0) {
          if (minCanvasWidth) {
            minCanvasWidth = Math.max(minCanvasWidth, cropped ? cropBoxData.width : 0);
          } else if (minCanvasHeight) {
            minCanvasHeight = Math.max(minCanvasHeight, cropped ? cropBoxData.height : 0);
          } else if (cropped) {
            minCanvasWidth = cropBoxData.width;
            minCanvasHeight = cropBoxData.height;

            if (minCanvasHeight * aspectRatio > minCanvasWidth) {
              minCanvasWidth = minCanvasHeight * aspectRatio;
            } else {
              minCanvasHeight = minCanvasWidth / aspectRatio;
            }
          }
        }

        var _getAdjustedSizes = getAdjustedSizes({
          aspectRatio: aspectRatio,
          width: minCanvasWidth,
          height: minCanvasHeight
        });

        minCanvasWidth = _getAdjustedSizes.width;
        minCanvasHeight = _getAdjustedSizes.height;
        canvasData.minWidth = minCanvasWidth;
        canvasData.minHeight = minCanvasHeight;
        canvasData.maxWidth = Infinity;
        canvasData.maxHeight = Infinity;
      }

      if (positionLimited) {
        if (viewMode > (cropped ? 0 : 1)) {
          var newCanvasLeft = containerData.width - canvasData.width;
          var newCanvasTop = containerData.height - canvasData.height;
          canvasData.minLeft = Math.min(0, newCanvasLeft);
          canvasData.minTop = Math.min(0, newCanvasTop);
          canvasData.maxLeft = Math.max(0, newCanvasLeft);
          canvasData.maxTop = Math.max(0, newCanvasTop);

          if (cropped && this.limited) {
            canvasData.minLeft = Math.min(cropBoxData.left, cropBoxData.left + (cropBoxData.width - canvasData.width));
            canvasData.minTop = Math.min(cropBoxData.top, cropBoxData.top + (cropBoxData.height - canvasData.height));
            canvasData.maxLeft = cropBoxData.left;
            canvasData.maxTop = cropBoxData.top;

            if (viewMode === 2) {
              if (canvasData.width >= containerData.width) {
                canvasData.minLeft = Math.min(0, newCanvasLeft);
                canvasData.maxLeft = Math.max(0, newCanvasLeft);
              }

              if (canvasData.height >= containerData.height) {
                canvasData.minTop = Math.min(0, newCanvasTop);
                canvasData.maxTop = Math.max(0, newCanvasTop);
              }
            }
          }
        } else {
          canvasData.minLeft = -canvasData.width;
          canvasData.minTop = -canvasData.height;
          canvasData.maxLeft = containerData.width;
          canvasData.maxTop = containerData.height;
        }
      }
    },
    renderCanvas: function renderCanvas(changed, transformed) {
      var canvasData = this.canvasData,
          imageData = this.imageData;

      if (transformed) {
        var _getRotatedSizes = getRotatedSizes({
          width: imageData.naturalWidth * Math.abs(imageData.scaleX || 1),
          height: imageData.naturalHeight * Math.abs(imageData.scaleY || 1),
          degree: imageData.rotate || 0
        }),
            naturalWidth = _getRotatedSizes.width,
            naturalHeight = _getRotatedSizes.height;

        var width = canvasData.width * (naturalWidth / canvasData.naturalWidth);
        var height = canvasData.height * (naturalHeight / canvasData.naturalHeight);
        canvasData.left -= (width - canvasData.width) / 2;
        canvasData.top -= (height - canvasData.height) / 2;
        canvasData.width = width;
        canvasData.height = height;
        canvasData.aspectRatio = naturalWidth / naturalHeight;
        canvasData.naturalWidth = naturalWidth;
        canvasData.naturalHeight = naturalHeight;
        this.limitCanvas(true, false);
      }

      if (canvasData.width > canvasData.maxWidth || canvasData.width < canvasData.minWidth) {
        canvasData.left = canvasData.oldLeft;
      }

      if (canvasData.height > canvasData.maxHeight || canvasData.height < canvasData.minHeight) {
        canvasData.top = canvasData.oldTop;
      }

      canvasData.width = Math.min(Math.max(canvasData.width, canvasData.minWidth), canvasData.maxWidth);
      canvasData.height = Math.min(Math.max(canvasData.height, canvasData.minHeight), canvasData.maxHeight);
      this.limitCanvas(false, true);
      canvasData.left = Math.min(Math.max(canvasData.left, canvasData.minLeft), canvasData.maxLeft);
      canvasData.top = Math.min(Math.max(canvasData.top, canvasData.minTop), canvasData.maxTop);
      canvasData.oldLeft = canvasData.left;
      canvasData.oldTop = canvasData.top;
      setStyle(this.canvas, assign({
        width: canvasData.width,
        height: canvasData.height
      }, getTransforms({
        translateX: canvasData.left,
        translateY: canvasData.top
      })));
      this.renderImage(changed);

      if (this.cropped && this.limited) {
        this.limitCropBox(true, true);
      }
    },
    renderImage: function renderImage(changed) {
      var canvasData = this.canvasData,
          imageData = this.imageData;
      var width = imageData.naturalWidth * (canvasData.width / canvasData.naturalWidth);
      var height = imageData.naturalHeight * (canvasData.height / canvasData.naturalHeight);
      assign(imageData, {
        width: width,
        height: height,
        left: (canvasData.width - width) / 2,
        top: (canvasData.height - height) / 2
      });
      setStyle(this.image, assign({
        width: imageData.width,
        height: imageData.height
      }, getTransforms(assign({
        translateX: imageData.left,
        translateY: imageData.top
      }, imageData))));

      if (changed) {
        this.output();
      }
    },
    initCropBox: function initCropBox() {
      var options = this.options,
          canvasData = this.canvasData;
      var aspectRatio = options.aspectRatio || options.initialAspectRatio;
      var autoCropArea = Number(options.autoCropArea) || 0.8;
      var cropBoxData = {
        width: canvasData.width,
        height: canvasData.height
      };

      if (aspectRatio) {
        if (canvasData.height * aspectRatio > canvasData.width) {
          cropBoxData.height = cropBoxData.width / aspectRatio;
        } else {
          cropBoxData.width = cropBoxData.height * aspectRatio;
        }
      }

      this.cropBoxData = cropBoxData;
      this.limitCropBox(true, true); // Initialize auto crop area

      cropBoxData.width = Math.min(Math.max(cropBoxData.width, cropBoxData.minWidth), cropBoxData.maxWidth);
      cropBoxData.height = Math.min(Math.max(cropBoxData.height, cropBoxData.minHeight), cropBoxData.maxHeight); // The width/height of auto crop area must large than "minWidth/Height"

      cropBoxData.width = Math.max(cropBoxData.minWidth, cropBoxData.width * autoCropArea);
      cropBoxData.height = Math.max(cropBoxData.minHeight, cropBoxData.height * autoCropArea);
      cropBoxData.left = canvasData.left + (canvasData.width - cropBoxData.width) / 2;
      cropBoxData.top = canvasData.top + (canvasData.height - cropBoxData.height) / 2;
      cropBoxData.oldLeft = cropBoxData.left;
      cropBoxData.oldTop = cropBoxData.top;
      this.initialCropBoxData = assign({}, cropBoxData);
    },
    limitCropBox: function limitCropBox(sizeLimited, positionLimited) {
      var options = this.options,
          containerData = this.containerData,
          canvasData = this.canvasData,
          cropBoxData = this.cropBoxData,
          limited = this.limited;
      var aspectRatio = options.aspectRatio;

      if (sizeLimited) {
        var minCropBoxWidth = Number(options.minCropBoxWidth) || 0;
        var minCropBoxHeight = Number(options.minCropBoxHeight) || 0;
        var maxCropBoxWidth = limited ? Math.min(containerData.width, canvasData.width, canvasData.width + canvasData.left, containerData.width - canvasData.left) : containerData.width;
        var maxCropBoxHeight = limited ? Math.min(containerData.height, canvasData.height, canvasData.height + canvasData.top, containerData.height - canvasData.top) : containerData.height; // The min/maxCropBoxWidth/Height must be less than container's width/height

        minCropBoxWidth = Math.min(minCropBoxWidth, containerData.width);
        minCropBoxHeight = Math.min(minCropBoxHeight, containerData.height);

        if (aspectRatio) {
          if (minCropBoxWidth && minCropBoxHeight) {
            if (minCropBoxHeight * aspectRatio > minCropBoxWidth) {
              minCropBoxHeight = minCropBoxWidth / aspectRatio;
            } else {
              minCropBoxWidth = minCropBoxHeight * aspectRatio;
            }
          } else if (minCropBoxWidth) {
            minCropBoxHeight = minCropBoxWidth / aspectRatio;
          } else if (minCropBoxHeight) {
            minCropBoxWidth = minCropBoxHeight * aspectRatio;
          }

          if (maxCropBoxHeight * aspectRatio > maxCropBoxWidth) {
            maxCropBoxHeight = maxCropBoxWidth / aspectRatio;
          } else {
            maxCropBoxWidth = maxCropBoxHeight * aspectRatio;
          }
        } // The minWidth/Height must be less than maxWidth/Height


        cropBoxData.minWidth = Math.min(minCropBoxWidth, maxCropBoxWidth);
        cropBoxData.minHeight = Math.min(minCropBoxHeight, maxCropBoxHeight);
        cropBoxData.maxWidth = maxCropBoxWidth;
        cropBoxData.maxHeight = maxCropBoxHeight;
      }

      if (positionLimited) {
        if (limited) {
          cropBoxData.minLeft = Math.max(0, canvasData.left);
          cropBoxData.minTop = Math.max(0, canvasData.top);
          cropBoxData.maxLeft = Math.min(containerData.width, canvasData.left + canvasData.width) - cropBoxData.width;
          cropBoxData.maxTop = Math.min(containerData.height, canvasData.top + canvasData.height) - cropBoxData.height;
        } else {
          cropBoxData.minLeft = 0;
          cropBoxData.minTop = 0;
          cropBoxData.maxLeft = containerData.width - cropBoxData.width;
          cropBoxData.maxTop = containerData.height - cropBoxData.height;
        }
      }
    },
    renderCropBox: function renderCropBox() {
      var options = this.options,
          containerData = this.containerData,
          cropBoxData = this.cropBoxData;

      if (cropBoxData.width > cropBoxData.maxWidth || cropBoxData.width < cropBoxData.minWidth) {
        cropBoxData.left = cropBoxData.oldLeft;
      }

      if (cropBoxData.height > cropBoxData.maxHeight || cropBoxData.height < cropBoxData.minHeight) {
        cropBoxData.top = cropBoxData.oldTop;
      }

      cropBoxData.width = Math.min(Math.max(cropBoxData.width, cropBoxData.minWidth), cropBoxData.maxWidth);
      cropBoxData.height = Math.min(Math.max(cropBoxData.height, cropBoxData.minHeight), cropBoxData.maxHeight);
      this.limitCropBox(false, true);
      cropBoxData.left = Math.min(Math.max(cropBoxData.left, cropBoxData.minLeft), cropBoxData.maxLeft);
      cropBoxData.top = Math.min(Math.max(cropBoxData.top, cropBoxData.minTop), cropBoxData.maxTop);
      cropBoxData.oldLeft = cropBoxData.left;
      cropBoxData.oldTop = cropBoxData.top;

      if (options.movable && options.cropBoxMovable) {
        // Turn to move the canvas when the crop box is equal to the container
        setData(this.face, DATA_ACTION, cropBoxData.width >= containerData.width && cropBoxData.height >= containerData.height ? ACTION_MOVE : ACTION_ALL);
      }

      setStyle(this.cropBox, assign({
        width: cropBoxData.width,
        height: cropBoxData.height
      }, getTransforms({
        translateX: cropBoxData.left,
        translateY: cropBoxData.top
      })));

      if (this.cropped && this.limited) {
        this.limitCanvas(true, true);
      }

      if (!this.disabled) {
        this.output();
      }
    },
    output: function output() {
      this.preview();
      dispatchEvent(this.element, EVENT_CROP, this.getData());
    }
  };

  var preview = {
    initPreview: function initPreview() {
      var element = this.element,
          crossOrigin = this.crossOrigin;
      var preview = this.options.preview;
      var url = crossOrigin ? this.crossOriginUrl : this.url;
      var alt = element.alt || 'The image to preview';
      var image = document.createElement('img');

      if (crossOrigin) {
        image.crossOrigin = crossOrigin;
      }

      image.src = url;
      image.alt = alt;
      this.viewBox.appendChild(image);
      this.viewBoxImage = image;

      if (!preview) {
        return;
      }

      var previews = preview;

      if (typeof preview === 'string') {
        previews = element.ownerDocument.querySelectorAll(preview);
      } else if (preview.querySelector) {
        previews = [preview];
      }

      this.previews = previews;
      forEach(previews, function (el) {
        var img = document.createElement('img'); // Save the original size for recover

        setData(el, DATA_PREVIEW, {
          width: el.offsetWidth,
          height: el.offsetHeight,
          html: el.innerHTML
        });

        if (crossOrigin) {
          img.crossOrigin = crossOrigin;
        }

        img.src = url;
        img.alt = alt;
        /**
         * Override img element styles
         * Add `display:block` to avoid margin top issue
         * Add `height:auto` to override `height` attribute on IE8
         * (Occur only when margin-top <= -height)
         */

        img.style.cssText = 'display:block;' + 'width:100%;' + 'height:auto;' + 'min-width:0!important;' + 'min-height:0!important;' + 'max-width:none!important;' + 'max-height:none!important;' + 'image-orientation:0deg!important;"';
        el.innerHTML = '';
        el.appendChild(img);
      });
    },
    resetPreview: function resetPreview() {
      forEach(this.previews, function (element) {
        var data = getData(element, DATA_PREVIEW);
        setStyle(element, {
          width: data.width,
          height: data.height
        });
        element.innerHTML = data.html;
        removeData(element, DATA_PREVIEW);
      });
    },
    preview: function preview() {
      var imageData = this.imageData,
          canvasData = this.canvasData,
          cropBoxData = this.cropBoxData;
      var cropBoxWidth = cropBoxData.width,
          cropBoxHeight = cropBoxData.height;
      var width = imageData.width,
          height = imageData.height;
      var left = cropBoxData.left - canvasData.left - imageData.left;
      var top = cropBoxData.top - canvasData.top - imageData.top;

      if (!this.cropped || this.disabled) {
        return;
      }

      setStyle(this.viewBoxImage, assign({
        width: width,
        height: height
      }, getTransforms(assign({
        translateX: -left,
        translateY: -top
      }, imageData))));
      forEach(this.previews, function (element) {
        var data = getData(element, DATA_PREVIEW);
        var originalWidth = data.width;
        var originalHeight = data.height;
        var newWidth = originalWidth;
        var newHeight = originalHeight;
        var ratio = 1;

        if (cropBoxWidth) {
          ratio = originalWidth / cropBoxWidth;
          newHeight = cropBoxHeight * ratio;
        }

        if (cropBoxHeight && newHeight > originalHeight) {
          ratio = originalHeight / cropBoxHeight;
          newWidth = cropBoxWidth * ratio;
          newHeight = originalHeight;
        }

        setStyle(element, {
          width: newWidth,
          height: newHeight
        });
        setStyle(element.getElementsByTagName('img')[0], assign({
          width: width * ratio,
          height: height * ratio
        }, getTransforms(assign({
          translateX: -left * ratio,
          translateY: -top * ratio
        }, imageData))));
      });
    }
  };

  var events = {
    bind: function bind() {
      var element = this.element,
          options = this.options,
          cropper = this.cropper;

      if (isFunction(options.cropstart)) {
        addListener(element, EVENT_CROP_START, options.cropstart);
      }

      if (isFunction(options.cropmove)) {
        addListener(element, EVENT_CROP_MOVE, options.cropmove);
      }

      if (isFunction(options.cropend)) {
        addListener(element, EVENT_CROP_END, options.cropend);
      }

      if (isFunction(options.crop)) {
        addListener(element, EVENT_CROP, options.crop);
      }

      if (isFunction(options.zoom)) {
        addListener(element, EVENT_ZOOM, options.zoom);
      }

      addListener(cropper, EVENT_POINTER_DOWN, this.onCropStart = this.cropStart.bind(this));

      if (options.zoomable && options.zoomOnWheel) {
        addListener(cropper, EVENT_WHEEL, this.onWheel = this.wheel.bind(this), {
          passive: false,
          capture: true
        });
      }

      if (options.toggleDragModeOnDblclick) {
        addListener(cropper, EVENT_DBLCLICK, this.onDblclick = this.dblclick.bind(this));
      }

      addListener(element.ownerDocument, EVENT_POINTER_MOVE, this.onCropMove = this.cropMove.bind(this));
      addListener(element.ownerDocument, EVENT_POINTER_UP, this.onCropEnd = this.cropEnd.bind(this));

      if (options.responsive) {
        addListener(window, EVENT_RESIZE, this.onResize = this.resize.bind(this));
      }
    },
    unbind: function unbind() {
      var element = this.element,
          options = this.options,
          cropper = this.cropper;

      if (isFunction(options.cropstart)) {
        removeListener(element, EVENT_CROP_START, options.cropstart);
      }

      if (isFunction(options.cropmove)) {
        removeListener(element, EVENT_CROP_MOVE, options.cropmove);
      }

      if (isFunction(options.cropend)) {
        removeListener(element, EVENT_CROP_END, options.cropend);
      }

      if (isFunction(options.crop)) {
        removeListener(element, EVENT_CROP, options.crop);
      }

      if (isFunction(options.zoom)) {
        removeListener(element, EVENT_ZOOM, options.zoom);
      }

      removeListener(cropper, EVENT_POINTER_DOWN, this.onCropStart);

      if (options.zoomable && options.zoomOnWheel) {
        removeListener(cropper, EVENT_WHEEL, this.onWheel, {
          passive: false,
          capture: true
        });
      }

      if (options.toggleDragModeOnDblclick) {
        removeListener(cropper, EVENT_DBLCLICK, this.onDblclick);
      }

      removeListener(element.ownerDocument, EVENT_POINTER_MOVE, this.onCropMove);
      removeListener(element.ownerDocument, EVENT_POINTER_UP, this.onCropEnd);

      if (options.responsive) {
        removeListener(window, EVENT_RESIZE, this.onResize);
      }
    }
  };

  var handlers = {
    resize: function resize() {
      if (this.disabled) {
        return;
      }

      var options = this.options,
          container = this.container,
          containerData = this.containerData;
      var ratioX = container.offsetWidth / containerData.width;
      var ratioY = container.offsetHeight / containerData.height;
      var ratio = Math.abs(ratioX - 1) > Math.abs(ratioY - 1) ? ratioX : ratioY; // Resize when width changed or height changed

      if (ratio !== 1) {
        var canvasData;
        var cropBoxData;

        if (options.restore) {
          canvasData = this.getCanvasData();
          cropBoxData = this.getCropBoxData();
        }

        this.render();

        if (options.restore) {
          this.setCanvasData(forEach(canvasData, function (n, i) {
            canvasData[i] = n * ratio;
          }));
          this.setCropBoxData(forEach(cropBoxData, function (n, i) {
            cropBoxData[i] = n * ratio;
          }));
        }
      }
    },
    dblclick: function dblclick() {
      if (this.disabled || this.options.dragMode === DRAG_MODE_NONE) {
        return;
      }

      this.setDragMode(hasClass(this.dragBox, CLASS_CROP) ? DRAG_MODE_MOVE : DRAG_MODE_CROP);
    },
    wheel: function wheel(event) {
      var _this = this;

      var ratio = Number(this.options.wheelZoomRatio) || 0.1;
      var delta = 1;

      if (this.disabled) {
        return;
      }

      event.preventDefault(); // Limit wheel speed to prevent zoom too fast (#21)

      if (this.wheeling) {
        return;
      }

      this.wheeling = true;
      setTimeout(function () {
        _this.wheeling = false;
      }, 50);

      if (event.deltaY) {
        delta = event.deltaY > 0 ? 1 : -1;
      } else if (event.wheelDelta) {
        delta = -event.wheelDelta / 120;
      } else if (event.detail) {
        delta = event.detail > 0 ? 1 : -1;
      }

      this.zoom(-delta * ratio, event);
    },
    cropStart: function cropStart(event) {
      var buttons = event.buttons,
          button = event.button;

      if (this.disabled // Handle mouse event and pointer event and ignore touch event
      || (event.type === 'mousedown' || event.type === 'pointerdown' && event.pointerType === 'mouse') && ( // No primary button (Usually the left button)
      isNumber(buttons) && buttons !== 1 || isNumber(button) && button !== 0 // Open context menu
      || event.ctrlKey)) {
        return;
      }

      var options = this.options,
          pointers = this.pointers;
      var action;

      if (event.changedTouches) {
        // Handle touch event
        forEach(event.changedTouches, function (touch) {
          pointers[touch.identifier] = getPointer(touch);
        });
      } else {
        // Handle mouse event and pointer event
        pointers[event.pointerId || 0] = getPointer(event);
      }

      if (Object.keys(pointers).length > 1 && options.zoomable && options.zoomOnTouch) {
        action = ACTION_ZOOM;
      } else {
        action = getData(event.target, DATA_ACTION);
      }

      if (!REGEXP_ACTIONS.test(action)) {
        return;
      }

      if (dispatchEvent(this.element, EVENT_CROP_START, {
        originalEvent: event,
        action: action
      }) === false) {
        return;
      } // This line is required for preventing page zooming in iOS browsers


      event.preventDefault();
      this.action = action;
      this.cropping = false;

      if (action === ACTION_CROP) {
        this.cropping = true;
        addClass(this.dragBox, CLASS_MODAL);
      }
    },
    cropMove: function cropMove(event) {
      var action = this.action;

      if (this.disabled || !action) {
        return;
      }

      var pointers = this.pointers;
      event.preventDefault();

      if (dispatchEvent(this.element, EVENT_CROP_MOVE, {
        originalEvent: event,
        action: action
      }) === false) {
        return;
      }

      if (event.changedTouches) {
        forEach(event.changedTouches, function (touch) {
          // The first parameter should not be undefined (#432)
          assign(pointers[touch.identifier] || {}, getPointer(touch, true));
        });
      } else {
        assign(pointers[event.pointerId || 0] || {}, getPointer(event, true));
      }

      this.change(event);
    },
    cropEnd: function cropEnd(event) {
      if (this.disabled) {
        return;
      }

      var action = this.action,
          pointers = this.pointers;

      if (event.changedTouches) {
        forEach(event.changedTouches, function (touch) {
          delete pointers[touch.identifier];
        });
      } else {
        delete pointers[event.pointerId || 0];
      }

      if (!action) {
        return;
      }

      event.preventDefault();

      if (!Object.keys(pointers).length) {
        this.action = '';
      }

      if (this.cropping) {
        this.cropping = false;
        toggleClass(this.dragBox, CLASS_MODAL, this.cropped && this.options.modal);
      }

      dispatchEvent(this.element, EVENT_CROP_END, {
        originalEvent: event,
        action: action
      });
    }
  };

  var change = {
    change: function change(event) {
      var options = this.options,
          canvasData = this.canvasData,
          containerData = this.containerData,
          cropBoxData = this.cropBoxData,
          pointers = this.pointers;
      var action = this.action;
      var aspectRatio = options.aspectRatio;
      var left = cropBoxData.left,
          top = cropBoxData.top,
          width = cropBoxData.width,
          height = cropBoxData.height;
      var right = left + width;
      var bottom = top + height;
      var minLeft = 0;
      var minTop = 0;
      var maxWidth = containerData.width;
      var maxHeight = containerData.height;
      var renderable = true;
      var offset; // Locking aspect ratio in "free mode" by holding shift key

      if (!aspectRatio && event.shiftKey) {
        aspectRatio = width && height ? width / height : 1;
      }

      if (this.limited) {
        minLeft = cropBoxData.minLeft;
        minTop = cropBoxData.minTop;
        maxWidth = minLeft + Math.min(containerData.width, canvasData.width, canvasData.left + canvasData.width);
        maxHeight = minTop + Math.min(containerData.height, canvasData.height, canvasData.top + canvasData.height);
      }

      var pointer = pointers[Object.keys(pointers)[0]];
      var range = {
        x: pointer.endX - pointer.startX,
        y: pointer.endY - pointer.startY
      };

      var check = function check(side) {
        switch (side) {
          case ACTION_EAST:
            if (right + range.x > maxWidth) {
              range.x = maxWidth - right;
            }

            break;

          case ACTION_WEST:
            if (left + range.x < minLeft) {
              range.x = minLeft - left;
            }

            break;

          case ACTION_NORTH:
            if (top + range.y < minTop) {
              range.y = minTop - top;
            }

            break;

          case ACTION_SOUTH:
            if (bottom + range.y > maxHeight) {
              range.y = maxHeight - bottom;
            }

            break;
        }
      };

      switch (action) {
        // Move crop box
        case ACTION_ALL:
          left += range.x;
          top += range.y;
          break;
        // Resize crop box

        case ACTION_EAST:
          if (range.x >= 0 && (right >= maxWidth || aspectRatio && (top <= minTop || bottom >= maxHeight))) {
            renderable = false;
            break;
          }

          check(ACTION_EAST);
          width += range.x;

          if (width < 0) {
            action = ACTION_WEST;
            width = -width;
            left -= width;
          }

          if (aspectRatio) {
            height = width / aspectRatio;
            top += (cropBoxData.height - height) / 2;
          }

          break;

        case ACTION_NORTH:
          if (range.y <= 0 && (top <= minTop || aspectRatio && (left <= minLeft || right >= maxWidth))) {
            renderable = false;
            break;
          }

          check(ACTION_NORTH);
          height -= range.y;
          top += range.y;

          if (height < 0) {
            action = ACTION_SOUTH;
            height = -height;
            top -= height;
          }

          if (aspectRatio) {
            width = height * aspectRatio;
            left += (cropBoxData.width - width) / 2;
          }

          break;

        case ACTION_WEST:
          if (range.x <= 0 && (left <= minLeft || aspectRatio && (top <= minTop || bottom >= maxHeight))) {
            renderable = false;
            break;
          }

          check(ACTION_WEST);
          width -= range.x;
          left += range.x;

          if (width < 0) {
            action = ACTION_EAST;
            width = -width;
            left -= width;
          }

          if (aspectRatio) {
            height = width / aspectRatio;
            top += (cropBoxData.height - height) / 2;
          }

          break;

        case ACTION_SOUTH:
          if (range.y >= 0 && (bottom >= maxHeight || aspectRatio && (left <= minLeft || right >= maxWidth))) {
            renderable = false;
            break;
          }

          check(ACTION_SOUTH);
          height += range.y;

          if (height < 0) {
            action = ACTION_NORTH;
            height = -height;
            top -= height;
          }

          if (aspectRatio) {
            width = height * aspectRatio;
            left += (cropBoxData.width - width) / 2;
          }

          break;

        case ACTION_NORTH_EAST:
          if (aspectRatio) {
            if (range.y <= 0 && (top <= minTop || right >= maxWidth)) {
              renderable = false;
              break;
            }

            check(ACTION_NORTH);
            height -= range.y;
            top += range.y;
            width = height * aspectRatio;
          } else {
            check(ACTION_NORTH);
            check(ACTION_EAST);

            if (range.x >= 0) {
              if (right < maxWidth) {
                width += range.x;
              } else if (range.y <= 0 && top <= minTop) {
                renderable = false;
              }
            } else {
              width += range.x;
            }

            if (range.y <= 0) {
              if (top > minTop) {
                height -= range.y;
                top += range.y;
              }
            } else {
              height -= range.y;
              top += range.y;
            }
          }

          if (width < 0 && height < 0) {
            action = ACTION_SOUTH_WEST;
            height = -height;
            width = -width;
            top -= height;
            left -= width;
          } else if (width < 0) {
            action = ACTION_NORTH_WEST;
            width = -width;
            left -= width;
          } else if (height < 0) {
            action = ACTION_SOUTH_EAST;
            height = -height;
            top -= height;
          }

          break;

        case ACTION_NORTH_WEST:
          if (aspectRatio) {
            if (range.y <= 0 && (top <= minTop || left <= minLeft)) {
              renderable = false;
              break;
            }

            check(ACTION_NORTH);
            height -= range.y;
            top += range.y;
            width = height * aspectRatio;
            left += cropBoxData.width - width;
          } else {
            check(ACTION_NORTH);
            check(ACTION_WEST);

            if (range.x <= 0) {
              if (left > minLeft) {
                width -= range.x;
                left += range.x;
              } else if (range.y <= 0 && top <= minTop) {
                renderable = false;
              }
            } else {
              width -= range.x;
              left += range.x;
            }

            if (range.y <= 0) {
              if (top > minTop) {
                height -= range.y;
                top += range.y;
              }
            } else {
              height -= range.y;
              top += range.y;
            }
          }

          if (width < 0 && height < 0) {
            action = ACTION_SOUTH_EAST;
            height = -height;
            width = -width;
            top -= height;
            left -= width;
          } else if (width < 0) {
            action = ACTION_NORTH_EAST;
            width = -width;
            left -= width;
          } else if (height < 0) {
            action = ACTION_SOUTH_WEST;
            height = -height;
            top -= height;
          }

          break;

        case ACTION_SOUTH_WEST:
          if (aspectRatio) {
            if (range.x <= 0 && (left <= minLeft || bottom >= maxHeight)) {
              renderable = false;
              break;
            }

            check(ACTION_WEST);
            width -= range.x;
            left += range.x;
            height = width / aspectRatio;
          } else {
            check(ACTION_SOUTH);
            check(ACTION_WEST);

            if (range.x <= 0) {
              if (left > minLeft) {
                width -= range.x;
                left += range.x;
              } else if (range.y >= 0 && bottom >= maxHeight) {
                renderable = false;
              }
            } else {
              width -= range.x;
              left += range.x;
            }

            if (range.y >= 0) {
              if (bottom < maxHeight) {
                height += range.y;
              }
            } else {
              height += range.y;
            }
          }

          if (width < 0 && height < 0) {
            action = ACTION_NORTH_EAST;
            height = -height;
            width = -width;
            top -= height;
            left -= width;
          } else if (width < 0) {
            action = ACTION_SOUTH_EAST;
            width = -width;
            left -= width;
          } else if (height < 0) {
            action = ACTION_NORTH_WEST;
            height = -height;
            top -= height;
          }

          break;

        case ACTION_SOUTH_EAST:
          if (aspectRatio) {
            if (range.x >= 0 && (right >= maxWidth || bottom >= maxHeight)) {
              renderable = false;
              break;
            }

            check(ACTION_EAST);
            width += range.x;
            height = width / aspectRatio;
          } else {
            check(ACTION_SOUTH);
            check(ACTION_EAST);

            if (range.x >= 0) {
              if (right < maxWidth) {
                width += range.x;
              } else if (range.y >= 0 && bottom >= maxHeight) {
                renderable = false;
              }
            } else {
              width += range.x;
            }

            if (range.y >= 0) {
              if (bottom < maxHeight) {
                height += range.y;
              }
            } else {
              height += range.y;
            }
          }

          if (width < 0 && height < 0) {
            action = ACTION_NORTH_WEST;
            height = -height;
            width = -width;
            top -= height;
            left -= width;
          } else if (width < 0) {
            action = ACTION_SOUTH_WEST;
            width = -width;
            left -= width;
          } else if (height < 0) {
            action = ACTION_NORTH_EAST;
            height = -height;
            top -= height;
          }

          break;
        // Move canvas

        case ACTION_MOVE:
          this.move(range.x, range.y);
          renderable = false;
          break;
        // Zoom canvas

        case ACTION_ZOOM:
          this.zoom(getMaxZoomRatio(pointers), event);
          renderable = false;
          break;
        // Create crop box

        case ACTION_CROP:
          if (!range.x || !range.y) {
            renderable = false;
            break;
          }

          offset = getOffset(this.cropper);
          left = pointer.startX - offset.left;
          top = pointer.startY - offset.top;
          width = cropBoxData.minWidth;
          height = cropBoxData.minHeight;

          if (range.x > 0) {
            action = range.y > 0 ? ACTION_SOUTH_EAST : ACTION_NORTH_EAST;
          } else if (range.x < 0) {
            left -= width;
            action = range.y > 0 ? ACTION_SOUTH_WEST : ACTION_NORTH_WEST;
          }

          if (range.y < 0) {
            top -= height;
          } // Show the crop box if is hidden


          if (!this.cropped) {
            removeClass(this.cropBox, CLASS_HIDDEN);
            this.cropped = true;

            if (this.limited) {
              this.limitCropBox(true, true);
            }
          }

          break;
      }

      if (renderable) {
        cropBoxData.width = width;
        cropBoxData.height = height;
        cropBoxData.left = left;
        cropBoxData.top = top;
        this.action = action;
        this.renderCropBox();
      } // Override


      forEach(pointers, function (p) {
        p.startX = p.endX;
        p.startY = p.endY;
      });
    }
  };

  var methods = {
    // Show the crop box manually
    crop: function crop() {
      if (this.ready && !this.cropped && !this.disabled) {
        this.cropped = true;
        this.limitCropBox(true, true);

        if (this.options.modal) {
          addClass(this.dragBox, CLASS_MODAL);
        }

        removeClass(this.cropBox, CLASS_HIDDEN);
        this.setCropBoxData(this.initialCropBoxData);
      }

      return this;
    },
    // Reset the image and crop box to their initial states
    reset: function reset() {
      if (this.ready && !this.disabled) {
        this.imageData = assign({}, this.initialImageData);
        this.canvasData = assign({}, this.initialCanvasData);
        this.cropBoxData = assign({}, this.initialCropBoxData);
        this.renderCanvas();

        if (this.cropped) {
          this.renderCropBox();
        }
      }

      return this;
    },
    // Clear the crop box
    clear: function clear() {
      if (this.cropped && !this.disabled) {
        assign(this.cropBoxData, {
          left: 0,
          top: 0,
          width: 0,
          height: 0
        });
        this.cropped = false;
        this.renderCropBox();
        this.limitCanvas(true, true); // Render canvas after crop box rendered

        this.renderCanvas();
        removeClass(this.dragBox, CLASS_MODAL);
        addClass(this.cropBox, CLASS_HIDDEN);
      }

      return this;
    },

    /**
     * Replace the image's src and rebuild the cropper
     * @param {string} url - The new URL.
     * @param {boolean} [hasSameSize] - Indicate if the new image has the same size as the old one.
     * @returns {Cropper} this
     */
    replace: function replace(url) {
      var hasSameSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (!this.disabled && url) {
        if (this.isImg) {
          this.element.src = url;
        }

        if (hasSameSize) {
          this.url = url;
          this.image.src = url;

          if (this.ready) {
            this.viewBoxImage.src = url;
            forEach(this.previews, function (element) {
              element.getElementsByTagName('img')[0].src = url;
            });
          }
        } else {
          if (this.isImg) {
            this.replaced = true;
          }

          this.options.data = null;
          this.uncreate();
          this.load(url);
        }
      }

      return this;
    },
    // Enable (unfreeze) the cropper
    enable: function enable() {
      if (this.ready && this.disabled) {
        this.disabled = false;
        removeClass(this.cropper, CLASS_DISABLED);
      }

      return this;
    },
    // Disable (freeze) the cropper
    disable: function disable() {
      if (this.ready && !this.disabled) {
        this.disabled = true;
        addClass(this.cropper, CLASS_DISABLED);
      }

      return this;
    },

    /**
     * Destroy the cropper and remove the instance from the image
     * @returns {Cropper} this
     */
    destroy: function destroy() {
      var element = this.element;

      if (!element[NAMESPACE]) {
        return this;
      }

      element[NAMESPACE] = undefined;

      if (this.isImg && this.replaced) {
        element.src = this.originalUrl;
      }

      this.uncreate();
      return this;
    },

    /**
     * Move the canvas with relative offsets
     * @param {number} offsetX - The relative offset distance on the x-axis.
     * @param {number} [offsetY=offsetX] - The relative offset distance on the y-axis.
     * @returns {Cropper} this
     */
    move: function move(offsetX) {
      var offsetY = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : offsetX;
      var _this$canvasData = this.canvasData,
          left = _this$canvasData.left,
          top = _this$canvasData.top;
      return this.moveTo(isUndefined(offsetX) ? offsetX : left + Number(offsetX), isUndefined(offsetY) ? offsetY : top + Number(offsetY));
    },

    /**
     * Move the canvas to an absolute point
     * @param {number} x - The x-axis coordinate.
     * @param {number} [y=x] - The y-axis coordinate.
     * @returns {Cropper} this
     */
    moveTo: function moveTo(x) {
      var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : x;
      var canvasData = this.canvasData;
      var changed = false;
      x = Number(x);
      y = Number(y);

      if (this.ready && !this.disabled && this.options.movable) {
        if (isNumber(x)) {
          canvasData.left = x;
          changed = true;
        }

        if (isNumber(y)) {
          canvasData.top = y;
          changed = true;
        }

        if (changed) {
          this.renderCanvas(true);
        }
      }

      return this;
    },

    /**
     * Zoom the canvas with a relative ratio
     * @param {number} ratio - The target ratio.
     * @param {Event} _originalEvent - The original event if any.
     * @returns {Cropper} this
     */
    zoom: function zoom(ratio, _originalEvent) {
      var canvasData = this.canvasData;
      ratio = Number(ratio);

      if (ratio < 0) {
        ratio = 1 / (1 - ratio);
      } else {
        ratio = 1 + ratio;
      }

      return this.zoomTo(canvasData.width * ratio / canvasData.naturalWidth, null, _originalEvent);
    },

    /**
     * Zoom the canvas to an absolute ratio
     * @param {number} ratio - The target ratio.
     * @param {Object} pivot - The zoom pivot point coordinate.
     * @param {Event} _originalEvent - The original event if any.
     * @returns {Cropper} this
     */
    zoomTo: function zoomTo(ratio, pivot, _originalEvent) {
      var options = this.options,
          canvasData = this.canvasData;
      var width = canvasData.width,
          height = canvasData.height,
          naturalWidth = canvasData.naturalWidth,
          naturalHeight = canvasData.naturalHeight;
      ratio = Number(ratio);

      if (ratio >= 0 && this.ready && !this.disabled && options.zoomable) {
        var newWidth = naturalWidth * ratio;
        var newHeight = naturalHeight * ratio;

        if (dispatchEvent(this.element, EVENT_ZOOM, {
          ratio: ratio,
          oldRatio: width / naturalWidth,
          originalEvent: _originalEvent
        }) === false) {
          return this;
        }

        if (_originalEvent) {
          var pointers = this.pointers;
          var offset = getOffset(this.cropper);
          var center = pointers && Object.keys(pointers).length ? getPointersCenter(pointers) : {
            pageX: _originalEvent.pageX,
            pageY: _originalEvent.pageY
          }; // Zoom from the triggering point of the event

          canvasData.left -= (newWidth - width) * ((center.pageX - offset.left - canvasData.left) / width);
          canvasData.top -= (newHeight - height) * ((center.pageY - offset.top - canvasData.top) / height);
        } else if (isPlainObject(pivot) && isNumber(pivot.x) && isNumber(pivot.y)) {
          canvasData.left -= (newWidth - width) * ((pivot.x - canvasData.left) / width);
          canvasData.top -= (newHeight - height) * ((pivot.y - canvasData.top) / height);
        } else {
          // Zoom from the center of the canvas
          canvasData.left -= (newWidth - width) / 2;
          canvasData.top -= (newHeight - height) / 2;
        }

        canvasData.width = newWidth;
        canvasData.height = newHeight;
        this.renderCanvas(true);
      }

      return this;
    },

    /**
     * Rotate the canvas with a relative degree
     * @param {number} degree - The rotate degree.
     * @returns {Cropper} this
     */
    rotate: function rotate(degree) {
      return this.rotateTo((this.imageData.rotate || 0) + Number(degree));
    },

    /**
     * Rotate the canvas to an absolute degree
     * @param {number} degree - The rotate degree.
     * @returns {Cropper} this
     */
    rotateTo: function rotateTo(degree) {
      degree = Number(degree);

      if (isNumber(degree) && this.ready && !this.disabled && this.options.rotatable) {
        this.imageData.rotate = degree % 360;
        this.renderCanvas(true, true);
      }

      return this;
    },

    /**
     * Scale the image on the x-axis.
     * @param {number} scaleX - The scale ratio on the x-axis.
     * @returns {Cropper} this
     */
    scaleX: function scaleX(_scaleX) {
      var scaleY = this.imageData.scaleY;
      return this.scale(_scaleX, isNumber(scaleY) ? scaleY : 1);
    },

    /**
     * Scale the image on the y-axis.
     * @param {number} scaleY - The scale ratio on the y-axis.
     * @returns {Cropper} this
     */
    scaleY: function scaleY(_scaleY) {
      var scaleX = this.imageData.scaleX;
      return this.scale(isNumber(scaleX) ? scaleX : 1, _scaleY);
    },

    /**
     * Scale the image
     * @param {number} scaleX - The scale ratio on the x-axis.
     * @param {number} [scaleY=scaleX] - The scale ratio on the y-axis.
     * @returns {Cropper} this
     */
    scale: function scale(scaleX) {
      var scaleY = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : scaleX;
      var imageData = this.imageData;
      var transformed = false;
      scaleX = Number(scaleX);
      scaleY = Number(scaleY);

      if (this.ready && !this.disabled && this.options.scalable) {
        if (isNumber(scaleX)) {
          imageData.scaleX = scaleX;
          transformed = true;
        }

        if (isNumber(scaleY)) {
          imageData.scaleY = scaleY;
          transformed = true;
        }

        if (transformed) {
          this.renderCanvas(true, true);
        }
      }

      return this;
    },

    /**
     * Get the cropped area position and size data (base on the original image)
     * @param {boolean} [rounded=false] - Indicate if round the data values or not.
     * @returns {Object} The result cropped data.
     */
    getData: function getData() {
      var rounded = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var options = this.options,
          imageData = this.imageData,
          canvasData = this.canvasData,
          cropBoxData = this.cropBoxData;
      var data;

      if (this.ready && this.cropped) {
        data = {
          x: cropBoxData.left - canvasData.left,
          y: cropBoxData.top - canvasData.top,
          width: cropBoxData.width,
          height: cropBoxData.height
        };
        var ratio = imageData.width / imageData.naturalWidth;
        forEach(data, function (n, i) {
          data[i] = n / ratio;
        });

        if (rounded) {
          // In case rounding off leads to extra 1px in right or bottom border
          // we should round the top-left corner and the dimension (#343).
          var bottom = Math.round(data.y + data.height);
          var right = Math.round(data.x + data.width);
          data.x = Math.round(data.x);
          data.y = Math.round(data.y);
          data.width = right - data.x;
          data.height = bottom - data.y;
        }
      } else {
        data = {
          x: 0,
          y: 0,
          width: 0,
          height: 0
        };
      }

      if (options.rotatable) {
        data.rotate = imageData.rotate || 0;
      }

      if (options.scalable) {
        data.scaleX = imageData.scaleX || 1;
        data.scaleY = imageData.scaleY || 1;
      }

      return data;
    },

    /**
     * Set the cropped area position and size with new data
     * @param {Object} data - The new data.
     * @returns {Cropper} this
     */
    setData: function setData(data) {
      var options = this.options,
          imageData = this.imageData,
          canvasData = this.canvasData;
      var cropBoxData = {};

      if (this.ready && !this.disabled && isPlainObject(data)) {
        var transformed = false;

        if (options.rotatable) {
          if (isNumber(data.rotate) && data.rotate !== imageData.rotate) {
            imageData.rotate = data.rotate;
            transformed = true;
          }
        }

        if (options.scalable) {
          if (isNumber(data.scaleX) && data.scaleX !== imageData.scaleX) {
            imageData.scaleX = data.scaleX;
            transformed = true;
          }

          if (isNumber(data.scaleY) && data.scaleY !== imageData.scaleY) {
            imageData.scaleY = data.scaleY;
            transformed = true;
          }
        }

        if (transformed) {
          this.renderCanvas(true, true);
        }

        var ratio = imageData.width / imageData.naturalWidth;

        if (isNumber(data.x)) {
          cropBoxData.left = data.x * ratio + canvasData.left;
        }

        if (isNumber(data.y)) {
          cropBoxData.top = data.y * ratio + canvasData.top;
        }

        if (isNumber(data.width)) {
          cropBoxData.width = data.width * ratio;
        }

        if (isNumber(data.height)) {
          cropBoxData.height = data.height * ratio;
        }

        this.setCropBoxData(cropBoxData);
      }

      return this;
    },

    /**
     * Get the container size data.
     * @returns {Object} The result container data.
     */
    getContainerData: function getContainerData() {
      return this.ready ? assign({}, this.containerData) : {};
    },

    /**
     * Get the image position and size data.
     * @returns {Object} The result image data.
     */
    getImageData: function getImageData() {
      return this.sized ? assign({}, this.imageData) : {};
    },

    /**
     * Get the canvas position and size data.
     * @returns {Object} The result canvas data.
     */
    getCanvasData: function getCanvasData() {
      var canvasData = this.canvasData;
      var data = {};

      if (this.ready) {
        forEach(['left', 'top', 'width', 'height', 'naturalWidth', 'naturalHeight'], function (n) {
          data[n] = canvasData[n];
        });
      }

      return data;
    },

    /**
     * Set the canvas position and size with new data.
     * @param {Object} data - The new canvas data.
     * @returns {Cropper} this
     */
    setCanvasData: function setCanvasData(data) {
      var canvasData = this.canvasData;
      var aspectRatio = canvasData.aspectRatio;

      if (this.ready && !this.disabled && isPlainObject(data)) {
        if (isNumber(data.left)) {
          canvasData.left = data.left;
        }

        if (isNumber(data.top)) {
          canvasData.top = data.top;
        }

        if (isNumber(data.width)) {
          canvasData.width = data.width;
          canvasData.height = data.width / aspectRatio;
        } else if (isNumber(data.height)) {
          canvasData.height = data.height;
          canvasData.width = data.height * aspectRatio;
        }

        this.renderCanvas(true);
      }

      return this;
    },

    /**
     * Get the crop box position and size data.
     * @returns {Object} The result crop box data.
     */
    getCropBoxData: function getCropBoxData() {
      var cropBoxData = this.cropBoxData;
      var data;

      if (this.ready && this.cropped) {
        data = {
          left: cropBoxData.left,
          top: cropBoxData.top,
          width: cropBoxData.width,
          height: cropBoxData.height
        };
      }

      return data || {};
    },

    /**
     * Set the crop box position and size with new data.
     * @param {Object} data - The new crop box data.
     * @returns {Cropper} this
     */
    setCropBoxData: function setCropBoxData(data) {
      var cropBoxData = this.cropBoxData;
      var aspectRatio = this.options.aspectRatio;
      var widthChanged;
      var heightChanged;

      if (this.ready && this.cropped && !this.disabled && isPlainObject(data)) {
        if (isNumber(data.left)) {
          cropBoxData.left = data.left;
        }

        if (isNumber(data.top)) {
          cropBoxData.top = data.top;
        }

        if (isNumber(data.width) && data.width !== cropBoxData.width) {
          widthChanged = true;
          cropBoxData.width = data.width;
        }

        if (isNumber(data.height) && data.height !== cropBoxData.height) {
          heightChanged = true;
          cropBoxData.height = data.height;
        }

        if (aspectRatio) {
          if (widthChanged) {
            cropBoxData.height = cropBoxData.width / aspectRatio;
          } else if (heightChanged) {
            cropBoxData.width = cropBoxData.height * aspectRatio;
          }
        }

        this.renderCropBox();
      }

      return this;
    },

    /**
     * Get a canvas drawn the cropped image.
     * @param {Object} [options={}] - The config options.
     * @returns {HTMLCanvasElement} - The result canvas.
     */
    getCroppedCanvas: function getCroppedCanvas() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (!this.ready || !window.HTMLCanvasElement) {
        return null;
      }

      var canvasData = this.canvasData;
      var source = getSourceCanvas(this.image, this.imageData, canvasData, options); // Returns the source canvas if it is not cropped.

      if (!this.cropped) {
        return source;
      }

      var _this$getData = this.getData(),
          initialX = _this$getData.x,
          initialY = _this$getData.y,
          initialWidth = _this$getData.width,
          initialHeight = _this$getData.height;

      var ratio = source.width / Math.floor(canvasData.naturalWidth);

      if (ratio !== 1) {
        initialX *= ratio;
        initialY *= ratio;
        initialWidth *= ratio;
        initialHeight *= ratio;
      }

      var aspectRatio = initialWidth / initialHeight;
      var maxSizes = getAdjustedSizes({
        aspectRatio: aspectRatio,
        width: options.maxWidth || Infinity,
        height: options.maxHeight || Infinity
      });
      var minSizes = getAdjustedSizes({
        aspectRatio: aspectRatio,
        width: options.minWidth || 0,
        height: options.minHeight || 0
      }, 'cover');

      var _getAdjustedSizes = getAdjustedSizes({
        aspectRatio: aspectRatio,
        width: options.width || (ratio !== 1 ? source.width : initialWidth),
        height: options.height || (ratio !== 1 ? source.height : initialHeight)
      }),
          width = _getAdjustedSizes.width,
          height = _getAdjustedSizes.height;

      width = Math.min(maxSizes.width, Math.max(minSizes.width, width));
      height = Math.min(maxSizes.height, Math.max(minSizes.height, height));
      var canvas = document.createElement('canvas');
      var context = canvas.getContext('2d');
      canvas.width = normalizeDecimalNumber(width);
      canvas.height = normalizeDecimalNumber(height);
      context.fillStyle = options.fillColor || 'transparent';
      context.fillRect(0, 0, width, height);
      var _options$imageSmoothi = options.imageSmoothingEnabled,
          imageSmoothingEnabled = _options$imageSmoothi === void 0 ? true : _options$imageSmoothi,
          imageSmoothingQuality = options.imageSmoothingQuality;
      context.imageSmoothingEnabled = imageSmoothingEnabled;

      if (imageSmoothingQuality) {
        context.imageSmoothingQuality = imageSmoothingQuality;
      } // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D.drawImage


      var sourceWidth = source.width;
      var sourceHeight = source.height; // Source canvas parameters

      var srcX = initialX;
      var srcY = initialY;
      var srcWidth;
      var srcHeight; // Destination canvas parameters

      var dstX;
      var dstY;
      var dstWidth;
      var dstHeight;

      if (srcX <= -initialWidth || srcX > sourceWidth) {
        srcX = 0;
        srcWidth = 0;
        dstX = 0;
        dstWidth = 0;
      } else if (srcX <= 0) {
        dstX = -srcX;
        srcX = 0;
        srcWidth = Math.min(sourceWidth, initialWidth + srcX);
        dstWidth = srcWidth;
      } else if (srcX <= sourceWidth) {
        dstX = 0;
        srcWidth = Math.min(initialWidth, sourceWidth - srcX);
        dstWidth = srcWidth;
      }

      if (srcWidth <= 0 || srcY <= -initialHeight || srcY > sourceHeight) {
        srcY = 0;
        srcHeight = 0;
        dstY = 0;
        dstHeight = 0;
      } else if (srcY <= 0) {
        dstY = -srcY;
        srcY = 0;
        srcHeight = Math.min(sourceHeight, initialHeight + srcY);
        dstHeight = srcHeight;
      } else if (srcY <= sourceHeight) {
        dstY = 0;
        srcHeight = Math.min(initialHeight, sourceHeight - srcY);
        dstHeight = srcHeight;
      }

      var params = [srcX, srcY, srcWidth, srcHeight]; // Avoid "IndexSizeError"

      if (dstWidth > 0 && dstHeight > 0) {
        var scale = width / initialWidth;
        params.push(dstX * scale, dstY * scale, dstWidth * scale, dstHeight * scale);
      } // All the numerical parameters should be integer for `drawImage`
      // https://github.com/fengyuanchen/cropper/issues/476


      context.drawImage.apply(context, [source].concat(_toConsumableArray(params.map(function (param) {
        return Math.floor(normalizeDecimalNumber(param));
      }))));
      return canvas;
    },

    /**
     * Change the aspect ratio of the crop box.
     * @param {number} aspectRatio - The new aspect ratio.
     * @returns {Cropper} this
     */
    setAspectRatio: function setAspectRatio(aspectRatio) {
      var options = this.options;

      if (!this.disabled && !isUndefined(aspectRatio)) {
        // 0 -> NaN
        options.aspectRatio = Math.max(0, aspectRatio) || NaN;

        if (this.ready) {
          this.initCropBox();

          if (this.cropped) {
            this.renderCropBox();
          }
        }
      }

      return this;
    },

    /**
     * Change the drag mode.
     * @param {string} mode - The new drag mode.
     * @returns {Cropper} this
     */
    setDragMode: function setDragMode(mode) {
      var options = this.options,
          dragBox = this.dragBox,
          face = this.face;

      if (this.ready && !this.disabled) {
        var croppable = mode === DRAG_MODE_CROP;
        var movable = options.movable && mode === DRAG_MODE_MOVE;
        mode = croppable || movable ? mode : DRAG_MODE_NONE;
        options.dragMode = mode;
        setData(dragBox, DATA_ACTION, mode);
        toggleClass(dragBox, CLASS_CROP, croppable);
        toggleClass(dragBox, CLASS_MOVE, movable);

        if (!options.cropBoxMovable) {
          // Sync drag mode to crop box when it is not movable
          setData(face, DATA_ACTION, mode);
          toggleClass(face, CLASS_CROP, croppable);
          toggleClass(face, CLASS_MOVE, movable);
        }
      }

      return this;
    }
  };

  var AnotherCropper = WINDOW.Cropper;

  var Cropper = /*#__PURE__*/function () {
    /**
     * Create a new Cropper.
     * @param {Element} element - The target element for cropping.
     * @param {Object} [options={}] - The configuration options.
     */
    function Cropper(element) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, Cropper);

      if (!element || !REGEXP_TAG_NAME.test(element.tagName)) {
        throw new Error('The first argument is required and must be an <img> or <canvas> element.');
      }

      this.element = element;
      this.options = assign({}, DEFAULTS, isPlainObject(options) && options);
      this.cropped = false;
      this.disabled = false;
      this.pointers = {};
      this.ready = false;
      this.reloading = false;
      this.replaced = false;
      this.sized = false;
      this.sizing = false;
      this.init();
    }

    _createClass(Cropper, [{
      key: "init",
      value: function init() {
        var element = this.element;
        var tagName = element.tagName.toLowerCase();
        var url;

        if (element[NAMESPACE]) {
          return;
        }

        element[NAMESPACE] = this;

        if (tagName === 'img') {
          this.isImg = true; // e.g.: "img/picture.jpg"

          url = element.getAttribute('src') || '';
          this.originalUrl = url; // Stop when it's a blank image

          if (!url) {
            return;
          } // e.g.: "https://example.com/img/picture.jpg"


          url = element.src;
        } else if (tagName === 'canvas' && window.HTMLCanvasElement) {
          url = element.toDataURL();
        }

        this.load(url);
      }
    }, {
      key: "load",
      value: function load(url) {
        var _this = this;

        if (!url) {
          return;
        }

        this.url = url;
        this.imageData = {};
        var element = this.element,
            options = this.options;

        if (!options.rotatable && !options.scalable) {
          options.checkOrientation = false;
        } // Only IE10+ supports Typed Arrays


        if (!options.checkOrientation || !window.ArrayBuffer) {
          this.clone();
          return;
        } // Detect the mime type of the image directly if it is a Data URL


        if (REGEXP_DATA_URL.test(url)) {
          // Read ArrayBuffer from Data URL of JPEG images directly for better performance
          if (REGEXP_DATA_URL_JPEG.test(url)) {
            this.read(dataURLToArrayBuffer(url));
          } else {
            // Only a JPEG image may contains Exif Orientation information,
            // the rest types of Data URLs are not necessary to check orientation at all.
            this.clone();
          }

          return;
        } // 1. Detect the mime type of the image by a XMLHttpRequest.
        // 2. Load the image as ArrayBuffer for reading orientation if its a JPEG image.


        var xhr = new XMLHttpRequest();
        var clone = this.clone.bind(this);
        this.reloading = true;
        this.xhr = xhr; // 1. Cross origin requests are only supported for protocol schemes:
        // http, https, data, chrome, chrome-extension.
        // 2. Access to XMLHttpRequest from a Data URL will be blocked by CORS policy
        // in some browsers as IE11 and Safari.

        xhr.onabort = clone;
        xhr.onerror = clone;
        xhr.ontimeout = clone;

        xhr.onprogress = function () {
          // Abort the request directly if it not a JPEG image for better performance
          if (xhr.getResponseHeader('content-type') !== MIME_TYPE_JPEG) {
            xhr.abort();
          }
        };

        xhr.onload = function () {
          _this.read(xhr.response);
        };

        xhr.onloadend = function () {
          _this.reloading = false;
          _this.xhr = null;
        }; // Bust cache when there is a "crossOrigin" property to avoid browser cache error


        if (options.checkCrossOrigin && isCrossOriginURL(url) && element.crossOrigin) {
          url = addTimestamp(url);
        } // The third parameter is required for avoiding side-effect (#682)


        xhr.open('GET', url, true);
        xhr.responseType = 'arraybuffer';
        xhr.withCredentials = element.crossOrigin === 'use-credentials';
        xhr.send();
      }
    }, {
      key: "read",
      value: function read(arrayBuffer) {
        var options = this.options,
            imageData = this.imageData; // Reset the orientation value to its default value 1
        // as some iOS browsers will render image with its orientation

        var orientation = resetAndGetOrientation(arrayBuffer);
        var rotate = 0;
        var scaleX = 1;
        var scaleY = 1;

        if (orientation > 1) {
          // Generate a new URL which has the default orientation value
          this.url = arrayBufferToDataURL(arrayBuffer, MIME_TYPE_JPEG);

          var _parseOrientation = parseOrientation(orientation);

          rotate = _parseOrientation.rotate;
          scaleX = _parseOrientation.scaleX;
          scaleY = _parseOrientation.scaleY;
        }

        if (options.rotatable) {
          imageData.rotate = rotate;
        }

        if (options.scalable) {
          imageData.scaleX = scaleX;
          imageData.scaleY = scaleY;
        }

        this.clone();
      }
    }, {
      key: "clone",
      value: function clone() {
        var element = this.element,
            url = this.url;
        var crossOrigin = element.crossOrigin;
        var crossOriginUrl = url;

        if (this.options.checkCrossOrigin && isCrossOriginURL(url)) {
          if (!crossOrigin) {
            crossOrigin = 'anonymous';
          } // Bust cache when there is not a "crossOrigin" property (#519)


          crossOriginUrl = addTimestamp(url);
        }

        this.crossOrigin = crossOrigin;
        this.crossOriginUrl = crossOriginUrl;
        var image = document.createElement('img');

        if (crossOrigin) {
          image.crossOrigin = crossOrigin;
        }

        image.src = crossOriginUrl || url;
        image.alt = element.alt || 'The image to crop';
        this.image = image;
        image.onload = this.start.bind(this);
        image.onerror = this.stop.bind(this);
        addClass(image, CLASS_HIDE);
        element.parentNode.insertBefore(image, element.nextSibling);
      }
    }, {
      key: "start",
      value: function start() {
        var _this2 = this;

        var image = this.image;
        image.onload = null;
        image.onerror = null;
        this.sizing = true; // Match all browsers that use WebKit as the layout engine in iOS devices,
        // such as Safari for iOS, Chrome for iOS, and in-app browsers.

        var isIOSWebKit = WINDOW.navigator && /(?:iPad|iPhone|iPod).*?AppleWebKit/i.test(WINDOW.navigator.userAgent);

        var done = function done(naturalWidth, naturalHeight) {
          assign(_this2.imageData, {
            naturalWidth: naturalWidth,
            naturalHeight: naturalHeight,
            aspectRatio: naturalWidth / naturalHeight
          });
          _this2.initialImageData = assign({}, _this2.imageData);
          _this2.sizing = false;
          _this2.sized = true;

          _this2.build();
        }; // Most modern browsers (excepts iOS WebKit)


        if (image.naturalWidth && !isIOSWebKit) {
          done(image.naturalWidth, image.naturalHeight);
          return;
        }

        var sizingImage = document.createElement('img');
        var body = document.body || document.documentElement;
        this.sizingImage = sizingImage;

        sizingImage.onload = function () {
          done(sizingImage.width, sizingImage.height);

          if (!isIOSWebKit) {
            body.removeChild(sizingImage);
          }
        };

        sizingImage.src = image.src; // iOS WebKit will convert the image automatically
        // with its orientation once append it into DOM (#279)

        if (!isIOSWebKit) {
          sizingImage.style.cssText = 'left:0;' + 'max-height:none!important;' + 'max-width:none!important;' + 'min-height:0!important;' + 'min-width:0!important;' + 'opacity:0;' + 'position:absolute;' + 'top:0;' + 'z-index:-1;';
          body.appendChild(sizingImage);
        }
      }
    }, {
      key: "stop",
      value: function stop() {
        var image = this.image;
        image.onload = null;
        image.onerror = null;
        image.parentNode.removeChild(image);
        this.image = null;
      }
    }, {
      key: "build",
      value: function build() {
        if (!this.sized || this.ready) {
          return;
        }

        var element = this.element,
            options = this.options,
            image = this.image; // Create cropper elements

        var container = element.parentNode;
        var template = document.createElement('div');
        template.innerHTML = TEMPLATE;
        var cropper = template.querySelector(".".concat(NAMESPACE, "-container"));
        var canvas = cropper.querySelector(".".concat(NAMESPACE, "-canvas"));
        var dragBox = cropper.querySelector(".".concat(NAMESPACE, "-drag-box"));
        var cropBox = cropper.querySelector(".".concat(NAMESPACE, "-crop-box"));
        var face = cropBox.querySelector(".".concat(NAMESPACE, "-face"));
        this.container = container;
        this.cropper = cropper;
        this.canvas = canvas;
        this.dragBox = dragBox;
        this.cropBox = cropBox;
        this.viewBox = cropper.querySelector(".".concat(NAMESPACE, "-view-box"));
        this.face = face;
        canvas.appendChild(image); // Hide the original image

        addClass(element, CLASS_HIDDEN); // Inserts the cropper after to the current image

        container.insertBefore(cropper, element.nextSibling); // Show the image if is hidden

        if (!this.isImg) {
          removeClass(image, CLASS_HIDE);
        }

        this.initPreview();
        this.bind();
        options.initialAspectRatio = Math.max(0, options.initialAspectRatio) || NaN;
        options.aspectRatio = Math.max(0, options.aspectRatio) || NaN;
        options.viewMode = Math.max(0, Math.min(3, Math.round(options.viewMode))) || 0;
        addClass(cropBox, CLASS_HIDDEN);

        if (!options.guides) {
          addClass(cropBox.getElementsByClassName("".concat(NAMESPACE, "-dashed")), CLASS_HIDDEN);
        }

        if (!options.center) {
          addClass(cropBox.getElementsByClassName("".concat(NAMESPACE, "-center")), CLASS_HIDDEN);
        }

        if (options.background) {
          addClass(cropper, "".concat(NAMESPACE, "-bg"));
        }

        if (!options.highlight) {
          addClass(face, CLASS_INVISIBLE);
        }

        if (options.cropBoxMovable) {
          addClass(face, CLASS_MOVE);
          setData(face, DATA_ACTION, ACTION_ALL);
        }

        if (!options.cropBoxResizable) {
          addClass(cropBox.getElementsByClassName("".concat(NAMESPACE, "-line")), CLASS_HIDDEN);
          addClass(cropBox.getElementsByClassName("".concat(NAMESPACE, "-point")), CLASS_HIDDEN);
        }

        this.render();
        this.ready = true;
        this.setDragMode(options.dragMode);

        if (options.autoCrop) {
          this.crop();
        }

        this.setData(options.data);

        if (isFunction(options.ready)) {
          addListener(element, EVENT_READY, options.ready, {
            once: true
          });
        }

        dispatchEvent(element, EVENT_READY);
      }
    }, {
      key: "unbuild",
      value: function unbuild() {
        if (!this.ready) {
          return;
        }

        this.ready = false;
        this.unbind();
        this.resetPreview();
        this.cropper.parentNode.removeChild(this.cropper);
        removeClass(this.element, CLASS_HIDDEN);
      }
    }, {
      key: "uncreate",
      value: function uncreate() {
        if (this.ready) {
          this.unbuild();
          this.ready = false;
          this.cropped = false;
        } else if (this.sizing) {
          this.sizingImage.onload = null;
          this.sizing = false;
          this.sized = false;
        } else if (this.reloading) {
          this.xhr.onabort = null;
          this.xhr.abort();
        } else if (this.image) {
          this.stop();
        }
      }
      /**
       * Get the no conflict cropper class.
       * @returns {Cropper} The cropper class.
       */

    }], [{
      key: "noConflict",
      value: function noConflict() {
        window.Cropper = AnotherCropper;
        return Cropper;
      }
      /**
       * Change the default options.
       * @param {Object} options - The new default options.
       */

    }, {
      key: "setDefaults",
      value: function setDefaults(options) {
        assign(DEFAULTS, isPlainObject(options) && options);
      }
    }]);

    return Cropper;
  }();

  assign(Cropper.prototype, render, preview, events, handlers, change, methods);

  return Cropper;

})));


/***/ }),

/***/ "./node_modules/ng2-fancy-image-uploader/dist/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_fancy_image_uploader_component__ = __webpack_require__("./node_modules/ng2-fancy-image-uploader/dist/src/fancy-image-uploader.component.js");
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Status", function() { return __WEBPACK_IMPORTED_MODULE_0__src_fancy_image_uploader_component__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FancyImageUploaderComponent", function() { return __WEBPACK_IMPORTED_MODULE_0__src_fancy_image_uploader_component__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__src_uploaded_file__ = __webpack_require__("./node_modules/ng2-fancy-image-uploader/dist/src/uploaded-file.js");
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "UploadedFile", function() { return __WEBPACK_IMPORTED_MODULE_1__src_uploaded_file__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__src_fancy_image_uploader_module__ = __webpack_require__("./node_modules/ng2-fancy-image-uploader/dist/src/fancy-image-uploader.module.js");
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FancyImageUploaderModule", function() { return __WEBPACK_IMPORTED_MODULE_2__src_fancy_image_uploader_module__["a"]; });





/***/ }),

/***/ "./node_modules/ng2-fancy-image-uploader/dist/src/fancy-image-uploader.component.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Status; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FancyImageUploaderComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils__ = __webpack_require__("./node_modules/ng2-fancy-image-uploader/dist/src/utils.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__file_uploader__ = __webpack_require__("./node_modules/ng2-fancy-image-uploader/dist/src/file-uploader.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_filter__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/filter.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_cropperjs__ = __webpack_require__("./node_modules/cropperjs/dist/cropper.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_cropperjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_cropperjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__template__ = __webpack_require__("./node_modules/ng2-fancy-image-uploader/dist/src/template.js");







var Status;
(function (Status) {
    Status[Status["NotSelected"] = 0] = "NotSelected";
    Status[Status["Selected"] = 1] = "Selected";
    Status[Status["Uploading"] = 2] = "Uploading";
    Status[Status["Loading"] = 3] = "Loading";
    Status[Status["Loaded"] = 4] = "Loaded";
    Status[Status["Error"] = 5] = "Error";
})(Status || (Status = {}));
var FancyImageUploaderComponent = (function () {
    function FancyImageUploaderComponent(renderer, uploader, changeDetector) {
        this.renderer = renderer;
        this.uploader = uploader;
        this.changeDetector = changeDetector;
        this.statusEnum = Status;
        this._status = Status.NotSelected;
        this.thumbnailWidth = 150;
        this.thumbnailHeight = 150;
        this.propagateChange = function (_) { };
        this.cropper = undefined;
        this.onUpload = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.onStatusChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    Object.defineProperty(FancyImageUploaderComponent.prototype, "imageThumbnail", {
        get: function () {
            return this._imageThumbnail;
        },
        set: function (value) {
            this._imageThumbnail = value;
            this.propagateChange(this._imageThumbnail);
            if (value !== undefined) {
                this.status = Status.Selected;
            }
            else {
                this.status = Status.NotSelected;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FancyImageUploaderComponent.prototype, "errorMessage", {
        get: function () {
            return this._errorMessage;
        },
        set: function (value) {
            this._errorMessage = value;
            if (value) {
                this.status = Status.Error;
            }
            else {
                this.status = Status.NotSelected;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FancyImageUploaderComponent.prototype, "status", {
        get: function () {
            return this._status;
        },
        set: function (value) {
            this._status = value;
            this.onStatusChange.emit(value);
        },
        enumerable: true,
        configurable: true
    });
    FancyImageUploaderComponent.prototype.writeValue = function (value) {
        if (value) {
            this.loadAndResize(value);
        }
        else {
            this._imageThumbnail = undefined;
            this.status = Status.NotSelected;
        }
    };
    FancyImageUploaderComponent.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
    };
    FancyImageUploaderComponent.prototype.registerOnTouched = function () { };
    FancyImageUploaderComponent.prototype.ngOnInit = function () {
        if (this.options) {
            if (this.options.thumbnailWidth) {
                this.thumbnailWidth = this.options.thumbnailWidth;
            }
            if (this.options.thumbnailHeight) {
                this.thumbnailHeight = this.options.thumbnailHeight;
            }
            if (this.options.resizeOnLoad === undefined) {
                this.options.resizeOnLoad = true;
            }
            if (this.options.autoUpload === undefined) {
                this.options.autoUpload = true;
            }
            if (this.options.cropEnabled === undefined) {
                this.options.cropEnabled = false;
            }
            if (this.options.autoUpload && this.options.cropEnabled) {
                throw new Error('autoUpload and cropEnabled cannot be enabled simultaneously');
            }
        }
    };
    FancyImageUploaderComponent.prototype.ngAfterViewChecked = function () {
        if (this.options && this.options.cropEnabled && this.imageElement && this.fileToUpload && !this.cropper) {
            this.cropper = new __WEBPACK_IMPORTED_MODULE_5_cropperjs__(this.imageElement.nativeElement, {
                viewMode: 1,
                aspectRatio: this.options.cropAspectRatio ? this.options.cropAspectRatio : null
            });
        }
    };
    FancyImageUploaderComponent.prototype.ngOnDestroy = function () {
        if (this.cropper) {
            this.cropper.destroy();
            this.cropper = null;
        }
    };
    FancyImageUploaderComponent.prototype.loadAndResize = function (url) {
        var _this = this;
        this.status = Status.Loading;
        this.uploader.getFile(url, this.options).subscribe(function (file) {
            if (_this.options.resizeOnLoad) {
                // thumbnail
                var result = {
                    file: file,
                    url: URL.createObjectURL(file)
                };
                _this.resize(result).then(function (r) {
                    _this._imageThumbnail = r.resized.dataURL;
                    _this.status = Status.Loaded;
                });
            }
            else {
                var result = {
                    file: null,
                    url: null
                };
                _this.fileToDataURL(file, result).then(function (r) {
                    _this._imageThumbnail = r.dataURL;
                    _this.status = Status.Loaded;
                });
            }
        }, function (error) {
            _this.errorMessage = error || 'Error while getting an image';
        });
    };
    FancyImageUploaderComponent.prototype.onImageClicked = function () {
        this.renderer.invokeElementMethod(this.fileInputElement.nativeElement, 'click');
    };
    FancyImageUploaderComponent.prototype.onFileChanged = function () {
        var file = this.fileInputElement.nativeElement.files[0];
        if (!file)
            return;
        this.validateAndUpload(file);
    };
    FancyImageUploaderComponent.prototype.validateAndUpload = function (file) {
        var _this = this;
        this.propagateChange(null);
        if (this.options && this.options.allowedImageTypes) {
            if (!this.options.allowedImageTypes.some(function (allowedType) { return file.type === allowedType; })) {
                this.errorMessage = 'Only these image types are allowed: ' + this.options.allowedImageTypes.join(', ');
                return;
            }
        }
        if (this.options && this.options.maxImageSize) {
            if (file.size > this.options.maxImageSize * 1024 * 1024) {
                this.errorMessage = "Image must not be larger than " + this.options.maxImageSize + " MB";
                return;
            }
        }
        this.fileToUpload = file;
        if (this.options && this.options.autoUpload) {
            this.upload();
        }
        // thumbnail
        var result = {
            file: file,
            url: URL.createObjectURL(file)
        };
        this.resize(result).then(function (r) {
            _this._imageThumbnail = r.resized.dataURL;
            _this.origImageWidth = r.width;
            _this.orgiImageHeight = r.height;
            if (_this.options && !_this.options.autoUpload) {
                _this.status = Status.Selected;
            }
        });
    };
    FancyImageUploaderComponent.prototype.upload = function () {
        var _this = this;
        this.progress = 0;
        this.status = Status.Uploading;
        var cropOptions = undefined;
        if (this.cropper) {
            var scale = this.origImageWidth / this.cropper.getImageData().naturalWidth;
            var cropData = this.cropper.getData();
            cropOptions = {
                x: Math.round(cropData.x * scale),
                y: Math.round(cropData.y * scale),
                width: Math.round(cropData.width * scale),
                height: Math.round(cropData.height * scale)
            };
        }
        var id = this.uploader.uploadFile(this.fileToUpload, this.options, cropOptions);
        // file progress
        var sub = this.uploader.fileProgress$.filter(function (file) { return file.id === id; }).subscribe(function (file) {
            _this.progress = file.progress;
            if (file.error) {
                if (file.status || file.statusText) {
                    _this.errorMessage = file.status + ": " + file.statusText;
                }
                else {
                    _this.errorMessage = 'Error while uploading';
                }
                // on some upload errors change detection does not work, so we are forcing manually
                // on some upload errors change detection does not work, so we are forcing manually
                _this.changeDetector.detectChanges();
            }
            if (file.done) {
                // notify that value was changed only when image was uploaded and no error
                if (!file.error) {
                    _this.propagateChange(_this._imageThumbnail);
                    _this.status = Status.Selected;
                    _this.fileToUpload = undefined;
                }
                _this.onUpload.emit(file);
                sub.unsubscribe();
            }
        });
    };
    FancyImageUploaderComponent.prototype.removeImage = function () {
        this.fileInputElement.nativeElement.value = null;
        this.imageThumbnail = undefined;
        if (this.cropper) {
            this.cropper.destroy();
            this.cropper = null;
        }
    };
    FancyImageUploaderComponent.prototype.dismissError = function () {
        this.errorMessage = undefined;
        this.removeImage();
    };
    FancyImageUploaderComponent.prototype.drop = function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (!e.dataTransfer || !e.dataTransfer.files.length) {
            return;
        }
        this.validateAndUpload(e.dataTransfer.files[0]);
        this.updateDragOverlayStyles(false);
    };
    FancyImageUploaderComponent.prototype.dragenter = function (e) {
        e.preventDefault();
        e.stopPropagation();
    };
    FancyImageUploaderComponent.prototype.dragover = function (e) {
        e.preventDefault();
        e.stopPropagation();
        this.updateDragOverlayStyles(true);
    };
    FancyImageUploaderComponent.prototype.dragleave = function (e) {
        e.preventDefault();
        e.stopPropagation();
        this.updateDragOverlayStyles(false);
    };
    FancyImageUploaderComponent.prototype.updateDragOverlayStyles = function (isDragOver) {
        // TODO: find a way that does not trigger dragleave when displaying overlay
        // if (isDragOver) {
        //  this.renderer.setElementStyle(this.dragOverlayElement.nativeElement, 'display', 'block');
        // } else {
        //  this.renderer.setElementStyle(this.dragOverlayElement.nativeElement, 'display', 'none');
        // }
    };
    FancyImageUploaderComponent.prototype.resize = function (result) {
        var _this = this;
        var resizeOptions = {
            resizeHeight: this.thumbnailHeight,
            resizeWidth: this.thumbnailWidth,
            resizeType: result.file.type,
            resizeMode: this.options.thumbnailResizeMode
        };
        return new Promise(function (resolve) {
            Object(__WEBPACK_IMPORTED_MODULE_2__utils__["a" /* createImage */])(result.url, function (image) {
                var dataUrl = Object(__WEBPACK_IMPORTED_MODULE_2__utils__["b" /* resizeImage */])(image, resizeOptions);
                result.width = image.width;
                result.height = image.height;
                result.resized = {
                    dataURL: dataUrl,
                    type: _this.getType(dataUrl)
                };
                resolve(result);
            });
        });
    };
    FancyImageUploaderComponent.prototype.getType = function (dataUrl) {
        return dataUrl.match(/:(.+\/.+;)/)[1];
    };
    FancyImageUploaderComponent.prototype.fileToDataURL = function (file, result) {
        return new Promise(function (resolve) {
            var reader = new FileReader();
            reader.onload = function (e) {
                result.dataURL = reader.result;
                resolve(result);
            };
            reader.readAsDataURL(file);
        });
    };
    FancyImageUploaderComponent.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"], args: [{
                    selector: 'fancy-image-uploader',
                    template: __WEBPACK_IMPORTED_MODULE_6__template__["b" /* htmlTemplate */],
                    styles: [__WEBPACK_IMPORTED_MODULE_6__template__["a" /* cssTemplate */]],
                    host: {
                        '[style.width]': 'thumbnailWidth + "px"',
                        '[style.height]': 'thumbnailHeight + "px"',
                        '(drop)': 'drop($event)',
                        '(dragenter)': 'dragenter($event)',
                        '(dragover)': 'dragover($event)',
                        '(dragleave)': 'dragleave($event)',
                    },
                    providers: [
                        {
                            provide: __WEBPACK_IMPORTED_MODULE_1__angular_forms__["NG_VALUE_ACCESSOR"],
                            useExisting: Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return FancyImageUploaderComponent; }),
                            multi: true
                        }
                    ]
                },] },
    ];
    /** @nocollapse */
    FancyImageUploaderComponent.ctorParameters = function () { return [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"], },
        { type: __WEBPACK_IMPORTED_MODULE_3__file_uploader__["a" /* FileUploader */], },
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"], },
    ]; };
    FancyImageUploaderComponent.propDecorators = {
        "imageElement": [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"], args: ['imageElement',] },],
        "fileInputElement": [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"], args: ['fileInput',] },],
        "dragOverlayElement": [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"], args: ['dragOverlay',] },],
        "options": [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
        "onUpload": [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
        "onStatusChange": [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"] },],
    };
    return FancyImageUploaderComponent;
}());



/***/ }),

/***/ "./node_modules/ng2-fancy-image-uploader/dist/src/fancy-image-uploader.module.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FancyImageUploaderModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__fancy_image_uploader_component__ = __webpack_require__("./node_modules/ng2-fancy-image-uploader/dist/src/fancy-image-uploader.component.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__file_uploader__ = __webpack_require__("./node_modules/ng2-fancy-image-uploader/dist/src/file-uploader.js");




var FancyImageUploaderModule = (function () {
    function FancyImageUploaderModule() {
    }
    FancyImageUploaderModule.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"], args: [{
                    imports: [__WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"]],
                    providers: [__WEBPACK_IMPORTED_MODULE_3__file_uploader__["a" /* FileUploader */]],
                    declarations: [__WEBPACK_IMPORTED_MODULE_2__fancy_image_uploader_component__["a" /* FancyImageUploaderComponent */]],
                    exports: [__WEBPACK_IMPORTED_MODULE_2__fancy_image_uploader_component__["a" /* FancyImageUploaderComponent */]]
                },] },
    ];
    /** @nocollapse */
    FancyImageUploaderModule.ctorParameters = function () { return []; };
    return FancyImageUploaderModule;
}());



/***/ }),

/***/ "./node_modules/ng2-fancy-image-uploader/dist/src/file-uploader.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FileUploader; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__("./node_modules/rxjs/_esm5/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__("./node_modules/rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__uploaded_file__ = __webpack_require__("./node_modules/ng2-fancy-image-uploader/dist/src/uploaded-file.js");




var FileUploader = (function () {
    function FileUploader() {
        this._fileProgress$ = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["b" /* Subject */]();
    }
    Object.defineProperty(FileUploader.prototype, "fileProgress$", {
        get: function () {
            return this._fileProgress$.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    FileUploader.prototype.uploadFile = function (file, options, cropOptions) {
        var _this = this;
        this.setDefaults(options);
        var xhr = new XMLHttpRequest();
        var form = new FormData();
        form.append(options.fieldName, file, file.name);
        if (cropOptions) {
            form.append('X', cropOptions.x.toString());
            form.append('Y', cropOptions.y.toString());
            form.append('Width', cropOptions.width.toString());
            form.append('Height', cropOptions.height.toString());
        }
        var uploadingFile = new __WEBPACK_IMPORTED_MODULE_3__uploaded_file__["a" /* UploadedFile */](this.generateRandomIndex(), file.name, file.size);
        xhr.upload.onprogress = function (e) {
            if (e.lengthComputable) {
                var percent = Math.round(e.loaded / e.total * 100);
                uploadingFile.progress = percent;
                _this._fileProgress$.next(uploadingFile);
            }
        };
        xhr.upload.onabort = function (e) {
            uploadingFile.setAbort();
            _this._fileProgress$.next(uploadingFile);
        };
        xhr.upload.onerror = function (e) {
            uploadingFile.setError();
            _this._fileProgress$.next(uploadingFile);
        };
        xhr.onload = function () {
            var success = _this.isSuccessCode(xhr.status);
            if (!success) {
                uploadingFile.setError();
            }
            uploadingFile.onFinished(xhr.status, xhr.statusText, xhr.response);
            _this._fileProgress$.next(uploadingFile);
        };
        xhr.open(options.httpMethod, options.uploadUrl, true);
        xhr.withCredentials = options.withCredentials;
        if (options.customHeaders) {
            Object.keys(options.customHeaders).forEach(function (key) {
                xhr.setRequestHeader(key, options.customHeaders[key]);
            });
        }
        if (options.authToken) {
            xhr.setRequestHeader("Authorization", options.authTokenPrefix + " " + options.authToken);
        }
        xhr.send(form);
        return uploadingFile.id;
    };
    FileUploader.prototype.getFile = function (url, options) {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["a" /* Observable */].create(function (observer) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.responseType = 'blob';
            xhr.onload = function () {
                var success = _this.isSuccessCode(xhr.status);
                if (!success) {
                    observer.error(xhr.status);
                    observer.complete();
                }
                else {
                    var contentType = xhr.getResponseHeader('Content-Type');
                    var blob = new File([xhr.response], 'filename', { type: contentType });
                    if (blob.size > 0) {
                        observer.next(blob);
                        observer.complete();
                    }
                    else {
                        observer.error('No image');
                        observer.complete();
                    }
                }
            };
            xhr.onerror = function (e) {
                observer.error(xhr.status);
                observer.complete();
            };
            if (options.authToken) {
                xhr.setRequestHeader("Authorization", options.authTokenPrefix + " " + options.authToken);
            }
            xhr.send();
        });
    };
    FileUploader.prototype.setDefaults = function (options) {
        options.withCredentials = options.withCredentials || false;
        options.httpMethod = options.httpMethod || 'POST';
        options.authTokenPrefix = options.authTokenPrefix || 'Bearer';
        options.fieldName = options.fieldName || 'file';
    };
    FileUploader.prototype.isSuccessCode = function (status) {
        return (status >= 200 && status < 300) || status === 304;
    };
    FileUploader.prototype.generateRandomIndex = function () {
        return Math.random().toString(36).substring(7);
    };
    FileUploader.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"] },
    ];
    /** @nocollapse */
    FileUploader.ctorParameters = function () { return []; };
    return FileUploader;
}());



/***/ }),

/***/ "./node_modules/ng2-fancy-image-uploader/dist/src/template.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return htmlTemplate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return cssTemplate; });
var htmlTemplate = "<div class=\"image-container\">\n  <div class=\"match-parent\" [ngSwitch]=\"status\">\n    \n    <div class=\"match-parent\" *ngSwitchCase=\"statusEnum.NotSelected\">\n      <button type=\"button\" class=\"add-image-btn\" (click)=\"onImageClicked($event)\">\n          <div>\n            <p class=\"plus\">+</p>\n            <p>Click here to add image</p>\n            <p>Or drop image here</p>\n          </div>\n      </button>\n    </div>\n\n    <div class=\"selected-status-wrapper match-parent\" *ngSwitchCase=\"statusEnum.Loaded\">\n      <img [src]=\"imageThumbnail\" #imageElement>\n\n      <button type=\"button\" class=\"remove\" (click)=\"removeImage()\">\u00D7</button>\n    </div>\n\n    <div class=\"selected-status-wrapper match-parent\" *ngSwitchCase=\"statusEnum.Selected\">\n      <img [src]=\"imageThumbnail\" #imageElement>\n\n      <button type=\"button\" class=\"remove\" (click)=\"removeImage()\">\u00D7</button>\n    </div>\n\n    <div *ngSwitchCase=\"statusEnum.Uploading\">\n      <img [attr.src]=\"imageThumbnail ? imageThumbnail : null\" (click)=\"onImageClicked()\">\n\n      <div class=\"progress-bar\">\n        <div class=\"bar\" [style.width]=\"progress+'%'\"></div>\n      </div>\n    </div>\n\n    <div class=\"match-parent\" *ngSwitchCase=\"statusEnum.Loading\">\n      <div class=\"sk-fading-circle\">\n        <div class=\"sk-circle1 sk-circle\"></div>\n        <div class=\"sk-circle2 sk-circle\"></div>\n        <div class=\"sk-circle3 sk-circle\"></div>\n        <div class=\"sk-circle4 sk-circle\"></div>\n        <div class=\"sk-circle5 sk-circle\"></div>\n        <div class=\"sk-circle6 sk-circle\"></div>\n        <div class=\"sk-circle7 sk-circle\"></div>\n        <div class=\"sk-circle8 sk-circle\"></div>\n        <div class=\"sk-circle9 sk-circle\"></div>\n        <div class=\"sk-circle10 sk-circle\"></div>\n        <div class=\"sk-circle11 sk-circle\"></div>\n        <div class=\"sk-circle12 sk-circle\"></div>\n      </div>\n    </div>\n\n    <div class=\"match-parent\" *ngSwitchCase=\"statusEnum.Error\">\n      <div class=\"error\">\n        <div class=\"error-message\">\n          <p>{{errorMessage}}</p>\n        </div>\n        <button type=\"button\" class=\"remove\" (click)=\"dismissError()\">\u00D7</button>\n      </div>\n    </div>\n  </div>\n\n  <input type=\"file\" #fileInput (change)=\"onFileChanged()\">\n  <div class=\"drag-overlay\" [hidden]=\"true\" #dragOverlay></div>\n</div>";
var cssTemplate = ":host {\n  display: block;\n}\n\n.match-parent {\n  width: 100%;\n  height: 100%;\n}\n\n.add-image-btn {\n  width: 100%;\n  height: 100%;\n  font-weight: bold;\n  opacity: 0.5;\n  border: 0;\n}\n\n.add-image-btn:hover {\n  opacity: .7;\n  cursor: pointer;\n  background-color: #ddd;\n  box-shadow: inset 0 0 5px rgba(0,0,0,0.3);\n}\n\n.add-image-btn .plus {\n  font-size: 30px;\n  font-weight: normal;\n  margin-bottom: 5px;\n  margin-top: 5px;\n}\n\nimg {\n  cursor: pointer;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  margin-right: -50%;\n  transform: translate(-50%, -50%)\n}\n\n.image-container {\n  width: 100%;\n  height: 100%;\n  position: relative;\n  display: inline-block;\n  background-color: #f1f1f1;\n  box-shadow: inset 0 0 5px rgba(0,0,0,0.2);\n}\n\n.remove {\n  position: absolute;\n  top: 0;\n  right: 0;\n  width: 40px;\n  height: 40px;\n  font-size: 25px;\n  text-align: center;\n  opacity: 0.8;\n  border: 0;\n  cursor: pointer;\n}\n\n.selected-status-wrapper > .remove:hover {\n  opacity: 0.7;\n  background-color: #fff;\n}\n\n.error .remove {\n  opacity: 0.5;\n}\n\n.error .remove:hover {\n  opacity: 0.7;\n}\n\ninput {\n  display: none;\n}\n\n.error {\n  width: 100%;\n  height: 100%;\n  border: 1px solid #e3a5a2;\n  color: #d2706b;\n  background-color: #fbf1f0;\n  position: relative;\n  text-align: center;\n  display: flex;\n  align-items: center;\n}\n\n.error-message {\n  width: 100%;\n  line-height: 18px;\n}\n\n.progress-bar {\n  position: absolute;\n  bottom:10%;\n  left:10%;\n  width: 80%;\n  height: 5px;\n  background-color: grey;\n  opacity: 0.9;\n  overflow: hidden;\n}\n\n.bar {\n  position: absolute;\n  height: 100%;\n  background-color: #a4c639;\n}\n\n.drag-overlay {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: yellow;\n  opacity: 0.3;\n}\n\n/* spinner */\n\n.sk-fading-circle {\n  width: 40px;\n  height: 40px;\n  position: relative;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n}\n\n.sk-fading-circle .sk-circle {\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  left: 0;\n  top: 0;\n}\n\n.sk-fading-circle .sk-circle:before {\n  content: '';\n  display: block;\n  margin: 0 auto;\n  width: 15%;\n  height: 15%;\n  background-color: #333;\n  border-radius: 100%;\n  -webkit-animation: sk-circleFadeDelay 1.2s infinite ease-in-out both;\n          animation: sk-circleFadeDelay 1.2s infinite ease-in-out both;\n}\n.sk-fading-circle .sk-circle2 {\n  -webkit-transform: rotate(30deg);\n      -ms-transform: rotate(30deg);\n          transform: rotate(30deg);\n}\n.sk-fading-circle .sk-circle3 {\n  -webkit-transform: rotate(60deg);\n      -ms-transform: rotate(60deg);\n          transform: rotate(60deg);\n}\n.sk-fading-circle .sk-circle4 {\n  -webkit-transform: rotate(90deg);\n      -ms-transform: rotate(90deg);\n          transform: rotate(90deg);\n}\n.sk-fading-circle .sk-circle5 {\n  -webkit-transform: rotate(120deg);\n      -ms-transform: rotate(120deg);\n          transform: rotate(120deg);\n}\n.sk-fading-circle .sk-circle6 {\n  -webkit-transform: rotate(150deg);\n      -ms-transform: rotate(150deg);\n          transform: rotate(150deg);\n}\n.sk-fading-circle .sk-circle7 {\n  -webkit-transform: rotate(180deg);\n      -ms-transform: rotate(180deg);\n          transform: rotate(180deg);\n}\n.sk-fading-circle .sk-circle8 {\n  -webkit-transform: rotate(210deg);\n      -ms-transform: rotate(210deg);\n          transform: rotate(210deg);\n}\n.sk-fading-circle .sk-circle9 {\n  -webkit-transform: rotate(240deg);\n      -ms-transform: rotate(240deg);\n          transform: rotate(240deg);\n}\n.sk-fading-circle .sk-circle10 {\n  -webkit-transform: rotate(270deg);\n      -ms-transform: rotate(270deg);\n          transform: rotate(270deg);\n}\n.sk-fading-circle .sk-circle11 {\n  -webkit-transform: rotate(300deg);\n      -ms-transform: rotate(300deg);\n          transform: rotate(300deg); \n}\n.sk-fading-circle .sk-circle12 {\n  -webkit-transform: rotate(330deg);\n      -ms-transform: rotate(330deg);\n          transform: rotate(330deg); \n}\n.sk-fading-circle .sk-circle2:before {\n  -webkit-animation-delay: -1.1s;\n          animation-delay: -1.1s; \n}\n.sk-fading-circle .sk-circle3:before {\n  -webkit-animation-delay: -1s;\n          animation-delay: -1s; \n}\n.sk-fading-circle .sk-circle4:before {\n  -webkit-animation-delay: -0.9s;\n          animation-delay: -0.9s; \n}\n.sk-fading-circle .sk-circle5:before {\n  -webkit-animation-delay: -0.8s;\n          animation-delay: -0.8s; \n}\n.sk-fading-circle .sk-circle6:before {\n  -webkit-animation-delay: -0.7s;\n          animation-delay: -0.7s; \n}\n.sk-fading-circle .sk-circle7:before {\n  -webkit-animation-delay: -0.6s;\n          animation-delay: -0.6s; \n}\n.sk-fading-circle .sk-circle8:before {\n  -webkit-animation-delay: -0.5s;\n          animation-delay: -0.5s; \n}\n.sk-fading-circle .sk-circle9:before {\n  -webkit-animation-delay: -0.4s;\n          animation-delay: -0.4s;\n}\n.sk-fading-circle .sk-circle10:before {\n  -webkit-animation-delay: -0.3s;\n          animation-delay: -0.3s;\n}\n.sk-fading-circle .sk-circle11:before {\n  -webkit-animation-delay: -0.2s;\n          animation-delay: -0.2s;\n}\n.sk-fading-circle .sk-circle12:before {\n  -webkit-animation-delay: -0.1s;\n          animation-delay: -0.1s;\n}\n\n@-webkit-keyframes sk-circleFadeDelay {\n  0%, 39%, 100% { opacity: 0; }\n  40% { opacity: 1; }\n}\n\n@keyframes sk-circleFadeDelay {\n  0%, 39%, 100% { opacity: 0; }\n  40% { opacity: 1; } \n}";


/***/ }),

/***/ "./node_modules/ng2-fancy-image-uploader/dist/src/uploaded-file.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UploadedFile; });
var UploadedFile = (function () {
    function UploadedFile(id, originalName, size) {
        this.id = id;
        this.originalName = originalName;
        this.size = size;
        this.progress = 0;
        this.done = false;
        this.error = false;
        this.abort = false;
    }
    UploadedFile.prototype.setError = function () {
        this.error = true;
        this.done = true;
    };
    UploadedFile.prototype.setAbort = function () {
        this.abort = true;
        this.done = true;
    };
    UploadedFile.prototype.onFinished = function (status, statusText, response) {
        this.status = status;
        this.statusText = statusText;
        this.response = response;
        this.done = true;
    };
    return UploadedFile;
}());



/***/ }),

/***/ "./node_modules/ng2-fancy-image-uploader/dist/src/utils.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createImage;
/* harmony export (immutable) */ __webpack_exports__["b"] = resizeImage;
function createImage(url, cb) {
    var image = new Image();
    image.onload = function () {
        cb(image);
    };
    image.src = url;
}
var resizeAreaId = 'imageupload-resize-area';
function getResizeArea() {
    var resizeArea = document.getElementById(resizeAreaId);
    if (!resizeArea) {
        resizeArea = document.createElement('canvas');
        resizeArea.id = resizeAreaId;
        resizeArea.style.display = 'none';
        document.body.appendChild(resizeArea);
    }
    return resizeArea;
}
function resizeImage(origImage, _a) {
    var _b = _a === void 0 ? {} : _a, resizeHeight = _b.resizeHeight, resizeWidth = _b.resizeWidth, _c = _b.resizeQuality, resizeQuality = _c === void 0 ? 0.7 : _c, _d = _b.resizeType, resizeType = _d === void 0 ? 'image/jpeg' : _d, _e = _b.resizeMode, resizeMode = _e === void 0 ? 'fill' : _e;
    var canvas = getResizeArea();
    var height = origImage.height;
    var width = origImage.width;
    var offsetX = 0;
    var offsetY = 0;
    if (resizeMode === 'fill') {
        // calculate the width and height, constraining the proportions
        if (width / height > resizeWidth / resizeHeight) {
            width = Math.round(height * resizeWidth / resizeHeight);
        }
        else {
            height = Math.round(width * resizeHeight / resizeWidth);
        }
        canvas.width = resizeWidth <= width ? resizeWidth : width;
        canvas.height = resizeHeight <= height ? resizeHeight : height;
        offsetX = origImage.width / 2 - width / 2;
        offsetY = origImage.height / 2 - height / 2;
        //draw image on canvas
        var ctx = canvas.getContext("2d");
        ctx.drawImage(origImage, offsetX, offsetY, width, height, 0, 0, canvas.width, canvas.height);
    }
    else if (resizeMode === 'fit') {
        // calculate the width and height, constraining the proportions
        if (width > height) {
            if (width > resizeWidth) {
                height = Math.round(height *= resizeWidth / width);
                width = resizeWidth;
            }
        }
        else {
            if (height > resizeHeight) {
                width = Math.round(width *= resizeHeight / height);
                height = resizeHeight;
            }
        }
        canvas.width = width;
        canvas.height = height;
        //draw image on canvas
        var ctx = canvas.getContext("2d");
        ctx.drawImage(origImage, 0, 0, width, height);
    }
    else {
        throw new Error('Unknown resizeMode: ' + resizeMode);
    }
    // get the data from canvas as 70% jpg (or specified type).
    return canvas.toDataURL(resizeType, resizeQuality);
}


/***/ })

});
//# sourceMappingURL=users.module.chunk.js.map