import { Component, OnInit } from '@angular/core';
import { ProductService} from '../../core/services/product.service';
import { Product } from '../../core/Model/product-item';

@Component({
  selector: 'app-popular-items',
  templateUrl: './popular-items.component.html',
  styleUrl: './popular-items.component.scss'
})
export class PopularItemsComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    this.productService.getAllProducts()
      .subscribe({
        next: (data) => {
          this.products = data;
        },
        error: (error) => {
          console.error('Error fetching products:', error);
        }
      });
  }

  getStarArray(rating: number): boolean[] {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= Math.floor(rating));
    }
    return stars;
  }

  truncateTitle(title: string): string {
    return title.length > 50 ? title.substring(0, 50) + '...' : title;
  }
}
