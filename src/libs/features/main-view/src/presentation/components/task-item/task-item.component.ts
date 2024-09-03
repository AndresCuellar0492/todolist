import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../../domain/entities/task.entity';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Output() updateTask = new EventEmitter<void>();
  @Output() detailTask = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  onComplete(event: Event) {
    event.stopPropagation();
    this.updateTask.emit();
  }

  goToDetailTask(event: Event) {
    event.stopPropagation();
    this.detailTask.emit();
  }

  onDelete() {
    this.delete.emit();
  }
}
