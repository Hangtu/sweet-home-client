import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DebtsService } from '../services/debts.service';


@Injectable({
  providedIn: 'root'
})
export class AuthCanActivateGuard implements CanActivate {

  constructor (private router: Router, private debtsService: DebtsService) {

  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // console.log(''); // When you try to access to some route
    const isLogged = this.debtsService.validateToken();

    if (isLogged) {
      return true;
    }

    this.router.navigate(['/']);
    return false;

  }

  /*CANACTIVATE -> WHEN USER TRIED TO ACTIVATE THE ROUTE (IT LOADS THE JS)
    CANDEACTIVATE -> WHEN USER TRIES TO LEAVE THE ROUTE
    RESOLVE -> RENDER THE APP UNTIL THE OBSERVABLE (HTTP REQUEST) IS DONE
    CANLOAD -> WHEN USER TRIED TO ACTIVATE THE ROUTE (IT DOES NOT LOAD THE JS)
  */

}
