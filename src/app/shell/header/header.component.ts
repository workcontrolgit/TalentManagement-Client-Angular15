import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { AuthService } from '@app/core/auth/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  menuHidden = true;
  isAuthenticated: Observable<boolean>;

  constructor(private authService: AuthService, private router: Router) {
    this.isAuthenticated = authService.isAuthenticated$;
  }

  ngOnInit() {}

  toggleMenu() {
    this.menuHidden = !this.menuHidden;
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }

  get username(): string | null {
    return this.authService.identityClaims ? (this.authService.identityClaims as any)['name'] : null;
  }
}
