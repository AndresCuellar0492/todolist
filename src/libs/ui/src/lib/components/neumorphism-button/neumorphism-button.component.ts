import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-neumorphism-button',
  template: `
    <a class="neumorphism-button" (click)="handleClick($event)">
      <img [src]="iconSrc" alt="{{ altText }}" />
      {{ buttonText }}
      <ion-icon name="arrow-forward" class="icon"></ion-icon>
    </a>
  `,
  styleUrls: ['./neumorphism-button.component.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NeumorphismButtonComponent {
  @Input() iconSrc!: string;
  @Input() altText!: string;
  @Input() buttonText!: string;

  @Output() buttonClick = new EventEmitter<Event>();

  handleClick(event: Event) {
    this.buttonClick.emit(event);
  }
}
