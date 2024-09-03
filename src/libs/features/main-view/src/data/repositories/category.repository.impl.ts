import { Injectable } from '@angular/core';
import { StorageProvider } from '@libs/base/providers/storage.provider';
import { MainViewConfig } from '@libs/features/main-view/main-view.config';
import { Category } from '../../domain/entities/category.entity';
import { CategoryRepository } from '../../domain/repositories/category.repository';
import { GetTasksByCategoryUseCase } from '../../domain/usecases/get-tasks-by-category.usecase';
import { RefreshTasksUseCase } from '../../domain/usecases/refresh-tasks.usecase';
import { Task } from './../../domain/entities/task.entity';

@Injectable({
  providedIn: 'root',
})
export class CategoryRepositoryImpl implements CategoryRepository {
  private readonly storageKey = MainViewConfig.storage.categoriesKey;
  private readonly generalCategory: Category = MainViewConfig.defaultCategory;

  constructor(
    private storageProvider: StorageProvider,
    private getTasksByCategoryUseCase: GetTasksByCategoryUseCase,
    private refreshTasksUseCase: RefreshTasksUseCase
  ) {
    this.ensureGeneralCategoryExists();
  }

  private async ensureGeneralCategoryExists(): Promise<void> {
    let categories = await this.getCategories();
    if (!categories.some((c) => c.id === this.generalCategory.id)) {
      categories.push(this.generalCategory);
      this.storageProvider.setItem(this.storageKey, categories);
    }
  }

  async addCategory(category: Category): Promise<void> {
    if (category.id === this.generalCategory.id) {
      return;
    }

    const tasks = await this.getTasks();
    const categories = await this.getCategories();

    const existingCategoryIndex = categories.findIndex(
      (c) => c.id === category.id
    );

    if (existingCategoryIndex > -1) {
      categories[existingCategoryIndex] = category;
      tasks.forEach((task) => {
        if (task.category?.id === category.id) {
          task.category = category;
        }
      });
      this.refreshTasksUseCase.execute(tasks);
    } else {
      const randomFactor = Math.floor(Math.random() * 1000);
      const nextId = categories.length + 1 + randomFactor;
      category.id = nextId.toString();

      categories.push(category);
    }

    this.storageProvider.setItem(this.storageKey, categories);
  }

  async deleteCategory(categoryId: string): Promise<void> {
    if (categoryId === this.generalCategory.id) {
      return;
    }

    let categories = await this.getCategories();
    categories = categories.filter((c) => c.id !== categoryId);
    this.storageProvider.setItem(this.storageKey, categories);

    return this.deleteTasksByCategory(categoryId);
  }

  async getCategories(): Promise<Category[]> {
    return this.storageProvider.getItem<Category[]>(this.storageKey) || [];
  }

  async deleteTasksByCategory(categoryId: string): Promise<void> {
    let tasks = await this.getTasks();
    tasks = tasks.filter((task) => task?.category?.id !== categoryId);

    return this.refreshTasksUseCase.execute(tasks);
  }
  private async getTasks(): Promise<Task[]> {
    return this.getTasksByCategoryUseCase.execute();
  }
}
