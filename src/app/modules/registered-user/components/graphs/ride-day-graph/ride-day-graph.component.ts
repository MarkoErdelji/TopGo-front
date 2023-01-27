import {Component, Input, OnInit} from '@angular/core';
import {LineGraphDTO} from "../../../../DTO/LineGraphDTO";

@Component({
  selector: 'app-ride-day-graph',
  templateUrl: './ride-day-graph.component.html',
  styleUrls: ['./ride-day-graph.component.css']
})
export class RideDayGraphComponent implements OnInit {
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
  yAxisLabel: string = 'Rides';
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

      this.driverInstance = {name:"Rides",series:[]}
      let lastStart:Date = new Date(1970,12,10);
      let numOfRides = 0;
      this.rides.forEach((res)=>{
          let dateStart = new Date( res.startTime)
          if(dateStart.toDateString() == lastStart.toDateString()){
            numOfRides+=1;
            if(this.rides.indexOf(res) == this.rides.length-1){
              console.log(numOfRides)
              this.driverInstance.series.push({name:dateStart.toDateString(),value:numOfRides})
            }
            return
          }
          else{
            lastStart = dateStart;
            if(numOfRides == 0){
              numOfRides = 1
            }
            console.log(numOfRides)
            this.driverInstance.series.push({name:dateStart.toDateString(),value:numOfRides})
            numOfRides = 0}
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
