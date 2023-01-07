import { RejectionDTO } from "./RejectionDTO";
import { RouteForCreateRideDTO } from "./RouteForCreateRideDTO";
import { UserRef } from "./UserRef";

export interface RideDTO {
    id: number;
    startTime: string;
    endTime: string;
    totalCost: number;
    driver: UserRef;
    passengers: UserRef[];
    estimatedTimeInMinutes: number;
    vehicleType: string;
    babyTransport: boolean;
    petTransport: boolean;
    rejection: RejectionDTO;
    locations: RouteForCreateRideDTO[];
    status: string;
  }