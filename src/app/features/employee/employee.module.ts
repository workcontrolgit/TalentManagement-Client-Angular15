import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@shared';
import { DataTablesModule } from 'angular-datatables';

import { EmployeeComponent } from './employee.component';
import { EmployeeListComponent } from './list/employee-list.component';
import { EmployeeRoutingModule } from './employee-routing.module';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [CommonModule, EmployeeRoutingModule, NgbNavModule, TranslateModule, SharedModule, DataTablesModule],
  declarations: [EmployeeComponent, EmployeeListComponent],
})
export class EmployeeModule {}
