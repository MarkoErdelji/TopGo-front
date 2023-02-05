import { Component, OnInit } from '@angular/core';
import {MapService} from "../../components/map/map.service";
import {DriverService} from "../service/driver.service";
import {PanicDTO} from "../DTO/PanicDTO";
import {PanicService} from "../service/panic.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor() {

  }

  ngOnInit(): void {
  }




}
