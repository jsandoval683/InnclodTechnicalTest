import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/project-list/project-list.component')
    },
    {
        path: 'todos/:id',
        loadChildren: () => import('../tasks/tasks.module').then(m => m.TasksModule)
    }
]