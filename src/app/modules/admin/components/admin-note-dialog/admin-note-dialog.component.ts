import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoteResponseDTO, UserNoteListDTO } from 'src/app/modules/DTO/UserNoteListDTO';
import { UserService } from 'src/app/_service/user.service';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-admin-note-dialog',
  templateUrl: './admin-note-dialog.component.html',
  styleUrls: ['./admin-note-dialog.component.css']
})
export class AdminNoteDialogComponent implements OnInit {

  elements?:NoteResponseDTO[] = [];
  constructor(private userService:UserService,private dialogRef: MatDialogRef<AdminNoteDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.userService.getUsersNotes(this.data.data,0,3000).subscribe(res=>{
      console.log(res)
      this.elements = res.body?.results || [];
    })
  }

}
