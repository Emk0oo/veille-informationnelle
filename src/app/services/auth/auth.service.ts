import { Injectable } from '@angular/core';
import { User, UserLogin, UserRegister } from '../../models/user';
import { environment } from '../../environments/environment.recette';

interface AuthResponse {
  statusCode: number;
  token?: string;
  message?: string;
  error?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiURL = environment.apiUrl;

  constructor() {}

  async login(user: UserLogin): Promise<AuthResponse> {
    try {
      const response = await fetch(`${this.apiURL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(user)
      });

      const statusCode = response.status;

      // Récupérer la réponse JSON
      const data = await response.json();

      return {
        statusCode,
        ...data
      };
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      return {
        statusCode: 500,
        error: 'Erreur interne'
      };
    }
  }

  async register(user: UserRegister): Promise<AuthResponse> {
    try {
      const response = await fetch(`${this.apiURL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(user)
      });

      const statusCode = response.status;

      // Récupérer la réponse JSON
      const data = await response.json();

      return {
        statusCode,
        ...data
      };
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      return {
        statusCode: 500,
        error: 'Erreur interne'
      };
    }
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  deleteToken(): void {
    localStorage.removeItem('token');
  }
}
