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



@NgModule({
  declarations: [
    DriverComponent,
    DriverMenuComponent,
    DriverProfileComponent,
    DriverInboxComponent,
    DriverHistoryComponent,
    DriverReportsComponent
  ],
  imports: [
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NavbarModule
  ],
  exports: [
    DriverComponent
  ]
})
export class DriverModule { }
