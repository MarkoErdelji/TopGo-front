import { Component, Input, OnInit } from '@angular/core';
import { EmailValidator, FormControl, FormGroup, Validators } from '@angular/forms';
import { htmlEmail } from '.././email-template';
import { PasswordResetService } from '../../../../_service/password-reset.service';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  resetPassForm = new FormGroup({
    emailControl: new FormControl("",[Validators.required,Validators.email])
  }
  );
  
  constructor(private passwordResetService:PasswordResetService) { }

  ngOnInit(): void {
  
  }

  resetPassword(){
    if (this.resetPassForm.valid){
      let to = this.resetPassForm.controls.emailControl.value;
      let from = "topGoAppRS@gmail.com";
      let body = htmlEmail;
      this.passwordResetService.sendEmail(to || '',from,body);
    
    }
  }
}
