import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/infrastructure/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UnregisteredUserRoutingModule } from '../unregistered-user/unregistered-user-routing.module';
import { NavbarModule } from '../app/components/navbar/navbar.module';
import { AdminComponent } from './admin.component';
import { AdminMenuComponent } from './components/admin-menu/admin-menu.component';



@NgModule({
  declarations: [AdminComponent, AdminMenuComponent],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    UnregisteredUserRoutingModule,
    NavbarModule
  ],
  exports: [AdminComponent]
})
export class AdminModule { }
