import { Component } from '@angular/core';
import { Cart1, CartItem } from '../services/cart1';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [RouterLink,CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class CartComponent {
cartItems: CartItem[] = [];
  total = 0;

  constructor(private cartService: Cart1) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
      this.total = this.cartService.getTotal();
    });
  }

  removeItem(id: number) {
    this.cartService.removeFromCart(id);
  }

  updateQuantity(id: number, quantity: string) {
    const q = parseInt(quantity, 10);
    if (q > 0) {
      this.cartService.updateQuantity(id, q);
    }
  }

  clearCart() {
    this.cartService.clearCart();
  }
}
