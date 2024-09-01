import { Injectable } from '@angular/core';
import { StorageService } from '../../core/services/storage.service';
import { Category } from '../../domain/entities/category.entity';
import { CategoryRepository } from '../../domain/repositories/category.repository';

@Injectable({
  providedIn: 'root',
})
export class CategoryRepositoryImpl implements CategoryRepository {
  private readonly storageKey = 'categories';

  constructor(private storageService: StorageService) {}

  async addCategory(categoryName: string): Promise<void> {
    const categories = await this.getCategories();

    // Convertir los IDs a números y calcular el siguiente ID
    const nextId =
      categories.length > 0
        ? Math.max(...categories.map((c) => Number(c.id))) + 1
        : 1;

    // Crear la nueva categoría con el ID generado
    const newCategory: Category = { id: nextId.toString(), name: categoryName };

    categories.push(newCategory);
    this.storageService.setItem(this.storageKey, categories);
  }

  async deleteCategory(categoryId: string): Promise<void> {
    let categories = await this.getCategories();
    categories = categories.filter((c) => c.id !== categoryId);
    this.storageService.setItem(this.storageKey, categories);
  }

  async getCategories(): Promise<Category[]> {
    return this.storageService.getItem<Category[]>(this.storageKey) || [];
  }
}
