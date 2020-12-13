import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GalerieComponent } from './galerie/galerie.component';
import { ContactComponent } from './contact/contact.component';
import { ArtworkdetailComponent } from './artworkdetail/artworkdetail.component';

export const routes: Routes = [
  { path: 'home',  component: HomeComponent },
  { path: 'galerie',     component: GalerieComponent },
  { path: 'contact',     component: ContactComponent },
  { path: 'artworkdetail/:id',     component: ArtworkdetailComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];