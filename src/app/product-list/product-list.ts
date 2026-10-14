// product-list.ts
import {
  Component,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList implements AfterViewInit, OnDestroy {
  @ViewChild('productsSection', { static: false })
  productsSectionRef!: ElementRef<HTMLElement>;

  private observer: IntersectionObserver | null = null;
  private revealElements: HTMLElement[] = [];
  private isBrowser = false;

  products = [
    {
      id: 1,
      name: 'Split AC',
      img: 'assets/images/split-ac.png',
      price: '$499',
      desc: 'Experience whisper-quiet, energy-efficient cooling with advanced inverter technology. Our Split AC delivers pure, bacteria-free air, smart climate control, and sleek design—transforming your space into a perfect comfort zone.',
    },
    {
      id: 2,
      name: 'Window AC',
      img: 'assets/images/window-ac.jpg',
      price: '$349',
      desc: 'Powerful cooling meets smart savings. Our Window AC features turbo chill, anti-bacterial filtration, and whisper-quiet operation—delivering refreshing comfort with unmatched durability and style.',
    },
    {
      id: 3,
      name: 'Cassette AC',
      img: 'assets/images/cassette-ac.png',
      price: '$599',
      desc: 'Sleek ceiling-mounted design with 360° airflow. Our Cassette AC delivers powerful, uniform cooling for large spaces—ultra-quiet, energy-efficient, and perfect for offices, showrooms, and modern interiors.',
    },
    {
      id: 4,
      name: 'One Way Cassette',
      img: 'assets/images/One Way Cassette.png',
      price: '$599',
      desc: 'Ultra-slim ceiling-mounted design engineered for precise single-directional airflow. Ideal for compact spaces and shallow ceiling voids—delivering silent, efficient, and targeted cooling for hotel rooms and modern homes.',
    },
    {
      id: 5,
      name: 'Ductable AC',
      img: 'assets/images/ductable-ac.jpg',
      price: '$429',
      desc: 'Hidden ceiling-mounted cooling for entire spaces. Our Ductable AC delivers powerful, uniform airflow through concealed ducts—perfect for homes, offices, and commercial projects seeking seamless, quiet, and centralized comfort.',
    },
    {
      id: 6,
      name: 'Tower AC',
      img: 'assets/images/Tower-AC.png',
      price: '$799',
      desc: 'Sleek, tall, and space-saving design with powerful airflow. Our Tower AC delivers rapid, even cooling with advanced filtration and whisper-quiet operation—perfect for modern homes, offices, and showrooms demanding elegance.',
    },
    {
      id: 7,
      name: 'Multi AC',
      img: 'assets/images/multi-ac.png',
      price: '$649',
      desc: 'Save space and energy with our Multi AC. One outdoor unit connects multiple indoor units, offering individual room control, powerful cooling, and smart efficiency—perfect for large homes and commercial spaces.',
    },
    {
      id: 8,
      name: 'VRF / VRV',
      img: 'assets/images/VRF-ac.png',
      price: '$529',
      desc: 'Premium commercial climate control redefined. Our VRF/VRV system offers simultaneous cooling and heating, superior energy savings, and scalable design—perfect for hotels, offices, and luxury residential towers.',
    },
    {
      id: 9,
      name: 'Deep Freezers',
      img: 'assets/images/deep-freez.png',
      price: '$529',
      desc: 'Heavy-duty low-temperature preservation engineered for ultimate freshness retention. Our Deep Freezer features ultra-fast freezing, high-density insulation, and extended power-cut cooling backup—perfect for commercial and household cold storage.',
    },
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;

    const host = this.productsSectionRef?.nativeElement;
    if (!host) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    this.revealElements = Array.from(
      host.querySelectorAll<HTMLElement>('.reveal')
    );

    if (prefersReducedMotion) {
      this.revealElements.forEach((el) => el.classList.add('revealed'));
      return;
    }

    if ('IntersectionObserver' in window) {
      const observerOptions: IntersectionObserverInit = {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.1,
      };

      this.observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            obs.unobserve(entry.target);
          }
        });
      }, observerOptions);

      this.revealElements.forEach((el) => this.observer!.observe(el));
    } else {
      this.revealElements.forEach((el) => el.classList.add('revealed'));
    }
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.revealElements.forEach((el) => this.observer!.unobserve(el));
      this.observer.disconnect();
      this.observer = null;
    }
  }
}