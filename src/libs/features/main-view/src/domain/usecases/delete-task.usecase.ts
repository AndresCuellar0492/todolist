import { Injectable } from '@angular/core';
import { UseCaseBase } from '@libs/features/commons';
import { TaskRepository } from '../repositories/task.repository';
import { Task } from './../entities/task.entity';

@Injectable({
  providedIn: 'root',
})
export class DeleteTaskUseCase implements UseCaseBase<Task, boolean> {
  constructor(private taskRepository: TaskRepository) {}

  async execute(task: Task): Promise<boolean> {
    return this.taskRepository.deleteTask(task);
  }
}
