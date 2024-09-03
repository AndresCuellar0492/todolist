import { Injectable } from '@angular/core';
import { UseCaseBase } from '@libs/features/commons';
import { Category } from '../entities/category.entity';
import { CategoryRepository } from '../repositories/category.repository';

@Injectable({
  providedIn: 'root',
})
export class AddCategoryUseCase implements UseCaseBase<Category, void> {
  constructor(private categoryRepository: CategoryRepository) {}

  execute(category: Category): Promise<void> {
    return this.categoryRepository.addCategory(category);
  }
}
