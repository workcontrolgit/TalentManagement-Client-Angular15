import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Logger } from '@app/core';
import { ApiHttpService } from '@app/services/api/api-http.service';
import { ApiEndpointsService } from '@app/services/api/api-endpoints.service';
import { Position } from '@shared/interfaces/position';
import { DataResponsePosition } from '@shared/interfaces/data-response-position';
import { ModalService } from '@app/services/modal/modal.service';

import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { ToastService } from '@app/services/toast/toast.service';

const log = new Logger('Detail');

@Component({
  selector: 'app-detail',
  templateUrl: './position-detail.component.html',
  styleUrls: ['./position-detail.component.scss'],
})
export class PositionDetailComponent implements OnInit {
  formMode = 'New';
  sub: any;
  id: any;
  entryForm!: UntypedFormGroup;
  error: string | undefined;
  position!: Position;
  isAddNew: boolean = false;

  constructor(
    private toastService: ToastService,
    private route: ActivatedRoute,
    private formBuilder: UntypedFormBuilder,
    private apiHttpService: ApiHttpService,
    private apiEndpointsService: ApiEndpointsService,
    private modalService: ModalService
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
      this.id = params['id'];
      if (this.id !== undefined) {
        this.read(this.route.snapshot.paramMap.get('id'));
        this.formMode = 'Edit';
      } else {
        this.isAddNew = true;
        this.formMode = 'New';
      }
    });
    log.debug('ngOnInit:', this.id);
  }

  // Handle Create button click
  onCreate() {
    this.create(this.entryForm.value);
    log.debug('OnInsert: ', this.entryForm.value);
    log.debug('OnInsert: ', this.entryForm.get('positionNumber')!.value);
  }

  // Handle Update button click
  onUpdate() {
    this.put(this.entryForm.get('id')!.value, this.entryForm.value);
    this.showToaster('Great job!', 'Data is updated');
  }

  // Handle Delete button click
  onDelete() {
    this.modalService
      .OpenConfirmDialog('Position deletion', 'Are you sure you want to delete?')
      .then((Yes) => {
        if (Yes) {
          this.delete(this.entryForm.get('id')!.value);
          log.debug('onDelete: ', this.entryForm.value);
        }
      })
      .catch(() => {
        log.debug('onDelete: ', 'Cancel');
      });
  }
  // CRUD > Read, map to REST/HTTP GET
  read(id: any): void {
    this.apiHttpService.get(this.apiEndpointsService.getPositionByIdEndpoint(id), id).subscribe(
      //Assign resp to class-level model object.
      (resp: DataResponsePosition) => {
        //Assign data to class-level model object.
        this.position = resp.data;
        //Populate reactive form controls with model object properties.
        this.entryForm.setValue({
          id: this.position.id,
          positionNumber: this.position.positionNumber,
          positionTitle: this.position.positionTitle,
          positionDescription: this.position.positionDescription,
          positionSalary: this.position.positionSalary,
        });
      },
      (error) => {
        log.debug(error);
      }
    );
  }
  // CRUD > Delete, map to REST/HTTP DELETE
  delete(id: any): void {
    this.apiHttpService.delete(this.apiEndpointsService.deletePositionByIdEndpoint(id), id).subscribe(
      (resp: any) => {
        log.debug(resp);
        this.showToaster('Great job!', 'Data is deleted');
        this.entryForm.reset();
        this.isAddNew = true;
      },
      (error) => {
        log.debug(error);
      }
    );
  }

  // CRUD > Create, map to REST/HTTP POST
  create(data: any): void {
    this.apiHttpService.post(this.apiEndpointsService.postPositionsEndpoint(), data).subscribe((resp: any) => {
      this.id = resp.data; //guid return in data
      this.showToaster('Great job!', 'Data is inserted');
      this.entryForm.reset();
    });
  }

  // CRUD > Update, map to REST/HTTP PUT
  put(id: string, data: any): void {
    this.apiHttpService.put(this.apiEndpointsService.putPositionsPagedEndpoint(id), data).subscribe((resp: any) => {
      this.id = resp.data; //guid return in data
    });
  }

  // reactive form
  private createForm() {
    this.entryForm = this.formBuilder.group({
      id: [''],
      positionNumber: ['', Validators.required],
      positionTitle: ['', Validators.required],
      positionDescription: ['', Validators.required],
      positionSalary: ['', RxwebValidators.numeric({ allowDecimal: true, isFormat: false })],
    });
  }

  // call modal service
  showToaster(title: string, message: string) {
    this.toastService.show(title, message, {
      classname: 'bg-success text-light',
      delay: 2000,
      autohide: true,
    });
  }
}
