import { DirectDiscountsService } from './../../../../../../services/direct-discounts.service';
import { DialogsService } from 'src/app/services/dialogs.service';
import { DirectDiscount } from './../../../../../../entities/direct-discount.entity';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  Component,
  Input,
  OnInit,
  Inject,
  ChangeDetectorRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { DirectDiscountEditComponent } from '../direct-discount-edit/direct-discount-edit.component';

@Component({
  selector: 'app-direct-discount-info',
  templateUrl: './direct-discount-info.component.html',
  styleUrls: ['./direct-discount-info.component.css'],
})
export class DirectDiscountInfoComponent implements OnInit {
  @Output() edited = new EventEmitter();
  constructor(
    @Inject(MAT_DIALOG_DATA) public discount: DirectDiscount,
    private dialogs: DialogsService,
    private directDiscountsService: DirectDiscountsService,
    private detector: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.load();
  }
  async load(){
    this.dialogs.startLoading();
    const response = await this.directDiscountsService.getDirectiscount(
      this.discount.id
    );
    this.dialogs.stopLoading();
    if (response.isSuccess) {
      this.discount = response.result;
    }
    this.detector.detectChanges();
  }
  edit() {
    this.dialogs.push({
      component: DirectDiscountEditComponent,
      data: this.discount,
      onInstance: (i) => {
        i.edited.subscribe(() => {
          this.edited.emit();
          this.load();
        });
      },
    });
  }
}
