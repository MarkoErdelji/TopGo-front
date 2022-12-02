import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisteredUserComponent } from './registered-user.component';
import { RegisteredUserMenuComponent } from './components/registered-user-menu/registered-user-menu.component';
import { NavbarComponent } from '../app/components/navbar/navbar.component';
import { NavbarModule } from '../app/components/navbar/navbar.module';
import { MaterialModule } from 'src/infrastructure/material.module';



@NgModule({
  declarations: [
    RegisteredUserComponent,
    RegisteredUserMenuComponent
  ],
  imports: [
    MaterialModule,
    CommonModule,
    NavbarModule
  ],
  exports: [
    RegisteredUserComponent
  ]
})
export class RegisteredUserModule { }
