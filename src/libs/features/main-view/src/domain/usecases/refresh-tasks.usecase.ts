import { Injectable } from '@angular/core';
import { UseCaseBase } from '@libs/features/commons';
import { Task } from '../entities/task.entity';
import { TaskRepository } from '../repositories/task.repository';

@Injectable({
  providedIn: 'root',
})
export class RefreshTasksUseCase implements UseCaseBase<Task[], void> {
  constructor(private taskRepository: TaskRepository) {}

  async execute(tasks: Task[]): Promise<void> {
    await this.taskRepository.refreshTasks(tasks);
  }
}
