import { take } from 'rxjs/operators';
import { TableComponent } from 'src/app/modules/table/table/table.component';
import { DirectDiscountsService } from './../../../../../../services/direct-discounts.service';
import { DialogsService } from '../../../../../../services/dialogs.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DirectDiscountCreateComponent } from '../direct-discount-create/direct-discount-create.component';
import { DirectDiscount } from 'src/app/entities/direct-discount.entity';
import { DirectDiscountInfoComponent } from '../direct-discount-info/direct-discount-info.component';

@Component({
  selector: 'app-direct-discounts',
  templateUrl: './direct-discounts.component.html',
  styleUrls: ['./direct-discounts.component.css'],
})
export class DirectDiscountsComponent implements OnInit {
  @ViewChild('table')
  table: TableComponent<DirectDiscount>;
  constructor(
    private dialogs: DialogsService,
    private directDiscountsService: DirectDiscountsService
  ) {}

  ngOnInit(): void {}
  createDiscount() {
    this.dialogs.push({
      component: DirectDiscountCreateComponent,
      onInstance: (i) => {
        i.created.subscribe(() => {
          this.table.loadData();
        });
      },
    });
  }
  async loadData() {
    return await this.directDiscountsService.getDirectiscounts();
  }
  async selectDiscount(discount: DirectDiscount) {
    this.dialogs.push({
      component: DirectDiscountInfoComponent,
      data: discount,
      onInstance: (i) => {
        i.edited.subscribe(() => this.table.loadData());
      },
    });
  }
  async changeStateDirectDiscount(id: number, state: boolean) {
    this.dialogs.startLoading();
    const response = await this.directDiscountsService.changeStateDirectDiscount(
      id,
      state
    );
    this.dialogs.stopLoading();
    if (response.isSuccess) {
      this.table.loadData();
    } else {
      this.dialogs.pushAlert(response.errorMessage);
    }
  }
}
