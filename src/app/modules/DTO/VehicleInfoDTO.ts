import {GeoLocationDTO} from "./GeoLocationDTO";

export interface VehicleInfoDTO {
  id: number;
  driverId: number;
  vehicleType: string;
  model: string;
  licenseNumber: string;
  currentLocation: GeoLocationDTO;
  passengerSeats: number;
  babyTransport: boolean;
  petTransport: boolean;
}
