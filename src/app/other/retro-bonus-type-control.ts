import { FormGroup, FormControl, Validators } from '@angular/forms';

export const retroBonusTypeControls = [
  () =>
    new FormGroup({
      from: new FormControl(0, [Validators.required]),
      to: new FormControl(0, [Validators.required]),
      value: new FormControl(0, [Validators.required]),
    }),
  () =>
    new FormGroup({
      from: new FormControl(0, [Validators.required]),
      to: new FormControl(0, [Validators.required]),
      value: new FormControl(0, [Validators.required]),
    }),
  () =>
    new FormGroup({
      value: new FormControl(0, [Validators.required]),
      description: new FormControl('', [Validators.required]),
    }),
  () =>
    new FormGroup({
      fromDays: new FormControl(0, [Validators.required]),
      toDays: new FormControl(0, [Validators.required]),
      value: new FormControl(0, [Validators.required]),
    }),
];
