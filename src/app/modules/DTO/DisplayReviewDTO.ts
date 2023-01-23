import { RideReviewDTO } from "./RideReviewDTO";
import { UserListResponseDTO } from "./UserListDTO";

export interface DisplayReviewDTO{
    review:RideReviewDTO;
    passenger:UserListResponseDTO;
}