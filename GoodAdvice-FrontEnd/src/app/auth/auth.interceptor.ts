import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.headers.get('No-Auth') == "True")
      return next.handle(request.clone());

    if (localStorage.getItem('userToken') != null) {
      const cloneRequest = request.clone({
        //headers: request.headers.set('Authorization', 'Bearer ' + localStorage.getItem('userToken'))

        setHeaders: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`
        }
      });

      return next.handle(cloneRequest);
      // .succ
      // (

      // )
    } else {
      this.router.navigate(['/login']);
    }
  }
}
