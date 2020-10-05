import { ProductTypesService } from './../../../../../services/product-types.service';
import { DialogsService } from 'src/app/services/dialogs.service';
import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { ProductType } from 'src/app/entities/product-type';
import { FlatTreeControl } from '@angular/cdk/tree';
import {
  MatTreeFlattener,
  MatTreeFlatDataSource,
} from '@angular/material/tree';
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}
@Component({
  selector: 'app-product-type-tree',
  templateUrl: './product-type-tree.component.html',
  styleUrls: ['./product-type-tree.component.css'],
})
export class ProductTypeTreeComponent implements OnInit {
  constructor(
    private dialogs: DialogsService,
    private productTypesService: ProductTypesService,
    private detector: ChangeDetectorRef
  ) {}
  @Input() rootType: ProductType;
  isLoading = false;
  isExpanded = false;
  isChildrenLoaded = false;
  async ngOnInit() {
    this.isLoading = true;
    if (!this.rootType) {
      const rootResponse = await this.productTypesService.getRootType();

      if (rootResponse.isSuccess) {
        this.rootType = rootResponse.result;
      }
      await this.expand();
    }
    this.isLoading = false;
    this.detector.detectChanges();
  }
  async expand() {
    if (!this.isChildrenLoaded) {
      const childrenResponse = await this.productTypesService.getChildrenTypes(
        this.rootType.id
      );
      this.isLoading = true;
      if (childrenResponse.isSuccess) {
        this.rootType.childrenTypes = childrenResponse.result;
      }
      this.isLoading = false;
      this.isChildrenLoaded = true;
    }
    this.isExpanded = !this.isExpanded;
    this.detector.detectChanges();
  }
}
