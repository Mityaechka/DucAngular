import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DialogsService } from './../../../../services/dialogs.service';
import { ShopsService } from './../../../../services/shops.service';
import { AuthService } from './../../../../services/auth.service';
import {
  Component,
  OnInit,
  ChangeDetectorRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { Shop } from 'src/app/entities/shop.entity';

@Component({
  selector: 'app-current-shop-select',
  templateUrl: './current-shop-select.component.html',
  styleUrls: ['./current-shop-select.component.css'],
})
export class CurrentShopSelectComponent implements OnInit {
  form = new FormGroup({
    shop: new FormControl('', [Validators.required]),
  });
  shops: Shop[] = [];
  @Output() selected = new EventEmitter();
  constructor(
    private authService: AuthService,
    private shopsService: ShopsService,
    private dialogsService: DialogsService,
    private detector: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    this.dialogsService.startLoading();
    const currentShopResponse = await this.shopsService.getCurrentShop();
    if (currentShopResponse.isSuccess) {
      this.form.patchValue({
        shop: currentShopResponse.result.id,
      });
    }
    const shopsResponse = await this.authService.getUserShops();
    if (shopsResponse.isSuccess) {
      this.shops = shopsResponse.result;
    }
    this.dialogsService.stopLoading();
    this.detector.detectChanges();
  }
  async select() {
    this.dialogsService.startLoading();
    const response = await this.shopsService.selectShop(
      this.form.controls.shop.value
    );
    this.dialogsService.stopLoading();
    if(response.isSuccess){
      this.selected.emit();
      this.dialogsService.pop();
    }else{
      this.dialogsService.pushAlert(response.errorMessage);
    }
  }
}
