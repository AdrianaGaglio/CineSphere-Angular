import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedinGuard } from './guards/loggedin.guard';
import { GuestGuard } from './guards/guest.guard';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    canActivate: [GuestGuard],
    canActivateChild: [GuestGuard],
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./pages/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
    canActivate: [LoggedinGuard],
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./pages/users/users.module').then((m) => m.UsersModule),
    canActivate: [LoggedinGuard],
  },
  {
    path: 'movie/:id',
    loadChildren: () =>
      import('./pages/movie/movie.module').then((m) => m.MovieModule),
  },
  {
    path: 'test',
    component: TestComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}