import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  #authService = inject(AuthService);
  #router = inject(Router);
  protected isLogged = computed<boolean>(() => this.#authService.isLogged());
  protected appName: string = 'InnClod';

  logout(): void {
    this.#authService.logout();
    this.#router.navigate(['/login']);
  }

}