import { Injectable } from '@angular/core';
import { Login, LoginResponse } from '../interfaces/login';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  login(user: Login): LoginResponse {
    let loginResponse: LoginResponse = {
      userName: '',
      token: '',
      result: false,
      message: ''
    }

    if (user.user === environment.userLogin && user.password === environment.passwordLogin) {
      loginResponse = {
        userName: user.user,
        token: environment.fakeToken,
        result: true,
        message: ''
      };
    } else {
      loginResponse.message = 'Usuario o contraseña incorrectos';
    }

    return loginResponse;
  }
}