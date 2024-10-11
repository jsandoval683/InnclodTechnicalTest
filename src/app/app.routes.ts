import { Routes } from '@angular/router';
import { GuardService } from './shared/services/guard.service';

export const routes: Routes = [
    {
        path: 'login',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: 'projects',
        loadChildren: () => import('./projects/projects.module').then(m => m.ProjectsModule),
        canActivate: [GuardService]
    },
    {
        path: '**', redirectTo: '/login', pathMatch: "full"
    }
];