import {
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpErrorResponse,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { LoggerService } from '@services/logger/logger.service';

@Injectable({
  providedIn: 'root'
})

// global http calls error handling
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private loggerService: LoggerService) { }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        this.loggerService.debug(error.message);
        return throwError(error);
      })
    ) as Observable<HttpEvent<any>>;
  }
}
