import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Logger } from '../logger.service';
import { ToastService } from '@app/services/toast/toast.service';


const log = new Logger('ErrorHandlerInterceptor');

/**
 * Adds a default error handler to all requests.
 */
@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor(
    public toastService: ToastService,
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError((response: HttpErrorResponse) => this.errorHandler(response)));
  }

  // Customize the default error handler here if needed
  private errorHandler(response: HttpErrorResponse): Observable<HttpEvent<any>> {
    let errorTitle = 'Oops!';
    let errorMsg = 'System error';
  if (!environment.production) {
      if (response.error instanceof ErrorEvent) {
        log.error('This is client side error');
        errorTitle = `Client-side error`;
        errorMsg = `Error: ${response.error.message}`;
        log.error(errorMsg);
      } else {
        log.error('This is server side error');
        errorTitle = `Server-side error`;
        errorMsg = `Error Code: ${response.status},  Message: ${response.message}`;
        log.error(errorMsg);
    }
      // Do something with the error
      this.showToaster(errorTitle, errorMsg);
    }
    throw response;
  }
  // ngbmodal service
  showToaster(title: string, message: string) {
    this.toastService.show(title, message, {
      classname: 'bg-danger text-light',
      delay: 2000,
      autohide: true,
      headertext: title,
    });
  }
}
