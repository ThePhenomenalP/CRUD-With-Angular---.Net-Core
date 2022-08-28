import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpEventType,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AlertHttpInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap((value) => {
        if (value.type == HttpEventType.Sent) {
          console.log('Sent');
        } else if (value.type == HttpEventType.Response) {
          console.log('Response');
        }
      })
    );
  }
}
