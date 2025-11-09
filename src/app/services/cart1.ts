import { Injectable } from '@angular/core';
import { Product } from '../modles/products';
import { BehaviorSubject, map } from 'rxjs';
export interface CartItem {
  product: Product;
  quantity: number;
}
@Injectable({
  providedIn: 'root'
})
export class Cart1 {
  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  cart$ = this.cartSubject.asObservable();

   // 👇 Add this line
  cartCount$ = this.cart$.pipe(
    map(items => items.reduce((count, item) => count + item.quantity, 0))
  );

  constructor() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cartItems = JSON.parse(savedCart);
      this.cartSubject.next(this.cartItems);
    }
  }

  addToCart(product: Product, quantity: number = 1) {
    const existing = this.cartItems.find(x => x.product.id === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.cartItems.push({ product, quantity });
    }
    this.saveCart();
  }

  removeFromCart(productId: number) {
    this.cartItems = this.cartItems.filter(x => x.product.id !== productId);
    this.saveCart();
  }

  clearCart() {
    this.cartItems = [];
    this.saveCart();
  }

  updateQuantity(productId: number, quantity: number) {
    const item = this.cartItems.find(x => x.product.id === productId);
    if (item) {
      item.quantity = quantity;
      this.saveCart();
    }
  }

  getTotal(): number {
    return this.cartItems.reduce((sum, x) => sum + x.product.price * x.quantity, 0);
  }

  private saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.cartSubject.next(this.cartItems);
  }
}
