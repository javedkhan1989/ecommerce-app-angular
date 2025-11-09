import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '../services/auth';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule,RouterOutlet,RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
username = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';
  successMessage = '';

  constructor(private authService: Auth, private router: Router) {}

  onRegister() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    const data = { username: this.username, password: this.password };

    this.authService.register(data).subscribe({
      next: res => {
        console.log('Registration successful:', res);
        this.successMessage = 'Registration successful! Redirecting...';
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: err => {
        console.error('Registration failed', err);
        this.errorMessage = 'Registration failed. Try again.';
      }
    });
  }
}
