import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../interfaces/project';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectApiService {

  apiPath: string = '/users';

  http = inject(HttpClient);

  getProjects = (): Observable<Project[]> => this.http.get<Project[]>(`${environment.basePath}${this.apiPath}`);
}