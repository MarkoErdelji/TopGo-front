import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserListDTO } from 'src/app/modules/DTO/UserListDTO';
import { UserService } from 'src/app/_service/user.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  displayedColumns: string[] = ['id', 'name', 'surname', 'telephoneNumber','address', 'actions'];
  users:any = [];
  dataSource = new MatTableDataSource<UserListDTO>(this.users);
  page = 0;
  size = 10;
  totalCount = 0;

  constructor(private userService:UserService) {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.fetchUsers();
  }


  fetchUsers(event?: PageEvent) {
    if(event){
      this.size = event.pageSize;
      this.page = event.pageIndex;
    }
    this.userService.getUsers(this.page, this.size).subscribe((response) => {
      if(response.status == 200){
        this.users = response.body!.results;
        this.dataSource.data = this.users;
        this.totalCount = response.body!.totalCount;
      }
      else{
        alert(response.statusText)
      }
    });
  }
  
}
