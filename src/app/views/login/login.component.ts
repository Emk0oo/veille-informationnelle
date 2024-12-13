// login.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { ToastService } from '../../services/toast/toast.service';

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
  errorMessage: string | null = null;

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastService: ToastService
  ) {}

  async login(event: Event): Promise<void> {
    event.preventDefault();
    this.errorMessage = null; // Réinitialise le message d'erreur

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

      if (response.statusCode === 200) {
        console.log('Connexion réussie:', response.token);

        // Gérer l'option "Se souvenir de moi"
        if (this.rememberMe) {
          localStorage.setItem('token', response.token!);
        } else {
          sessionStorage.setItem('token', response.token!);
        }

        // Redirige vers le tableau de bord
        this.router.navigate(['/dashboard']);
        this.toastService.showToast('Connecté', 'success');
      } else {
        this.toastService.showToast('Erreur lors de la connexion.', 'error');
        console.error('Erreur:', response.message || response.error);
        this.errorMessage = response.message || 'Erreur lors de la connexion.';
      }
    } catch (error) {
      console.error('Erreur inattendue:', error);
      this.toastService.showToast('Une erreur inattendue est survenue.', 'error');
      this.errorMessage =
        'Une erreur inattendue est survenue. Veuillez réessayer plus tard.';
    }
  }

  loginWithGoogle(): void {
    console.log('Connexion avec Google');
  }

  loginWithFacebook(): void {
    console.log('Connexion avec Facebook');
  }
}
