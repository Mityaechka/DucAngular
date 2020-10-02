import {
  EnumCollection,
  EnumDisplayCollection,
} from './../../../../../../enums/enum-display.collection';

import { Product } from 'src/app/entities/product';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { DialogsService } from 'src/app/services/dialogs.service';
import { ProductsService } from 'src/app/services/products.service';
import { ProductAttributeSelectComponent } from '../../product-attribute/product-attribute-select/product-attribute-select.component';

@Component({
  selector: 'app-shop-product-edit',
  templateUrl: './shop-product-edit.component.html',
  styleUrls: ['./shop-product-edit.component.css'],
})
export class ShopProductEditComponent implements OnInit {
  EnumCollection = EnumCollection;
  EnumDisplayCollection = EnumDisplayCollection;
  @Output() edited = new EventEmitter();
  get productParametrs() {
    console.log(this.form);
    return this.form.controls.productParametrs as FormArray;
  }
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required, Validators.min(0)]),
    //retailPrice: new FormControl('', [Validators.required, Validators.min(0)]),
    markup: new FormControl('', [Validators.required, Validators.min(0)]),
    measure: new FormControl(0, [Validators.required]),
    barcode: new FormControl('', [Validators.required]),
    productTypeId: new FormControl(undefined, [Validators.required]),
    photo: new FormControl(''),
    productParametrs: new FormArray([]),
  });
  dataSource = new MatTableDataSource();

  constructor(
    @Inject(MAT_DIALOG_DATA) public product: Product,
    private productService: ProductsService,
    private dialogs: DialogsService,
    private detector: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    this.dialogs.startLoading();
    const productResponse = await this.productService.getProduct(
      this.product.id
    );
    const parametrsResponse = await this.productService.getProductParametrs(
      this.product.id
    );

    debugger;
    this.form.patchValue(
      {
        name: productResponse.result.name,
        description: productResponse.result.description,
        price: productResponse.result.price,
        //retailPrice: productResponse.result.retailPrice,
        markup: productResponse.result.markup,
        measure: productResponse.result.measure,
        barcode: productResponse.result.barcode,
        productTypeId: productResponse.result.productType.id,
      },
      { emitEvent: false, onlySelf: true }
    );
    parametrsResponse.result.list.forEach((x) => {
      this.productParametrs.push(
        new FormGroup({
          attributeId: new FormControl(x.productAttribute.id),
          attribute: new FormControl(x.productAttribute),
          value: new FormControl(x.value, [Validators.required]),
        })
      );
    });
    this.dialogs.stopLoading();
    this.detector.detectChanges();
    this.dataSource = new MatTableDataSource(this.productParametrs.value);
  }
  selectAttribute() {
    this.dialogs.push({
      component: ProductAttributeSelectComponent,
      onInstance: (i) => {
        i.selected.subscribe(async (id) => {
          this.dialogs.startLoading();
          const response = await this.productService.getAttribute(id);
          this.dialogs.stopLoading();
          if (response.isSuccess) {
            this.productParametrs.push(
              new FormGroup({
                attributeId: new FormControl(response.result.id),
                attribute: new FormControl(response.result),
                value: new FormControl('', [Validators.required]),
              })
            );
          }
          this.dataSource = new MatTableDataSource(this.productParametrs.value);
        });
      },
    });
  }
  removeParametr(index: number) {
    this.productParametrs.removeAt(index);
    this.dataSource = new MatTableDataSource(this.productParametrs.value);
  }
  async editProduct() {
    const data = new FormData();

    data.append('name', this.form.controls.name.value);
    data.append('description', this.form.controls.description.value);
    data.append('price', this.form.controls.price.value);
    data.append('productTypeId', this.form.controls.productTypeId.value);

    //data.append('retailPrice', this.form.controls.retailPrice.value);
    data.append('markup', this.form.controls.markup.value);
    data.append('measure', this.form.controls.measure.value);
    data.append('barcode', this.form.controls.barcode.value);
    if (
      this.form.controls.photo.value.files &&
      this.form.controls.photo.value.files.length === 1
    ) {
      data.append('photo', this.form.controls.photo.value.files[0]);
    }
    data.append(
      'parametrsRaw',
      JSON.stringify(this.productParametrs.getRawValue())
    );
    this.dialogs.startLoading();
    const response = await this.productService.editProduct(
      this.product.id,
      data
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
