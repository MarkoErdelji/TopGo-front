import { DriverService } from '../service/driver.service';
import {Component, OnInit, ViewChild} from '@angular/core';
import {MapComponent} from "../../components/map/map.component";


@Component({
  selector: 'app-unregistered-user',
  templateUrl: './unregistered-user.component.html',
  styleUrls: ['./unregistered-user.component.css']
})
export class UnregisteredUserComponent implements OnInit {


  @ViewChild('map') mapComponent?: MapComponent;
  constructor() { }

  ngOnInit(): void {

  }


}
