import { Task } from '../entities/task.entity';

export abstract class TaskRepository {
  public abstract addTask(task: Task): Promise<void>;
  public abstract refreshTasks(tasks: Task[]): Promise<void>;
  public abstract updateTask(task: Task): Promise<void>;
  public abstract deleteTask(task: Task): Promise<boolean>;
  public abstract getTasks(): Promise<Task[]>;
  public abstract getTasksByCategory(categoryId: string): Promise<Task[]>;
}
