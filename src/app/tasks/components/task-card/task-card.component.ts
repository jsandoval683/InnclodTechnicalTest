import { Component, input } from '@angular/core';
import { Task } from '../../interfaces/task';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [MatCheckboxModule],
  templateUrl: './task-card.component.html',
  styleUrl: './task-card.component.scss'
})
export class TaskCardComponent {

  task = input.required<Task>();

  edit() {

  }

  delete() {
    
  }
}