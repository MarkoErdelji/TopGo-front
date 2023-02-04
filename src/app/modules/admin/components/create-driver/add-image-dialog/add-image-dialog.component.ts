import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DriverInfoDTO} from "../../../../DTO/DriverInfoDTO";
import {DriverService} from "../../../../service/driver.service";
import {CreateDocumentDTO} from "../../../../DTO/CreateDocumentDTO";
import {Router} from "@angular/router";
import {
  RideNotificationComponent
} from "../../../../../components/dialogs/ride-notification/ride-notification.component";

@Component({
  selector: 'app-add-image-dialog',
  templateUrl: './add-image-dialog.component.html',
  styleUrls: ['./add-image-dialog.component.css']
})
export class AddImageDialogComponent implements OnInit {
  file:any = null;
  addDocumentFormGroup = new FormGroup({
    documentName: new FormControl("", [Validators.required]),

  })

  constructor(private router: Router,private driverService: DriverService, private dialogRef: MatDialogRef<AddImageDialogComponent>,private dialog:MatDialog,@Inject(MAT_DIALOG_DATA) public data: DriverInfoDTO) { }

  ngOnInit(): void {
  }

  addDocument() {
    if(this.addDocumentFormGroup.valid && this.file != null){
      let createDriverDocumentDTO: CreateDocumentDTO = {
        name: this.addDocumentFormGroup.controls.documentName.value!,
        documentImage: this.file.split(',')[1]
      }
      console.log(this.file)
      this.driverService.addDriverDocument(this.data.id, createDriverDocumentDTO).subscribe((response)=>{
        const dialogRef = this.dialog.open(RideNotificationComponent, {
          width: '250px',
          data: {msg:"Driver document added."}
        });
      })

    }
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
        this.file = reader.result as string
      };
    } else {
      window.alert("Please upload a .jpg file");
      return;
    }
  }


  finish() {
    this.dialogRef.close()
    this.router.navigate(['admin'])
  }
}
