import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    const loggedInUser = localStorage.getItem('loggedInUser');
    const userType = localStorage.getItem('userType');

    if (userType === 'guest' && state.url === '/favorite') {
      return this.router.createUrlTree(['/poetry/home']); 
    }

    if (loggedInUser && state.url === '/login') {
      return this.router.createUrlTree(['/poetry/home']); 
    }
    
    return true;
  }
}
