import { Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { HomeComponent } from './views/home/home.component';

export const routes: Routes = [
  { path: '', component: LoginComponent }, // Page par défaut (login)
  { path: 'home', component: HomeComponent }, // Page d'accueil après login
  { path: '**', redirectTo: '' } // Redirection pour les routes non trouvées
];
