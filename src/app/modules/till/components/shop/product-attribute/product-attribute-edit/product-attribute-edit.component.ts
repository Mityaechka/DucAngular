import { ProductAttribute } from 'src/app/entities/attribute.entity';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ChangeDetectorRef,
  Inject,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DialogsService } from 'src/app/services/dialogs.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-attribute-edit',
  templateUrl: './product-attribute-edit.component.html',
  styleUrls: ['./product-attribute-edit.component.css'],
})
export class ProductAttributeEditComponent implements OnInit {
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });
  @Output() edited = new EventEmitter();
  constructor(
    @Inject(MAT_DIALOG_DATA) public attribute: ProductAttribute,
    private dialogs: DialogsService,
    private productsService: ProductsService,
    private detector: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    this.dialogs.startLoading();
    const response = await this.productsService.getAttribute(this.attribute.id);
    this.dialogs.stopLoading();
    if (response.isSuccess) {
      this.attribute = response.result;
      this.form.patchValue({
        name: this.attribute.name,
      });
    }
  }
  async editAttribute() {
    this.dialogs.startLoading();
    const response = await this.productsService.editeAttribute(
      this.attribute.id,
      this.form.getRawValue()
    );
    this.dialogs.stopLoading();
    if (response.isSuccess) {
      this.edited.emit();
      this.dialogs.pop();
    } else {
      this.dialogs.pushAlert(response.errorMessage);
    }
  }
}
