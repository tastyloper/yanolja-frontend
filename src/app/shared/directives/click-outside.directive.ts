import { Directive, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[appClickOutside]'
})
export class ClickOutsideDirective {
  constructor(private elementRef: ElementRef) { }
  // 이벤트 객체 발생
  @Output() clickOutSide = new EventEmitter<MouseEvent>();
  // document에서 발생한 Click이벤트
  // $event = 이벤트 자체
  // $event.target = 이벤트 발생 요소
  @HostListener('document:click', ['$event', '$event.target'])

  // onClick 이벤트에 내부적으로 인자 전달
  onClick(e: MouseEvent, target: HTMLElement) {

    // target이 없을경우 함수 종료
    if (!target) { return; }

    // 이벤트를 발생시킨 요소가 호스트 요소의 자식이 아니면 clickOutside 이벤트 방출
    const clickedInside = this.elementRef.nativeElement.contains(target);

    if (!clickedInside) {
      this.clickOutSide.emit(e);
    }
  }
}
