import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/_service/auth.service';
import { ForgotPasswordComponent } from './password-reset/forgot-password/forgot-password.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl("",[Validators.required]),
    password: new FormControl("",[Validators.required])
  });

  email?:string;

  constructor(private router: Router,public authService: AuthService,) { }

  ngOnInit(): void {
    this.authService.checkForToken();
  }


  async create() 
  {
    if (this.loginForm.valid) {
      const res = await this.authService.signIn(this.loginForm.controls.username.value,this.loginForm.controls.password.value);
      
    }
  }




}
Validators.required;