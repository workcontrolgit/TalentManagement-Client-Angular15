import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PositionListComponent } from './list/position-list.component';
import { PositionDetailComponent } from './detail/position-detail.component';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { AuthGuard } from '@app/core/auth/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: PositionListComponent,
    canActivate: [AuthGuard],
    data: { title: marker('Position') },
  },
  {
    path: 'detail',
    component: PositionDetailComponent,
    canActivate: [AuthGuard],
    data: { title: marker('Position Detail') },
  },
  {
    path: 'detail/:id',
    component: PositionDetailComponent,
    canActivate: [AuthGuard],
    data: { title: marker('Position Detail') },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PositionRoutingModule {}
