import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../../domain/entities/task.entity';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Output() completed = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  onComplete() {
    this.completed.emit();
  }

  onDelete() {
    this.delete.emit();
  }
}
