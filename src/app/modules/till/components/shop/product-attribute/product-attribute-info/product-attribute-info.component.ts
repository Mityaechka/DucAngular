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
    private dialogs: DialogsService
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
  editAttribute(){
    
  }
}
