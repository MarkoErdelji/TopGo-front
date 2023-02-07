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
import { DriverModule } from 'src/app/modules/driver/driver.module';
import { RegisterComponent } from './components/register/register.component';
import { MapComponent } from './components/map/map.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './_service/authconfig.interceptor';
import { ForgotPasswordComponent } from './components/login/password-reset/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/login/password-reset/reset-password/reset-password.component';
import { FontAwesomeModule,FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {faStar,faStarHalf} from'@fortawesome/free-solid-svg-icons';
import {PanicDialogComponent} from "./modules/driver/dialogs/panic-dialog/panic-dialog.component";
import { RideNotificationComponent } from './components/dialogs/ride-notification/ride-notification.component';




@NgModule({
  declarations: [
    RideNotificationComponent,
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    DriverModule,
    ReactiveFormsModule,
    AdminModule,
    UnregisteredUserModule,
    RegisteredUserModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faStar);
    library.addIcons(faStarHalf);
  }
 }
