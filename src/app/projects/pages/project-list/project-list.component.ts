import { Component, inject, model, OnInit, signal, TemplateRef, viewChild } from '@angular/core';
import { ProjectApiService } from '../../services/project-api.service';
import { AlertService } from '../../../shared/services/alert.service';
import { Project } from '../../interfaces/project';
import { ProjectCardComponent } from '../../components/project-card/project-card.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../../components/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [ProjectCardComponent, DeleteDialogComponent],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss'
})
export default class ProjectListComponent implements OnInit {

  #projectService = inject(ProjectApiService);
  #alertService = inject(AlertService);
  protected projects = signal<Project[]>([]);
  readonly dialog = inject(MatDialog);

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects() {
    this.#alertService.loadingStatus(true);
    this.#projectService.getProjects().subscribe({
      next: (data) => this.projects.set(data),
      complete: () => this.#alertService.loadingStatus(),
      error: (ex) => this.#alertService.error(ex.message)
    });
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, projectId: number): void {
    const dialogRef = this.dialog.open(
      DeleteDialogComponent,
      {
        data: { projectId: projectId },
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

  delete(projectId: number) {
    this.projects.update(x => x.filter(y => y.id !== projectId));
    this.#alertService.success('Proyecto eliminado');
  }

}