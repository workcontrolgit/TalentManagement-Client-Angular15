import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { Shell } from '@app/shell/shell.service';
import { AuthGuard } from '@app/core/auth/auth-guard.service';
import { ShouldLoginComponent } from './should-login.component';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: 'about',
      // canActivate: [AuthGuard],
      loadChildren: () => import('./about/about.module').then((m) => m.AboutModule),
    },
  ]),
  Shell.childRoutes([
    {
      path: 'employee',
      loadChildren: () => import('./features/employee/employee.module').then((m) => m.EmployeeModule),
    },
    {
      path: 'position',
      canActivate: [AuthGuard],
      loadChildren: () => import('./features/position/position.module').then((m) => m.PositionModule),
    },

  ]),
  { path: 'should-login', component: ShouldLoginComponent },

  // Fallback when no prior route is matched
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
