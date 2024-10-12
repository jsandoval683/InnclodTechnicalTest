import { Injectable, signal } from '@angular/core';
import { LoginResponse } from '../../auth/interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLogged = signal<boolean>(false);

  saveUser = (loginResponse: LoginResponse): void => {
    localStorage.setItem('user', JSON.stringify(loginResponse));
    this.isLogged.set(true);
  }

  isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user ? true : false;
  }

  logout = (): void => {
    localStorage.removeItem('user');
    this.isLogged.set(false);
  }
}