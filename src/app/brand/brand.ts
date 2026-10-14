// brand.ts
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

export interface Brand {
  id: string;
  name: string;
  description: string;
  image: string;
  badge: string;
  tag: string;
}

@Component({
  selector: 'app-brand',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './brand.html',
  styleUrls: ['./brand.css'],
})
export class BrandComponent implements AfterViewInit, OnDestroy {
  @ViewChild('brandsSection', { static: false })
  brandsSectionRef!: ElementRef<HTMLElement>;

  private observer: IntersectionObserver | null = null;
  private revealElements: HTMLElement[] = [];
  private isBrowser = false;

  brands: Brand[] = [
    // 1. MITSUBISHI ELECTRIC
    {
      id: 'mitsubishi-electric',
      name: 'Mitsubishi Electric',
      description:
        'Heavy-duty commercial and residential climate engineering with ultra-quiet operation.',
      image: 'assets/images/Mitsubhushi.png',
      badge: 'Heavy Duty',
      tag: 'Industrial',
    },

    // 2. DAIKIN
    {
      id: 'daikin',
      name: 'Daikin',
      description:
        'Global leader in HVAC systems, offering energy-efficient and reliable climate control.',
      image: 'assets/images/Daikin.png',
      badge: 'Global Leader',
      tag: 'Premium',
    },

    // 3. PANASONIC
    {
      id: 'panasonic',
      name: 'Panasonic',
      description:
        'Eco-friendly solutions with nanoe™ air purification and energy-saving tech.',
      image: 'assets/images/Panasonic.png',
      badge: 'Eco Friendly',
      tag: 'Clean Air',
    },

    // 4. HITACHI
    {
      id: 'hitachi',
      name: 'Hitachi',
      description:
        'Advanced Japanese inverter technology engineered for lasting performance.',
      image: 'assets/images/Hitachi-Emblem.png',
      badge: 'Japanese Precision',
      tag: 'Reliable',
    },

    // 5. CARRIER
    {
      id: 'carrier',
      name: 'Carrier',
      description:
        'Pioneer of modern air conditioning with trusted global climate solutions.',
      image: 'assets/images/carrier-logo.png',
      badge: 'Inventor of AC',
      tag: 'Trusted',
    },

    // 6. O GENERAL
    {
      id: 'o-general',
      name: 'O General',
      description:
        'Premium Fujitsu-backed engineering built for extreme tropical reliability.',
      image: 'assets/images/genral.png',
      badge: 'Premium Japanese',
      tag: 'Durable',
    },

    // 7. LG
    {
      id: 'lg',
      name: 'LG Electronics',
      description:
        'Innovative dual-inverter ACs and smart appliances with AI-driven features.',
      image: 'assets/images/LG-Logo.webp',
      badge: 'Innovation',
      tag: 'Smart',
    },

    // 8. SAMSUNG
    {
      id: 'samsung',
      name: 'Samsung',
      description:
        'WindFree™ cooling and SmartThings ecosystem for connected living.',
      image: 'assets/images/original-samsung-logo.png',
      badge: 'Smart Tech',
      tag: 'Ecosystem',
    },

    // 9. BLUE STAR
    {
      id: 'blue-star',
      name: 'Blue Star',
      description:
        'Precision-engineered air conditioning trusted across Indian homes and businesses.',
      image: 'assets/images/blue-star-limited-logo-vector.png',
      badge: 'Indian Innovator',
      tag: 'Precision',
    },

    // 10. VOLTAS
    {
      id: 'voltas',
      name: 'Voltas',
      description:
        'Robust cooling solutions built for tropical climates, trusted across India.',
      image: 'assets/images/voltas-logo.png',
      badge: 'Trusted Indian',
      tag: 'Tropical',
    },
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;

    const host = this.brandsSectionRef?.nativeElement;
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
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.08,
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