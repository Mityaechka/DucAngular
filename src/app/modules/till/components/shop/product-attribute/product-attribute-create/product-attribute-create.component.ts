import { ProductsService } from 'src/app/services/products.service';
import { DialogsService } from './../../../../../../services/dialogs.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-attribute-create',
  templateUrl: './product-attribute-create.component.html',
  styleUrls: ['./product-attribute-create.component.css'],
})
export class ProductAttributeCreateComponent implements OnInit {
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });
  @Output() created = new EventEmitter();
  constructor(
    private dialogs: DialogsService,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {}
  async createAttribute() {
    this.dialogs.startLoading();
    const response = await this.productsService.createAttribute(
      this.form.getRawValue()
    );
    this.dialogs.stopLoading();
    if (response.isSuccess) {
      this.created.emit();
      this.dialogs.pop();
    } else {
      this.dialogs.pushAlert(response.errorMessage);
    }
  }
}
