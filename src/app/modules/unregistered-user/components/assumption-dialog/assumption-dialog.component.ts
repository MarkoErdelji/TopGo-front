import {Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UnregisteredUserResponseDTO } from 'src/app/modules/DTO/UnregisteredUserDTO';

@Component({
  selector: 'app-assumption-dialog',
  templateUrl: './assumption-dialog.component.html',
  styleUrls: ['./assumption-dialog.component.css']
})
export class AssumptionDialogComponent implements OnInit {

  outputData!: UnregisteredUserResponseDTO;

  constructor(
    public dialogRef: MatDialogRef<AssumptionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.outputData = this.data!.data;
    this.outputData.estimatedCost = Math.floor(this.outputData.estimatedCost*100)/100;
    this.outputData.estimatedTimeInMinutes = Math.floor(this.outputData.estimatedTimeInMinutes*100)/100;
  }

}
