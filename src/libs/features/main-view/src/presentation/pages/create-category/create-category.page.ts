import { Component, OnInit } from '@angular/core';
import { ToastService } from '@libs/ui/src/lib/services/toast.service';
import { GetCategoriesService } from '../../../core/services/get-categories.service';
import { AddCategoryUseCase } from '../../../domain/usecases/add-category.usecase';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.page.html',
  styleUrls: ['./create-category.page.scss'],
})
export class CreateCategoryPage implements OnInit {
  public category: string = '';

  constructor(
    private addCategoryUseCase: AddCategoryUseCase,
    private toastService: ToastService,
    private getCategoriesService: GetCategoriesService
  ) {}

  ngOnInit() {
    console.log();
  }

  async createCategory() {
    if (this.category.trim() === '') {
      return;
    }

    try {
      await this.addCategoryUseCase.execute(this.category);
      this.toastService.showSuccess('Categoría creada con exito');
      this.category = '';
      this.getCategoriesService.emit();
    } catch (error) {
      this.toastService.showError();
    }
  }
}
