import { Component, Input, OnInit } from '@angular/core';
import { DriverGraphDTO } from 'src/app/modules/DTO/DriverGraphDTO';
import { LineGraphDTO, NameValueInstance } from 'src/app/modules/DTO/LineGraphDTO';

@Component({
  selector: 'app-driver-num-of-rides-date-graph',
  templateUrl: './driver-num-of-rides-date-graph.component.html',
  styleUrls: ['./driver-num-of-rides-date-graph.component.css']
})
export class DriverNumOfRidesDateGraphComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.driverInstance = {name:this.driverData.fullName,series:[]}
    this.averageLine = {name:"Average",series:[]}


    this.colorScheme.push({ 
      name: this.driverData.fullName,
      value: '#FF9642'
    })
    let lastStart:Date = new Date(1970,12,10);
    let value = 0; 
    this.driverData.data.forEach((res)=>{
      let dateStart = new Date( res.startTime)
      if(dateStart.toDateString() == lastStart.toDateString()){
        value+=1;
        if(this.driverData.data.indexOf(res) == this.driverData.data.length-1){
          this.driverInstance.series.push({name:dateStart.toDateString(),value:value})
        }
        return
      }
      else{
        lastStart = dateStart;
        if(value == 0){
          value = 1
        }
        this.driverInstance.series.push({name:dateStart.toDateString(),value:value})

        value = 0}
      }
      
    )
    this.total = 0;
    let average = 0;
    let len = this.driverInstance.series.length; 
    this.driverInstance.series.forEach((res)=>{
      this.total+= res.value
    })
    average = this.total/len;
    this.driverInstance.series.forEach((res)=>{
      this.averageLine.series.push(<NameValueInstance>{name:res.name,value:average})
    })
    this.graphData.push(this.driverInstance);
    this.graphData.push(this.averageLine);
  }

  colorScheme:Object[] = [];
  showLabels: boolean = true;
  animations: boolean = true;
  total:number = 0;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  averageLine!: LineGraphDTO;
  xAxisLabel: string = 'Time';
  yAxisLabel: string = 'Num of rides';
  timeline: boolean = true;
  @Input() view!:[number,number];
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
