import { Injectable } from '@angular/core';
import { User, UserLogin, UserRegister } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}
   apiURL = process.env['API_URL'];

  login(user: UserLogin): Promise<User> {
    return fetch(`${this.apiURL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    }).then(response => response.json());
  }

  register(user: UserRegister): Promise<User> {
    return fetch(`${this.apiURL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    }).then(response => response.json());
  }
}
