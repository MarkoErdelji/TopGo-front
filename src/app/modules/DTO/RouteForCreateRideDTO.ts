import {GeoLocationDTO} from "./GeoLocationDTO";

export interface RouteForCreateRideDTO {
  departure: GeoLocationDTO;
  destination: GeoLocationDTO;
  lenght:number;
}
