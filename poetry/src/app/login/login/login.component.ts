import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  predefinedEmail: string = 'usuario@example.com';
  predefinedPassword: string = '123456';

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onLogin() {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    if (email === this.predefinedEmail && password === this.predefinedPassword) {
      this.authService.login(email);
      localStorage.setItem('userType', 'registered');
      this.router.navigate(['/poetry/home']);
    } else {
      alert('Correo o contraseña incorrectos');
    }
  }

  loginAsGuest() {
    this.authService.login('guest');
    localStorage.setItem('userType', 'guest');
    this.router.navigate(['/poetry/home']);
  }
}
