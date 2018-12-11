import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AppService {
  flightSearchDetails: {};
  travellerInformation: {};
  flightData: {};
  flightList: any;
  JSONDatum = [];
  public JSONUrl = '/assets/flights.json';

  constructor(private http: HttpClient) {
  }

  getFlightLists() {
    return this.http.get(this.JSONUrl)
    .pipe(
      tap(data => this.flightList = data)
    );
  }

  sharedData(data: any, JSONData: any) {
    this.flightSearchDetails = data;
    this.JSONDatum = JSONData;
  }

  travellerInfo(data: any, flightData: any) {
    this.travellerInformation = data;
    this.flightData = flightData;
  }
}
