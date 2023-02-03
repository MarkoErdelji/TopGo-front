import { Component, OnInit } from '@angular/core';
import {ProfileChangesRequestService} from "../../../service/profile-changes-request.service";
import {AllProfileChangesRequestsDTO} from "../../../DTO/AllProfileChangesRequestsDTO";
import {ProfileChangeRequestDTO} from "../../../DTO/ProfileChangeRequestDTO";
import {DriverInfoDTO} from "../../../DTO/DriverInfoDTO";
import {Router} from "@angular/router";
import {DriverService} from "../../../service/driver.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {RideNotificationComponent} from "../../../../components/dialogs/ride-notification/ride-notification.component";
import { Subscription } from 'rxjs';

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
  oldProfilePicture: any;

  private subscriptions: Subscription[] = [];



  constructor(private dialog: MatDialog,private profileChangesRequestServcice:ProfileChangesRequestService, private router: Router, private driverService:DriverService) { }

  getData(){
    this.subscriptions.push(this.profileChangesRequestServcice.getAllRequests().subscribe(data=>{
      this.profileChangesRequests = data
      this.lista = data.profileChangeRequestDTOS

      console.log(this.profileChangesRequests.profileChangeRequestDTOS)
    }))
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

    this.subscriptions.push(this.driverService.getDriverById(this.driverId).subscribe(response=>{
      this.oldFirstName = response.name;
      this.oldLastName = response.surname;
      this.oldUsername = response.email;
      this.oldAddress = response.address;
      this.oldProfilePicture = response.profilePicture;
      this.oldPhoneNumber = response.telephoneNumber;
    }))

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
    this.subscriptions.push(this.profileChangesRequestServcice.updateDriver(driverDTO).subscribe(response=>{
      // @ts-ignore
      this.subscriptions.push(this.profileChangesRequestServcice.deleteRequest(this.profileChangeDTO.id).subscribe(res=>{
      }))
      const dialogRef = this.dialog.open(RideNotificationComponent, {
        width: '250px',
        data: {msg:"Driver updated succesfully!"}
      });
      this.router.navigate(['admin'])

    }))

  }

  declineChanges() {
    console.log(this.profileChangeDTO);
    // @ts-ignore
    this.subscriptions.push(this.profileChangesRequestServcice.deleteRequest(this.profileChangeDTO.id).subscribe(res=>{
    }));
    window.alert("Edit request declined")
    this.router.navigate(['admin'])

  }

  ngOnDestroy(){
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

}
