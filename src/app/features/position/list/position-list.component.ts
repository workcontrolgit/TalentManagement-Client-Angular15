import { Component, OnInit } from '@angular/core';

import { Position } from '@shared/interfaces/position';
import { ApiHttpService } from '@app/services/api/api-http.service';
import { ApiEndpointsService } from '@app/services/api/api-endpoints.service';
import { DataTablesResponse } from '@shared/interfaces/data-tables-response';
import { Logger } from '@app/core';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

const log = new Logger('Position');
@Component({
  selector: 'app-position-list',
  templateUrl: './position-list.component.html',
  styleUrls: ['./position-list.component.scss'],
})
export class PositionListComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  positions: Position[] = [];
  message = '';

  constructor(
    private apiHttpService: ApiHttpService,
    private apiEndpointsService: ApiEndpointsService,
    private router: Router
  ) {}

  wholeRowClick(position: Position): void {
    // get record id
    const positionId = position ? position.id : null;
    // load detail component
    this.router.navigate(['/position/detail', { id: positionId }]);

    log.debug('Whole row clicked.', position);
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        // Call WebAPI to get positions
        this.apiHttpService
          .post(this.apiEndpointsService.postPositionsPagedEndpoint(), dataTablesParameters)
          .subscribe((resp: DataTablesResponse) => {
            this.positions = resp.data;
            callback({
              recordsTotal: resp.recordsTotal,
              recordsFiltered: resp.recordsFiltered,
              data: [],
            });
          });
      },
      // Set column title and data field
      columns: [
        {
          title: 'Number',
          data: 'positionNumber',
        },
        {
          title: 'Title',
          data: 'positionTitle',
        },
        {
          title: 'Description',
          data: 'positionDescription',
        },
        {
          title: 'Salary',
          data: 'positionSalary',
        },
      ],
    };
  }
}
