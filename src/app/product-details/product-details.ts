import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
//import { Product } from '../services/product';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../modles/products';
import { ProductService } from '../services/product';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css'
})
export class ProductDetails {
product?: Product;
  isLoading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.productService.get(id).subscribe({
        next: (res) => {
          this.product = res;
          this.isLoading = false;
        },
        error: (err) => {
          this.errorMessage = 'Product not found';
          this.isLoading = false;
        }
      });
    }
  }
}
