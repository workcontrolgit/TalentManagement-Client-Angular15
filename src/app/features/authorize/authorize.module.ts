import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorizeComponent } from './authorize.component';
import { AuthorizeRoutingModule } from './authorize-routing.module';

@NgModule({
  imports: [CommonModule, AuthorizeRoutingModule],
  declarations: [AuthorizeComponent],
})
export class AuthorizeModule {}
