import { ProductLeft } from './../../../../../entities/product-left.entity';
import { Product } from './../../../../../entities/product';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { LeftsService } from './../../../../../services/lefts.service';
import { OperatioType } from './../../../../../enums/operation-type.enum';
import {
  FilterParametr,
  OperatorEnum,
} from './../../../../../models/filter.model';
import { DialogsService } from './../../../../../services/dialogs.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  Component,
  Inject,
  OnInit,
  ChangeDetectorRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { Filter as Filter } from 'src/app/models/filter.model';
import { Shop } from 'src/app/entities/shop.entity';
import { MatSelectionListChange } from '@angular/material/list';

@Component({
  selector: 'app-provider-select-product',
  templateUrl: './provider-select-product.component.html',
  styleUrls: ['./provider-select-product.component.css'],
})
export class ProviderSelectProductComponent implements OnInit {
  @Output() selected = new EventEmitter<ProductLeft>();
  form = new FormGroup({
    search: new FormControl('', [Validators.required]),
  });
  result: ProductLeft[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public provider: Shop,
    private dialogs: DialogsService,
    private leftsService: LeftsService,
    private detector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}
  async search() {
    const filter: Filter = {
      filterParametrs: [
        {
          parametr: 'Product.Name',
          operator: OperatorEnum.Contains,
          data: this.form.controls.search.value,
        },
        {
          parametr: 'Shop.Id',
          operator: OperatorEnum.Equal,
          data: this.provider.id,
        },
      ],
    };
    this.dialogs.startLoading();
    const response = await this.leftsService.getProviderProductsLefts(filter);
    this.dialogs.stopLoading();

    if (response.isSuccess) {
      this.result = response.result.list;
    } else {
      this.dialogs.pushAlert(response.errorMessage);
    }
    this.detector.detectChanges();
  }
  onSelect(left: MatSelectionListChange) {
    const ref = this.dialogs.getCurrentRef();
    this.selected.emit(left.option.value);
    this.dialogs.popByRef(ref);
  }
}
