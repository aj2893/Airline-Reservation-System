import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root'
})
export class FlightListGuard implements CanActivate {
  constructor(private router: Router,
              private service: AppService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (next.url.length >= 1) {
        if ( !(this.service.JSONDatum.length > 0) ) {
          // alert('Please select a board');
          this.router.navigate(['/search']);
          return false;
        }
      }
    return true;
  }
}
