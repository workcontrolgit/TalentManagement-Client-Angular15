import { AuthConfig } from 'angular-oauth2-oidc';
import { environment } from '@env/environment';

export const authConfig: AuthConfig = {
  issuer: environment.oidc.issuer,
  clientId: environment.oidc.clientId,
  responseType: environment.oidc.responseType,
  redirectUri: environment.oidc.redirectUri,
  postLogoutRedirectUri: environment.oidc.postLogoutRedirectUri,
  silentRefreshRedirectUri: environment.oidc.silentRefreshRedirectUri,
  scope: environment.oidc.scope,
  useSilentRefresh: environment.oidc.useSilentRefresh,
  silentRefreshTimeout: environment.oidc.silentRefreshTimeout,
  timeoutFactor: environment.oidc.timeoutFactor,
  sessionChecksEnabled: environment.oidc.sessionChecksEnabled,
  showDebugInformation: environment.oidc.showDebugInformation,
  clearHashAfterLogin: environment.oidc.clearHashAfterLogin,
  nonceStateSeparator: environment.oidc.nonceStateSeparator,
};
