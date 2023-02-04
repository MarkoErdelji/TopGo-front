import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { RideNotificationComponent } from 'src/app/components/dialogs/ride-notification/ride-notification.component';
import { CreateNoteDTO } from 'src/app/modules/DTO/CreateNoteDTO';
import { UserService } from 'src/app/_service/user.service';
import { AdminNoteDialogComponent } from '../admin-note-dialog/admin-note-dialog.component';

@Component({
  selector: 'app-admin-create-note-dialog',
  templateUrl: './admin-create-note-dialog.component.html',
  styleUrls: ['./admin-create-note-dialog.component.css']
})
export class AdminCreateNoteDialogComponent implements OnInit,OnDestroy {

  createNoteForm = new FormGroup({
    createNoteMessageControl: new FormControl("",[Validators.required,Validators.maxLength(255)])
  });
  private subscriptions: Subscription[] = [];

  constructor(private dialog:MatDialog,private userService:UserService,private dialogRef: MatDialogRef<AdminNoteDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }
  createNote(){
    if(this.createNoteForm.valid){
      let message = this.createNoteForm.controls.createNoteMessageControl.value;
      let dto:CreateNoteDTO = {message:message||''};
      dto!.message = message || '';
      this.subscriptions.push(this.userService.addUserNote(this.data.data,dto).subscribe((res)=>{
        const dialogRef = this.dialog.open(RideNotificationComponent, {
          width: '250px',
          data: {msg:"Note successfuly added!"}
        });
        this.dialogRef.close(true);
      }))
    

    }
  }

  ngOnDestroy(){
    this.subscriptions.forEach(subscription=>{subscription.unsubscribe()});
  }
}
