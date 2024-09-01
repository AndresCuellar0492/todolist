import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appPreventWhitespace]',
})
export class PreventWhitespaceDirective {
  constructor(private el: ElementRef) {}

  @HostListener('ionInput', ['$event']) onInput(event: any) {
    const input = event.target as HTMLInputElement;
    const filteredValue = input.value.replace(/[^a-zA-Z]+/g, '');
    input.value = filteredValue;
  }
}
