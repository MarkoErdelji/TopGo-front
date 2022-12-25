import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-driver-profile-edit',
  templateUrl: './driver-profile-edit.component.html',
  styleUrls: ['./driver-profile-edit.component.css']
})
export class DriverProfileEditComponent implements OnInit {

  editForm = new FormGroup({
    firstName: new FormControl("",[Validators.required,Validators.pattern(/^\p{Lu}[\p{L}]*/gu)]),
    lastName: new FormControl("",[Validators.required,Validators.pattern(/^\p{Lu}[\p{L}]*/gu)]),
    email: new FormControl("",[Validators.required,Validators.email]),
    phoneNumber: new FormControl("",[Validators.required,Validators.pattern('^[0-9].{8,11}$')]),
    adress: new FormControl("",[Validators.required,Validators.pattern(/[\p{L}\p{N} ,]*/gu)])
  });

  constructor() { }

  ngOnInit(): void {
  }

  create(){}

  sendEditRequest(){}
}
