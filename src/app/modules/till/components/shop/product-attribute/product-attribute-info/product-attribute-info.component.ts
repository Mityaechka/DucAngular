import { TableService } from './../../../../../../services/table.service';
import { async } from '@angular/core/testing';
import { ProductAttributeEditComponent } from './../product-attribute-edit/product-attribute-edit.component';
import { DialogsService } from './../../../../../../services/dialogs.service';
import { ProductsService } from 'src/app/services/products.service';
import { ProductAttribute } from './../../../../../../entities/attribute.entity';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-attribute-info',
  templateUrl: './product-attribute-info.component.html',
  styleUrls: ['./product-attribute-info.component.css'],
})
export class ProductAttributeInfoComponent implements OnInit {
  @Output() edited = new EventEmitter();
  constructor(
    @Inject(MAT_DIALOG_DATA) public attribute: ProductAttribute,
    private productsService: ProductsService,
    private dialogs: DialogsService,
    private tableService: TableService
  ) {}

  ngOnInit(): void {}
  async loadData() {
    this.dialogs.startLoading();
    const response = await this.productsService.getAttribute(this.attribute.id);
    this.dialogs.stopLoading();
    if (response.isSuccess) {
      this.attribute = response.result;
    }
  }
  editAttribute() {
    this.dialogs.push({
      component: ProductAttributeEditComponent,
      data: this.attribute,
      onInstance: (i) => {
        i.edited.subscribe(async () => {
          this.loadData();
          this.tableService.tables.forEach((x) => x.table.loadData());
        });
      },
    });
  }
}
