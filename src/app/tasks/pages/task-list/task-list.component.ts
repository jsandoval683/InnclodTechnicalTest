import { Component, inject, OnInit, signal } from '@angular/core';
import { AlertService } from '../../../shared/services/alert.service';
import { TaskApiService } from '../../services/task-api.service';
import { Task } from '../../interfaces/task';
import { ActivatedRoute } from '@angular/router';
import { TaskCardComponent } from '../../components/task-card/task-card.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [TaskCardComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export default class TaskListComponent implements OnInit {

  #alertService = inject(AlertService);
  #todosService = inject(TaskApiService);
  #activatedRoute = inject(ActivatedRoute);
  protected todoList = signal<Task[]>([]);

  ngOnInit(): void {
    this.#activatedRoute.params.subscribe(params => this.getTodoList(params['id']));
  }

  getTodoList(projectId: number){
    this.#alertService.loadingStatus(true);
    this.#todosService.getTodoByProjectId(projectId).subscribe({
      next: (data) => this.todoList.set(data),
      complete: () => this.#alertService.loadingStatus(),
      error: (ex) => this.#alertService.error(ex.message)
    });
  }

  openFormModal(){
    
  }

}