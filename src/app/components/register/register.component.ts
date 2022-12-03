import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    firstName: new FormControl("",[Validators.required]),
    lastName: new FormControl("",[Validators.required]),
    email: new FormControl("",[Validators.required]),
    username: new FormControl("",[Validators.required]),
    password: new FormControl("",[Validators.required]),
    phoneNumber: new FormControl("",[Validators.required]),
    adress: new FormControl("",[Validators.required])
  });

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  create(){
    if (this.registerForm.valid) {
      this.router.navigate(['registered']);
    }
  }

}
