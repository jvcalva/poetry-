import { Component, OnInit } from '@angular/core';
import { AuthService } from '../login/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  title = 'poetry';
  loggedInUser: string | null = null;
  userType: string | null = '';

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.loggedInUser$.subscribe(user => {
      this.loggedInUser = user;
      console.log('Logged in user:', this.loggedInUser);
    });
    this.userType = localStorage.getItem('userType');
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
