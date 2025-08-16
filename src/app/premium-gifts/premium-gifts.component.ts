import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../Interfaces/product-item';

@Component({
  selector: 'app-premium-gifts',
  templateUrl: './premium-gifts.component.html',
  styleUrl: './premium-gifts.component.scss'
})
export class PremiumGiftsComponent implements OnInit {
  products: Product[] = [];
  loading = true;
  currentSlide = 0;
  itemsPerSlide = 3; // Show 3 products per slide on desktop, 2 on mobile

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.fetchPremiumProducts();
    this.updateItemsPerSlide();
    window.addEventListener('resize', () => this.updateItemsPerSlide());
  }

  updateItemsPerSlide() {
    // Show 1 item on mobile, 3 on desktop
    this.itemsPerSlide = window.innerWidth < 768 ? 1 : 3;
  }

  fetchPremiumProducts() {
    this.productService.getAllProducts()
      .subscribe({
        next: (data) => {
          console.log('Premium products fetched:', data);
          // Taking the last 6 products to differentiate from popular items
          this.products = data.slice(-6);
          this.loading = false;
        },
        error: (error) => {
          console.error('Error fetching premium products:', error);
          this.loading = false;
        }
      });
  }

  nextSlide() {
    const maxSlides = Math.ceil(this.products.length / this.itemsPerSlide);
    this.currentSlide = (this.currentSlide + 1) % maxSlides;
  }

  prevSlide() {
    const maxSlides = Math.ceil(this.products.length / this.itemsPerSlide);
    this.currentSlide = this.currentSlide === 0 ? maxSlides - 1 : this.currentSlide - 1;
  }

  getStarArray(rating: number): boolean[] {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= Math.floor(rating));
    }
    return stars;
  }

  truncateTitle(title: string): string {
    return title.length > 40 ? title.substring(0, 40) + '...' : title;
  }

  getBadgeType(index: number): string {
    const badges = ['NEW', 'OUT OF STOCK', 'HOT'];
    return badges[index % badges.length];
  }

  getBadgeClass(badge: string): string {
    switch(badge) {
      case 'NEW': return 'badge-new';
      case 'OUT OF STOCK': return 'badge-out-of-stock';
      case 'HOT': return 'badge-hot';
      default: return 'badge-new';
    }
  }

  getSlideIndices(): number[] {
    const slideCount = Math.ceil(this.products.length / this.itemsPerSlide);
    return Array.from({ length: slideCount }, (_, i) => i);
  }

  getProductsForSlide(slideIndex: number): Product[] {
    const startIndex = slideIndex * this.itemsPerSlide;
    const endIndex = startIndex + this.itemsPerSlide;
    return this.products.slice(startIndex, endIndex);
  }

  onImageError(event: any) {
    console.log('Image failed to load:', event.target.src);
    const parent = event.target.parentElement;
    
    if (parent) {
      parent.classList.remove('loading');
    }
    
    event.target.style.display = 'none';
    if (parent && !parent.querySelector('.fallback-image')) {
      const fallbackDiv = document.createElement('div');
      fallbackDiv.className = 'fallback-image';
      fallbackDiv.style.cssText = `
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #ff69b4, #ff1493);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 12px;
        text-align: center;
        font-weight: 600;
      `;
      fallbackDiv.innerHTML = '<i class="fas fa-gift" style="font-size: 24px;"></i>';
      parent.appendChild(fallbackDiv);
    }
  }

  onImageLoad(event: any) {
    console.log('Image loaded successfully:', event.target.src);
    const parent = event.target.parentElement;
    
    if (parent) {
      parent.classList.remove('loading');
    }
  }
}
