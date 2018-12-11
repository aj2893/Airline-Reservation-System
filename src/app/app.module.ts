import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatNativeDateModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { FormsModule  } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { AppComponent } from './app.component';
import { SearchFlightsComponent } from './search-flights/search-flights.component';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { FlightListComponent } from './flight-list/flight-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ReservationDetailsComponent } from './reservation-details/reservation-details.component';
import { MatSortModule } from '@angular/material/sort';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { FlightListGuard } from './flight-list/flight-list.guard';
import { ReservationDetailsGuard } from './reservation-details/reservation-details.guard';
import { ConfirmationGuard } from './confirmation/confirmation.guard';

const routes: Routes = [
  { path: 'search', component: SearchFlightsComponent },
  { path: 'flight-list', canActivate: [ FlightListGuard ] , component: FlightListComponent },
  { path: 'reserve', canActivate: [ ReservationDetailsGuard ], component: ReservationDetailsComponent },
  { path: 'reserve/:id', canActivate: [ ReservationDetailsGuard ], component: ReservationDetailsComponent },
  { path: 'confirmation', canActivate: [ ConfirmationGuard ], component: ConfirmationComponent }
];

export class AppRoutingModule {}

@NgModule({
  declarations: [
    AppComponent,
    SearchFlightsComponent,
    FlightListComponent,
    ReservationDetailsComponent,
    ConfirmationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatInputModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    FormsModule,
    MatCardModule,
    MatRadioModule,
    MatButtonModule,
    HttpClientModule,
    MatSortModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
