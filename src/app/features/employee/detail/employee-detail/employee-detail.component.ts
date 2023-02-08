import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Employee } from '@shared/interfaces/employee';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit {
  @Input() title: string = 'Employee Detail';
  @Input() employee!: Employee;
  @Input() status!: string;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
  }

}
