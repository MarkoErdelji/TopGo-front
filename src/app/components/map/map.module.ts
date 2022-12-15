import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map.component';
import {MapService} from "./map.service";
import {HttpClient, HttpClientModule} from '@angular/common/http';



@NgModule({
  declarations: [MapComponent],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [MapService],
  exports: [MapComponent]
})
export class MapModule { }
