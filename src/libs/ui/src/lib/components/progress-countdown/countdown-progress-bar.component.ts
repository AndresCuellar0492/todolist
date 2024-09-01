import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-countdown-progress-bar',
  templateUrl: './countdown-progress-bar.component.html',
  styleUrls: ['./countdown-progress-bar.component.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CountdownProgressBarComponent {
  @Input() public seconds!: number;
  @Input() public message!: string;
  @Output() public finished = new EventEmitter<boolean>();

  public progress: number = 0;
  private interval: any;

  constructor() {}

  public start() {
    this.reset();
    this.interval = setInterval(() => {
      this.progress += 0.01;

      if (this.progress > 1) {
        setTimeout(() => {
          clearInterval(this.interval);
          this.progress = 0;
          this.finished.emit(true);
        }, 1000);
      }
    }, this.seconds * 10);
  }

  public reset() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.progress = 0;
  }
}
