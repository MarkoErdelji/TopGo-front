import { Component, Input, OnInit } from '@angular/core';
import { DriverGraphDTO } from 'src/app/modules/DTO/DriverGraphDTO';
import { NameValueInstance, LineGraphDTO } from 'src/app/modules/DTO/LineGraphDTO';

@Component({
  selector: 'app-admin-seperate-users-earned-graph',
  templateUrl: './admin-seperate-users-earned-graph.component.html',
  styleUrls: ['./admin-seperate-users-earned-graph.component.css']
})
export class AdminSeperateUsersEarnedGraphComponent implements OnInit {

  
  constructor() { }

  ngOnInit(): void {
    this.driverInstance = {name:this.driverData.fullName,series:[]}
    this.averageLine = {name:"Average",series:[]}


    this.colorScheme.push({ 
      name: this.driverData.fullName,
      value: '#FF9642'
    })
    if(this.driverData.data.length == 0){
      return;
    }
    let lastStart:Date =  new Date(this.driverData.data[0].startTime);
    let value = 0; 
    var dateValues = {};
    this.driverData.data.forEach((element) => {
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

  colorScheme:Object[] = [];
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  total:number = 0;
  @Input() view!:[number,number];
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  averageLine!: LineGraphDTO;
  xAxisLabel: string = 'Time';
  yAxisLabel: string = 'Earned (Driver)/Spent (Passenger)';
  timeline: boolean = true;
  @Input()  driverData!:DriverGraphDTO;

  graphData:Object[] = [];
  driverInstance!:LineGraphDTO;

}
