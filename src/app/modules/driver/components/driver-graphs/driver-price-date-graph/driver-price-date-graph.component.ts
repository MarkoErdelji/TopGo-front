import { Component, Input, OnInit } from '@angular/core';
import { DriverGraphDTO } from 'src/app/modules/DTO/DriverGraphDTO';
import { LineGraphDTO, NameValueInstance } from 'src/app/modules/DTO/LineGraphDTO';
import { RideDTO } from 'src/app/modules/DTO/RideDTO';

@Component({
  selector: 'app-driver-price-date-graph',
  templateUrl: './driver-price-date-graph.component.html',
  styleUrls: ['./driver-price-date-graph.component.css']
})
export class DriverPriceDateGraphComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.driverInstance = {name:this.driverData.fullName,series:[]}
    this.averageLine = {name:"Average",series:[]}


    this.colorScheme.push({ 
      name: this.driverData.fullName,
      value: '#FF9642'
    })
<<<<<<< Updated upstream
    let lastStart:Date = new Date(1970,12,10);
=======
    if(this.driverData.data.length == 0){
      return;
    }
    let lastStart:Date =  new Date(this.driverData.data[0].startTime);
>>>>>>> Stashed changes
    let value = 0; 
    this.driverData.data.forEach((res)=>{
      let dateStart = new Date( res.startTime)
      if(dateStart.toDateString() == lastStart.toDateString()){
        value+=res.totalCost;
        if(this.driverData.data.indexOf(res) == this.driverData.data.length-1){
          this.driverInstance.series.push({name:dateStart.toDateString(),value:value})
        }
        return
      }
      else{
        lastStart = dateStart;
        if(value == 0){
          value = res.totalCost
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
  xAxis: boolean = true;
  total:number = 0;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Time';
  yAxisLabel: string = 'Earned';
  averageLine!: LineGraphDTO;
  @Input() view!:[number,number];

  timeline: boolean = true;
  @Input()  driverData!:DriverGraphDTO;

  graphData:Object[] = [];
  driverInstance!:LineGraphDTO;

}
