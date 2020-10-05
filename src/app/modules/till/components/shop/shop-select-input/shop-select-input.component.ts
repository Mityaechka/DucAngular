import { ShopsSelectComponent } from './../shops-select/shops-select.component';
import { DialogsService } from './../../../../../services/dialogs.service';
import { forwardRef, Input } from '@angular/core';
import { Component, HostBinding, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Shop } from 'src/app/entities/shop.entity';

@Component({
  selector: 'app-shop-select-input',
  templateUrl: './shop-select-input.component.html',
  styleUrls: ['./shop-select-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ShopSelectInputComponent),
      multi: true,
    },
  ],
})
export class ShopSelectInputComponent implements OnInit, ControlValueAccessor {
  selectedShops: Shop[];
  @Input() disabled = false;

  @HostBinding('style.opacity')
  get opacity() {
    return this.disabled ? 0.25 : 1;
  }

  constructor(private dialogs: DialogsService) {}

  onChange = (shops: number[]) => {};
  onTouched = () => {};

  writeValue(obj: any): void {
    if (Array.isArray(obj)) {
      this.selectedShops = obj;
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

  selectShops() {
    this.dialogs.push({
      component: ShopsSelectComponent,
      onInstance: (i) => {
        i.selected.subscribe((shops) => {
          this.selectedShops = shops;
          this.change()
        });
      },
    });
  }
  change(){
    this.onChange(
      this.selectedShops?.map((x) => {
        return x.id;
      })
    );
  }
}
