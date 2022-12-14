import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { LocationDTO } from './LocationDTO';
import { RouteFormService } from './route-form.service';

@Component({
  selector: 'app-route-form',
  templateUrl: './route-form.component.html',
  styleUrls: ['./route-form.component.css']
})
export class RouteFormComponent implements OnInit {
  routeForm = new FormGroup({
    location: new FormControl("", [Validators.required]),
    destination: new FormControl("", [Validators.required])

  });
  constructor(private routeFormService: RouteFormService) {
  }

  ngOnInit(): void {
  }
  submit() {
    let locationDTO: LocationDTO=<LocationDTO>{
      location: this.routeForm.get("location")?.value!,
      destination: this.routeForm.get("destination")?.value!
    }
    this.routeFormService.setLocation(locationDTO)
  }

}
