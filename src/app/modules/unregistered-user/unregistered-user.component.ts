import { Component, OnInit } from '@angular/core';
import { MapComponent } from 'src/app/components/map/map.component';
import { DriverService } from '../service/driver.service';

@Component({
  selector: 'app-unregistered-user',
  templateUrl: './unregistered-user.component.html',
  styleUrls: ['./unregistered-user.component.css']
})
export class UnregisteredUserComponent implements OnInit {

  

  constructor() { }

  ngOnInit(): void {

  }


}
