import { Component, OnInit } from '@angular/core';
import {RegisteredService} from "../../../service/registered.service";
import {DistanceAndAverageDTO} from "../../../DTO/DistanceAndAverageDTO";
import {PassengerInfoDTO} from "../../../DTO/PassengerInfoDTO";

@Component({
  selector: 'app-registered-profile',
  templateUrl: './registered-profile.component.html',
  styleUrls: ['./registered-profile.component.css']
})
export class RegisteredProfileComponent implements OnInit {
  firstName: any;
  lastName: any;
  username: any;
  address: any;
  phone: any;
  pfp: any;

  constructor(private passengerService:RegisteredService) { }

  ngOnInit(): void {
    this.passengerService.getPassengerById(this.passengerService.id || 0).subscribe(passenger =>
    {
      console.log(passenger)
      this.firstName =passenger.name;
      this.lastName = passenger.surname;
      this.username = passenger.email;
      this.address = passenger.address;
      this.pfp = passenger.profilePicture;
      this.phone = passenger.telephoneNumber;
    });

  }

}
