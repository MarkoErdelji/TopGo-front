import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { LocationDTO } from 'src/app/modules/unregistered-user/components/route-form/LocationDTO';
import { RouteFormService } from 'src/app/modules/service/route-form.service';
import {MapService} from "./map.service";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  private map: any;
  private location!: LocationDTO;
  private previouseRouteControl: L.Routing.Control | null = null;

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

  createRoute() {

    const map = this.map as L.Map;
    map.zoomOut(6);
    this.mapService.search(this.location.location).subscribe({
      next: (departure) =>{
        console.log(location)
        this.mapService.search(this.location.destination).subscribe({
          next:(destination) => {
            console.log(destination)
            const routeControl = L.Routing.control({
              router: L.Routing.osrmv1({
                serviceUrl: `http://router.project-osrm.org/route/v1/`
              }),
              show: false,
              routeWhileDragging: true,
              waypoints: [L.latLng(departure[0].lat, departure[0].lon), L.latLng(destination[0].lat, destination[0].lon)],
            }).addTo(this.map);
            this.previouseRouteControl = routeControl;
          }
        })
      }
    });
    if(this.previouseRouteControl != null){
      const map = this.map as L.Map;
      map.removeControl(this.previouseRouteControl);
    }
  }


  ngAfterViewInit(): void {
    this.initMap();
    this.routeFormService.selectLocation$.subscribe({next:(location)=>{

      this.location = location;
        if(this.location.location && this.location.destination) {
          console.log(this.location.location)
          console.log(this.location.destination)
          this.createRoute();
        }
   } })
  }
}
