import { Component, OnInit, ViewChild } from '@angular/core';
import { SearchableSelectComponent } from '@libs/ui/src/lib/components/searchable-select/searchable-select.component';
import { ModalService } from '@libs/ui/src/lib/services/modal.service';

import { I18nConfig } from '@libs/base/config/i18n.config';
import { TranslateProvider } from '@libs/base/providers';
import { SelectDynamicEntity } from '../../../core/entities/select-dynamic.entity';
import { GetCategoriesService } from '../../../core/services/get-categories.service';
import { GetTasksService } from '../../../core/services/get-tasks.service';
import { Category } from '../../../domain/entities/category.entity';
import { Task } from '../../../domain/entities/task.entity';
import { DeleteTaskUseCase } from '../../../domain/usecases/delete-task.usecase';
import { GetCategoriesUseCase } from '../../../domain/usecases/get-categories.usecase';
import { GetTasksByCategoryUseCase } from '../../../domain/usecases/get-tasks-by-category.usecase';
import { UpdateTaskUseCase } from '../../../domain/usecases/update-task.usecase';
import { AddTaskOrganism } from '../../organisms/add-task/add-task.organism';
import { HomeConfig } from './home.config';

@Component({
  selector: 'app-main-view',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('selectCategories')
  selectCategories!: SearchableSelectComponent;
  tasks: Task[] = [];
  categories: Category[] = [];
  newTaskTitle: string = '';
  selectedCategory!: SelectDynamicEntity;

  constructor(
    private updateTaskUseCase: UpdateTaskUseCase,
    private getTasksByCategoryUseCase: GetTasksByCategoryUseCase,
    private getCategoriesUseCase: GetCategoriesUseCase,
    private deleteTaskUseCase: DeleteTaskUseCase,
    private modalService: ModalService,
    private getCategoriesService: GetCategoriesService,
    private getTasksService: GetTasksService,
    private translateProvider: TranslateProvider
  ) {}

  async ngOnInit() {
    await this.translateProvider.loadModule(I18nConfig.modules.MAIN_VIEW);
    this.loadGeneralData();
    this.getCategoriesService.subscribe(() => this.getCategories());
    this.getTasksService.subscribe(() => this.getTasksWithCategories());
  }

  private loadGeneralData() {
    this.getCategories();
    this.getTasksWithCategories();
  }

  private async loadTasks(): Promise<void> {
    this.tasks = await this.getTasksByCategoryUseCase.execute();
  }

  public async selectedChanged(item: SelectDynamicEntity) {
    this.selectedCategory = item;
    if (this.selectedCategory.id) {
      this.tasks = await this.getTasksByCategoryUseCase.execute(
        this.selectedCategory.id
      );
      return;
    }

    this.loadTasks();
  }

  public async goToDetailTask(isModeEdit = false, task?: Task) {
    const modal = await this.modalService.show<AddTaskOrganism>(
      AddTaskOrganism,
      {
        categories: this.categories,
        isModeEdit,
        task,
      }
    );

    const data = await modal.onDidDismiss();
  }

  async onUpdateTask(task: Task) {
    task.completed = !task.completed;
    await this.updateTaskUseCase.execute(task);
    this.loadTasks();
  }

  async onDeleteTask(taskId: string) {
    await this.deleteTaskUseCase.execute(taskId);
    this.loadTasks();
  }

  getTextSearch() {
    const textDefaultSearch = this.translateProvider.get(
      HomeConfig.i18n.page.filterText
    );
    return this.selectedCategory?.name
      ? this.selectedCategory?.name
      : textDefaultSearch;
  }

  async getCategories() {
    this.categories = await this.getCategoriesUseCase.execute();
  }

  async getTasksWithCategories() {
    this.tasks = [];
    await this.loadTasks();

    this.tasks.map((task) => {
      const category = this.categories.find(
        (cat) => cat.id === task?.category?.id
      );
      return { task, category };
    });
  }

  public clearSelection() {
    this.selectCategories.clearSelection();
  }

  public get hasTasks(): boolean {
    return this.tasks.length > 0;
  }
}
