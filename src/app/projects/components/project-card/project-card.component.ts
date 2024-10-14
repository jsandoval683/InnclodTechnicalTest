import { Component, input, output } from '@angular/core';
import { Project } from '../../interfaces/project';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss'
})
export class ProjectCardComponent {

  project = input.required<Project>();
  genericImg: string = 'https://cdn.pixabay.com/photo/2019/12/14/07/21/document-4694351_1280.png';
  deleteOutput = output();
  editOutput = output();
  goToTodoOutput = output();

  delete = (): void => this.deleteOutput.emit();

  goToTodo = (): void => this.goToTodoOutput.emit();

  edit = (): void => this.editOutput.emit();

}