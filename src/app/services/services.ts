// services.ts
import {
  Component,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [],
  templateUrl: './services.html',
  styleUrl: './services.css',
})
export class ServicesComponent implements AfterViewInit, OnDestroy {
  @ViewChild('servicesPage', { static: false })
  servicesPageRef!: ElementRef<HTMLElement>;

  private observer: IntersectionObserver | null = null;
  private revealElements: HTMLElement[] = [];
  private imageBoxes: HTMLImageElement[] = [];
  private ticking = false;
  private readonly onScrollBound = this.onScroll.bind(this);
  private hasHover = false;
  private isBrowser = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) return;

    const host = this.servicesPageRef?.nativeElement;
    if (!host) return;

    // 1. Respect prefers-reduced-motion
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

    // 2. Intersection Observer — reveal on scroll
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

    // 3. Subtle parallax on image boxes (hover devices only)
    this.hasHover = window.matchMedia('(hover: hover)').matches;

    if (this.hasHover) {
      this.imageBoxes = Array.from(
        host.querySelectorAll<HTMLImageElement>(
          '.image-box img, .maintenance-image-box img'
        )
      );

      window.addEventListener('scroll', this.onScrollBound, { passive: true });
      this.updateParallax();
    }
  }

  private updateParallax(): void {
    const viewportHeight = window.innerHeight;

    this.imageBoxes.forEach((img) => {
      const box = img.closest(
        '.image-box, .maintenance-image-box'
      ) as HTMLElement | null;
      if (!box) return;

      const rect = box.getBoundingClientRect();

      if (rect.top < viewportHeight && rect.bottom > 0) {
        const speed = 0.02;
        const offset = (rect.top - viewportHeight / 2) * speed;
        const clampedOffset = Math.max(-8, Math.min(8, offset));

        img.style.transform = `scale(1.06) translateY(${clampedOffset}px)`;
      }
    });

    this.ticking = false;
  }

  private onScroll(): void {
    if (!this.ticking) {
      window.requestAnimationFrame(() => this.updateParallax());
      this.ticking = true;
    }
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.revealElements.forEach((el) => this.observer!.unobserve(el));
      this.observer.disconnect();
      this.observer = null;
    }

    if (this.isBrowser && this.hasHover) {
      window.removeEventListener('scroll', this.onScrollBound);
    }
  }
}