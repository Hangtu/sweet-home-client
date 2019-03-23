import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider } from 'angular-6-social-login';
import { debounceTime } from 'rxjs/operators';

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
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    const payload = {
       userID : sessionStorage.getItem('userID'),
    };

    return this.http.post(this._url + '/findOne', payload, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  updateDebts(payload) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    payload['token'] = sessionStorage.getItem('token');
    payload['userID'] =  sessionStorage.getItem('userID');

    this.http.post<any>(this._url + '/update', payload, httpOptions).pipe(
      catchError(this.handleError)
    ).subscribe(x => x);
  }

  updateDebtContent(payload) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    payload['token'] = sessionStorage.getItem('token');
    payload['userID'] =  sessionStorage.getItem('userID');

    return this.http.post<any>(this._url + '/updateContent', payload, httpOptions).pipe(debounceTime(5000),
      catchError(this.handleError)
    );
  }

  saveDebts(payload) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    payload['token'] = sessionStorage.getItem('token');
    payload['userID'] =  sessionStorage.getItem('userID');

    return this.http.post<any>(this._url + '/save', payload, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  deleteDebt(payload) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    payload['token'] = sessionStorage.getItem('token');
    payload['userID'] =  sessionStorage.getItem('userID');

    return this.http.post<any>(this._url + '/delete', payload, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  setToken(e) {
    sessionStorage.setItem('token', e);
  }

  setUserId(e) {
    sessionStorage.setItem('userID', e);
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
      this.setUserId(data.id);
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

  goToDebt() {
    this.router.navigate(['/debt']);
  }

  private handleError(err: HttpErrorResponse | any) {
    return throwError(err || err.message);
  }

}
