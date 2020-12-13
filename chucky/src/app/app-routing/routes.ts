import { Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { GalerieComponent } from '../galerie/galerie.component';
import { ContactComponent } from '../contact/contact.component';

export const routes: Routes = [
  { path: '/home',  component: HomeComponent },
  { path: '/galerie',     component: galerieComponent },
  { path: '/contact',     component: contactComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];