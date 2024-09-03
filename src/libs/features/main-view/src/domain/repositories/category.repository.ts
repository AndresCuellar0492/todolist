import { Category } from '../entities/category.entity';

export abstract class CategoryRepository {
  public abstract addCategory(category: Category): Promise<void>;
  public abstract deleteCategory(categoryId: string): Promise<void>;
  public abstract getCategories(): Promise<Category[]>;
}
