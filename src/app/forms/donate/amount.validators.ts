import { ValidatorFn, AbstractControl } from '@angular/forms';

export function maxAmountValidator(maxAmount: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    if (value > maxAmount) {
      return { maxAmountExceeded: true };
    }
    return null;
  };
}