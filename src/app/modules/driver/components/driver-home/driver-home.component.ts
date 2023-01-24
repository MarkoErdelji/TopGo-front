import { Component, OnInit } from '@angular/core';
import {MapService} from "../../../../components/map/map.service";
import {AuthService} from "../../../../_service/auth.service";
import {DriverService} from "../../../service/driver.service";


@Component({
  selector: 'app-driver-home',
  templateUrl: './driver-home.component.html',
  styleUrls: ['./driver-home.component.css']
})
export class DriverHomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
