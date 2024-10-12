import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'poetry',
    loadChildren: () => import('./poetry/poetry.module').then(m => m.PoetryModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'favorite',
    loadChildren: () => import('./favorites/favorites.module').then(m => m.FavoritesModule),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
