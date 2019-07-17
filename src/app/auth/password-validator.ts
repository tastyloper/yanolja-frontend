import { AbstractControl } from '@angular/forms';

export class PasswordValidator {
  static match(passwordGroup: AbstractControl) {
    const userpw = passwordGroup.get('userpw').value;
    const confirmPw = passwordGroup.get('confirmPw').value;

    return userpw === confirmPw ? null : { match: { userpw, confirmPw } };
  }
}
