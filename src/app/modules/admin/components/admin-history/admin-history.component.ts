import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DisplayReviewDTO } from 'src/app/modules/DTO/DisplayReviewDTO';
import { DriverInfoDTO } from 'src/app/modules/DTO/DriverInfoDTO';
import { RideDTO } from 'src/app/modules/DTO/RideDTO';
import { SortParameters } from 'src/app/modules/DTO/SortParameters';
import { UserListResponseDTO } from 'src/app/modules/DTO/UserListDTO';
import { DriverService } from 'src/app/modules/service/driver.service';
import { ReviewService } from 'src/app/modules/service/review.service';
import { RideService } from 'src/app/modules/service/ride.service';
import { UserService } from 'src/app/_service/user.service';

@Component({
  selector: 'app-admin-history',
  templateUrl: './admin-history.component.html',
  styleUrls: ['./admin-history.component.css']
})
export class AdminHistoryComponent implements OnInit {

  rideDtos:RideDTO[] = []
  userid;
  ridesLoaded:boolean = false;
  selectedRide?:RideDTO;
  startDateOnlyDate:string = '';
  startDate:string = '';
  endDate:string = '';
  driver!:DriverInfoDTO;
  passengerInfo:UserListResponseDTO[] = [];
  driverReviews:DisplayReviewDTO[] = [];
  vehicleReviews:DisplayReviewDTO[] = [];
  itemLoaded:boolean = false;
  selectedSortParam:string;
  selectedDatetime: Date | undefined;
  sortParams: (string | SortParameters)[] | undefined;


  constructor(private route:ActivatedRoute,private rideService:RideService,private driverService:DriverService,private reviewService:ReviewService,private userService:UserService) {
    this.sortParams = Object.keys(SortParameters).filter(key => !isNaN(Number(SortParameters[key])));
    this.selectedSortParam = SortParameters[0]; }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userid = params['id'];
      });
      console.log(this.userid);
    this.userService.getUsersRides(this.userid,0,9000,this.selectedSortParam.toLowerCase()).subscribe(response=>{
      console.log(response)
      response.body!.results.forEach((element)=>{
        if(element.status == "FINISHED"){
          this.rideDtos.push(element);
        }
      })
      this.ridesLoaded = true;
    })
  }


  selectRide(rideDto:RideDTO){
    if(rideDto.id == this.selectedRide?.id){
      return
    }
    
    let dateStart = new Date( rideDto.startTime)
    this.startDate = dateStart.toLocaleString()
    let stringDate = rideDto.startTime;
    let datePart = stringDate.split('T')[0];
    let splitDate = datePart.split('-');
    let d = new Date(parseInt(splitDate[0]),parseInt(splitDate[1])-1,parseInt(splitDate[2]));
    this.startDateOnlyDate = d.toLocaleDateString();
    let dateEnd = new Date( rideDto.endTime)
    this.endDate = dateEnd.toLocaleString()
    this.driverReviews = [];
    this.vehicleReviews = []
    this.passengerInfo = [];
    this.selectedRide = rideDto;
    this.selectedRide.passengers.forEach((passenger)=>{
      this.userService.getUserById(passenger.id).subscribe((response)=>
      {
        this.passengerInfo.push(response.body!);
      })
    })
    this.reviewService.getRideReviews(this.selectedRide.id).subscribe((review)=>{
      review.forEach(element => {
        this.userService.getUserById(element.passenger.id).subscribe(passengerInfo=>{
          if(element.type == "DRIVER"){
            this.driverReviews.push({passenger:passengerInfo.body!,review:element})
          }
          else if(element.type == "VEHICLE"){
            this.vehicleReviews.push({passenger:passengerInfo.body!,review:element})
          }
        })

      });
      this.itemLoaded=true;
    })
    this.driverService.getDriverById(this.selectedRide.driver.id).subscribe((driver)=>{
      this.driver = driver;
    })
  }


  onOptionSelected() {
    this.ridesLoaded = false;
    this.rideDtos = [];
    this.userService.getUsersRides(this.userid,0,9000,this.selectedSortParam.toLowerCase()).subscribe(response=>{
      console.log(response)
      response.body!.results.forEach((element)=>{
          this.rideDtos.push(element);
      })
      this.ridesLoaded = true;
    })
  }


}
