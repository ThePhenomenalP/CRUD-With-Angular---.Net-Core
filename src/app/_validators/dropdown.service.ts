import { Injectable } from '@angular/core';
import {
  AbstractControl,
  ValidationErrors,
  Validator,
  AsyncValidator,
} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class DropdownService implements Validator {
  constructor() {}

  validate(control: AbstractControl): ValidationErrors | null {
    const selectDropdownValue = control.value;
    if (selectDropdownValue == '' || selectDropdownValue == 'Choose Item') {
      return { NotSelected: true };
    } else {
      return null;
    }
  }
}
