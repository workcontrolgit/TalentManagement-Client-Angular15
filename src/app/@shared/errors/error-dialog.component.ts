import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-error-dialog',
  standalone: true,
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.scss'],
})
export class ErrorDialogComponent {
  @Input() title: string = 'An error has occurred!';
  @Input() message!: string;
  @Input() status!: string;

  constructor(public activeModal: NgbActiveModal) {}
}
