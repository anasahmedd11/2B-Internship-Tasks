import { Component, OnInit } from '@angular/core';
import { Testimonial } from '../../core/Model/testimonial';



@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.scss'
})
export class TestimonialsComponent implements OnInit {
  testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Ahmed Mohamed',
      role: 'Customer',
      avatar: 'avatar1.jpg',
      content: 'Ab Vel Consequatur Repellat Eos Omnis Accusamus Porro Sunt Lorem. Totam Voluptas Ullam Ut. Neque Accusantium Voluptas Rerum. Dolorem Veritatis Quo Omnis Nihil Nulla Harum Eum. Dignissimos Laborum Necessitatlbus Vero Nihil.',
      rating: 4
    },
    {
      id: 2,
      name: 'Ahmed Mohamed',
      role: 'Customer',
      avatar: 'avatar1.jpg',
      content: 'Ab Vel Consequatur Repellat Eos Omnis Accusamus Porro Sunt Lorem. Totam Voluptas Ullam Ut. Neque Accusantium Voluptas Rerum. Dolorem Veritatis Quo Omnis Nihil Nulla Harum Eum. Dignissimos Laborum Necessitatlbus Vero Nihil.',
      rating: 4
    },
    {
      id: 3,
      name: 'Ahmed Mohamed',
      role: 'Customer',
      avatar: 'avatar1.jpg',
      content: 'Ab Vel Consequatur Repellat Eos Omnis Accusamus Porro Sunt Lorem. Totam Voluptas Ullam Ut. Neque Accusantium Voluptas Rerum. Dolorem Veritatis Quo Omnis Nihil Nulla Harum Eum. Dignissimos Laborum Necessitatlbus Vero Nihil.',
      rating: 4
    },
    {
      id: 4,
      name: 'Ahmed Mohamed',
      role: 'Customer',
      avatar: 'avatar1.jpg',
      content: 'Ab Vel Consequatur Repellat Eos Omnis Accusamus Porro Sunt Lorem. Totam Voluptas Ullam Ut. Neque Accusantium Voluptas Rerum. Dolorem Veritatis Quo Omnis Nihil Nulla Harum Eum. Dignissimos Laborum Necessitatlbus Vero Nihil.',
      rating: 4
    },
    {
      id: 5,
      name: 'Ahmed Mohamed',
      role: 'Customer',
      avatar: 'avatar1.jpg',
      content: 'Ab Vel Consequatur Repellat Eos Omnis Accusamus Porro Sunt Lorem. Totam Voluptas Ullam Ut. Neque Accusantium Voluptas Rerum. Dolorem Veritatis Quo Omnis Nihil Nulla Harum Eum. Dignissimos Laborum Necessitatlbus Vero Nihil.',
      rating: 4
    },
    {
      id: 6,
      name: 'Ahmed Mohamed',
      role: 'Customer',
      avatar: 'avatar1.jpg',
      content: 'Ab Vel Consequatur Repellat Eos Omnis Accusamus Porro Sunt Lorem. Totam Voluptas Ullam Ut. Neque Accusantium Voluptas Rerum. Dolorem Veritatis Quo Omnis Nihil Nulla Harum Eum. Dignissimos Laborum Necessitatlbus Vero Nihil.',
      rating: 4
    }
  ];

  currentSlide = 0;
  itemsPerSlide = 3;

  ngOnInit() {
    this.updateItemsPerSlide();
    window.addEventListener('resize', () => this.updateItemsPerSlide());
    

    setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  updateItemsPerSlide() {

    this.itemsPerSlide = window.innerWidth < 768 ? 1 : 3;
  }

  nextSlide() {
    const maxSlides = Math.ceil(this.testimonials.length / this.itemsPerSlide);
    this.currentSlide = (this.currentSlide + 1) % maxSlides;
  }

  prevSlide() {
    const maxSlides = Math.ceil(this.testimonials.length / this.itemsPerSlide);
    this.currentSlide = this.currentSlide === 0 ? maxSlides - 1 : this.currentSlide - 1;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }

  getStarArray(rating: number): number[] {
    return Array(5).fill(0).map((x, i) => i < rating ? 1 : 0);
  }

  getSlideIndices(): number[] {
    const maxSlides = Math.ceil(this.testimonials.length / this.itemsPerSlide);
    return Array(maxSlides).fill(0).map((x, i) => i);
  }

  getTestimonialsForSlide(slideIndex: number): Testimonial[] {
    const startIndex = slideIndex * this.itemsPerSlide;
    return this.testimonials.slice(startIndex, startIndex + this.itemsPerSlide);
  }
}
