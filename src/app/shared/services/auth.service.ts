import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn() {
    const user = JSON.parse(localStorage.getItem("user")!);
    return user ? true : false;
  }
}