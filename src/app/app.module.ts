import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from 'src/infrastructure/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UnregisteredUserComponent } from './components/unregistered-user/unregistered-user.component';
import { UnregisteredUserModule } from './components/unregistered-user/unregistered-user.module';
import { RegisteredUserModule } from './components/registered-user/registered-user.module';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    UnregisteredUserModule,
    RegisteredUserModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
