import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { Sort } from '@angular/material';

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.css']
})
export class FlightListComponent implements OnInit {
  flights: any = [];
  flightLists: any;
  searchData: any;
  fromPlace: string;
  toPlace: string;
  journeyDate: string;
  time: Date;
  id: number;
  departTime: any;
  arrivedTime: any;
  journeyDuration: number;
  hh: number;
  mm: number;


  constructor(private service: AppService,
              private router: Router) { }

  ngOnInit() {
    this.searchData = this.service.flightSearchDetails;

    // console.log(this.flights);
    this.service.JSONDatum.forEach(element => {
      if (element.fromPlace === this.searchData.fromPlace &&
        element.toPlace === this.searchData.toPlace &&
        element.travelDate === this.searchData.journeyStartDate) {
          this.flights.push(element);
          // this.id = element.id - 1;
          // this.flights.push(this.getDuration(this.searchData.journeyStartDate,
          //   this.service.JSONDatum[this.id].journeyStartTime,
          //   this.service.JSONDatum[this.id].destinationReachTime));
        }
    });
    // console.log(this.flights);
    this.fromPlace = this.searchData.fromPlace;
    this.toPlace = this.searchData.toPlace;
    this.journeyDate = this.searchData.journeyStartDate;
  }

  getDuration(journeyDate: string, journeyTime: string, arrivalTime: string) {
    this.departTime = new Date( +journeyDate.split('/')[2], +journeyDate.split('/')[0], +journeyDate.split('/')[1],
    +journeyTime.split(':')[0], +journeyTime.split(':')[1] );
    this.arrivedTime = new Date( +journeyDate.split('/')[2], +journeyDate.split('/')[0], +journeyDate.split('/')[1],
    +arrivalTime.split(':')[0], +arrivalTime.split(':')[1] );
    // console.log(journeyDate + ' ' + journeyTime + ' '  + arrivalTime + '-' + this.departTime.toTimeString());
    this.journeyDuration  = this.arrivedTime - this.departTime;

    this.hh = Math.floor(this.journeyDuration / 1000 / 60 / 60);
    this.journeyDuration -= this.hh * 1000 * 60 * 60;
    this.mm = Math.floor(this.journeyDuration / 1000 / 60);

    return this.hh + '-' + this.mm ;
  }

  sortData(sort: Sort) {
    const data = this.flights.slice();

    if (!sort.active || sort.direction === '') {
      this.flights = data;
    }

    this.flights = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'departure': return compare(a.journeyStartTime, b.journeyStartTime, isAsc);
        case 'arrival': return compare(a.destinationReachTime, b.destinationReachTime, isAsc);
        case 'duration': return compare(a.flightDuration, b.flightDuration, isAsc);
        case 'price': return compare(a.amount, b.amount, isAsc);
      }
    } );
  }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
