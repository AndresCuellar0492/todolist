import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskRepository } from './src/domain/repositories/task.repository';

import { IonicModule } from '@ionic/angular';

import { GhostComponent } from '@libs/ui/src/lib/components/ghost-element/ghost-element.component';
import { SearchableSelectComponent } from '@libs/ui/src/lib/components/searchable-select/searchable-select.component';
import { PreventWhitespaceDirective } from '@libs/ui/src/lib/directives/texts/remove-whitespace.directive';
import { ModalService } from '@libs/ui/src/lib/services/modal.service';
import { TranslateModule } from '@ngx-translate/core';
import { MainViewPageRoutingModule } from './main-view-routing.module';
import { GetCategoriesService } from './src/core/services/get-categories.service';
import { GetTasksService } from './src/core/services/get-tasks.service';
import { CategoryRepositoryImpl } from './src/data/repositories/category.repository.impl';
import { TaskRepositoryImpl } from './src/data/repositories/task.repository.impl';
import { CategoryRepository } from './src/domain/repositories/category.repository';
import { AddTaskUseCase } from './src/domain/usecases/add-task.usecase';
import { DeleteTaskUseCase } from './src/domain/usecases/delete-task.usecase';
import { GetCategoriesUseCase } from './src/domain/usecases/get-categories.usecase';
import { GetTasksByCategoryUseCase } from './src/domain/usecases/get-tasks-by-category.usecase';
import { UpdateTaskUseCase } from './src/domain/usecases/update-task.usecase';
import { CategoryItemComponent } from './src/presentation/components/category-item/category-item.component';
import { TaskItemComponent } from './src/presentation/components/task-item/task-item.component';
import { AddTaskOrganism } from './src/presentation/organisms/add-task/add-task.organism';
import { CreateCategoryPage } from './src/presentation/pages/create-category/create-category.page';
import { HomePage } from './src/presentation/pages/home/home.page';
import { ManageCategoriesService } from './src/presentation/services/manage-categories.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainViewPageRoutingModule,
    TranslateModule,
  ],
  declarations: [
    HomePage,
    CreateCategoryPage,
    TaskItemComponent,
    SearchableSelectComponent,
    AddTaskOrganism,
    PreventWhitespaceDirective,
    CategoryItemComponent,
    GhostComponent,
  ],
  providers: [
    { provide: TaskRepository, useClass: TaskRepositoryImpl },
    { provide: CategoryRepository, useClass: CategoryRepositoryImpl },
    AddTaskUseCase,
    UpdateTaskUseCase,
    GetTasksByCategoryUseCase,
    GetCategoriesUseCase,
    DeleteTaskUseCase,
    ModalService,
    GetCategoriesService,
    GetTasksService,
    ManageCategoriesService,
  ],
})
export class MainViewPageModule {}
