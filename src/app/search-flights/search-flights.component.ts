import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-search-flights',
  templateUrl: './search-flights.component.html',
  styleUrls: ['./search-flights.component.css']
})
export class SearchFlightsComponent implements OnInit {
  showReturnDateField = false;
  flightLists: any;
  date1: Date;
  date2: Date;
  @ViewChild('f') searchForm: NgForm;

  user = {
    fromPlace: '',
    toPlace: '',
    journeyStartDate: '',
    returnJourney: false,
    returnJourneyDate: ''
  };

  constructor(private router: Router,
              private service: AppService) { }

  ngOnInit() {
    this.service.getFlightLists()
    .subscribe(
      data => this.flightLists = data
    );
  }

  switchPlaces() {
    this.searchForm.form.patchValue({
      journeyPlace1 : this.searchForm.value.journeyPlace2,
      journeyPlace2 : this.searchForm.value.journeyPlace1
    });
  }

  showReturnDate(value: string) {
    this.showReturnDateField = `${value}` === 'Y';
  }

  onSubmit() {
    this.user.fromPlace = this.searchForm.value.journeyPlace1;
    this.user.toPlace = this.searchForm.value.journeyPlace2;
    this.date1 = this.searchForm.value.journeyDate1;
    this.date1 = new Date(this.date1);
    this.user.journeyStartDate = (this.date1.getMonth() + 1 ) + '/' + this.date1.getDate() + '/' + this.date1.getFullYear();
    // console.log(this.user.journeyStartDate);
    this.user.returnJourney = this.showReturnDateField;
    if (this.showReturnDateField) {
      this.date2 = this.searchForm.value.journeyDate2;
      this.date2 = new Date(this.date2);
      this.user.returnJourneyDate = (this.date2.getMonth() + 1 ) + '/' + this.date2.getDate() + '/' + this.date2.getFullYear();
      // this.user.returnJourneyDate = this.searchForm.value.journeyDate2;
    }

    this.service.sharedData(this.user, this.flightLists);
    this.router.navigate(['/flight-list']);
  }
}
