import { Component, OnInit, HostListener } from '@angular/core';
import { FancyImageUploaderOptions, UploadedFile } from 'ng2-fancy-image-uploader';
import { MatDialogRef } from '@angular/material';

@Component({
    selector: 'users-avatar-select-modal',
    templateUrl: './users-avatar-select-modal.component.html',
    styleUrls: ['./users-avatar-select-modal.component.css']
})
export class UsersAvatarSelectModalComponent implements OnInit {
    constructor(public dialogRef: MatDialogRef<UsersAvatarSelectModalComponent>,) { }

    link: string;

    options: FancyImageUploaderOptions = {
        thumbnailHeight: 350,
        thumbnailWidth: 350,
        uploadUrl: '/api/uploadImage',
        allowedImageTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/jpg'],
        maxImageSize: 0.5
    };

    public onUpload(file: UploadedFile) {
        this.link = JSON.parse(file.response)["link"];
      }

    ngOnInit(): void { }

    @HostListener('window:keyup', ['$event'])
    keyEvent(event: KeyboardEvent) {      
      if (event.keyCode === 13) {
          this.confirm();
      }
  
      if (event.keyCode === 27) {
          this.cancel();
      }
    }

    public confirm() {
        this.dialogRef.close({link: this.link});
    }

    public cancel() {
        this.dialogRef.close();
    }
}
