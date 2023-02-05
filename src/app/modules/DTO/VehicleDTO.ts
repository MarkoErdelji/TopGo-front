import {GeoLocationDTO} from "./GeoLocationDTO";
import {VehicleTypeDTO} from "./VehicleTypeDTO";

export interface VehicleDTO{
  model: string;
  vehicleType: string;
  licenseNumber: string;
  currentLocation: GeoLocationDTO | null;
  passengerSeats: number;
  babyTransport: boolean;
  petTransport: boolean;
}
