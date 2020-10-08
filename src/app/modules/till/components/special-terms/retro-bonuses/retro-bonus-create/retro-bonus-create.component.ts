import { EnumCollection } from './../../../../../../enums/enum-display.collection';
import { RetroBonusTypeEnum } from './../../../../../../enums/retro-bonus-type.enum';
import { RetroBonusService } from './../../../../../../services/retro-bonus.service';
import { DialogsService } from './../../../../../../services/dialogs.service';
import { Group } from './../../../../../../entities/group.entity';
import {
  FormGroup,
  FormControl,
  FormArray,
  AbstractControl,
  Validators,
  ValidatorFn,
} from '@angular/forms';
import {
  Component,
  OnInit,
  ChangeDetectorRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { arrayMinValidators } from 'src/app/validators/number.validator';
import { retroBonusTypeControls } from 'src/app/other/retro-bonus-type-control';

@Component({
  selector: 'app-retro-bonus-create',
  templateUrl: './retro-bonus-create.component.html',
  styleUrls: ['./retro-bonus-create.component.css'],
})
export class RetroBonusCreateComponent implements OnInit {
  @Output() created = new EventEmitter<number>();
  EnumCollection = EnumCollection;
  form = new FormGroup({
    shops: new FormControl(undefined),
    products: new FormControl(undefined),
    types: new FormArray(
      [
        new FormGroup({
          type: new FormControl(0, [Validators.required]),
        }),
      ],
      [arrayMinValidators(1)]
    ),
  });
  get types() {
    return this.form.controls.types as FormArray;
  }
  getType(i: number) {
    return this.types.controls[i] as FormGroup;
  }
  constructor(
    private dialogs: DialogsService,
    private retroBonusService: RetroBonusService,
    private detector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

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
  async create() {
    this.dialogs.startLoading();
    const response = await this.retroBonusService.createRetroBonus(
      this.form.getRawValue()
    );
    this.dialogs.stopLoading();

    if (response.isSuccess) {
      this.created.emit();
      this.dialogs.pop();
    } else {
      this.dialogs.pushAlert(response.errorMessage);
    }
  }
}
