import { RideDTO } from "./RideDTO";


export interface UserRidesListDTO{
    totalCount: number;
    results: RideDTO[];
}