import { AbstractControl, ValidationErrors } from '@angular/forms';

export function minLengthArray(min: number) {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as unknown[];
    return value.length >= min ? null : { minLengthArray: { required: min, actual: value.length } };
  };
}
