import { AbstractControl, FormControl, FormGroupDirective, NgForm } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export function repositoryValidator(control: AbstractControl): { [key: string]: boolean } | null {
  let regexp = new RegExp(/^https:\/\/github.com\/[a-zA-Z\-0-9]+\/[a-zA-Z\-0-9]+$/);
  if (!regexp.test(control.value)) {
    return { 'repository': true };
  }
  return null;
}
