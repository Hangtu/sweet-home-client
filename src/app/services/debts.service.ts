import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DebtsService {

   _url = 'https://still-mountain-46943.herokuapp.com/findOne';

  constructor(private http: HttpClient) { }

  getDebts() {
    return this.http.get(this._url).pipe(
      catchError(this.handleError)
    );
  }


  private handleError(err: HttpErrorResponse | any) {
    console.log(err);
    return throwError(err || err.message);
  }


}
