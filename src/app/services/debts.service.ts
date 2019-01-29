import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider } from 'angular-6-social-login';

@Injectable({
  providedIn: 'root'
})
export class DebtsService {

  _url = 'https://still-mountain-46943.herokuapp.com';
  // _url = 'http://192.168.100.71:3000';

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) { }

  login(payload) {
    return this.http.post(this._url + '/login', payload).pipe(
      catchError(this.handleError)
    );
  }

  logout() {
    sessionStorage.setItem('token', '');
    this.authService.signOut();
    this.router.navigate(['/']);
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
    sessionStorage.setItem('token', e);
  }

  validateToken() {
    const token = sessionStorage.getItem('token');
    return (token != null && token !== '' && token !== 'undefined');
  }

  loginFB() {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(data => {
      this.setToken(data.token);
      this.router.navigate(['/debt']);
    });
  }

  loginGoogle() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(data => {
      console.log(data.token);
      this.setToken(data.token);
      this.router.navigate(['/debt']);
    });
  }

  authState() {
    return this.authService.authState;
  }

  authSignOut() {
    this.authService.signOut().then(() => {
      sessionStorage.setItem('token', '');
      this.router.navigate(['/']);
    }).catch(() => {
      sessionStorage.clear();
    });
    sessionStorage.clear();
  }

  private handleError(err: HttpErrorResponse | any) {
    return throwError(err || err.message);
  }


}
