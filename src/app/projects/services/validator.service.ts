import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Project } from '../interfaces/project';

export const ProjectExistValidator = (projectList: Project[]): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    let exist = projectList.some(x => x.name.toUpperCase() === control.value.toUpperCase());
    return exist ? { projectExists: true } : null;
  };
}