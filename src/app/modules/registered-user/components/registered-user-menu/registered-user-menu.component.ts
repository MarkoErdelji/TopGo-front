import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_service/auth.service';

@Component({
  selector: 'app-registered-user-menu',
  templateUrl: './registered-user-menu.component.html',
  styleUrls: ['./registered-user-menu.component.css']
})
export class RegisteredUserMenuComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  logout(){
    AuthService.doLogout();
  }
}
