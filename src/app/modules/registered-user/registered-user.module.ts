import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisteredUserComponent } from './registered-user.component';
import { RegisteredUserMenuComponent } from './components/registered-user-menu/registered-user-menu.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { NavbarModule } from '../../components/navbar/navbar.module';
import { MaterialModule } from 'src/infrastructure/material.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MapModule } from 'src/app/components/map/map.module';
import { MapComponent } from 'src/app/components/map/map.component';
import {RegisteredRouteFormComponent} from "./components/registered-route-form/registered-route-form.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { RegisteredProfileComponent } from './components/registered-profile/registered-profile.component';
import { RegisteredHomeComponent } from './components/registered-home/registered-home.component';
import { RegisteredInboxComponent } from './components/registered-inbox/registered-inbox.component';
import { ChatDialogComponent } from './components/registered-route-form/registered-route-form-dialogs/chat-dialog/chat-dialog.component';
import { NotificationDialogComponent } from './components/registered-dialogs/notification-dialog/notification-dialog.component';
import { RideNotificationComponent } from './components/dialogs/ride-notification/ride-notification.component';
import { EditProfileDialogComponent } from './components/registered-profile/registered-profile-dialogs/edit-profile-dialog/edit-profile-dialog.component';
import { PanicDialogComponent } from './components/registered-route-form/registered-route-form-dialogs/panic-dialog/panic-dialog.component';



@NgModule({
    declarations: [
        RegisteredUserComponent,
        RegisteredUserMenuComponent,
        RegisteredRouteFormComponent,
        RegisteredProfileComponent,
        RegisteredHomeComponent,
        RegisteredInboxComponent,
        NotificationDialogComponent,
        ChatDialogComponent,
        RideNotificationComponent,
        EditProfileDialogComponent,
        PanicDialogComponent
    ],

  imports: [
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    MapModule,
    ReactiveFormsModule,
    NavbarModule,
    CommonModule,
    ReactiveFormsModule

  ],
  exports: [
    RegisteredUserComponent
  ]
})
export class RegisteredUserModule { }
