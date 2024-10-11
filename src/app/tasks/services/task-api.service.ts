import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../interfaces/task';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskApiService {

  apiPath: string = '/todos';

  http = inject(HttpClient);

  getTodos = (): Observable<Task[]> => this.http.get<Task[]>(`${environment.basePath}${this.apiPath}`);

  getTodoByProjectId = (projectId: number): Observable<Task[]> => this.http.get<Task[]>(`${environment.basePath}${this.apiPath}?userId=${projectId}`);
}