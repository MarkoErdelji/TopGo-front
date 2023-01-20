import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DriverComponent } from './driver.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/infrastructure/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarModule } from 'src/app/components/navbar/navbar.module';
import { DriverMenuComponent } from './components/driver-menu/driver-menu.component';
import { DriverProfileComponent } from './components/driver-profile/driver-profile.component';
import { DriverInboxComponent } from './components/driver-inbox/driver-inbox.component';
import { DriverHistoryComponent } from './components/driver-history/driver-history.component';
import { DriverReportsComponent } from './components/driver-reports/driver-reports.component';
import { DriverVehicleDialogComponent } from './components/driver-profile/driver-profile-dialogs/driver-vehicle-dialog/driver-vehicle-dialog.component';
import { DriverDocumentsDialogComponent } from './components/driver-profile/driver-profile-dialogs/driver-documents-dialog/driver-documents-dialog.component';
import { DriverProfileEditComponent } from './components/driver-profile/driver-profile-edit/driver-profile-edit.component';
import { DriverChangePasswordDialogComponent } from './components/driver-profile/driver-profile-dialogs/driver-change-password-dialog/driver-change-password-dialog.component';
import { DriverChangeImageDialogComponent } from './components/driver-profile/driver-profile-dialogs/driver-change-image-dialog/driver-change-image-dialog.component';
import { DriverNotificationsComponent } from './components/driver-notifications/driver-notifications.component';
import { HistoryInstanceComponent } from './components/driver-history/history-instance/history-instance.component';



@NgModule({
  declarations: [
    DriverComponent,
    DriverMenuComponent,
    DriverProfileComponent,
    DriverInboxComponent,
    DriverHistoryComponent,
    DriverReportsComponent,
    DriverVehicleDialogComponent,
    DriverDocumentsDialogComponent,
    DriverProfileEditComponent,
    DriverChangePasswordDialogComponent,
    DriverChangeImageDialogComponent,
    DriverNotificationsComponent,
    HistoryInstanceComponent,
  ],
  imports: [
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NavbarModule,
    CommonModule
  ],
  exports: [
    DriverComponent,DriverMenuComponent,DriverProfileComponent,DriverInboxComponent,DriverHistoryComponent,DriverReportsComponent,DriverProfileEditComponent,DriverChangePasswordDialogComponent,DriverChangeImageDialogComponent
  ]
})
export class DriverModule { }
