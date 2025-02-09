import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { ToastService } from '../../services/toast/toast.service';
import { trigger, transition, style, animate } from '@angular/animations';

// Define the RegisterRequest interface based on your Swagger schema
interface RegisterRequest {
  name: string;
  surname: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate('300ms ease-in', style({ transform: 'translateX(0%)', opacity: 1 })
        )
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ transform: 'translateX(100%)', opacity: 0 }))
      ])
    ]),
    trigger('slideRegister', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('300ms ease-in', style({ transform: 'translateX(0%)', opacity: 1 })
        )
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ transform: 'translateX(-100%)', opacity: 0 }))
      ])
    ])
  ]
})
export class LoginComponent {
  isLogin: boolean = true;
  username: string = '';
  password: string = '';
  registerEmail: string = '';
  registerUsername: string = '';
  registerPassword: string = '';
  registerName: string = ''; // Add registerName
  registerSurname: string = ''; // Add registerSurname
  rememberMe: boolean = false;
  errorMessage: string | null = null;
  isPasswordVisible: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastService: ToastService
  ) { }

  toggleForm(): void {
    this.isLogin = !this.isLogin;
  }

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  async login(event: Event): Promise<void> {
    event.preventDefault();
    this.errorMessage = null;

    if (!this.username || !this.password) {
      this.errorMessage = 'Veuillez remplir tous les champs.';
      this.toastService.showToast('Veuillez remplir tous les champs.', 'error');
      return;
    }

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

        if (this.rememberMe) {
          localStorage.setItem('token', response.token!);
        } else {
          sessionStorage.setItem('token', response.token!);
        }

        this.router.navigate(['/dashboard']);
        this.toastService.showToast('Connecté avec succès', 'success');
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

  async register(event: Event): Promise<void> {
    event.preventDefault();
    this.errorMessage = null;

    if (!this.registerName || !this.registerSurname || !this.registerEmail || !this.registerUsername || !this.registerPassword) {
      this.errorMessage = 'Veuillez remplir tous les champs.';
      this.toastService.showToast('Veuillez remplir tous les champs.', 'error');
      return;
    }

    const registerRequest: RegisterRequest = {
      name: this.registerName,
      surname: this.registerSurname,
      email: this.registerEmail,
      password: this.registerPassword,
    };

    console.log('Tentative d\'inscription avec:', registerRequest);

    try {
      const response = await this.authService.register(registerRequest);

      if (response.statusCode === 201) {
        console.log('Inscription réussie:', response.token);
        this.toastService.showToast('Inscription réussie', 'success');
        // Optionally, automatically log the user in after registration
        // this.authService.setToken(response.token);
        // this.router.navigate(['/dashboard']);

        this.isLogin = true; // Switch back to the login form
        this.toastService.showToast('Inscription réussie. Veuillez vous connecter.', 'success');
      } else {
        console.error('Erreur lors de l\'inscription:', response.message || response.error);
        this.toastService.showToast('Erreur lors de l\'inscription.', 'error');
        this.errorMessage = response.message || 'Erreur lors de l\'inscription.';
      }
    } catch (error) {
      console.error('Erreur inattendue:', error);
      this.toastService.showToast('Une erreur inattendue est survenue.', 'error');
      this.errorMessage = 'Une erreur inattendue est survenue. Veuillez réessayer plus tard.';
    }
  }

  onSubmit(event: Event): void {
    if (this.isLogin) {
      this.login(event);
    } else {
      this.register(event);
    }
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }

  navigateToForgotPassword(): void {
    this.router.navigate(['/forgot-password']);
  }
}