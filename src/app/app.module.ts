import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from 'src/infrastructure/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UnregisteredUserComponent } from './modules/unregistered-user/unregistered-user.component';
import { UnregisteredUserModule } from './modules/unregistered-user/unregistered-user.module';
import { RegisteredUserModule } from './modules/registered-user/registered-user.module';
import { AdminComponent } from './modules/admin/admin.component';
import { AdminModule } from 'src/app/modules/admin/admin.module';
import { DriverModule } from 'src/driver/driver.module';
import { RegisterComponent } from './components/register/register.component';
import { MapComponent } from './components/map/map.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './_service/authconfig.interceptor';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AdminModule,
    UnregisteredUserModule,
    RegisteredUserModule,
    DriverModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
