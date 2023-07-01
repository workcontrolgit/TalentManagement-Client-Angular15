import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Logger } from '../logger.service';
import { ToastService } from '@app/services/toast/toast.service';
import { ModalService } from '@app/services/modal/modal.service';

const log = new Logger('ErrorHandlerInterceptor');

/**
 * Adds a default error handler to all requests.
 */
@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(private modalService: ModalService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError((response: HttpErrorResponse) => this.errorHandler(response)));
  }

  // Customize the default error handler here if needed
  private errorHandler(response: HttpErrorResponse): Observable<HttpEvent<any>> {
    let errorTitle = 'System error!';
    let errorMsg = 'Please contact system administrator';
    // show detail error in development
    if (!environment.production) {
      if (response.error instanceof ErrorEvent) {
        log.error('This is client side error');
        errorTitle = `Client-side error`;
        errorMsg = `Error: ${response.error.message}`;
        log.error(errorMsg);
        this.openModal(errorTitle, errorMsg);
      } else {
        log.error('This is server side error');
        errorTitle = `Server-side error`;
        errorMsg = `${response.message}`;
        log.error(errorMsg);
        this.openModal(errorTitle, errorMsg, response.status.toString());
      }
    }
    // show generic error in production
    else {
      // Do something with the error
      this.openModal(errorTitle, errorMsg);
    }

    throw response;
  }

  // error dialog service
  // openModal(title: string, message: string, status?: string) {
  //   this.errorDialogService.openDialog(title, message, status);
  // }

  openModal(title: string, message: string, status?: string) {
    this.modalService.OpenErrorDialog(title, message, status);
  }
}
