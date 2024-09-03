import { Category } from './category.entity';

export interface Task {
  id: string;
  description: string;
  completed: boolean;
  category?: Category;
}
