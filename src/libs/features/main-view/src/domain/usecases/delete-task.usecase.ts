import { Injectable } from '@angular/core';
import { UseCaseBase } from '@libs/features/commons';
import { TaskRepository } from '../repositories/task.repository';

@Injectable({
  providedIn: 'root',
})
export class DeleteTaskUseCase implements UseCaseBase<string, void> {
  constructor(private taskRepository: TaskRepository) {}

  async execute(taskId: string): Promise<void> {
    await this.taskRepository.deleteTask(taskId);
  }
}
