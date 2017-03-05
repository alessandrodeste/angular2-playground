import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthRoutes } from './auth/auth.routes';
import { HomeComponent } from './pages/home.component';
import { AuthGuard } from './_guards/auth.guard';

// Route Configuration
export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] }, 
  ...AuthRoutes,
  { path: '**', redirectTo: '/', pathMatch: 'full' }
  //{ path: '\users', children: UsersRouter }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);