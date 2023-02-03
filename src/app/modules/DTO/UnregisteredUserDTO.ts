import { GeoLocationDTO } from "./GeoLocationDTO";

export interface UnregisteredUserResponseDTO{
    estimatedCost:number;
    estimatedTimeInMinutes:number;
}


export interface UnregisteredUserDTO {
    locations: DepartureDestinationDTO[];
    vehicleType: string;
    babyTransport: boolean;
    petTransport: boolean;
}

export interface DepartureDestinationDTO{
    departure:GeoLocationDTO;
    destination:GeoLocationDTO;
}