import { Injectable } from '@angular/core';
import { UseCaseBase } from '@libs/features/commons';
import { CategoryRepository } from '../repositories/category.repository';

@Injectable({
  providedIn: 'root',
})
export class AddCategoryUseCase implements UseCaseBase<string, void> {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(category: string): Promise<void> {
    await this.categoryRepository.addCategory(category);
  }
}
