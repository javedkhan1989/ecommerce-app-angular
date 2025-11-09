import { Component } from '@angular/core';
//import { Product } from '../modles/products';
import { Router } from '@angular/router';
import { ProductService } from '../services/product';
import { Product } from '../modles/products';
import { FormsModule } from '@angular/forms';
import { Category } from '../models/category';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-product',
  imports: [FormsModule,CommonModule],
  templateUrl: './add-product.html',
  styleUrl: './add-product.css'
})
export class AddProduct {
categories: Category[] = [];

 product: Product = {
  id:0,
    name: '',
    description: '',
    price: 0,
    stock: 0,
    categoryId: 0,
    imageUrl: ''
  };

  successMessage = '';
  errorMessage = '';

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.loadCategories();
  }

   loadCategories(): void {
    this.productService.getAllCategory().subscribe({
      next: (data) => (this.categories = data),
      error: (err) => console.error('Category load error', err)
    });
  }

  onSubmit() {
    if (!this.product.name || !this.product.price || !this.product.categoryId) {
      this.errorMessage = 'Please fill all required fields.';
      return;
    }

    this.productService.createProduct(this.product).subscribe({
      next: (res) => {
        this.successMessage = 'Product added successfully!';
        setTimeout(() => this.router.navigate(['/product-list']), 1500);
      },
      error: (err) => {
        console.error('Error adding product:', err);
        this.errorMessage = 'Failed to add product.';
      }
    });
  }
}
