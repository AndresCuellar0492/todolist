import { Injectable } from '@angular/core';
import { I18nConfig } from '@libs/base/config/i18n.config';
import { TranslateProvider } from '@libs/base/providers';
import { AlertService } from '@libs/ui/src/lib/services/alert.service';
import { ToastService } from '@libs/ui/src/lib/services/toast.service';
import { GetCategoriesService } from '../../core/services/get-categories.service';
import { GetTasksService } from '../../core/services/get-tasks.service';
import { Category } from '../../domain/entities/category.entity';
import { AddCategoryUseCase } from '../../domain/usecases/add-category.usecase';
import { DeleteCategoryUseCase } from '../../domain/usecases/delete-category.usecase';
import { ManageCategoriesConfig } from './manage-categories.config';

@Injectable({
  providedIn: 'root',
})
export class ManageCategoriesService {
  private config = ManageCategoriesConfig;
  constructor(
    private alertService: AlertService,
    private deleteCategoryUseCase: DeleteCategoryUseCase,
    private addCategoryUseCase: AddCategoryUseCase,
    private toastService: ToastService,
    private getTasksService: GetTasksService,
    private getCategoriesService: GetCategoriesService,
    private translateProvider: TranslateProvider
  ) {
    this.translateProvider.loadModule(I18nConfig.modules.MAIN_VIEW);
  }

  async createCategory(category: Category) {
    if (category.name.trim() === '') {
      return;
    }

    const message = this.translateProvider.get(
      this.config.i18n.toast.succesCategory
    );

    try {
      await this.addCategoryUseCase.execute(category);
      this.toastService.showSuccess(message);
      this.refreshData();
    } catch (error) {
      this.toastService.showError();
    }
  }

  public async confirmDeleteCategory(category: Category) {
    const texts = this.translateProvider.get(
      this.config.i18n.alerts.confirmDeleteCategory
    );
    const alert = await this.alertService.show({
      texts,
      handlers: {
        accept: () => {
          this.deleteCategory(category);
        },
      },
    });
  }

  async presentUpdateCategoryAlert(category: Category) {
    const texts = this.translateProvider.get(
      this.config.i18n.alerts.presentUpdateCategory
    );

    const inputs = [
      {
        name: texts.inputs.name,
        placeholder: texts.inputs.placeholder,
        value: category.name,
      },
    ];

    const handlers = {
      accept: (data: any) => {
        const categoryInfo: Category = {
          id: category.id,
          name: data.categoryName,
        };
        this.updateCategory(categoryInfo);
      },
    };

    this.alertService.show({ texts, handlers, inputs });
  }

  public async deleteCategory(category: Category) {
    const message = this.translateProvider.get(
      this.config.i18n.toast.deleteCategory
    );
    await this.deleteCategoryUseCase.execute(category.id);
    this.toastService.showInfo(message);
    this.refreshData();
  }

  async updateCategory(category: Category) {
    if (category.name.trim() === '') {
      return;
    }

    const message = this.translateProvider.get(
      this.config.i18n.toast.updateCategory
    );

    try {
      await this.addCategoryUseCase.execute(category);
      this.toastService.showSuccess(message);
      this.refreshData();
    } catch (error) {
      this.toastService.showError();
    }
  }

  public refreshData() {
    this.getCategoriesService.emit();
    this.getTasksService.emit();
  }
}
