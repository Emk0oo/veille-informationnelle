// login.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  rememberMe: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  async login(event: Event): Promise<void> {
    event.preventDefault();

    // Ici, vous implémenteriez la logique d'authentification
    console.log('Tentative de connexion avec:', {
      username: this.username,
      password: this.password,
      rememberMe: this.rememberMe,
    });

   try {
    const response = await this.authService.login({
      email: this.username,
      password: this.password,
    });

    this.router.navigate(['/dashboard']);
   } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    }

  }

  loginWithGoogle(): void {
    // Implémentation de la connexion Google
    console.log('Connexion avec Google');
  }

  loginWithFacebook(): void {
    // Implémentation de la connexion Facebook
    console.log('Connexion avec Facebook');
  }
}
