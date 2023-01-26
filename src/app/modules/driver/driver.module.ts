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
import { MapModule } from 'src/app/components/map/map.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DriverHomeComponent } from './components/driver-home/driver-home.component';
import { DriverCurrentRideComponent } from './components/driver-current-ride/driver-current-ride.component';
import { PanicDialogComponent } from './dialogs/panic-dialog/panic-dialog.component';
import { HistoryInstanceModule } from '../history-instance/history-instance.module';
import {NgxChartsModule} from'@swimlane/ngx-charts';
import { DriverPriceDateGraphComponent } from './components/driver-graphs/driver-price-date-graph/driver-price-date-graph.component';
import { DriverKmDateGraphComponent } from './components/driver-graphs/driver-km-date-graph/driver-km-date-graph.component';
import { DriverNumOfRidesDateGraphComponent } from './components/driver-graphs/driver-num-of-rides-date-graph/driver-num-of-rides-date-graph.component';
import { DriverEarnedPerMonthGraphComponent } from './components/driver-graphs/driver-earned-per-month-graph/driver-earned-per-month-graph.component';



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
    DriverHomeComponent,
    DriverCurrentRideComponent,
    PanicDialogComponent,
    DriverInboxComponent,
    DriverPriceDateGraphComponent,
    DriverKmDateGraphComponent,
    DriverNumOfRidesDateGraphComponent,
    DriverEarnedPerMonthGraphComponent
  ],
  imports: [
    AppRoutingModule,
    MaterialModule,
    HistoryInstanceModule,
    FormsModule,
    NgxChartsModule,
    MapModule,
    ReactiveFormsModule,
    NavbarModule,
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    DriverComponent,DriverMenuComponent,DriverProfileComponent,DriverInboxComponent,DriverHistoryComponent,DriverReportsComponent,DriverProfileEditComponent,DriverChangePasswordDialogComponent,DriverChangeImageDialogComponent
  ]
})
export class DriverModule { }
