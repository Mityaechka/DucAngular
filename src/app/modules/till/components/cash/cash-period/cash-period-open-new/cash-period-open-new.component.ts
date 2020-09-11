import { FormControl, Validators } from '@angular/forms';
import { DialogsService } from 'src/app/services/dialogs.service';
import {
  Component,
  OnInit,
  ChangeDetectorRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { ShopsService } from 'src/app/services/shops.service';
import { CasherPlace } from 'src/app/entities/casher-place.entity';

@Component({
  selector: 'app-cash-period-open-new',
  templateUrl: './cash-period-open-new.component.html',
  styleUrls: ['./cash-period-open-new.component.css'],
})
export class CashPeriodOpenNewComponent implements OnInit {
  @Output() opened = new EventEmitter<any>();
  casherPlaceControl = new FormControl('', [Validators.required]);
  casherPlaces: CasherPlace[];
  constructor(
    private dialogs: DialogsService,
    private shopsService: ShopsService,
    private detector: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    this.dialogs.startLoading();
    const response = await this.shopsService.getCasherPlaces();
    if (response.isSuccess) {
      this.casherPlaces = response.result.list.filter(
        (x) => x.userInPlace === null
      );
    }
    this.dialogs.stopLoading();
    this.detector.detectChanges();
  }
  async open() {
    this.dialogs.startLoading();
    const response = await this.shopsService.openNewPeriod(
      this.casherPlaceControl.value
    );
    this.dialogs.stopLoading();
    if (response.isSuccess) {
      this.dialogs.pop();
      this.opened.emit();
    } else {
      this.dialogs.pushAlert(response.errorMessage);
    }
  }
}
