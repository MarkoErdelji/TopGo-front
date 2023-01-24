import {RouteForCreateRideDTO} from "./RouteForCreateRideDTO";
import {UserRef} from "./UserRef";


export interface CreateRideDTO {
  locations: RouteForCreateRideDTO[];
  passengers: UserRef[];
  vehicleType: string;
  babyTransport: boolean;
  petTransport: boolean;
}


export interface CreateScheduledRideDTO {
  locations: RouteForCreateRideDTO[];
  passengers: UserRef[];
  vehicleType: string;
  babyTransport: boolean;
  petTransport: boolean;
  scheduledTime: string;
}