import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider } from 'angular-6-social-login';

@Injectable({
  providedIn: 'root'
})
export class DebtsService {

  _url = 'https://sweet-home-heroku.herokuapp.com';
// _url = 'http://192.168.100.71:3000';

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) { }

  login(payload) {
    return this.http.post(this._url + '/login', payload).pipe(
      catchError(this.handleError)
    );
  }

  getDebts() {
    return this.http.get(this._url + '/findOne').pipe(
      catchError(this.handleError)
    );
  }

  updateDebts(payload) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    this.http.post<any>(this._url + '/update', payload, httpOptions).pipe(
      catchError(this.handleError)
    ).subscribe(x => x);
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
      this.setToken(data.token);
      this.router.navigate(['/debt']);
    });
  }

  authState() {
    return this.authService.authState;
  }

  authSignOut() {
    this.authService.signOut().then(() => {
      sessionStorage.clear();
      this.goToLogin();
    }).catch(() => {
      sessionStorage.clear();
    });
    sessionStorage.clear();
    this.goToLogin();
  }

  goToLogin() {
    this.router.navigate(['/']);
  }

  private handleError(err: HttpErrorResponse | any) {
    return throwError(err || err.message);
  }

}
