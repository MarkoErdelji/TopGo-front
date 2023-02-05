import {Component, Inject, OnInit, Output} from '@angular/core';
import {UserService} from "../../../../../service/user.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PassengerInfoDTO} from "../../../../../DTO/PassengerInfoDTO";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UpdatePassengerDTO} from "../../../../../DTO/UpdatePassengerDTO";
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-edit-profile-dialog',
  templateUrl: './edit-profile-dialog.component.html',
  styleUrls: ['./edit-profile-dialog.component.css']
})
export class EditProfileDialogComponent implements OnInit {

  Message: any;
  user?:PassengerInfoDTO
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;

  pfp?:string;
  editForm = new FormGroup({
    firstName: new FormControl(this.firstName,[Validators.required]),
    lastName: new FormControl(this.lastName,[Validators.required]),
    email: new FormControl(this.email,[Validators.required]),
    phoneNumber: new FormControl(this.phoneNumber,[Validators.required]),
    address: new FormControl(this.address,[Validators.required])
  });


  constructor(
    private userService: UserService,
    public dialogRef: MatDialogRef<EditProfileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {

    this.user = this.data.passenger;
    this.pfp = this.user?.profilePicture;
    this.Message = this.user?.name
    this.firstName = this.user?.name;
    this.lastName = this.user?.surname;
    this.address = this.user?.address;
    this.phoneNumber = this.user?.telephoneNumber;
    this.email = this.user?.email;



  }
  @Output() update: EventEmitter<UpdatePassengerDTO> = new EventEmitter<UpdatePassengerDTO>();
  submit() {


    let newUser: UpdatePassengerDTO = {
      name: this.editForm.get("firstName")?.value!,
      surname: this.editForm.get("lastName")?.value!,
      profilePicture: this.pfp!,
      telephoneNumber: this.editForm.get("phoneNumber")?.value!,
      email: this.editForm.get("email")?.value!,
      address: this.editForm.get("address")?.value!
    }

    if(this.editForm.valid)
      this.dialogRef.close(newUser);

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
        this.pfp = (reader.result as string);
      };
    } else {
      window.alert("Please upload a .jpg file");
      return;
    }
  }
}
