import { Routes } from '@angular/router';
import { Users } from './pages/users/users';
import { Albums } from './pages/albums/albums';
import { Logs } from './pages/logs/logs';

export const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: 'users', component: Users },
  { path: 'albums', component: Albums },
  { path: 'logs', component: Logs }
];
