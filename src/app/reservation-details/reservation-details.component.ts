import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../app.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-reservation-details',
  templateUrl: './reservation-details.component.html',
  styleUrls: ['./reservation-details.component.css']
})
export class ReservationDetailsComponent implements OnInit {
  @ViewChild('f') travellerDetailsForm: NgForm;
  flight: any;
  genders = ['Male', 'Female'];
  searchData: any;
  fromPlace: string;
  toPlace: string;
  journeyDate: string;
  traveller = {
    firstName: '',
    lastName: '',
    gender: '',
    mobileno: '',
  };

  constructor(private activatedRoute: ActivatedRoute,
              private service: AppService,
              private router: Router) { }

  ngOnInit() {
    this.searchData = this.service.flightSearchDetails;

    this.fromPlace = this.searchData.fromPlace;
    this.toPlace = this.searchData.toPlace;
    this.journeyDate = this.searchData.journeyStartDate;

    this.activatedRoute.params
    .subscribe( params => {
      const id = +params['id'];
      this.flight = this.service.JSONDatum.filter((flight) => flight.id === id )[0];
    });
  }

  onSubmit() {
    this.traveller.firstName = this.travellerDetailsForm.value.firstName;
    this.traveller.lastName = this.travellerDetailsForm.value.lastName;
    this.traveller.gender = this.travellerDetailsForm.value.gender;
    this.traveller.mobileno = this.travellerDetailsForm.value.mobno;

    this.service.travellerInfo(this.traveller, this.flight);

    this.router.navigate(['/confirmation']);
  }
}
