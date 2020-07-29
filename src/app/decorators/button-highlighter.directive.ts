import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';


@Directive({
  selector: '[appButtonHighlighter]'
})
export class ButtonHighlighterDirective {
@HostBinding('style.border') border = 'transparent';
  constructor(private elRef: ElementRef) { }

 @HostListener('mouseenter')  mouseenter(evenData: Event) {
  this.border = '1px solid white';
 }
 @HostListener('mouseleave')  mouseleave(evenData: Event) {
  this.border = 'transparent';
 }
}
