// brand-product.ts
import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-brand-product',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './brand-product.html',
  styleUrls: ['./brand-product.css'],
})
export class BrandProductComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('brandDetailPage', { static: false })
  brandDetailPageRef?: ElementRef<HTMLElement>;

  selectedBrand: string | null = null;

  private observer: IntersectionObserver | null = null;
  private revealElements: HTMLElement[] = [];
  private isBrowser = false;

  constructor(
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.selectedBrand = params.get('id'); // matches ':id' in route
    });
  }

  ngAfterViewInit(): void {
    // Delay to allow *ngSwitch content to render first
    setTimeout(() => this.setupRevealObserver(), 0);
  }

  private setupRevealObserver(): void {
    if (!this.isBrowser) return;

    const host = this.brandDetailPageRef?.nativeElement;
    if (!host) return;

    // Clean up any prior observer (in case brand changed)
    if (this.observer) {
      this.revealElements.forEach((el) => this.observer!.unobserve(el));
      this.observer.disconnect();
      this.observer = null;
    }

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