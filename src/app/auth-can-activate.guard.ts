import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthCanActivateGuard implements CanActivate {

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log('can activate'); // When you try to access to some route
    return true;
  }

  /*CANACTIVATE -> WHEN USER TRIED TO ACTIVATE THE ROUTE (IT LOADS THE JS)
    CANDEACTIVATE -> WHEN USER TRIES TO LEAVE THE ROUTE
    RESOLVE -> RENDER THE APP UNTIL THE OBSERVABLE (HTTP REQUEST) IS DONE
    CANLOAD -> WHEN USER TRIED TO ACTIVATE THE ROUTE (IT DOES NOT LOAD THE JS)
  */

}
