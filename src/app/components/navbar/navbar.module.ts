import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MaterialModule } from 'src/infrastructure/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UnregisteredUserRoutingModule } from '../../../unregistered-user/unregistered-user-routing.module';



@NgModule({
  declarations: [NavbarComponent],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    UnregisteredUserRoutingModule
  ],
  exports: [NavbarComponent]
})
export class NavbarModule { }
