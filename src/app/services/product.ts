import { Injectable } from '@angular/core';
import { Api } from './api';
import { Product } from '../modles/products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private api: Api) {}

  list(page = 1, pageSize = 20) {
    return this.api.get<any>(`products?page=${page}&pageSize=${pageSize}`);
  }

  get(id: number) {
    return this.api.get<any>(`products/${id}`);
  }

  createProduct(product: any) {
    return this.api.post<any>(`products`, product);
  }

  getAllCategory(){
    return this.api.get<any[]>("category");
  }
}
