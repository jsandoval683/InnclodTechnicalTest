import { Component, input, OnInit, output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Project } from '../../interfaces/project';
import { ProjectExistValidator } from '../../services/validator.service';

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
  projectList = input.required<Project[]>();

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

  initForm(): void {
    this.form().controls['name'].addValidators(ProjectExistValidator(this.projectList()));
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

  save(): void {
    let projectAux: Project = this.project() ?? this.newProject();
    const formAux = this.form().value;
    projectAux.name = formAux.name;
    projectAux.username = formAux.username;
    projectAux.website = formAux.website;
    this.saveProject.emit(projectAux);
  }

  requiredValidator = (formControl: string): boolean  => this.form().get(formControl)?.touched && this.form().get(formControl)?.errors?.['required'];

  existValidator = (formControl: string): boolean  => this.form().get(formControl)?.dirty && this.form().get(formControl)?.errors?.['projectExists'];

}