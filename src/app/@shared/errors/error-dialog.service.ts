import { Injectable, Injector } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ErrorDialogComponent } from './error-dialog/error-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class ErrorDialogService {
  constructor(private injector: Injector) {}

  openDialog(title: string, message: string, status?: string): void {
    var modalService = this.injector.get(NgbModal);
    const modalRef = modalService.open(ErrorDialogComponent);
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.status = status;
  }
}
