import { AbstractControl, FormControl, FormGroup, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  constructor() { }

  static mustMatch(controlName: string, matchingControlName: string): ValidatorFn {

    return (controls: AbstractControl) => {

      const control = controls.get(controlName);
      const checkControl = controls.get(matchingControlName);

      if (checkControl?.errors && !checkControl.errors['matching']) {
        return null;
      }
      if (control?.value !== checkControl?.value) {
        controls.get(matchingControlName)?.setErrors({ matching: true });
        return { matching: true };
      } else {
        return null;
      }
    };

  }


}
