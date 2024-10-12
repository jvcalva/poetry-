import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInUserSubject = new BehaviorSubject<string | null>(localStorage.getItem('loggedInUser'));
  loggedInUser$ = this.loggedInUserSubject.asObservable();

  login(email: string) {
    localStorage.setItem('loggedInUser', email);
    this.loggedInUserSubject.next(email); 
  }

  logout() {
    localStorage.removeItem('loggedInUser');
    this.loggedInUserSubject.next(null); 
  }
}
