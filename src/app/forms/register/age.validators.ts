import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class ageValidator{

  static age(control: AbstractControl): ValidationErrors | null {
        
        const birthDate = new Date(control.value);
        const currentDate = new Date();
        const ageDifference = currentDate.getTime() - birthDate.getTime();
        const ageInYears = Math.floor(ageDifference / (1000 * 3600 * 24 * 365.25));
  
        if (ageInYears < 16) {
          return { age: true };
        }
      return null;
  }
}