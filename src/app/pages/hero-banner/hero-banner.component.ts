import { Component, OnInit } from '@angular/core';

interface SlideItem {
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

@Component({
  selector: 'app-hero-banner',
  templateUrl: './hero-banner.component.html',
  styleUrl: './hero-banner.component.scss'
})
export class HeroBannerComponent implements OnInit {
  currentSlide = 0;
  slides: SlideItem[] = [
    {
      title: 'Choose Perfect',
      subtitle: 'Gifts From Us',
      description: 'Culpa ducimus nesciunt aliquam non rerum esse recusandae omnis. Rerum optio dolores et.',
      image: 'assets/slide1.jpg'
    },
    {
      title: 'Special Offers',
      subtitle: 'For Your Love',
      description: 'Discover amazing gifts that will make your loved ones smile. Quality and beauty combined.',
      image: 'assets/slide2.jpg'
    },
    {
      title: 'Premium Collection',
      subtitle: 'Unique Gifts',
      description: 'Handpicked items that express your feelings perfectly. Every gift tells a story.',
      image: 'assets/slide3.jpg'
    }
  ];

  ngOnInit() {

    setInterval(() => {
      this.nextSlide();
    }, 60000);
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentSlide = this.currentSlide === 0 ? this.slides.length - 1 : this.currentSlide - 1;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }
}
