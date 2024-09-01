import { Task } from '../entities/task.entity';

export abstract class TaskRepository {
  public abstract addTask(task: Task): Promise<void>;
  public abstract completeTask(taskId: string): Promise<void>;
  public abstract deleteTask(taskId: string): Promise<void>;
  public abstract getTasks(): Promise<Task[]>;
  public abstract getTasksByCategory(categoryId: string): Promise<Task[]>;
}
