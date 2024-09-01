import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '../../../domain/entities/category.entity';

@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.scss'],
})
export class CategoryFilterComponent {
  @Input() categories!: Category[];
  @Input() selectedCategoryId: string | null = null;
  @Output() categorySelected = new EventEmitter<string | null>();

  onCategoryChange(categoryId: any | null) {
    this.categorySelected.emit(categoryId);
  }
}
