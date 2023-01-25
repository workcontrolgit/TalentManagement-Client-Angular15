import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { QuoteService } from './quote.service';
import { ToastService } from '@app/core/toast/toast.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: false,
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  quote: string | undefined;
  isLoading = false;

  constructor(
    private quoteService: QuoteService,
    private toastService: ToastService,
    private chRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.quoteService
      .getRandomQuote({ category: 'dev' })
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((quote: string) => {
        this.quote = quote;
      });
    // this.showToaster('Access denied', 'Please login to continue access');
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

  showError() {
    this.toastService.show('header23', 'I am a success toast', {
      classname: 'bg-danger text-light',
      delay: 2000,
      autohide: true,
      headertext: 'Error!!!',
    });
  }

  showStandard() {
    this.toastService.show('header23', 'I am a standard toast');
  }

  showSuccess() {
    this.toastService.show('header23', 'I am a success toast', { classname: 'bg-success text-light', delay: 10000 });
  }

  showDanger(dangerTpl: any) {
    this.toastService.show('header23', dangerTpl, { classname: 'bg-danger text-light', delay: 15000 });
  }
}
