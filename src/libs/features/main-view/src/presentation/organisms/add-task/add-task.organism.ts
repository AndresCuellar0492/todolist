import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalService } from '@libs/ui/src/lib/services/modal.service';
import { GetTasksService } from '../../../core/services/get-tasks.service';
import { Category } from '../../../domain/entities/category.entity';
import { Task } from '../../../domain/entities/task.entity';
import { AddTaskUseCase } from '../../../domain/usecases/add-task.usecase';
import { UpdateTaskUseCase } from '../../../domain/usecases/update-task.usecase';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.organism.html',
  styleUrls: ['./add-task.organism.scss'],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class AddTaskOrganism implements OnInit {
  @Input() categories!: Category[];
  @Input() task!: Task;
  @Input() public isModeEdit = false;

  customAlertOptions = {
    cssClass: 'customA',
  };

  @Output() selectedChanged: EventEmitter<any[]> = new EventEmitter();
  public taskDescription = '';
  public category!: Category;
  constructor(
    private modalService: ModalService,
    private addTaskUseCase: AddTaskUseCase,
    private getTasksService: GetTasksService,
    private updateTaskUseCase: UpdateTaskUseCase
  ) {}

  ngOnInit() {
    if (this.isModeEdit) {
      this.taskDescription = this.task.description;

      if (this.task.category) {
        this.category = this.task.category;
      }
    }
  }

  close() {
    this.modalService.close(false);
  }

  async onUpdateTask() {
    const category = this.categories.find((cat) => cat.id === this.category.id);

    this.task.description = this.taskDescription;
    this.task.category = category;

    await this.updateTaskUseCase.execute(this.task);
    this.modalService.close(true);
    this.getTasksService.emit();
  }

  async onAddTask() {
    if (this.taskDescription.trim().length === 0 || !this.category?.id) {
      return;
    }

    const task: Task = {
      id: '',
      description: this.taskDescription,
      completed: false,
      category: this.category,
    };
    await this.addTaskUseCase.execute(task);

    this.modalService.close(true);
    this.getTasksService.emit();
  }
}
