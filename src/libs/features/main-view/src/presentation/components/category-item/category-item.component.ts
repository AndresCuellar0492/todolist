import { Component, Input, ViewChild } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';
import { GetCategoriesService } from '../../../core/services/get-categories.service';
import { GetTasksService } from '../../../core/services/get-tasks.service';
import { Category } from '../../../domain/entities/category.entity';
import { ManageCategoriesService } from '../../services/manage-categories.service';

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.scss'],
})
export class CategoryItemComponent {
  @ViewChild('itemSliding')
  itemSliding!: IonItemSliding;
  @Input() categories!: Category[];

  constructor(
    private manageCategoriesService: ManageCategoriesService,
    private getTasksService: GetTasksService,
    private getCategoriesService: GetCategoriesService
  ) {}

  onUpdate(category: Category) {
    this.manageCategoriesService.presentUpdateCategoryAlert(category);
    this.closeItemSliding();
  }

  onDelete(category: Category) {
    this.manageCategoriesService.confirmDeleteCategory(category);
    this.closeItemSliding();
  }

  closeItemSliding() {
    this.itemSliding.closeOpened();
  }

  public refreshData() {
    this.getCategoriesService.emit();
    this.getTasksService.emit();
  }
}
