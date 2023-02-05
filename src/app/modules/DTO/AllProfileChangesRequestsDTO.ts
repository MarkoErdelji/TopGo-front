import {ProfileChangeRequestDTO} from "./ProfileChangeRequestDTO";


export interface AllProfileChangesRequestsDTO {
  count: number;
  profileChangeRequestDTOS: ProfileChangeRequestDTO[];
}
