import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisteredUserComponent } from './registered-user.component';
import { RegisteredUserMenuComponent } from './components/registered-user-menu/registered-user-menu.component';
import { NavbarComponent } from '../app/components/navbar/navbar.component';
import { NavbarModule } from '../app/components/navbar/navbar.module';
import { MaterialModule } from 'src/infrastructure/material.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MapModule } from 'src/app/components/map/map.module';
import { MapComponent } from 'src/app/components/map/map.component';



@NgModule({
  declarations: [
    RegisteredUserComponent,
    RegisteredUserMenuComponent
  ],
  imports: [
    AppRoutingModule,
    MaterialModule,
    CommonModule,
    NavbarModule,
    MapModule
  ],
  exports: [
    RegisteredUserComponent
  ]
})
export class RegisteredUserModule { }
