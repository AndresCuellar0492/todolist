import { Injectable } from '@angular/core';
import { UseCaseBase } from '@libs/features/commons';
import { Task } from '../entities/task.entity';
import { TaskRepository } from '../repositories/task.repository';

@Injectable({
  providedIn: 'root',
})
export class GetTasksByCategoryUseCase implements UseCaseBase<string, Task[]> {
  constructor(private taskRepository: TaskRepository) {}

  async execute(categoryId?: string | null): Promise<Task[]> {
    if (categoryId) {
      return await this.taskRepository.getTasksByCategory(categoryId);
    }
    return await this.taskRepository.getTasks();
  }
}
