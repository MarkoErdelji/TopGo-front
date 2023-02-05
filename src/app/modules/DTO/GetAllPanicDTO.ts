import {PanicDTO} from "./PanicDTO";

export  interface GetAllPanicDTO {
  totalCount: number;
  results: PanicDTO[];
}
