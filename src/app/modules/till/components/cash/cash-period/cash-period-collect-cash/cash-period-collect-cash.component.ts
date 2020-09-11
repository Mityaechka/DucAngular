import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectorRef,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CasherPlace } from 'src/app/entities/casher-place.entity';
import { DialogsService } from 'src/app/services/dialogs.service';
import { ShopsService } from 'src/app/services/shops.service';

@Component({
  selector: 'app-cash-period-collect-cash',
  templateUrl: './cash-period-collect-cash.component.html',
  styleUrls: ['./cash-period-collect-cash.component.css'],
})
export class CashPeriodCollectCashComponent implements OnInit {
  @Output() collected = new EventEmitter<any>();
  sumControl = new FormControl('', [Validators.required]);
  maxSum = 0;
  constructor(
    private dialogs: DialogsService,
    private shopsService: ShopsService,
    private detector: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    this.dialogs.startLoading();
    const response = await this.shopsService.getCurrentPeriod();
    if (response.isSuccess) {
      this.sumControl = new FormControl('', [
        Validators.required,
        Validators.min(1),
        Validators.max(response.result.expectedEndSum),
      ]);
      this.maxSum = response.result.expectedEndSum;
    }
    this.dialogs.stopLoading();
    this.detector.detectChanges();
  }
  async collect() {
    this.dialogs.startLoading();
    const response = await this.shopsService.collectCash(
      this.sumControl.value
    );
    this.dialogs.stopLoading();
    if (response.isSuccess) {
      this.dialogs.pop();
      this.collected.emit();
    } else {
      this.dialogs.pushAlert(response.errorMessage);
    }
  }
}
