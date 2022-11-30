import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnregisteredUserRoutingModule } from './unregistered-user-routing.module';
import { NavbarComponent } from '../navbar/navbar.component';
import { UnregisteredUserComponent } from './unregistered-user.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/infrastructure/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarModule } from '../navbar/navbar.module';


@NgModule({
  declarations: [UnregisteredUserComponent,],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    UnregisteredUserRoutingModule,
    NavbarModule
  ],
  exports:[
    UnregisteredUserComponent
  ]
})
export class UnregisteredUserModule { }
