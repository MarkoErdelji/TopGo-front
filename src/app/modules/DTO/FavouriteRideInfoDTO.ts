import {RouteForCreateRideDTO} from "./RouteForCreateRideDTO";
import {UserRef} from "./UserRef";

export interface FavouriteRideInfoDTO {
  id:number;
  favoriteName: string;
  locations: RouteForCreateRideDTO[];
  passengers: UserRef[];
  vehicleType: string;
  babyTransport: boolean;
  petTransport: boolean;
}
