import {Component, Input, OnInit} from '@angular/core';
import {LineGraphDTO} from "../../../../DTO/LineGraphDTO";

@Component({
  selector: 'app-km-per-day-graph',
  templateUrl: './km-per-day-graph.component.html',
  styleUrls: ['./km-per-day-graph.component.css']
})
export class KmPerDayGraphComponent implements OnInit {

  @Input() rides: any[] = [];
  view: [number,number] = [400, 400];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Date';
  yAxisLabel: string = 'Km';
  timeline: boolean = true;
  graphData:Object[] = [];
  driverInstance!:LineGraphDTO;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  constructor() {}


  ngOnInit(): void {
    this.DrawGraph()

  }

  DrawGraph()
  {

    this.driverInstance = {name:"Km",series:[]}
    let lastStart:Date = new Date(1970,12,10);
    let value = 0;
    this.rides.forEach((res)=>{
        let dateStart = new Date( res.startTime)
        if(dateStart.toDateString() == lastStart.toDateString()){
          value+=res.locations[0].lenght;
          if(this.rides.indexOf(res) == this.rides.length-1){

            this.driverInstance.series.push({name:dateStart.toDateString(),value:value})
          }
          return
        }
        else{
          lastStart = dateStart;
          if(value == 0){
            value = res.locations[0].lenght
          }
          this.driverInstance.series.push({name:dateStart.toDateString(),value:value})
          value = 0}
      }

    )
    this.graphData.push(this.driverInstance);
  }



  updateRides(newRides: any[]) {
    this.rides =[]
    this.graphData = []
    this.rides = newRides;
    console.log(this.rides)
    this.DrawGraph()

  }
}
