import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-create-driver',
  templateUrl: './create-driver.component.html',
  styleUrls: ['./create-driver.component.css']
})
export class CreateDriverComponent implements OnInit {
  createDriverForm = new FormGroup({
    firstName: new FormControl("", [Validators.required]),
    lastName: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required]),
    phoneNumber: new FormControl("", [Validators.required]),
    adress: new FormControl("", [Validators.required]),
    model: new FormControl("", [Validators.required]),
    licencePlate: new FormControl("", [Validators.required]),
    seats: new FormControl("", [Validators.required]),
    vehicleType: new FormControl("", [Validators.required]),

  })


  constructor() { }

  ngOnInit(): void {
  }

}
