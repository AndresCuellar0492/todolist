import { Injectable } from '@angular/core';
import { UseCaseBase } from '@libs/features/commons';
import { Category } from '../entities/category.entity';
import { CategoryRepository } from '../repositories/category.repository';

@Injectable({
  providedIn: 'root',
})
export class GetCategoriesUseCase implements UseCaseBase<void, Category[]> {
  constructor(private categoryRepository: CategoryRepository) {}

  execute(): Promise<Category[]> {
    return this.categoryRepository.getCategories();
  }
}
