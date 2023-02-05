import { DriverService } from '../service/driver.service';
import {Component, OnInit, ViewChild} from '@angular/core';
import {MapComponent} from "../../components/map/map.component";
import {RouteFormService} from "../service/route-form.service";


@Component({
  selector: 'app-unregistered-user',
  templateUrl: './unregistered-user.component.html',
  styleUrls: ['./unregistered-user.component.css']
})
export class UnregisteredUserComponent implements OnInit {


  @ViewChild('map') mapComponent?: MapComponent;
  constructor(private driverService:DriverService, private routeFormService: RouteFormService) { }

  ngOnInit(): void {
    this.driverService.getOnlyActive().subscribe(res=>console.log(res))
  }


}
