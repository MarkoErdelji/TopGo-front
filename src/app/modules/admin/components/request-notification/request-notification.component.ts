import { Component, OnInit } from '@angular/core';
import {ProfileChangesRequestService} from "../../../service/profile-changes-request.service";
import {AllProfileChangesRequestsDTO} from "../../../DTO/AllProfileChangesRequestsDTO";
import {ProfileChangeRequestDTO} from "../../../DTO/ProfileChangeRequestDTO";
import {DriverInfoDTO} from "../../../DTO/DriverInfoDTO";
import {Router} from "@angular/router";

@Component({
  selector: 'app-request-notification',
  templateUrl: './request-notification.component.html',
  styleUrls: ['./request-notification.component.css']
})
export class RequestNotificationComponent implements OnInit {
  imageUrl?: string;
  profileChangesRequests?: AllProfileChangesRequestsDTO;

  lista?:ProfileChangeRequestDTO[]
  mainImageUrl?: string;
  driverId?: number;
  firstName?: string;
  lastName?: string;
  username?: string;
  address?: string;
  phone?: string;


  constructor(private profileChangesRequestServcice:ProfileChangesRequestService, private router: Router) { }

  getData(){
    this.profileChangesRequestServcice.getAllRequests().subscribe(data=>{
      this.profileChangesRequests = data
      this.lista = data.profileChangeRequestDTOS
      for(let item of this.lista){
        this.imageUrl = item.profilePicture
      }

      console.log(this.profileChangesRequests.profileChangeRequestDTOS)
    })
  }
  ngOnInit(): void {
    this.getData()

  }

  onViewChangesBtnClick(i: number) {
    // @ts-ignore
    this.driverId = this.lista[i].driverId

    // @ts-ignore
    this.mainImageUrl = this.lista[i].profilePicture
    // @ts-ignore
    this.firstName = this.lista[i].firstName
    // @ts-ignore
    this.lastName = this.lista[i].lastName
    // @ts-ignore
    this.username = this.lista[i].email
    // @ts-ignore
    this.address = this.lista[i].address
    // @ts-ignore
    this.phone = this.lista[i].phoneNumber

  }

  acceptChanges() {
    let driverDTO:DriverInfoDTO = {
        id: this.driverId!,
        name: this.firstName!,
        surname: this.lastName!,
        email: this.username!,
        telephoneNumber: this.phone!,
        profilePicture: this.mainImageUrl!,
        address: this.address!
    }

    console.log(driverDTO)
    this.profileChangesRequestServcice.updateDriver(driverDTO).subscribe(response=>{
      window.alert("Driver updated succesfully")
      this.router.navigate(['admin'])
    })

  }

  declineChanges() {
    window.alert("Edit request declined")
    this.router.navigate(['admin'])
  }
}
