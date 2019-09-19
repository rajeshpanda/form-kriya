import { AbstractControl } from '@angular/forms';

const keyPattern = '^[a-zA-Z_0-9]*$';

export function ValidateKey(control: AbstractControl) {
  if (!control.value) {
    return null;
  }
  if (!control.value.match(keyPattern)) {
    console.log(control.value);
    return { keyPattern: true };
  }
  return null;
}
