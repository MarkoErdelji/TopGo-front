import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class RegisteredService {
  id?:number;

  endpoint: string = 'http://localhost:8000/api/passenger';

  getPassengerById(id:number){
    return this.http.get<any>(this.endpoint+"/"+id)
  }

  constructor(private http: HttpClient,private router:Router) { }
}
