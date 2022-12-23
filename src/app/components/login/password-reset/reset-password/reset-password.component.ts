import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PasswordResetService } from 'src/app/_service/password-reset.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  token?: string;
  email?: string;

  resetPassForm = new FormGroup({
    passwordControl: new FormControl("",[Validators.required,Validators.minLength(6)]),
    confirmPasswordControl: new FormControl("",[Validators.required,Validators.minLength(6)])
  });


  doPasswordsMatch() {
    const password = this.resetPassForm.controls.passwordControl.value;
    const confirmPassword = this.resetPassForm.controls.confirmPasswordControl.value;
    if (password !== confirmPassword) {
      return false;
    }
    return true;
  }
  
  constructor(private route: ActivatedRoute,private passwordResetService:PasswordResetService,private router:Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      this.email = params['email'];
    });

    this.passwordResetService.getToken(this.token || '').subscribe(
      (responseToken)=>{
        if(responseToken.status == 404){
          window.alert("Token is invalid");
          this.router.navigate(['login']);
        }
        else if(responseToken.status == 417){
          window.alert("Token has expired please send another email!");
          this.router.navigate(['login']);
        }
      }
    )
  }

  resetPassword(){
    if(this.resetPassForm.valid && this.doPasswordsMatch()){
      this.passwordResetService.resetPassword(this.token || ' ',this.email || ' ',this.resetPassForm.controls.passwordControl.value || ' ').subscribe(
        response=>{
          if(response.status == 200){
            window.alert("Password successfuly reset!")
            this.router.navigate(['login']);
          }
          else{
            window.alert("Something went wrong while reseting your password,try again later");
            this.router.navigate(['login']);
          }
        }

      )
    }

  }

}
