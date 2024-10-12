import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './login/service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'poetry';
  loggedInUser: string | null = null;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.loggedInUser$.subscribe(user => {
      this.loggedInUser = user;
      console.log('Logged in user:', this.loggedInUser);
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
