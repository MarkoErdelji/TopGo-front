import { Component, OnInit } from '@angular/core';
import {RideDTO} from "../../../DTO/RideDTO";
import {RideService} from "../../../service/ride.service";
import {AuthService} from "../../../../_service/auth.service";

@Component({
  selector: 'app-registered-history',
  templateUrl: './registered-history.component.html',
  styleUrls: ['./registered-history.component.css']
})
export class RegisteredHistoryComponent implements OnInit {
  lista: RideDTO[] = [];
  date: string = '';

  historyItems: HTMLElement[] = [];
  currentHistoryItem?: HTMLElement;

  constructor(private rideService:RideService, private authService: AuthService) { }

  ngOnInit(): void {
    this.rideService.getPassengerFinishedRide(this.authService.getUserId()).subscribe(response => {
      this.lista = response;
      for(let rideDTO of this.lista){
        let stringDate = rideDTO.startTime;
        let datePart = stringDate.split('T')[0];
        let splitDate = datePart.split('-');
        let d = new Date(parseInt(splitDate[0]),parseInt(splitDate[1])-1,parseInt(splitDate[2]));
        this.date = d.toLocaleDateString();
        console.log(this.date);
      }
    })
  }

  historyItemClick(i: number) {
    if(this.currentHistoryItem != null){
      // @ts-ignore
      this.historyItems = document.querySelectorAll(".round-wrapper")
      // @ts-ignore
      this.historyItems[i].style.boxShadow = '0 0px 7px -1px rgba(255, 150, 66, 1)'
      this.currentHistoryItem.style.removeProperty("box-shadow")
    }
    else{
      // @ts-ignore
      this.historyItems = document.querySelectorAll(".round-wrapper")
      // @ts-ignore
      this.historyItems[i].style.boxShadow = '0 0px 7px -1px rgba(255, 150, 66, 1)'
    }
    // @ts-ignore
    this.currentHistoryItem = this.historyItems[i];
  }
}
