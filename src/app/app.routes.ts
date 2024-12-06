import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./views/login/login.component').then(c => c.LoginComponent) // Page de login
  },
  {
    path: 'home',
    loadComponent: () => import('./views/home/home.component').then(c => c.HomeComponent) // Page d'accueil
  },
  {
    path: '**',
    redirectTo: '' // Redirection pour les routes non trouvées
  }
];
