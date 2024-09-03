import { Injectable } from '@angular/core';
import { StorageProvider } from '@libs/base/providers/storage.provider';
import { MainViewConfig } from '@libs/features/main-view/main-view.config';
import { randomId } from '@libs/utils/functions/src/lib/id-generator.util';
import { Task } from '../../domain/entities/task.entity';
import { TaskRepository } from '../../domain/repositories/task.repository';

@Injectable({
  providedIn: 'root',
})
export class TaskRepositoryImpl implements TaskRepository {
  private readonly storageKey = MainViewConfig.storage.tasksKey;

  constructor(private storageProvider: StorageProvider) {}

  async addTask(task: Task): Promise<void> {
    const tasks = await this.getTasks();
    task.id = randomId();

    tasks.push(task);
    this.storageProvider.setItem(this.storageKey, tasks);
  }

  async updateTask(taskItem: Task): Promise<void> {
    const tasks = await this.getTasks();

    const taskIndex = tasks.findIndex((task) => task.id === taskItem.id);
    if (taskIndex !== -1) {
      tasks[taskIndex] = taskItem;
      this.storageProvider.setItem(this.storageKey, tasks);
    }
  }

  async refreshTasks(tasks: Task[]): Promise<void> {
    this.storageProvider.setItem(this.storageKey, tasks);
  }

  async deleteTask(task: Task): Promise<boolean> {
    let updatedTasks = await this.getTasks();
    updatedTasks = updatedTasks.filter((t) => t.id !== task.id);
    this.storageProvider.setItem(this.storageKey, updatedTasks);

    const remainingTasksInCategory = updatedTasks.filter(
      (t) => t.category?.id === task.category?.id
    );

    return remainingTasksInCategory.length === 0;
  }

  async getTasks(): Promise<Task[]> {
    return this.storageProvider.getItem<Task[]>(this.storageKey) || [];
  }

  async getTasksByCategory(categoryId: string): Promise<Task[]> {
    const tasks = await this.getTasks();
    return tasks.filter((t) => t?.category?.id === categoryId);
  }
}
