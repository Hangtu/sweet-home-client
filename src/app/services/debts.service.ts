import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class DebtsService {

  constructor(private http: HttpClient) { }

  getDebts() {
    /*return this.http.get('https://still-mountain-46943.herokuapp.com/findOne').subscribe(result => {
      return result;
    });*/
  }

}
