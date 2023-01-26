import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {RejectionTextDTO} from "../DTO/RejectionTextDTO";
import {UpdatePassengerDTO} from "../DTO/UpdatePassengerDTO";
import {PassengerInfoDTO} from "../DTO/PassengerInfoDTO";
import {InviteFriendDTO} from "../DTO/InviteFriendDTO";
import {UserRidesListDTO} from "../DTO/UserRidesListDTO";

@Injectable({
  providedIn: 'root'
})
export class RegisteredService {
  id?:number;
  headers = { 'content-type': 'application/json'}

  endpoint: string = 'http://localhost:8000/api/passenger';

  getPassengerById(id:number){
    return this.http.get<any>(this.endpoint+"/"+id)
  }

  getPassengerRides(passengerId,sortParam){
    return this.http.get<UserRidesListDTO>(this.endpoint+"/"+passengerId+"/ride?sort="+sortParam.toLowerCase(),{observe: 'response',
      responseType: 'json'});
  }
  editProfile(id, info:UpdatePassengerDTO){
    return this.http.put<PassengerInfoDTO>(this.endpoint+"/"+id,info,{'headers':this.headers,observe: 'response',
      responseType: 'json'});
  }
  invite(id){
    return this.http.put<InviteFriendDTO>(this.endpoint+"/ride/invite/"+id,{'headers':this.headers,observe: 'response',
      responseType: 'json'});
  }
  inviteRespond(response){
    return this.http.put<InviteFriendDTO>(this.endpoint+"/ride/response",response,{'headers':this.headers,observe: 'response',
      responseType: 'json'});
  }

  constructor(private http: HttpClient,private router:Router) { }
}
