import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { UnregisteredUserComponent } from './unregistered-user.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/infrastructure/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarModule } from '../../components/navbar/navbar.module';
import { AppModule } from 'src/app/app.module';
import { MapComponent } from 'src/app/components/map/map.component';
import { MapModule } from 'src/app/components/map/map.module';
import { RouteFormComponent } from './components/route-form/route-form.component';
import { AssumptionDialogComponent } from './components/assumption-dialog/assumption-dialog.component';


@NgModule({
  declarations: [UnregisteredUserComponent, RouteFormComponent, AssumptionDialogComponent ],
  imports: [
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NavbarModule,
    MapModule,
    CommonModule

  ],
  exports:[
    UnregisteredUserComponent
  ]
})
export class UnregisteredUserModule { }
