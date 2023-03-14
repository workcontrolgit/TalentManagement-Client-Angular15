import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PositionListComponent } from './list/position-list.component';
import { PositionDetailComponent } from './detail/position-detail.component';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { AuthGuard } from '@app/core/auth/auth-guard.service';
import { RoleGuard } from '@app/core/auth/role-guard.service';

const routes: Routes = [
  {
    path: '',
    component: PositionListComponent,
    data: { title: marker('Position')},
  },
  {
    path: 'detail',
    component: PositionDetailComponent,
    canActivate: [RoleGuard],
    data: { title: marker('Position Detail'),
    role: 'HrAdmin' },
  },
  {
    path: 'detail/:id',
    component: PositionDetailComponent,
    canActivate: [RoleGuard],
    data: { title: marker('Position Detail'),
    role: 'HrAdmin' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PositionRoutingModule {}
