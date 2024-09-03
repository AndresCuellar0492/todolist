import { Injectable } from '@angular/core';
import { UseCaseBase } from '@libs/features/commons';
import { Task } from '../entities/task.entity';
import { TaskRepository } from '../repositories/task.repository';

@Injectable({
  providedIn: 'root',
})
export class UpdateTaskUseCase implements UseCaseBase<Task, void> {
  constructor(private taskRepository: TaskRepository) {}

  async execute(task: Task): Promise<void> {
    await this.taskRepository.updateTask(task);
  }
}
