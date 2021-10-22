import { Component, OnInit } from '@angular/core';
import {saveFile, saveAs} from 'file-saver';
import { DatabaseService } from '../../services/database.service';
import { LogfileService } from '../../services/logfile.service';
import { TableModel } from '../../models/table.model';
import { ColumnModel } from '../../models/column.model';
import { EncryptDecryptModel } from '../../models/encrypt-decrypt.model';
import { CryptKeyModel } from '../../models/crypt-key.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material';
import { MakeBackupConfirmationComponent } from '../modals/make-backup-confirmation/make-backup-confirmation.component';

@Component({
    selector: 'database-administrate',
    templateUrl: './database-administrate.component.html',
    styleUrls: ['./database-administrate.component.css']
})
export class DatabaseAdministrateComponent implements OnInit {

    newKey: string;

    encryptDecryptModel: EncryptDecryptModel;

    isMenuShowed: boolean = false;

    isKeyRefreshed: boolean = false;

    isConfigUpdated: boolean = false;

    constructor(private databaseService: DatabaseService,
        private logfileService: LogfileService,
        private dialog: MatDialog) { }

    ngOnInit(): void {
        this.databaseService.getTablesNames().subscribe(response => {
            this.encryptDecryptModel = response as EncryptDecryptModel;
        })
    }

    public downloadDatabase(){
        this.download().subscribe(response => {

        });
    }

    public download(){
        return this.databaseService.getBackUp()
        .map((data) => this.downloadFile(data));
    }

    public downloadFile(data: any) {
        const blob = new Blob([data], { type: 'application/octet-stream' });
        this.databaseService.getDatabaseName().subscribe(response => {
            saveAs(blob, response["name"]);
        });
    }

    public downloadLogfile(){
        this.downloadlf().subscribe(response => {

        });
    }

    public downloadlf(){
        return this.logfileService.getLogFile()
        .map((data) => this.downloadlfFile(data));
    }

    public downloadlfFile(data: any) {
        const blob = new Blob([data], { type: 'application/octet-stream' });
        saveAs(blob, "log.txt");
    }

    public setKey(key: string) {
        let config = new CryptKeyModel();
        config.Value = key;

        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.position = { top: '0' };
        dialogConfig.autoFocus = false;

        this.dialog.open(MakeBackupConfirmationComponent, dialogConfig)
            .afterClosed().subscribe(dialogResult => {
                if (dialogResult) {
                    this.download().subscribe(response => {
                        this.databaseService.setKey(config).subscribe(response => {
                            this.isKeyRefreshed = true;
                        })
                    });
                }              
                else {
                    this.databaseService.setKey(config).subscribe(response => {
                        this.isKeyRefreshed = true;
                    })
                }
            });
    }

    public getClassForCheckBox(column: ColumnModel){ 
        if (column.WillBeCrypted)
        return "icheckbox_flat-blue checked";
        else return "icheckbox_flat-blue";
    }

    public change(column: ColumnModel) {
        column.WillBeCrypted = !column.WillBeCrypted;
    }

    public setTables(encryptDecryptModel: EncryptDecryptModel) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.position = { top: '0' };
        dialogConfig.autoFocus = false;

        this.dialog.open(MakeBackupConfirmationComponent, dialogConfig)
            .afterClosed().subscribe(dialogResult => {
                if (dialogResult) {
                    this.download().subscribe(response => {
                        this.databaseService.setTables(encryptDecryptModel).subscribe(response => {
                            this.isConfigUpdated = true;
                        })
                    });
                }              
                else {
                    this.databaseService.setTables(encryptDecryptModel).subscribe(response => {
                        this.isConfigUpdated = true;
                    })
                }
            });
    }

    public showMenu() {
        this.isMenuShowed = !this.isMenuShowed;
    }

    public isSignDisplayed(table: TableModel) {
        return table.Columns.some((x) => x.WillBeCrypted == true);
    }

    public getTableName(table: string) {
        return table.substr(0, table.length - 1);
    }
}
