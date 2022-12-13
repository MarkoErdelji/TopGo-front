import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LocationDTO } from './LocationDTO';
import { RouteFormService } from './route-form.service';

@Component({
  selector: 'app-route-form',
  templateUrl: './route-form.component.html',
  styleUrls: ['./route-form.component.css']
})
export class RouteFormComponent implements OnInit {
  routeForm = new FormGroup({
    location: new FormControl(""),
    destination: new FormGroup("")

  });
  constructor(private routeFormService: RouteFormService) { 
  }

  ngOnInit(): void {
  }
  submit() {
    let locationDTO: LocationDTO=<LocationDTO>{
      location: this.routeForm.value.location,
      destination: this.routeForm.value.destination
    }
    this.routeFormService.setLocation(locationDTO)
  }

}
