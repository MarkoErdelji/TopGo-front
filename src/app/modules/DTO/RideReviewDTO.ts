import { UserRef } from "./UserRef";



export interface RideReviewListDTO {
    totalCount: number;
    results: RideReviewDTO[];
}


export interface RideReviewDTO {
    id: number;
    rating: number;
    comment: string;
    passenger: UserRef;
    type:ReviewType;
  }

export const enum ReviewType {
    DRIVER,
    VEHICLE
}