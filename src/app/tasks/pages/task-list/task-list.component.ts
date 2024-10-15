import { Component, inject, OnInit, signal, TemplateRef, viewChild } from '@angular/core';
import { AlertService } from '../../../shared/services/alert.service';
import { TaskApiService } from '../../services/task-api.service';
import { Task } from '../../interfaces/task';
import { ActivatedRoute } from '@angular/router';
import { TaskCardComponent } from '../../components/task-card/task-card.component';
import { Project } from '../../../projects/interfaces/project';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../../components/delete-dialog/delete-dialog.component';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { TaskFormComponent } from "../../components/task-form/task-form.component";

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [TaskCardComponent, ModalComponent, TaskFormComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export default class TaskListComponent implements OnInit {

  #alertService = inject(AlertService);
  #todosService = inject(TaskApiService);
  #activatedRoute = inject(ActivatedRoute);
  protected todoList = signal<Task[]>([]);
  protected project = signal<Project | undefined>(undefined);
  readonly dialog = inject(MatDialog);

  protected formModal = signal<boolean>(false);
  formModalTemplate = viewChild.required<TemplateRef<any>>('formTemplate');
  protected taskSelected = signal<Task | undefined>(undefined);

  ngOnInit(): void {
    this.#activatedRoute.params.subscribe(params => this.getTodoList(params['id']));
    this.getProjectInfo();
  }

  getProjectInfo = (): void => this.project.set(JSON.parse(localStorage.getItem('project')!));

  getTodoList(projectId: number): void {
    this.#alertService.loadingStatus(true);
    this.#todosService.getTodoByProjectId(projectId).subscribe({
      next: (data) => this.todoList.set(data),
      complete: () => this.#alertService.loadingStatus(),
      error: (ex) => this.#alertService.error(ex.message)
    });
  }

  changeStatus(status: boolean, taskId: number): void {
    this.todoList.update(x => x.map(y => y.id === taskId ? ({ ...y, completed: status }) : y));
    status ? this.#alertService.success('¡Tarea completada!') : this.#alertService.info('Tarea marcada como NO completada');
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, taskId: number): void {
    const dialogRef = this.dialog.open(
      DeleteDialogComponent,
      {
        data: { taskId: taskId },
        width: '250px',
        enterAnimationDuration,
        exitAnimationDuration,
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined && result !== '')
        this.delete(result);
    });
  }

  delete(taskId: number): void {
    this.todoList.update(x => x.filter(y => y.id !== taskId));
  }

  openFormModal = (): void => this.formModal.set(true);

  closeFormModal(): void {
    this.formModal.set(false);
    this.taskSelected.set(undefined);
  }

  edit(task: Task): void {
    this.taskSelected.set(task);
    this.openFormModal();
  }

  saveTask(task: Task): void {
    this.#alertService.loadingStatus(true);
    task.id === 0
      ? this.todoList.update(x => [task, ...x])
      : this.todoList.update(x => x.map(y => y.id === task.id ? task : y));
    this.#alertService.loadingStatus();
    this.closeFormModal();
    this.#alertService.success('Proceso exitoso');
  }

}