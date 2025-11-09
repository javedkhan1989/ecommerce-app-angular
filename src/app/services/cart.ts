import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
   private storageKey = 'ecom_cart';
  private cart$ = new BehaviorSubject<any[]>(this.loadCart());

  private loadCart(): any[] {
    const json = localStorage.getItem(this.storageKey);
    return json ? JSON.parse(json) : [];
  }

  getCart() { return this.cart$.asObservable(); }

  add(product: any, qty = 1) {
    const items = this.loadCart();
    const find = items.find((i: any) => i.product.id === product.id);
    if (find) find.quantity += qty;
    else items.push({ product, quantity: qty });
    localStorage.setItem(this.storageKey, JSON.stringify(items));
    this.cart$.next(items);
  }

  remove(productId: number) {
    const items = this.loadCart().filter((i: any) => i.product.id !== productId);
    localStorage.setItem(this.storageKey, JSON.stringify(items));
    this.cart$.next(items);
  }

  clear() {
    localStorage.removeItem(this.storageKey);
    this.cart$.next([]);
  }
}
