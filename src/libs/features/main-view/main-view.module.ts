import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskRepository } from './src/domain/repositories/task.repository';

import { IonicModule } from '@ionic/angular';

import { GhostComponent } from '@libs/ui/src/lib/components/ghost-element/ghost-element.component';
import { SearchableSelectComponent } from '@libs/ui/src/lib/components/searchable-select/searchable-select.component';
import { PreventWhitespaceDirective } from '@libs/ui/src/lib/directives/texts/remove-whitespace.directive';
import { ModalService } from '@libs/ui/src/lib/services/modal.service';
import { MainViewPageRoutingModule } from './main-view-routing.module';
import { GetCategoriesService } from './src/core/services/get-categories.service';
import { CategoryRepositoryImpl } from './src/data/repositories/category.repository.impl';
import { TaskRepositoryImpl } from './src/data/repositories/task.repository.impl';
import { CategoryRepository } from './src/domain/repositories/category.repository';
import { AddTaskUseCase } from './src/domain/usecases/add-task.usecase';
import { CompleteTaskUseCase } from './src/domain/usecases/complete-task.usecase';
import { DeleteTaskUseCase } from './src/domain/usecases/delete-task.usecase';
import { GetCategoriesUseCase } from './src/domain/usecases/get-categories.usecase';
import { GetTasksByCategoryUseCase } from './src/domain/usecases/get-tasks-by-category.usecase';
import { CategoryFilterComponent } from './src/presentation/components/category-filter/category-filter.component';
import { TaskItemComponent } from './src/presentation/components/task-item/task-item.component';
import { AddTaskOrganism } from './src/presentation/organisms/add-task/add-task.organism';
import { DetailTaskOrganism } from './src/presentation/organisms/detail-task/detail-task.organism';
import { CreateCategoryPage } from './src/presentation/pages/create-category/create-category.page';
import { HomePage } from './src/presentation/pages/home/home.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, MainViewPageRoutingModule],
  declarations: [
    HomePage,
    CreateCategoryPage,
    TaskItemComponent,
    CategoryFilterComponent,
    DetailTaskOrganism,
    SearchableSelectComponent,
    AddTaskOrganism,
    GhostComponent,
    PreventWhitespaceDirective,
  ],
  providers: [
    { provide: TaskRepository, useClass: TaskRepositoryImpl },
    { provide: CategoryRepository, useClass: CategoryRepositoryImpl },
    AddTaskUseCase,
    CompleteTaskUseCase,
    GetTasksByCategoryUseCase,
    GetCategoriesUseCase,
    DeleteTaskUseCase,
    ModalService,
    GetCategoriesService,
  ],
})
export class MainViewPageModule {}
