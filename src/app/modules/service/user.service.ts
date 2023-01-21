import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {UserMessagesListDTO} from "../DTO/UserMessagesListDTO";
import {DriverInfoDTO} from "../DTO/DriverInfoDTO";
import {CreateRideDTO} from "../DTO/CreateRideDTO";
import {Observable} from "rxjs";
import {SendMessageDTO} from "../DTO/SendMessageDTO";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  endpoint: string = 'http://localhost:8000/api/user';
  headers = { 'content-type': 'application/json'}

  getUserMessages(id:number){
    return this.http.get<UserMessagesListDTO>(this.endpoint+"/"+id+'/message')
  }

  getUserById(id:string){
    return this.http.get<DriverInfoDTO>(this.endpoint+"/id/"+id)
  }
  getMessagesBetweenUsers(id:number){
    return this.http.get<UserMessagesListDTO>(this.endpoint+"/"+id+'/messages')
  }
  sendMessage(id:number,message:SendMessageDTO): Observable<any> {
    return this.http.post<SendMessageDTO>(this.endpoint+"/"+id+'/message',message,{'headers':this.headers,observe: 'response',
      responseType: 'json'});
  }

  constructor(private http: HttpClient,private router:Router) { }
}
