import { Component, Input, OnInit } from '@angular/core';
import { DriverGraphDTO } from 'src/app/modules/DTO/DriverGraphDTO';
import { LineGraphDTO, NameValueInstance } from 'src/app/modules/DTO/LineGraphDTO';

@Component({
  selector: 'app-driver-earned-per-month-graph',
  templateUrl: './driver-earned-per-month-graph.component.html',
  styleUrls: ['./driver-earned-per-month-graph.component.css']
})
export class DriverEarnedPerMonthGraphComponent implements OnInit {

  constructor() { }
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Time';
  yAxisLabel: string = 'Earned';
  timeline: boolean = true;
  @Input() view!:[number,number];
  @Input()  driverData!:DriverGraphDTO;

  graphData:Object[] = [];
  driverInstance!:LineGraphDTO;

  monthData:NameValueInstance[] = [{name:'January',value:0},
  {name:'February',value:0},
  {name:'March',value:0},
  {name:'April',value:0},
  {name:'May',value:0},
  {name:'June',value:0},
  {name:'July',value:0},
  {name:'August',value:0},
  {name:'September',value:0},
  {name:'October',value:0},
  {name:'November',value:0},
  {name:'December',value:0}]
  
  colorScheme:Object[] = [
    { 
      name: 'January',
      value: '#FF9642'
    }
    ,{ 
      name: 'February',
      value: '#FF9642'
    },{ 
      name: 'March',
      value: '#FF9642'
    },{ 
      name: 'April',
      value: '#FF9642'
    },{ 
      name: 'May',
      value: '#FF9642'
    },{ 
      name: 'June',
      value: '#FF9642'
    },{ 
      name: 'July',
      value: '#FF9642'
    },{ 
      name: 'August',
      value: '#FF9642'
    },{ 
      name: 'September',
      value: '#FF9642'
    },{ 
      name: 'October',
      value: '#FF9642'
    },{ 
      name: 'November',
      value: '#FF9642'
    },{ 
      name: 'December',
      value: '#FF9642'
    }
  ];
  ngOnInit(): void {
    this.driverData.data.forEach((res)=>{
      let dateStart = new Date( res.startTime)
      let currentYearStart = new Date(new Date().getFullYear(),0,1).getTime();
      let currentYearEnd = new Date(new Date().getFullYear(),11,31,23,59,59,999).getTime();
      if(dateStart.getTime() >= currentYearStart && dateStart.getTime() <= currentYearEnd) {
        let month = dateStart.getMonth();
        this.monthData[month].value+=res.totalCost;
      }
      }
      
    )
  }

}
