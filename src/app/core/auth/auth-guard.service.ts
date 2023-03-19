import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { ToastService } from '@app/services/toast/toast.service';
import { Logger } from '@app/core';

@Injectable()
export class AuthGuard implements CanActivate {
  profile: any;
  constructor(private toastService: ToastService, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.canActivateProtectedRoutes$.pipe(
      tap((canActivateProtectedRoutes: boolean) => {
        if (canActivateProtectedRoutes) {
          return true;
        }
        console.log('Access denied', 'Please login to continue access');
        this.showToaster('Access denied', 'Please login to continue access');
        return false;
      })
    );
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
