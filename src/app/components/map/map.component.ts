
import {Component, AfterViewInit, OnDestroy} from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { LocationDTO } from 'src/app/modules/unregistered-user/components/route-form/LocationDTO';
import { RouteFormService } from 'src/app/modules/service/route-form.service';
import {MapService} from "./map.service";
import {DriverService} from "../../modules/service/driver.service";
import {GeoLocationDTO} from "../../modules/DTO/GeoLocationDTO";
import {DriverInfoDTO} from "../../modules/DTO/DriverInfoDTO";
import {marker} from "leaflet";
import {AuthService} from "../../_service/auth.service";
import {DistanceAndAverageDTO} from "../../modules/DTO/DistanceAndAverageDTO";



@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  private map: any;
  private location!: LocationDTO;
  private previouseRouteControl: L.Routing.Control | null = null;


  private markerList: L.Marker[] = [];

  private selectedLocation!:L.Marker;



  constructor(private routeFormService: RouteFormService, private mapService: MapService,private driverService:DriverService ,private authService:AuthService) { }
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
            routeControl.on('routesfound', (e) => {
              let routes = e.routes;
              let distanceAndAverage:DistanceAndAverageDTO =
                {
                  distance:routes[0].summary.totalDistance/1000,
                  average:Math.round(routes[0].summary.totalTime % 3600 / 60)
                }
                this.mapService.setDistanceAndAverage(distanceAndAverage);
              // alert distance and time in km and minutes
            });

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

  addDriverMarker(driver:DriverInfoDTO) : void {

    this.driverService.getDriverVehicle(driver.id).subscribe(vehicle =>
    {
      let marker = new L.Marker([vehicle.currentLocation.latitude, vehicle.currentLocation.longitude],{icon: greenIcon});
      marker.addTo(this.map);
      marker.bindPopup(driver.name + " " + driver.surname,{autoClose: true});
      this.markerList.push(marker)
      let mService :MapService = this.mapService;
      marker.on('click', function(e) {
        mService.setDriver(driver);
      });

    })




  }

  ngAfterViewInit(): void {
    this.initMap();
    this.registerOnClick();
    this.routeFormService.selectLocation$.subscribe({next:(location)=>{

      this.location = location;
        if(this.location.location && this.location.destination) {
          console.log(this.location.location)
          console.log(this.location.destination)
          this.createRoute();
        }
   } })
    this.driverService.selectLocation$.subscribe({next:(driver)=>{

        if(driver) {
          this.addDriverMarker(driver)
        }
      } })

    this.routeFormService.RemoveMarkers$.subscribe({next:(remove)=>{
        console.log("remove");
        this.markerList.forEach(marker => marker.remove());
      } })

  }

  registerOnClick(): void {
    this.map.on('contextmenu', (e: any) => {
      const coord = e.latlng;
      const lat = coord.lat;
      const lng = coord.lng;
      this.mapService.reverseSearch(lat, lng).subscribe((res) => {
        console.log(res.display_name);
        this.mapService.setMapClick(res.display_name)
      });
      console.log(
        'You clicked the map at latitude: ' + lat + ' and longitude: ' + lng
      );
      if (this.selectedLocation != undefined)
      this.selectedLocation.remove();
      this.selectedLocation = new L.Marker([lat, lng],{icon: arrowIcon}).addTo(this.map);
    });
  }


}



let  greenIcon = L.icon({
  iconUrl: 'assets/images/carIcon.png',

  iconSize:     [75, 75], // size of the icon
  iconAnchor:   [32, 32], // point of the icon which will correspond to marker's location
  popupAnchor:  [-3, -35] // point from which the popup should open relative to the iconAnchor
});
let  arrowIcon = L.icon({
  iconUrl: 'assets/images/arrowIcon.png',

  iconSize:     [30, 30], // size of the icon
  iconAnchor:   [15, 30], // point of the icon which will correspond to marker's location
});

