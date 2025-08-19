import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, inject } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/Model/product-item';
import { Observable } from 'rxjs';

declare var bootstrap: any;

@Component({
  selector: 'app-premium-gifts',
  templateUrl: './premium-gifts.component.html',
  styleUrl: './premium-gifts.component.scss'
})
export class PremiumGiftsComponent implements OnInit {
 products$: Observable<Product[]> | null = null;

 constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.products$ = this.productService.getAllProducts();
  }

  groupIntoChunks<T>(items: T[], chunkSize: number): T[][] {
    const result: T[][] = [];
    for (let i = 0; i < items.length; i += chunkSize) {
      result.push(items.slice(i, i + chunkSize));
    }
    return result;
  }
}
