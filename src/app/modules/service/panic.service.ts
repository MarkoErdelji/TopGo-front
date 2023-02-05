import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {RideReviewListDTO} from "../DTO/RideReviewDTO";
import {GetAllPanicDTO} from "../DTO/GetAllPanicDTO";

@Injectable({
  providedIn: 'root'
})
export class PanicService {

  headers = { 'content-type': 'application/json'}

  endpoint: string = 'http://localhost:8000/api/panic';

  constructor(private http: HttpClient,private router:Router) { }

  getAllPanic(): Observable<GetAllPanicDTO> {
    return this.http.get<GetAllPanicDTO>(this.endpoint);
  }
}
