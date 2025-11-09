import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '../services/auth';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterLink,RouterOutlet],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
 username = '';
  password = '';
  errorMessage = '';

  constructor(private authService: Auth, private router: Router) {}

  onLogin() {
    const data = { username: this.username, password: this.password };

    this.authService.login(data).subscribe({
      next: res => {
        console.log('Login successful:', res);
        this.router.navigate(['/home']); // redirect after login
      },
      error: err => {
        console.error('Login failed', err);
        this.errorMessage = 'Invalid username or password';
      }
    });
  }


}
