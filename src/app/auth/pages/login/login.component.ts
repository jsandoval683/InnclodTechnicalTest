import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { LoginFormComponent } from "../../components/login-form/login-form.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LoginFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export default class LoginComponent implements OnInit {

  #authService = inject(AuthService);
  #router = inject(Router);

  ngOnInit(): void {
    if (this.#authService.isLoggedIn())
      this.#router.navigate(['/projects']);
  }

}