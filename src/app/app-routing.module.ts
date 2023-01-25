import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { Shell } from '@app/shell/shell.service';
import { AuthGuard } from '@app/core/auth/auth-guard.service';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'about',
      canActivate: [AuthGuard],
      loadChildren: () => import('./about/about.module').then((m) => m.AboutModule),
    },
  ]),
  Shell.childRoutes([
    {
      path: 'authorize',
      loadChildren: () => import('./features/authorize/authorize.module').then((m) => m.AuthorizeModule),
    },
  ]),
  // Fallback when no prior route is matched
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
