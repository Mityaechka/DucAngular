import { ValidatorFn, AbstractControl, FormArray } from '@angular/forms';


export function arrayMinValidators(min: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    let result: { [key: string]: any } | null = null;

    if (!(control instanceof FormArray)) {
      result = { notFormArray: '' };
    } else {
      result =
        control.controls.length < min ? { min: '' } : null;
    }
    return result;
  };
}
