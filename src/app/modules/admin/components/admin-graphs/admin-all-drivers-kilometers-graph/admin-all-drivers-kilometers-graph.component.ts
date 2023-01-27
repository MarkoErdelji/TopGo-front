import { Component, Input, OnInit } from '@angular/core';
import { DriverGraphDTO } from 'src/app/modules/DTO/DriverGraphDTO';
import { NameValueInstance, LineGraphDTO } from 'src/app/modules/DTO/LineGraphDTO';

@Component({
  selector: 'app-admin-all-drivers-kilometers-graph',
  templateUrl: './admin-all-drivers-kilometers-graph.component.html',
  styleUrls: ['./admin-all-drivers-kilometers-graph.component.css']
})
export class AdminAllDriversKilometersGraphComponent implements OnInit {


  constructor() { }

  
  ngOnInit(): void {
    this.averageLine = {name:"Average",series:[]}
    this.driverData.forEach((driverGraph)=>{
      this.driverInstance = {name:driverGraph.fullName,series:[]}
      this.averageLine = {name:"Average",series:[]}
  
      if(driverGraph.data.length == 0){
        return;
      }
      let lastStart:Date =  new Date(driverGraph.data[0].startTime);
      let value = 0; 
      var dateValues = {};
      driverGraph.data.forEach((element) => {
        let date = new Date(element.startTime);
        let day:string = date.getDate().toString();
        let month:string = (date.getMonth()+1).toString();
        let year:string = date.getFullYear().toString();
        let value = element.locations[0].lenght;
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
      this.allInstances.push(this.driverInstance);
    })

    this.total = 0;
    let average = 0;
    let len = 0
    this.allInstances.forEach((instance)=>{
      len+=instance.series.length;
      instance.series.forEach((point)=>{
        this.total+=point.value;
      })
    })
    average = this.total/len;
    this.allInstances.forEach((instance)=>{
      len+=instance.series.length;
      instance.series.forEach((point)=>{
        this.averageLine.series.push(<NameValueInstance>{name:point.name,value:average})
      })
    })
    this.allInstances.forEach((instance)=>{
      this.graphData.push(instance);
    })
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
  yAxisLabel: string = 'Distance in km';
  timeline: boolean = true;
  @Input()  driverData!:DriverGraphDTO[];

  graphData:Object[] = [];
  allInstances:LineGraphDTO[] = [];
  driverInstance!:LineGraphDTO;

}
