import { Injectable } from '@angular/core';
import { StorageService } from '../../core/services/storage.service';
import { Task } from '../../domain/entities/task.entity';
import { TaskRepository } from '../../domain/repositories/task.repository';


@Injectable({
  providedIn: 'root'
})
export class TaskRepositoryImpl implements TaskRepository {
  private readonly storageKey = 'tasks';

  constructor(private storageService: StorageService) {}

  async addTask(task: Task): Promise<void> {
    const tasks = await this.getTasks();
    tasks.push(task);
    this.storageService.setItem(this.storageKey, tasks);
  }

  async completeTask(taskId: string): Promise<void> {
    const tasks = await this.getTasks();
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      task.completed = true;
      this.storageService.setItem(this.storageKey, tasks);
    }
  }

  async deleteTask(taskId: string): Promise<void> {
    let tasks = await this.getTasks();
    tasks = tasks.filter(t => t.id !== taskId);
    this.storageService.setItem(this.storageKey, tasks);
  }

  async getTasks(): Promise<Task[]> {
    return this.storageService.getItem<Task[]>(this.storageKey) || [];
  }

  async getTasksByCategory(categoryId: string): Promise<Task[]> {
    const tasks = await this.getTasks();
    return tasks.filter(t => t.categoryId === categoryId);
  }
}
