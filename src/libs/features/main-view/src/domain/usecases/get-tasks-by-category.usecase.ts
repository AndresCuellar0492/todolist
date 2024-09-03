import { Injectable } from '@angular/core';
import { UseCaseBase } from '@libs/features/commons';
import { Task } from '../entities/task.entity';
import { TaskRepository } from '../repositories/task.repository';

@Injectable({
  providedIn: 'root',
})
export class GetTasksByCategoryUseCase implements UseCaseBase<string, Task[]> {
  constructor(private taskRepository: TaskRepository) {}

  execute(categoryId?: string | null): Promise<Task[]> {
    if (categoryId) {
      return this.taskRepository.getTasksByCategory(categoryId);
    }
    return this.taskRepository.getTasks();
  }
}
