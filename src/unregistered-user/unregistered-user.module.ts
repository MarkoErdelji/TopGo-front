import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../app/components/navbar/navbar.component';
import { UnregisteredUserComponent } from './unregistered-user.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/infrastructure/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarModule } from '../app/components/navbar/navbar.module';
import { AppModule } from 'src/app/app.module';
import { MapComponent } from 'src/app/components/map/map.component';
import { MapModule } from 'src/app/components/map/map.module';
import { RouteFormComponent } from './components/route-form/route-form.component';


@NgModule({
  declarations: [UnregisteredUserComponent, RouteFormComponent ],
  imports: [
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NavbarModule,
    MapModule

  ],
  exports:[
    UnregisteredUserComponent
  ]
})
export class UnregisteredUserModule { }
