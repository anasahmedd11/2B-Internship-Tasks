import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/Model/product-item';

@Component({
  selector: 'app-premium-gifts',
  templateUrl: './premium-gifts.component.html',
  styleUrl: './premium-gifts.component.scss'
})
export class PremiumGiftsComponent implements OnInit {
  products: Product[] = [];
  currentSlide = 0;
  itemsPerSlide = 3;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.fetchPremiumProducts();
    this.updateItemsPerSlide();
    window.addEventListener('resize', () => this.updateItemsPerSlide());
  }

  updateItemsPerSlide() {
    this.itemsPerSlide = window.innerWidth < 768 ? 1 : 3;
  }

  fetchPremiumProducts() {
    this.productService.getAllProducts()
      .subscribe({
        next: (data) => this.products = data.slice(-6),
        error: (error) => console.error('Error fetching premium products:', error)
      });
  }

  get maxSlides(): number {
    return Math.ceil(this.products.length / this.itemsPerSlide);
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.maxSlides;
  }

  prevSlide() {
    this.currentSlide = this.currentSlide === 0 ? this.maxSlides - 1 : this.currentSlide - 1;
  }

  getStarArray(rating: number): boolean[] {
    return Array.from({ length: 5 }, (_, i) => i < Math.floor(rating));
  }

  truncateTitle(title: string): string {
    return title.length > 40 ? title.substring(0, 40) + '...' : title;
  }

  getBadgeInfo(index: number) {
    const badges = [
      { text: 'NEW', class: 'badge-new' },
      { text: 'OUT OF STOCK', class: 'badge-out-of-stock' },
      { text: 'HOT', class: 'badge-hot' }
    ];
    return badges[index % 3];
  }

  getSlideIndices(): number[] {
    return Array.from({ length: this.maxSlides }, (_, i) => i);
  }

  getProductsForSlide(slideIndex: number): Product[] {
    const startIndex = slideIndex * this.itemsPerSlide;
    return this.products.slice(startIndex, startIndex + this.itemsPerSlide);
  }

}
