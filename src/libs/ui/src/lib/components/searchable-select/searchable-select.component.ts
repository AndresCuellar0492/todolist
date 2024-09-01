import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { SelectDynamicEntity } from '@libs/features/main-view/src/core/entities/select-dynamic.entity';

@Component({
  selector: 'app-searchable-select',
  templateUrl: './searchable-select.component.html',
  styleUrls: ['./searchable-select.component.scss'],
})
export class SearchableSelectComponent implements OnChanges {
  @Input() title = 'Search';
  @Input() data!: SelectDynamicEntity[];
  @Input() idDynamic?: number;
  @Input() multiple = false;
  @Input() itemTextField = 'name';

  @Output() selectedChanged: EventEmitter<SelectDynamicEntity> =
    new EventEmitter();

  public isOpen = false;

  selected!: SelectDynamicEntity;

  filtered: SelectDynamicEntity[] = [];

  ngOnChanges(): void {
    this.resetFilter();
  }

  open() {
    this.isOpen = true;
  }

  cancel() {
    this.isOpen = false;
  }

  itemSelected(event: any) {
    event.stopPropagation();
    this.emitSelectionChange(event.target.value);
    this.resetFilter();
  }

  private emitSelectionChange(item: SelectDynamicEntity) {
    this.selectedChanged.emit(item);
    this.isOpen = false;
  }

  public clearSelection() {
    this.selected = {
      id: '',
      name: '',
    };
    this.emitSelectionChange(this.selected);
  }

  private resetFilter() {
    this.filtered = [...this.data];
  }

  filter(event: any) {
    const filter = event?.target?.value?.toLowerCase();
    this.filtered = this.data.filter(
      (item) => this.leaf(item).toLowerCase().indexOf(filter) >= 0
    );
  }

  leaf = (obj: any) =>
    this.itemTextField.split('.').reduce((value, el) => value[el], obj);
}
