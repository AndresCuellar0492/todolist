import { Injectable } from '@angular/core';
import { UseCaseBase } from '@libs/features/commons';
import { CategoryRepository } from '../repositories/category.repository';

@Injectable({
  providedIn: 'root',
})
export class DeleteCategoryUseCase implements UseCaseBase<string, void> {
  constructor(private categoryRepository: CategoryRepository) {}

  execute(categoryId: string): Promise<void> {
    return this.categoryRepository.deleteCategory(categoryId);
  }
}
