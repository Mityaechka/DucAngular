import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ShopProductSelectComponent } from './../shop-product-select/shop-product-select.component';
import {
  Component,
  forwardRef,
  HostBinding,
  Input,
  OnInit,
} from '@angular/core';
import { Product } from 'src/app/entities/product';
import { DialogsService } from 'src/app/services/dialogs.service';

@Component({
  selector: 'app-shop-product-select-input',
  templateUrl: './shop-product-select-input.component.html',
  styleUrls: ['./shop-product-select-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ShopProductSelectInputComponent),
      multi: true,
    },
  ],
})
export class ShopProductSelectInputComponent
  implements OnInit, ControlValueAccessor {
  selectedProducts: Product[];
  @Input() disabled = false;

  @HostBinding('style.opacity')
  get opacity() {
    return this.disabled ? 0.25 : 1;
  }

  constructor(private dialogs: DialogsService) {}

  onChange = (products: number[]) => {};
  onTouched = () => {};

  writeValue(obj: any): void {
    if (Array.isArray(obj)) {
      this.selectedProducts = obj;
    }
    this.change();
  }
  registerOnChange(fn: (rating: number[]) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  ngOnInit(): void {}

  selectProducts() {
    this.dialogs.push({
      component: ShopProductSelectComponent,
      onInstance: (i) => {
        i.selected.subscribe((shops) => {
          this.selectedProducts = shops;
          this.change();
        });
      },
    });
  }
  change() {
    this.onChange(
      this.selectedProducts?.map((x) => {
        return x.id;
      })
    );
  }
}
