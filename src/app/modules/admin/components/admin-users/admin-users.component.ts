import { HttpErrorResponse, HttpResponseBase } from '@angular/common/http';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { catchError, of } from 'rxjs';
import { RideNotificationComponent } from 'src/app/components/dialogs/ride-notification/ride-notification.component';
import { UserListDTO } from 'src/app/modules/DTO/UserListDTO';
import { UserService } from 'src/app/_service/user.service';
import { AdminCreateNoteDialogComponent } from '../admin-create-note-dialog/admin-create-note-dialog.component';
import { AdminNoteDialogComponent } from '../admin-note-dialog/admin-note-dialog.component';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  displayedColumns: string[] = ['id', 'name', 'surname','email', 'telephoneNumber','address', 'actions'];
  users:any = [];
  dataSource = new MatTableDataSource<UserListDTO>(this.users);
  page = 0;
  size = 10;
  totalCount = 0;

  constructor(private userService:UserService,private dialog: MatDialog) {}

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
        console.log(this.users)
        this.dataSource.data = this.users;
        this.totalCount = response.body!.totalCount;
      }
      else{
        const dialogRef = this.dialog.open(RideNotificationComponent, {
          width: '250px',
          data: {msg:response.statusText}
        });
      }
    });
  }

  block(userId) {
    this.userService.blockUser(userId).pipe(
      catchError((error:HttpErrorResponse) => {
        if(error.status!=204){
          const dialogRef = this.dialog.open(RideNotificationComponent, {
            width: '250px',
            data: {msg:error.error.message}
          });
        }
        return of(error);
      }
      )
    ).subscribe((res:any)=>{
      if(!res){
        let user = this.users.find(user => user.id === userId);
        user.blocked = true;
        const dialogRef = this.dialog.open(RideNotificationComponent, {
          width: '250px',
          data: {msg:"User successfuly blocked!"}
        });

      }
    })
  }


  unblock(userId) {
    this.userService.unblockUser(userId).pipe(
      catchError((error:HttpErrorResponse) => {
        if(error.status!=204){
          const dialogRef = this.dialog.open(RideNotificationComponent, {
            width: '250px',
            data: {msg:error.error.message}
          });
        }
        return of(error);
      }
      )
    ).subscribe((res:any)=>{
      if(!res){
        let user = this.users.find(user => user.id === userId);
        user.blocked = false;
        const dialogRef = this.dialog.open(RideNotificationComponent, {
          width: '250px',
          data: {msg:"User successfuly unblocked!"}
        });
      }
    })
  }
  
  viewNotes(userId){
    let dialogRef = this.dialog.open(AdminNoteDialogComponent,{ panelClass: 'custom-dialog-container' , data: { data: userId } });
  }

  createNote(userId){
    let dialogRef = this.dialog.open(AdminCreateNoteDialogComponent,{ panelClass: 'custom-dialog-container' , data: { data: userId } });
  }
}
