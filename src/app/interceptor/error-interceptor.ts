import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// import { AuthenticationService } from '@/_services';
// http://jasonwatmore.com/post/2018/11/16/angular-7-jwt-authentication-example-tutorial
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
     // private authenticationService: AuthenticationService
      ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      /*console.log('httpInterceptor');
       request = request.clone({
              setHeaders: {Authorization: `Bearer 1234`},
              setParams: {title: 'home'}
        });

        console.log(request);*/

        return next.handle(request).pipe(catchError(err => {
           if (err.status === 401) {
                // console.log('You are not able to go here');
            }

            return throwError(err);
        }));
    }
}
