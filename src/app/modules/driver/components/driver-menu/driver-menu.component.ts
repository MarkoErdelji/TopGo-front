import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_service/auth.service';

@Component({
  selector: 'app-driver-menu',
  templateUrl: './driver-menu.component.html',
  styleUrls: ['./driver-menu.component.css']
})
export class DriverMenuComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {

  }

  logout(){
    AuthService.doLogout();
  }
}
