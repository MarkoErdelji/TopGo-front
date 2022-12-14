import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/_service/auth.service';
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

  constructor(private router: Router,public authService: AuthService,) { }

  ngOnInit(): void {
  }


  create() 
  {
    if (this.loginForm.valid) {
      const res = this.authService.signIn(this.loginForm.controls.username.value,this.loginForm.controls.password.value);
      
      this.router.navigate(['registered']);
    }
  }



}
Validators.required;