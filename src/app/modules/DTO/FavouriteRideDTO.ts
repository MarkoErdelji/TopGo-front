import {RouteForCreateRideDTO} from "./RouteForCreateRideDTO";
import {UserRef} from "./UserRef";

export interface FavouriteRideDTO {
  favoriteName: string;
  locations: RouteForCreateRideDTO[];
  passengers: UserRef[];
  vehicleType: string;
  babyTransport: boolean;
  petTransport: boolean;
}
