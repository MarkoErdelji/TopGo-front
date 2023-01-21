import { Component, OnInit } from '@angular/core';
import {ProfileChangesRequestService} from "../../../service/profile-changes-request.service";
import {AllProfileChangesRequestsDTO} from "../../../DTO/AllProfileChangesRequestsDTO";
import {ProfileChangeRequestDTO} from "../../../DTO/ProfileChangeRequestDTO";
import {DriverInfoDTO} from "../../../DTO/DriverInfoDTO";
import {Router} from "@angular/router";
import {DriverService} from "../../../service/driver.service";

@Component({
  selector: 'app-request-notification',
  templateUrl: './request-notification.component.html',
  styleUrls: ['./request-notification.component.css']
})
export class RequestNotificationComponent implements OnInit {
  imageUrl?: string;
  profileChangesRequests?: AllProfileChangesRequestsDTO;

  profileRequest?: HTMLElement[]
  lista?:ProfileChangeRequestDTO[]
  profileChangeDTO?:ProfileChangeRequestDTO;
  currentRequest?:HTMLElement;
  mainImageUrl?: string;
  driverId?: number;
  firstName?: string;
  lastName?: string;
  username?: string;
  address?: string;
  phone?: string;
  oldFirstName?: string;
  oldLastName?: string;
  oldUsername?: string;
  oldAddress?: string;
  oldPhoneNumber?: string;


  constructor(private profileChangesRequestServcice:ProfileChangesRequestService, private router: Router, private driverService:DriverService) { }

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

  onRequestiClick(i: number) {
    if(this.currentRequest != null){
      // @ts-ignore
      this.profileRequest = document.querySelectorAll(".reques-containter")
      // @ts-ignore
      this.profileRequest[i].style.boxShadow = '0 0px 7px -1px rgba(255, 150, 66, 1)'
      this.currentRequest.style.removeProperty("box-shadow")
    }
    else{
      // @ts-ignore
      this.profileRequest = document.querySelectorAll(".reques-containter")
      // @ts-ignore
      this.profileRequest[i].style.boxShadow = '0 0px 7px -1px rgba(255, 150, 66, 1)'
    }
    // @ts-ignore
    this.currentRequest = this.profileRequest[i];
    // @ts-ignore
    let mainContent: HTMLElement = document.getElementById("new-old-data");
    mainContent.style.visibility = "visible";
    // @ts-ignore
    this.profileChangeDTO = this.lista[i];
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

    this.driverService.getDriverById(this.driverId).subscribe(response=>{
      this.oldFirstName = response.name;
      this.oldLastName = response.surname;
      this.oldUsername = response.email;
      this.oldAddress = response.address;
      this.oldPhoneNumber = response.telephoneNumber;
    })

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
      // @ts-ignore
      this.profileChangesRequestServcice.deleteRequest(this.profileChangeDTO.id).subscribe(res=>{
      })
      window.alert("Driver updated succesfully")
      this.router.navigate(['admin'])

    })

  }

  declineChanges() {
    console.log(this.profileChangeDTO);
    // @ts-ignore
    this.profileChangesRequestServcice.deleteRequest(this.profileChangeDTO.id).subscribe(res=>{
    })
    window.alert("Edit request declined")
    this.router.navigate(['admin'])

  }

}
