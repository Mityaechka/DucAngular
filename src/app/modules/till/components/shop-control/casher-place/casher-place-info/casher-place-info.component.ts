import { ShopsService } from 'src/app/services/shops.service';
import { DialogsService } from 'src/app/services/dialogs.service';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  Component,
  OnInit,
  Inject,
  Output,
  EventEmitter,
  ChangeDetectorRef,
} from '@angular/core';
import { CasherPlace } from 'src/app/entities/casher-place.entity';

@Component({
  templateUrl: './casher-place-info.component.html',
  styleUrls: ['./casher-place-info.component.css'],
})
export class CasherPlaceInfoComponent implements OnInit {
  @Output() edited = new EventEmitter();
  constructor(
    @Inject(MAT_DIALOG_DATA) public casherPlace: CasherPlace,
    private dialogs: DialogsService,
    private detector: ChangeDetectorRef,
    private shopsService: ShopsService
  ) {}

  ngOnInit(): void {}
  async reload() {
    this.dialogs.startLoading();
    const response = await this.shopsService.getCasherPlace(
      this.casherPlace.id
    );
    if (response.isSuccess) {
      this.casherPlace = response.result;
    }
    this.dialogs.stopLoading();
    this.detector.detectChanges();
  }
  enableCasherPlace() {
    this.dialogs.pushConfirm(
      'Включение кассы',
      'Вы точно хотите включить данную кассу?',
      async () => {
        this.dialogs.startLoading();
        const response = await this.shopsService.enableCasherPlace(
          this.casherPlace.id
        );
        this.dialogs.stopLoading();
        if (response.isSuccess) {
          this.reload();
          this.edited.emit();
        }else{
          this.dialogs.pushAlert(response.errorMessage);
        }
        this.dialogs.stopLoading();
      }
    );
  }
  disableCasherPlace() {
    this.dialogs.pushConfirm(
      'Откючение кассы',
      'Вы точно хотите отключть данную кассу?',
      async () => {
        this.dialogs.startLoading();
        const response = await this.shopsService.disableCasherPlace(
          this.casherPlace.id
        );
        this.dialogs.stopLoading();
        if (response.isSuccess) {
          this.reload();
          this.edited.emit();
        }else{
          this.dialogs.pushAlert(response.errorMessage);
        }
        this.dialogs.stopLoading();
      }
    );
  }
}
