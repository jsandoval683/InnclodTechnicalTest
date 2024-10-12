import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertService } from '../../../shared/services/alert.service';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { LoginResponse } from '../../interfaces/login';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {

  #alertService = inject(AlertService);
  #router = inject(Router);
  #loginService = inject(LoginService);
  #authService = inject(AuthService);

  protected form = signal<FormGroup>(
    new FormGroup({
      user: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)])
    })
  );

  login(): void {
    this.#alertService.loadingStatus(true);
    let login: LoginResponse = this.#loginService.login(this.form().value);
    if (login.result) {
      this.#authService.saveUser(login);
      this.#alertService.loadingStatus(false);
      this.#router.navigate(['/projects']);
    } else {
      this.#alertService.loadingStatus(false);
      this.#alertService.error(login.message);
    }
  }

}