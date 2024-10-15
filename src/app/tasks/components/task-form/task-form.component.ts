import { Component, input, OnInit, output, signal } from '@angular/core';
import { Task } from '../../interfaces/task';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Project } from '../../../projects/interfaces/project';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatCheckboxModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent implements OnInit {

  task = input<Task>();
  saveTask = output<Task>();
  protected project = signal<Project | undefined>(undefined);

  protected form = signal<FormGroup>(
    new FormGroup({
      title: new FormControl('', [Validators.required]),
      completed: new FormControl(false)
    })
  );

  ngOnInit(): void {
    this.initForm();
  }

  getProjectInfo = (): void => this.project.set(JSON.parse(localStorage.getItem('project')!));

  initForm() {
    this.form().controls['title'].setValue(this.task()?.title ?? '');
    this.form().controls['completed'].setValue(this.task()?.completed ?? false);
  }

  newTask(): Task {
    return {
      id: 0,
      title: '',
      completed: false,
      userId: this.project()?.id ?? 0
    }
  }

  save() {
    let taskAux: Task = this.task() ?? this.newTask();
    const formAux = this.form().value;
    taskAux.title = formAux.title;
    taskAux.completed = formAux.completed;
    this.saveTask.emit(taskAux);
  }

  requiredValidator = (formControl: string): boolean  => this.form().get(formControl)?.touched && this.form().get(formControl)?.errors?.['required'];

}