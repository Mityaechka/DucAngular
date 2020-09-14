import { ProductAttributeInfoComponent } from './../product-attribute-info/product-attribute-info.component';
import { ProductAttributeCreateComponent } from './../product-attribute-create/product-attribute-create.component';
import { Component, OnInit } from '@angular/core';
import { DialogsService } from 'src/app/services/dialogs.service';
import { ProductsService } from 'src/app/services/products.service';
import { TableService } from 'src/app/services/table.service';
import { ProductAttribute } from 'src/app/entities/attribute.entity';

@Component({
  selector: 'app-product-attributes',
  templateUrl: './product-attributes.component.html',
  styleUrls: ['./product-attributes.component.css'],
})
export class ProductAttributesComponent implements OnInit {
  constructor(
    private productsService: ProductsService,
    private dialogs: DialogsService,
    private tableService: TableService
  ) {}

  async ngOnInit() {}
  async loadData() {
    return this.productsService.getAttributes();
  }
  createAttribute() {
    this.dialogs.push({
      component: ProductAttributeCreateComponent,
      config: { },
      onInstance: (i) => {
        i.created.subscribe(() =>
          this.tableService.tables.forEach((x) => x.table.loadDataEvent())
        );
      },
    });
  }
  attributeInfo(attribute: ProductAttribute) {
    this.dialogs.push({
      component: ProductAttributeInfoComponent,
      config: { width: '500px' },
      data: attribute,
      onInstance: (i) => {
        i.edited.subscribe(() =>
          this.tableService.tables.forEach((x) => x.table.loadDataEvent())
        );
      },
    });
  }
}
