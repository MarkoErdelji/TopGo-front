import {Component, Input, OnInit} from '@angular/core';
import {LineGraphDTO, NameValueInstance} from "../../../../DTO/LineGraphDTO";

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
  total:number = 0;
  averageLine!: LineGraphDTO;



  constructor() {}


  ngOnInit(): void {

    this.DrawGraph()

  }

  DrawGraph()
  {

    this.driverInstance = {name:"Money",series:[]}
    this.averageLine = {name:"Average",series:[]}


    this.colorScheme.push({
      name: "Money",
      value: '#FF9642'
    })

    if(this.rides.length == 0){
      return;
    }
    let lastStart:Date =  new Date(this.rides[0].startTime);

    let value = 0;
    var dateValues = {};
    this.rides.forEach((element) => {
      let date = new Date(element.startTime);
      let day:string = date.getDate().toString();
      let month:string = (date.getMonth()+1).toString();
      let year:string = date.getFullYear().toString();
      let value = element.totalCost;
      if(month.toString().length == 1){
        month = "0"+month;
      }
      if(day.toString().length == 1){
        day = "0"+day;
      }
      let key = `${month}-${day}-${year}`;
      if (!dateValues[key]) {
        dateValues[key] = value;
      } else {
        dateValues[key] += value;
      }
    });
    let dateValueList = Object.entries(dateValues).map(([date, value]) => {
      return {date: date, value: value};
    });
    dateValueList.forEach((res)=>{
        this.driverInstance.series.push({name:res.date,value:res.value as number})
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



  updateRides(newRides: any[]) {
    this.rides =[]
    this.graphData = []
    this.rides = newRides;
    console.log(this.rides)
    this.DrawGraph()

  }
}
