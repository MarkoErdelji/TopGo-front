import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DriverInfoDTO } from 'src/app/modules/DTO/DriverInfoDTO';
import { DriverService } from 'src/app/modules/service/driver.service';

@Component({
  selector: 'app-driver-change-image-dialog',
  templateUrl: './driver-change-image-dialog.component.html',
  styleUrls: ['./driver-change-image-dialog.component.css']
})
export class DriverChangeImageDialogComponent implements OnInit {


  constructor(private dialogRef: MatDialogRef<DriverChangeImageDialogComponent>) { }

  ngOnInit(): void {
  }

  uploadImage(event){
    const file = event.target.files[0];
    const reader = new FileReader();
    if(file.size > 500000){
      window.alert("File is too big!");
      return
   };
    if (file.type === 'image/jpeg') {
      reader.readAsDataURL(file);
        reader.onload = () => {
          this.dialogRef.close(reader.result as string);
        };
    } else {
      window.alert("Please upload a .jpg file");
      return;
    }
  }

  

}
