import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { LocationDTO } from 'src/unregistered-user/components/route-form/LocationDTO';
import { RouteFormService } from 'src/unregistered-user/components/route-form/route-form.service';
import {MapService} from "./map.service";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  private map: any;
  private location!: LocationDTO;

  constructor(private routeFormService: RouteFormService, private mapService: MapService) { }
  private initMap(): void {
    this.map = L.map('map', {
      center: [45.2396, 19.8227],
      zoom: 13,
    });


    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  route() {
    L.Routing.control({
      waypoints: [L.latLng(57.74, 11.94), L.latLng(57.6792, 11.949)],
    }).addTo(this.map);
  }

  getCoordinates(street: String) {
    return this.mapService.search(street);
  }


  ngAfterViewInit(): void {
    this.initMap();
    this.routeFormService.selectLocation$.subscribe((location)=>{
      this.location = location;
      console.log(this.location.location + " " + this.location.destination)
      let departure: any = this.getCoordinates("Strazilovska 19");
      let destination: any = this.getCoordinates("Strazilovska 30")
      L.Routing.control({
        waypoints: [L.latLng(departure[0].lat, departure[0].lon), L.latLng(destination[0].lat, destination[0].lon)],
      }).addTo(this.map);

    })
  }
}
