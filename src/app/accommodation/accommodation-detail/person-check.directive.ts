import { Directive, HostListener, EventEmitter, Output, Input } from '@angular/core';

@Directive({
  selector: '[appPersonCheck]'
})
export class PersonCheckDirective {
  @Output() hidePerson = new EventEmitter();
  @Output() showPerson = new EventEmitter();

  @HostListener('blur') hideDropDown() {
    this.hidePerson.emit();
  }
}
