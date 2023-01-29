import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { EmployeeComponent } from './employee.component';
import { AuthGuard } from '@app/core/auth/auth-guard.service';

const routes: Routes = [
  // Module is lazy loaded, see app-routing.module.ts
  {
    path: '',
    component: EmployeeComponent,
    canActivate: [AuthGuard],
    data: { title: marker('Authorize') },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AuthorizeRoutingModule {}
