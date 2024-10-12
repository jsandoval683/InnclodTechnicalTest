import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  #authService = inject(AuthService);
  #router = inject(Router);
  protected isLogged = computed<boolean>(() => this.#authService.isLogged());

  logout(): void {
    this.#authService.logout();
    this.#router.navigate(['/login']);
  }

}