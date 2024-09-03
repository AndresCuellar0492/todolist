import { Injectable } from '@angular/core';
import { UseCaseBase } from '@libs/features/commons';
import { Task } from '../entities/task.entity';
import { TaskRepository } from '../repositories/task.repository';

@Injectable({
  providedIn: 'root',
})
export class AddTaskUseCase implements UseCaseBase<Task, void> {
  constructor(private taskRepository: TaskRepository) {}

  execute(task: Task): Promise<void> {
    return this.taskRepository.addTask(task);
  }
}
