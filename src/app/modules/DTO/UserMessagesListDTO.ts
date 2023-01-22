import {UserMessagesDTO} from "./UserMessagesDTO";

export interface UserMessagesListDTO {
  totalCount: number;
  results: UserMessagesDTO[];
}
