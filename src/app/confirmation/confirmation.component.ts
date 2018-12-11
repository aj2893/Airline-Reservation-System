import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {
  flightDetails: any;
  travellerDetails: any;
  nameSuffix: string;
  journeyDate: string;
  seatno: string;
  constructor(private service: AppService) { }

  ngOnInit() {
    // this.journeyDate = this.service.flightSearchDetails.journeyStartDate;

    this.flightDetails = this.service.flightData;
    // console.log(this.flightDetails);
    this.travellerDetails = this.service.travellerInformation;
    if (this.travellerDetails.gender === 'Male') {
      this.nameSuffix = 'Mr.';
    } else if ( this.travellerDetails.gender === 'Female') {
      this.nameSuffix = 'Ms./Mrs.';
    }

    this.seatno = Math.floor((Math.random() * 20) + 1) + 'B';
  }

}
