import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductTypesService } from './../../../../../services/product-types.service';
import { DialogsService } from 'src/app/services/dialogs.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  Inject,
} from '@angular/core';

@Component({
  selector: 'app-product-type-create',
  templateUrl: './product-type-create.component.html',
  styleUrls: ['./product-type-create.component.css'],
})
export class ProductTypeCreateComponent implements OnInit {
  @Output() created = new EventEmitter<number>();
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    parentTypeId: new FormControl(),
  });
  constructor(
    @Inject(MAT_DIALOG_DATA) public parentTypeId,
    private dialogs: DialogsService,
    private productTypesService: ProductTypesService
  ) {}

  ngOnInit(): void {
    this.form.patchValue({
      parentTypeId: this.parentTypeId,
    });
  }

  async create() {
    this.dialogs.startLoading();
    const response = await this.productTypesService.createType(
      this.form.getRawValue()
    );
    this.dialogs.stopLoading();
    if (response.isSuccess) {
      this.created.emit(response.result);
      this.dialogs.pop();
    } else {
      this.dialogs.pushAlert(response.errorMessage);
    }
  }
}
