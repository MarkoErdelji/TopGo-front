import { Component, Input, OnInit } from '@angular/core';
import { inputNames } from '@angular/material/schematics/ng-update/data';
import { RideDTO } from 'src/app/modules/DTO/RideDTO';

@Component({
  selector: 'app-history-instance',
  templateUrl: './history-instance.component.html',
  styleUrls: ['./history-instance.component.css']
})
export class HistoryInstanceComponent implements OnInit {

  @Input() rideDTO!:RideDTO
  date!:string;
  constructor() { }

  ngOnInit(): void {
    let stringDate = this.rideDTO.startTime;
    let datePart = stringDate.split('T')[0];
    let splitDate = datePart.split('-');
    let d = new Date(parseInt(splitDate[0]),parseInt(splitDate[1])-1,parseInt(splitDate[2]));
    this.date = d.toLocaleDateString();

  }

}
