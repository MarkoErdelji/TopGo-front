import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
    this.firstName ="dejan"
    this.lastName = "kalas"
    this.username = "car"
    this.address = "sranja 5"
    this.phone = "123123231"
  }

}
