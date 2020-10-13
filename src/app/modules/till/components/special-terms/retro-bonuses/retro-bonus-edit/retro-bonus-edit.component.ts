import { SellOut } from './../../../../../../entities/retro-bonus/retro-bonus.entity';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormArray,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { EnumCollection } from 'src/app/enums/enum-display.collection';
import { RetroBonusTypeEnum } from 'src/app/enums/retro-bonus-type.enum';
import { retroBonusTypeControls } from 'src/app/other/retro-bonus-type-control';
import { DialogsService } from 'src/app/services/dialogs.service';
import { RetroBonusService } from 'src/app/services/retro-bonus.service';
import { arrayMinValidators } from 'src/app/validators/number.validator';
import { RetroBonus } from 'src/app/entities/retro-bonus/retro-bonus.entity';
import { comparer } from 'src/app/other/compare-fn';

@Component({
  selector: 'app-retro-bonus-edit',
  templateUrl: './retro-bonus-edit.component.html',
  styleUrls: ['./retro-bonus-edit.component.css'],
})
export class RetroBonusEditComponent implements OnInit {
  @Output() edited = new EventEmitter<number>();
  EnumCollection = EnumCollection;
  form = new FormGroup({
    shops: new FormControl(undefined),
    products: new FormControl(undefined),
    types: new FormArray([], [arrayMinValidators(1)]),
  });
  get types() {
    return this.form.controls.types as FormArray;
  }
  getType(i: number) {
    return this.types.controls[i] as FormGroup;
  }
  constructor(
    @Inject(MAT_DIALOG_DATA) public bonus: RetroBonus,
    private dialogs: DialogsService,
    private retroBonusService: RetroBonusService,
    private detector: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    this.dialogs.startLoading();
    const response = await this.retroBonusService.getRetroBonus(this.bonus.id);
    this.dialogs.stopLoading();
    if (response.isSuccess) {
      this.bonus = response.result;
      this.form.patchValue({
        shops: this.bonus.shops?.map((x) => x.id),
        products: this.bonus.products?.map((x) => x.id),
      });
      this.bonus.types.forEach((x) => {
        const control = retroBonusTypeControls[x.type]();
        switch (x.type) {
          case RetroBonusTypeEnum.sellIn:
            control.patchValue({
              from: x.sellIn.from,
              to: x.sellIn.to,
              value: x.sellIn.value,
            });
            break;
          case RetroBonusTypeEnum.sellOut:
            control.patchValue({
              from: x.sellOut.from,
              to: x.sellOut.to,
              value: x.sellOut.value,
            });
            break;
          case RetroBonusTypeEnum.debit:
            control.patchValue({
              ftoDaysrom: x.debit.toDays,
              toDays: x.debit.toDays,
              value: x.debit.value,
            });
            break;
          case RetroBonusTypeEnum.marketing:
            control.patchValue({
              description: x.marketing.description,
              value: x.marketing.value,
            });
            break;
        }
        const group = new FormGroup({
          type: new FormControl(x.type, [Validators.required]),
        });
        group.addControl(RetroBonusTypeEnum[x.type], control);
        this.types.push(group);
      });
    }
    this.detector.detectChanges();
  }

  addType() {
    this.types.controls.push(
      new FormGroup({
        type: new FormControl(0),
      })
    );
    this.types.patchValue([]);
  }
  removeType(i: number) {
    this.types.removeAt(i);
  }
  fromDaysChange(control: AbstractControl) {
    const group = control as FormGroup;
    const toDays = group.controls.toDays;
    const fromDays = group.controls.fromDays;

    if (toDays && fromDays) {
      if (toDays.value < fromDays.value) {
        toDays.setValue(fromDays.value);
      }
    }
  }
  onChangeType(typeControl: AbstractControl) {
    const typeGroup = typeControl as FormGroup;

    const value = typeGroup.controls.type.value;

    typeGroup.removeControl('sellIn');
    typeGroup.removeControl('sellOut');
    typeGroup.removeControl('marketing');
    typeGroup.removeControl('debit');

    typeGroup.addControl(
      RetroBonusTypeEnum[value],
      retroBonusTypeControls[value]()
    );

    this.detector.detectChanges();
  }
  async edit() {
    this.dialogs.startLoading();
    const response = await this.retroBonusService.editRetroBonus(
      this.bonus.id,
      this.form.getRawValue()
    );
    this.dialogs.stopLoading();

    if (response.isSuccess) {
      this.edited.emit();
      this.dialogs.pop();
    } else {
      this.dialogs.pushAlert(response.errorMessage);
    }
  }
  comparer(type1: RetroBonusTypeEnum, type2: RetroBonusTypeEnum) {
    return type1 === type2;
  }
}
