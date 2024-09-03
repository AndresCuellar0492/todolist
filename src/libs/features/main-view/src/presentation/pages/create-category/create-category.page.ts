import { Component, OnInit } from '@angular/core';
import { GetCategoriesService } from '../../../core/services/get-categories.service';
import { Category } from '../../../domain/entities/category.entity';
import { GetCategoriesUseCase } from '../../../domain/usecases/get-categories.usecase';
import { ManageCategoriesService } from '../../services/manage-categories.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.page.html',
  styleUrls: ['./create-category.page.scss'],
})
export class CreateCategoryPage implements OnInit {
  public categoryLocal: Category = { id: '', name: '' };
  public categories!: Category[];

  constructor(
    private getCategoriesService: GetCategoriesService,
    private getCategoriesUseCase: GetCategoriesUseCase,
    private manageCategoriesService: ManageCategoriesService
  ) {}

  ngOnInit() {
    this.getCategories();
    this.getCategoriesService.subscribe(() => {
      this.getCategories();
      this.categoryLocal = { id: '', name: '' };
    });
  }

  public createCategoryService() {
    this.manageCategoriesService.createCategory(this.categoryLocal);
  }

  async getCategories() {
    this.categories = await this.getCategoriesUseCase.execute();
  }
}
