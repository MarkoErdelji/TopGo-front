import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-favourite-name-dialog',
  templateUrl: './favourite-name-dialog.component.html',
  styleUrls: ['./favourite-name-dialog.component.css']
})
export class FavouriteNameDialogComponent implements OnInit {

  favName: any;

  constructor(
    public dialogRef: MatDialogRef<FavouriteNameDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {

  }

  onSendClick() {
    this.dialogRef.close(this.favName);
  }
}
