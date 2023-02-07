import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@shared';

import { PositionRoutingModule } from './position-routing.module';
import { PositionComponent } from './position.component';
import { PositionListComponent } from './list/position-list.component';
import { PositionDetailComponent } from './detail/position-detail.component';

import { ReactiveFormsModule } from '@angular/forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [PositionComponent, PositionListComponent, PositionDetailComponent],
  imports: [
    CommonModule,
    TranslateModule,
    PositionRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    RxReactiveFormsModule,
    DataTablesModule,
  ],
})
export class PositionModule {}
