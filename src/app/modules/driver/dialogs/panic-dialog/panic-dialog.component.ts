import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UpdatePassengerDTO} from "../../../DTO/UpdatePassengerDTO";
import {RejectionTextDTO} from "../../../DTO/RejectionTextDTO";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-panic-dialog',
  templateUrl: './panic-dialog.component.html',
  styleUrls: ['./panic-dialog.component.css']
})
export class PanicDialogComponent implements OnInit {
  rejectionText?: string;
  panicForm = new FormGroup({
    reason: new FormControl(this.rejectionText, [Validators.required])
  })

  constructor(public dialogRef: MatDialogRef<PanicDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  @Output() rejection: EventEmitter<RejectionTextDTO> = new EventEmitter<RejectionTextDTO>();
  submit() {
    let rejectionTextDTO: RejectionTextDTO= {
      reason: this.panicForm.get("reason")?.value!
    }
    if(this.panicForm.valid){
      this.dialogRef.close(rejectionTextDTO)
    }
  }

  onCancelClick() {
    this.dialogRef.close()
  }
}
