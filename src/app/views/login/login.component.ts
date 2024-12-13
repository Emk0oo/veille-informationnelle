// login.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  rememberMe: boolean = false;

  constructor(private router: Router) {}

  login(event: Event): void {
    event.preventDefault();
    
    // Ici, vous implémenteriez la logique d'authentification
    console.log('Tentative de connexion avec:', {
      username: this.username,
      password: this.password,
      rememberMe: this.rememberMe
    });

    // Si l'authentification réussit
    this.router.navigate(['/dashboard']);
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