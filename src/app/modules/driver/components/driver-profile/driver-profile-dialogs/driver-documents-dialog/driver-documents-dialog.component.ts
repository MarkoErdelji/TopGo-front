import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DocumentInfoDTO } from 'src/app/modules/DTO/DocumentInfoDTO';
import { DriverService } from 'src/app/modules/service/driver.service';

@Component({
  selector: 'app-driver-documents-dialog',
  templateUrl: './driver-documents-dialog.component.html',
  styleUrls: ['./driver-documents-dialog.component.css'],
})
export class DriverDocumentsDialogComponent implements OnInit {

  elements?:DocumentInfoDTO[] = [];
  constructor(private driverService:DriverService) { }

  ngOnInit(): void {
    this.driverService.getDriversDocumentsByDriverId(this.driverService.id!).subscribe(response=>{
      this.elements = response;
      console.log(response);
    })
  }

}
