import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const DEFAULT_IMG_MIME_TYPES = ['image/jpeg', 'image/png'];

export function imgRequired(): ValidatorFn {
  return (control: AbstractControl<File | null>): ValidationErrors | null => {
    return control.value ? null : { imgRequired: true };
  };
}

export function imgMimeType(allowed: readonly string[] = DEFAULT_IMG_MIME_TYPES): ValidatorFn {
  return (control: AbstractControl<File | null>): ValidationErrors | null => {
    const file = control.value;
    if (!file) return null; // si es opcional, no marca error
    const ok = allowed.includes(file.type);
    return ok ? null : { imgMimeType: { allowed, actual: file.type } };
  };
}

export function imgMaxSize(maxBytes: number): ValidatorFn {
  return (control: AbstractControl<File | null>): ValidationErrors | null => {
    const file = control.value;
    if (!file) return null;
    return file.size <= maxBytes ? null : { imgMaxSize: { maxBytes, actual: file.size } };
  };
}
