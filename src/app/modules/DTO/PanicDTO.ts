import {UserListResponseDTO} from "./UserListDTO";
import {RideDTO} from "./RideDTO";

export interface PanicDTO {
  id: number;
  user: UserListResponseDTO;
  ride: RideDTO;
  time: Date;
  reason: string;
}
