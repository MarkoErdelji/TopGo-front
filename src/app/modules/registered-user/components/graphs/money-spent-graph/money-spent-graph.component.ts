import {Component, Input, OnInit} from '@angular/core';
import {LineGraphDTO} from "../../../../DTO/LineGraphDTO";

@Component({
  selector: 'app-money-spent-graph',
  templateUrl: './money-spent-graph.component.html',
  styleUrls: ['./money-spent-graph.component.css']
})
export class MoneySpentGraphComponent implements OnInit {

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
  yAxisLabel: string = 'RSD';
  timeline: boolean = true;
  graphData:Object[] = [];
  driverInstance!:LineGraphDTO;
  colorScheme:Object[] = [];



  constructor() {}


  ngOnInit(): void {
    this.colorScheme.push({
      name: "Money Spent",
      value: '#FF9642'
    })
    this.DrawGraph()

  }

  DrawGraph()
  {

    this.driverInstance = {name:"Money Spent",series:[]}
    let lastStart:Date = new Date(1970,12,10);
    let value = 0;
    this.rides.forEach((res)=>{
        let dateStart = new Date( res.startTime)
        if(dateStart.toDateString() == lastStart.toDateString()){
          value+=res.totalCost;
          if(this.rides.indexOf(res) == this.rides.length-1){
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
