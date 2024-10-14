import { Component, input, OnInit, output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Project } from '../../interfaces/project';

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.scss'
})
export class ProjectFormComponent implements OnInit {

  project = input<Project>();
  saveProject = output<Project>();

  protected form = signal<FormGroup>(
    new FormGroup({
      name: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      website: new FormControl('', [Validators.required]),
    })
  );

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form().controls['name'].setValue(this.project()?.name ?? '');
    this.form().controls['username'].setValue(this.project()?.username ?? '');
    this.form().controls['website'].setValue(this.project()?.website ?? '');
  }

  newProject(): Project {
    return {
      id: 0,
      name: '',
      username: '',
      website: ''
    }
  }

  save() {
    let projectAux: Project = this.project() ?? this.newProject();
    const formAux = this.form().value;
    projectAux.name = formAux.name;
    projectAux.username = formAux.username;
    projectAux.website = formAux.website;
    this.saveProject.emit(projectAux);
  }

}
