import { APP_INITIALIZER, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { RouteReusableStrategy } from './route-reusable-strategy';

// OIDC Integration
import { AuthConfig, OAuthModule, OAuthModuleConfig, OAuthStorage } from 'angular-oauth2-oidc';
import { authAppInitializerFactory } from './auth/auth-app-initializer.factory';
import { authConfig } from './auth/auth-config';
import { AuthGuardWithForcedLogin } from './auth/auth-guard-with-forced-login.service';
import { AuthGuard } from './auth/auth-guard.service';
import { authModuleConfig } from './auth/auth-module-config';
import { AuthService } from './auth/auth.service';
import { RoleGuard } from './auth/role-guard.service';

// We need a factory since localStorage is not available at AOT build time
export function storageFactory(): OAuthStorage {
  return localStorage;
}

@NgModule({
  imports: [CommonModule, HttpClientModule, OAuthModule.forRoot(), TranslateModule, RouterModule],
  providers: [
    AuthService,
    AuthGuard,
    RoleGuard,
    AuthGuardWithForcedLogin,
    {
      provide: RouteReuseStrategy,
      useClass: RouteReusableStrategy,
    },
  ],
})
export class CoreModule {
  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        { provide: APP_INITIALIZER, useFactory: authAppInitializerFactory, deps: [AuthService], multi: true },
        { provide: AuthConfig, useValue: authConfig },
        { provide: OAuthModuleConfig, useValue: authModuleConfig },
        { provide: OAuthStorage, useFactory: storageFactory },
      ],
    };
  }
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    // Import guard
    if (parentModule) {
      throw new Error(`${parentModule} has already been loaded. Import Core module in the AppModule only.`);
    }
  }
}
