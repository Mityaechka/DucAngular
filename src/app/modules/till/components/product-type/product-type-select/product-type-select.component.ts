import { DialogsService } from 'src/app/services/dialogs.service';
import { ProductTypesService } from '../../../../../services/product-types.service';
import {
  ProductType,
  ProductTypeFullHierarchy,
} from '../../../../../entities/product-type';
import {
  Component,
  OnInit,
  ChangeDetectorRef,
  Output,
  EventEmitter,
  forwardRef,
} from '@angular/core';
import { Input } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { HostBinding } from '@angular/core';
import { ProductTypeCreateComponent } from '../product-type-create/product-type-create.component';

@Component({
  selector: 'app-product-type-select',
  templateUrl: './product-type-select.component.html',
  styleUrls: ['./product-type-select.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ProductTypeSelectComponent),
      multi: true,
    },
  ],
})
export class ProductTypeSelectComponent implements OnInit, ControlValueAccessor {
  @HostBinding('style.opacity')
  get opacity() {
    return this.disabled ? 0.25 : 1;
  }
  constructor(
    private productTypesService: ProductTypesService,
    private detector: ChangeDetectorRef,
    private dialogs: DialogsService
  ) {}
  @Input() canAdd = true;
  @Input() disabled = false;

  rootId?: number;

  hierarchy: ProductTypeFullHierarchy;
  onChange = (typeId: number) => {};
  onTouched = () => {};
  writeValue(obj: any): void {
    if (Number.isInteger(obj)) {
      this.rootId = obj;
    }
    this.load();
  }

  registerOnChange(fn: (rating: number) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  async ngOnInit() {
    //this.load();
  }
  async load() {
    if (!this.rootId) {
      const rootResponse = await this.productTypesService.getRootType();
      if (rootResponse.isSuccess) {
        this.rootId = rootResponse.result.id;
      }
    }
    const hierarchyResponse = await this.productTypesService.getTypeFullHierarchy(
      this.rootId
    );
    if (hierarchyResponse.isSuccess) {
      this.hierarchy = hierarchyResponse.result;
    }
    this.detector.detectChanges();
    this.onChange(this.hierarchy.type.id);
  }
  selectType(typeId: number) {
    this.rootId = typeId;
    this.load();
  }
  createCategory() {
    this.dialogs.push({
      component: ProductTypeCreateComponent,
      data: this.rootId,
      onInstance: (i) => {
        i.created.subscribe((newCategoryId) => {
          this.rootId = newCategoryId;
          this.load();
        });
      },
    });
  }
}
