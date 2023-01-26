import { Component, Input, OnInit } from '@angular/core';
import { DriverGraphDTO } from 'src/app/modules/DTO/DriverGraphDTO';
import { LineGraphDTO } from 'src/app/modules/DTO/LineGraphDTO';

@Component({
  selector: 'app-driver-num-of-rides-date-graph',
  templateUrl: './driver-num-of-rides-date-graph.component.html',
  styleUrls: ['./driver-num-of-rides-date-graph.component.css']
})
export class DriverNumOfRidesDateGraphComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.driverInstance = {name:this.driverData.fullName,series:[]}
    this.colorScheme.push({ 
      name: this.driverData.fullName,
      value: '#FF9642'
    })
    let lastStart:Date = new Date(1970,12,10);
    let numOfRides = 0; 
    this.driverData.data.forEach((res)=>{
      let dateStart = new Date( res.startTime)
      if(dateStart.toDateString() == lastStart.toDateString()){
        numOfRides+=1;
        return
      }
      else{
        lastStart = dateStart;
        if(numOfRides == 0){
          numOfRides = 1
        }
        this.driverInstance.series.push({name:dateStart.toDateString(),value:numOfRides})
        numOfRides = 0}
      }
      
    )
    this.graphData.push(this.driverInstance);
  }

  colorScheme:Object[] = [];
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Time';
  yAxisLabel: string = 'Earned';
  timeline: boolean = true;
  @Input()  driverData!:DriverGraphDTO;

  graphData:Object[] = [];
  driverInstance!:LineGraphDTO;

  onSelect(rideDtos): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(rideDtos)));
  }

  onActivate(rideDtos): void {
    console.log('Activate', JSON.parse(JSON.stringify(rideDtos)));
  }

  onDeactivate(rideDtos): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(rideDtos)));
  }
}
