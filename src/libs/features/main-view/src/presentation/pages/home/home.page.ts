import { Component, OnInit, ViewChild } from '@angular/core';
import { SearchableSelectComponent } from '@libs/ui/src/lib/components/searchable-select/searchable-select.component';
import { ModalService } from '@libs/ui/src/lib/services/modal.service';
import { SelectDynamicEntity } from '../../../core/entities/select-dynamic.entity';
import { GetCategoriesService } from '../../../core/services/get-categories.service';
import { Category } from '../../../domain/entities/category.entity';
import { Task } from '../../../domain/entities/task.entity';
import { AddCategoryUseCase } from '../../../domain/usecases/add-category.usecase';
import { AddTaskUseCase } from '../../../domain/usecases/add-task.usecase';
import { CompleteTaskUseCase } from '../../../domain/usecases/complete-task.usecase';
import { DeleteCategoryUseCase } from '../../../domain/usecases/delete-category.usecase';
import { DeleteTaskUseCase } from '../../../domain/usecases/delete-task.usecase';
import { GetCategoriesUseCase } from '../../../domain/usecases/get-categories.usecase';
import { GetTasksByCategoryUseCase } from '../../../domain/usecases/get-tasks-by-category.usecase';
import { AddTaskOrganism } from '../../organisms/add-task/add-task.organism';

@Component({
  selector: 'app-main-view',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('selectCategories')
  selectCategories!: SearchableSelectComponent;
  tasks: Task[] = []; // Lista de tareas
  categories: Category[] = [
    { id: '0', name: 'casa' },
    { id: '1', name: 'trabajo' },
  ]; // Lista de categorías
  newTaskTitle: string = ''; // Título de la nueva tarea
  selectedCategory!: SelectDynamicEntity;
  textDefaultSearch = 'Filtrar por categoria: ';

  constructor(
    private addTaskUseCase: AddTaskUseCase,
    private completeTaskUseCase: CompleteTaskUseCase,
    private getTasksByCategoryUseCase: GetTasksByCategoryUseCase,
    private getCategoriesUseCase: GetCategoriesUseCase,
    private deleteTaskUseCase: DeleteTaskUseCase,
    private addCategoryUseCase: AddCategoryUseCase,
    private deleteCategoryUseCase: DeleteCategoryUseCase,
    private modalService: ModalService,
    private getCategoriesService: GetCategoriesService
  ) {}

  async ngOnInit() {
    // Cargar tareas y categorías al iniciar la página
    this.tasks = await this.getTasksByCategoryUseCase.execute();
    this.getCategoriesService.subscribe(() => this.getCategories());
    console.log(this.tasks);
    this.getCategories();
  }

  public selectedChanged(item: SelectDynamicEntity) {
    this.selectedCategory = item;
    if (this.selectedCategory.id) {
    }
  }

  async onAddTask(title: string) {
    // Añadir una nueva tarea
    if (title.trim().length === 0) {
      return; // Evitar añadir tareas sin título
    }

    const task = new Task(
      Date.now().toString(),
      title,
      false,
      this.selectedCategory?.id ?? ''
    );
    await this.addTaskUseCase.execute(task);
    this.tasks = await this.getTasksByCategoryUseCase.execute();
    this.newTaskTitle = ''; // Limpiar el input después de añadir la tarea
  }

  public async addTask() {
    const modal = await this.modalService.show<AddTaskOrganism>(
      AddTaskOrganism,
      {
        categories: this.categories,
      }
    );

    const data = await modal.onDidDismiss();
    console.log('Modal data:', data.data);
  }

  async onCompleteTask(taskId: string) {
    // Completar una tarea
    await this.completeTaskUseCase.execute(taskId);
    this.tasks = await this.getTasksByCategoryUseCase.execute();
  }

  async onDeleteTask(taskId: string) {
    // Eliminar una tarea
    await this.deleteTaskUseCase.execute(taskId);
    this.tasks = await this.getTasksByCategoryUseCase.execute();
  }

  async createCategory(category: string) {
    // Eliminar una tarea
    await this.addCategoryUseCase.execute(category);
    this.categories = await this.getCategoriesUseCase.execute();
  }

  async deleteCategory(categoryId: string) {
    // Eliminar una tarea
    await this.deleteCategoryUseCase.execute(categoryId);
    this.categories = await this.getCategoriesUseCase.execute();
  }

  getTextSearch() {
    return this.selectedCategory?.name
      ? this.textDefaultSearch + this.selectedCategory?.name
      : this.textDefaultSearch;
    //return this.selectedCategory?.name ?? ' ';
  }

  async getCategories() {
    this.categories = await this.getCategoriesUseCase.execute();
    console.log(this.categories);
  }

  private async filterTasksByCategory() {
    // Filtrar las tareas según la categoría seleccionada
    if (this.selectedCategory.id) {
      this.tasks = await this.getTasksByCategoryUseCase.execute(
        this.selectedCategory.id
      );
    } else {
      this.tasks = await this.getTasksByCategoryUseCase.execute();
    }
  }
}
