import {Component, Input, OnInit} from '@angular/core';

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
  xAxisLabel: string = 'Year';
  yAxisLabel: string = 'Population';
  timeline: boolean = true;
  data:any[]=[]

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  constructor() {}


  ngOnInit(): void {
      /*let dat :any =
        {
          name:"bla",
          series: []
        }
        console.log("bla")
        console.log(this.rides)
        this.rides.forEach(ride =>
        {
          let ser :any =
            {
              name: ride.price,
              value: ride.startDate

            }
            dat.series.push(ser);

        })
    this.data.push(dat)*/
    }


  updateRides(newRides: any[]) {
    this.rides =[]
    this.rides = newRides;
    console.log(this.rides)
  }
}
