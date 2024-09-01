import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalService } from '@libs/ui/src/lib/services/modal.service';
import { Category } from '../../../domain/entities/category.entity';
import { Task } from '../../../domain/entities/task.entity';
import { AddTaskUseCase } from '../../../domain/usecases/add-task.usecase';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.organism.html',
  styleUrls: ['./add-task.organism.scss'],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class AddTaskOrganism implements OnInit {
  @Input() categories!: Category[];

  @Output() selectedChanged: EventEmitter<any[]> = new EventEmitter();
  public task = '';
  public category!: Category;
  constructor(
    private modalService: ModalService,
    private addTaskUseCase: AddTaskUseCase
  ) {}

  ngOnInit() {
    console.log('');
  }

  close() {
    this.modalService.close(false);
  }

  async onAddTask() {
    console.log(this.category);
    // Añadir una nueva tarea
    const taskValidate = this.task;
    if (taskValidate.trim().length === 0) {
      return; // Evitar añadir tareas sin título
    }

    const task = new Task(
      Date.now().toString(),
      this.task,
      false,
      this.category?.id
    );
    await this.addTaskUseCase.execute(task);

    this.modalService.close(true);
  }
}
