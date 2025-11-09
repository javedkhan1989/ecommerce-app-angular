import { Component, signal } from '@angular/core';
import { Router, RouterOutlet, RouterLinkActive, RouterLinkWithHref } from '@angular/router';
import { Auth } from './services/auth';
import { CommonModule } from '@angular/common';
import { Cart1 } from './services/cart1';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, RouterLinkActive, RouterLinkWithHref],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ecommerce-app');
    cartCount = 0;

  constructor(private auth:Auth,private router:Router,private cartService: Cart1) {}

  ngOnInit() {
    this.cartService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });
  }
  get isLoggedIn():boolean{
    return this.auth.isAuthenticated();
  }

  logout(){
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
