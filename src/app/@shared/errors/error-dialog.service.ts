import { Injectable, Injector } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ErrorDialogComponent } from './error-dialog/error-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class ErrorDialogService {
  constructor(private injector: Injector) {}

  openDialog(message: string, status?: number): void {
    var modalService = this.injector.get(NgbModal);
    const modalRef = modalService.open(ErrorDialogComponent);
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.status = status;
  }
}
