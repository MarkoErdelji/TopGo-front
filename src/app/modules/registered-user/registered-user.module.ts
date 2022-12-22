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
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
    declarations: [
        RegisteredUserComponent,
        RegisteredUserMenuComponent,
        RegisteredRouteFormComponent
    ],
  imports: [
    AppRoutingModule,
    MaterialModule,
    CommonModule,
    NavbarModule,
    MapModule,
    ReactiveFormsModule
  ],
  exports: [
    RegisteredUserComponent
  ]
})
export class RegisteredUserModule { }
