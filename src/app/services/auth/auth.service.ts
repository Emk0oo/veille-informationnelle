import { Injectable } from '@angular/core';
import { User, UserLogin, UserRegister } from '../../models/user';
import { environment } from '../../environments/environment.recette';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiURL = environment.apiUrl;

  constructor() {}

  async login(user: UserLogin): Promise<User> {
    try {
      const response = await fetch(`${this.apiURL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(user)
      });
      console.log(user);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la connexion');
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      throw error;
    }
  }

  async register(user: UserRegister): Promise<User> {
    try {
      const response = await fetch(`${this.apiURL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(user)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de l\'inscription');
      }

      return await response.json();
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      throw error;
    }
  }
}