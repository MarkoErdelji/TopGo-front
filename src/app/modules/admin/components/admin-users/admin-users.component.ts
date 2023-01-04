import { Component, HostListener, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserListDTO } from 'src/app/modules/DTO/UserListDTO';
import { UserService } from 'src/app/_service/user.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'surname', 'profilePicture', 'telephoneNumber','address'];
  users:any = [];
  dataSource = new MatTableDataSource<UserListDTO>(this.users);
  page = 0;
  size = 3;
  totalCount = 0;
  loading = false;

  constructor(private userService:UserService) {}

  ngOnInit() {
    this.fetchUsers();
  }


  @HostListener('window:scroll', ['$event'])
  onScroll(event) {
    if (this.totalCount > this.users.length && !this.loading) {
      const offset = event.srcElement.scrollTop + window.innerHeight;
      const height = event.srcElement.offsetHeight;
      if (offset >= height) {
        this.page++;
        this.fetchUsers();
      }
    }
  }

  fetchUsers() {
    this.loading = true;
    this.userService.getUsers(this.page, this.size).subscribe((response) => {
      if(response.status == 200){
        this.users = [...this.users, ...response.body!.results];
        this.totalCount = response.body!.totalCount;
        this.loading = false;
      }
      else{
        alert(response.statusText)
      }
    });
  }
}
