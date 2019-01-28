import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DebtsService {

    // _url = 'https://still-mountain-46943.herokuapp.com';
   _url = 'http://192.168.100.71:3000';

  constructor(private http: HttpClient) { }

  login(payload) {
    return this.http.post(this._url + '/login', payload).pipe(
      catchError(this.handleError)
    );
  }

  logout() {
    sessionStorage.setItem('token', '');
  }

  getDebts() {
    return this.http.get(this._url + '/findOne').pipe(
      catchError(this.handleError)
    );
  }

  updateDebts() {
    return this.http.get(this._url + '/update').pipe(
      catchError(this.handleError)
    );
  }

  setToken(e) {
    sessionStorage.setItem('token', e.token);
  }

  validateToken() {
    return sessionStorage.getItem('token');
}


  private handleError(err: HttpErrorResponse | any) {
    return throwError(err || err.message);
  }


}
