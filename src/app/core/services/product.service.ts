import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../Model/product-item';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/products`);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/products/${id}`);
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/products/category/${category}`);
  }

  getAllCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/products/categories`);
  }
}
