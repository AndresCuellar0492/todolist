import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-ghost',
  template: '',
})
export class GhostComponent implements OnChanges {
  @Input() height!: string;
  @Input() width?: string;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.renderer.setStyle(this.el.nativeElement, 'display', 'block');
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['height']) {
      this.setHeight(this.height.toString());
    }
    if (changes['width']) {
      this.setWidth(this.width ? this.width.toString() : '100');
    } else {
      this.setWidth('100');
    }
  }

  private setHeight(height: string) {
    this.renderer.setStyle(this.el.nativeElement, 'height', `${height}`);
  }

  private setWidth(width: string) {
    this.renderer.setStyle(this.el.nativeElement, 'width', `${width}`);
  }
}
