import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs';
import { DebtsService } from '../services/debts.service';


@Injectable({
  providedIn: 'root'
})
export class AuthCanActivateGuard implements CanActivate {


  constructor ( private debtsService: DebtsService) {

  }


  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

   const isLogged = this.debtsService.validateToken();

    this.debtsService.authState().subscribe( data => { // if there is not current session then logout.
        if (data == null) {
          this.debtsService.authSignOut();
          this.debtsService.goToLogin();
        }
    });

   if (isLogged) {
      return true;
    }

    this.debtsService.goToLogin();
    return false;
  }

  /*CANACTIVATE -> WHEN USER TRIED TO ACTIVATE THE ROUTE (IT LOADS THE JS)
    CANDEACTIVATE -> WHEN USER TRIES TO LEAVE THE ROUTE
    RESOLVE -> RENDER THE APP UNTIL THE OBSERVABLE (HTTP REQUEST) IS DONE
    CANLOAD -> WHEN USER TRIED TO ACTIVATE THE ROUTE (IT DOES NOT LOAD THE JS)
  */

}
