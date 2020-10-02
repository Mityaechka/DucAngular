import { ProductTypeCreateComponent } from './../../../product-type/product-type-create/product-type-create.component';
import {
  EnumDisplayCollection,
  EnumCollection,
} from './../../../../../../enums/enum-display.collection';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import {
  ChangeDetectorRef,
  Component,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DialogsService } from 'src/app/services/dialogs.service';
import { ProductsService } from 'src/app/services/products.service';
import { ProductAttributeSelectComponent } from '../../product-attribute/product-attribute-select/product-attribute-select.component';

@Component({
  selector: 'app-shop-product-create',
  templateUrl: './shop-product-create.component.html',
  styleUrls: ['./shop-product-create.component.css'],
})
export class ShopProductCreateComponent implements OnInit {
  EnumDisplayCollection = EnumDisplayCollection;
  EnumCollection = EnumCollection;
  @Output() created = new EventEmitter();
  get productParametrs() {
    return this.form.controls.productParametrs as FormArray;
  }
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required, Validators.min(0)]),
    productTypeId: new FormControl([Validators.required]),
    //retailPrice: new FormControl('', [Validators.required, Validators.min(0)]),
    markup: new FormControl('', [Validators.required, Validators.min(0)]),
    measure: new FormControl(1, [Validators.required]),
    barcode: new FormControl('', [Validators.required]),
    photo: new FormControl(''),
    productParametrs: new FormArray([]),
  });
  dataSource = new MatTableDataSource();

  constructor(
    private productService: ProductsService,
    private dialogs: DialogsService,
    private detector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
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
  async createProduct() {
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
    const response = await this.productService.createProduct(data);
    this.dialogs.stopLoading();
    if (response.isSuccess) {
      this.created.emit();
      this.dialogs.pop();
    } else {
      this.dialogs.pushAlert(response.errorMessage);
    }
  }

}
