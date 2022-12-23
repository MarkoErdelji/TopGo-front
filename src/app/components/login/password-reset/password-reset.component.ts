import { Component, Input, OnInit } from '@angular/core';
import { EmailValidator, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {

  resetPassForm = new FormGroup({
    emailControl: new FormControl("",[Validators.required,Validators.email])
  }
  );

  constructor() { }

  ngOnInit(): void {
  }

  resetPassword(){
    if (this.resetPassForm.valid){
      
    }
  }
}
