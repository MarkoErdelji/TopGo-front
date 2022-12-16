import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterData } from './RegisterDTO';
import { registerLocaleData } from '@angular/common';
import { AuthService } from 'src/app/_service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    firstName: new FormControl("",[Validators.required,Validators.pattern(/^\p{Lu}[\p{L}]*/gu)]),
    lastName: new FormControl("",[Validators.required,Validators.pattern(/^\p{Lu}[\p{L}]*/gu)]),
    email: new FormControl("",[Validators.required,Validators.email]),
    password: new FormControl("",[Validators.required,Validators.minLength(6)]),
    phoneNumber: new FormControl("",[Validators.required,Validators.pattern('^[0-9].{8,11}$')]),
    adress: new FormControl("",[Validators.required,Validators.pattern(/[\p{L}\p{N} ,]*/gu)])
  });

  constructor(private router: Router,private authService:AuthService) { }

  ngOnInit(): void {
  }

  create(){
    if (this.registerForm.valid) {
      this.authService.register(
        {
          name:this.registerForm.controls.firstName.value,
          surname:this.registerForm.controls.lastName.value,
          email:this.registerForm.controls.email.value,
          profilePicture:null,
          telephoneNumber:this.registerForm.controls.phoneNumber.value,
          address:this.registerForm.controls.adress.value,
          password:this.registerForm.controls.password.value
        }
      );
      this.router.navigate(['login']);
    }
  }

}
