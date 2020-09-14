import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';
import { DialogsService } from './../../../../../../services/dialogs.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductAttribute } from 'src/app/entities/attribute.entity';

@Component({
  selector: 'app-product-attribute-select',
  templateUrl: './product-attribute-select.component.html',
  styleUrls: ['./product-attribute-select.component.css'],
})
export class ProductAttributeSelectComponent implements OnInit {
  @Output() selected = new EventEmitter<number>();
  form = new FormGroup({
    attribute: new FormControl('', [Validators.required]),
  });
  attributes: ProductAttribute[] = [];
  constructor(
    private dialogs: DialogsService,
    private productsService: ProductsService
  ) {}

  async ngOnInit() {
    this.dialogs.startLoading();
    const response = await this.productsService.getAttributes();
    this.dialogs.stopLoading();
    if (response.isSuccess) {
      this.attributes = response.result.list;
    }
  }
  select() {
    this.selected.emit(this.form.controls.attribute.value);
    this.dialogs.pop();
  }
}
