import { Component } from '@angular/core';
import {  ProductService } from '../services/product';
import {  CartService } from '../services/cart';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Cart1 } from '../services/cart1';

@Component({
  selector: 'app-product-list',
  imports: [RouterLink,CommonModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductList {
 products: any[] = [];
  constructor(private ps: ProductService, private cart: Cart1) {}
  ngOnInit(){ this.ps.list(1, 30).subscribe(r => this.products = r.items || r); }
  addToCart(p:any) {
     this.cart.addToCart(p, 1); 
    }
}
