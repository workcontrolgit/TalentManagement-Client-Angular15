import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeComponent } from './employee.component';
import { AuthorizeRoutingModule } from './employee-routing.module';

@NgModule({
  imports: [CommonModule, AuthorizeRoutingModule],
  declarations: [EmployeeComponent],
})
export class EmployeeModule {}
