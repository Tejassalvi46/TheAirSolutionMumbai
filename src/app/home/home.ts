import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  HostListener,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements AfterViewInit, OnDestroy {
  @ViewChild('brandsWrapper') brandsWrapper!: ElementRef<HTMLDivElement>;
  @ViewChild('homeRoot', { static: true }) homeRoot!: ElementRef<HTMLElement>;

  private readonly SCROLL_AMOUNT = 4;
  private cardWidth = 0;
  private gap = 20;
  private resizeTimer: any;

  canScrollLeft = false;
  canScrollRight = true;

  // ----- Reveal-on-scroll state -----
  private observer: IntersectionObserver | null = null;
  private revealElements: HTMLElement[] = [];
  private isBrowser = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.measureLogoWidth();
      this.updateArrowState();
      this.setupRevealObserver();
    }, 100);
  }

  ngOnDestroy(): void {
    if (this.resizeTimer) clearTimeout(this.resizeTimer);

    if (this.observer) {
      this.revealElements.forEach((el) => this.observer!.unobserve(el));
      this.observer.disconnect();
      this.observer = null;
    }
  }

  // ==========================================
  // ROUTING — explicit click handlers (bullet-proof)
  // ==========================================
  goToProductList(): void {
    this.router.navigate(['/product-list']);
  }

  goToBrandList(): void {
    this.router.navigate(['/brand']);
  }

  // ==========================================
  // REVEAL ON SCROLL
  // ==========================================
  private setupRevealObserver(): void {
    if (!this.isBrowser) return;

    const root: HTMLElement =
      this.homeRoot?.nativeElement ?? document.body;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    this.revealElements = Array.from(
      root.querySelectorAll<HTMLElement>('.reveal')
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

  // ==========================================
  // CAROUSEL
  // ==========================================
  @HostListener('window:resize')
  onResize() {
    if (this.resizeTimer) clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(() => {
      this.measureLogoWidth();
      this.updateArrowState();
    }, 200);
  }

  private measureLogoWidth() {
    const wrapper = this.brandsWrapper?.nativeElement;
    if (!wrapper) return;

    const firstLogo = wrapper.querySelector('.brand-logo') as HTMLElement;
    if (firstLogo) {
      this.cardWidth = firstLogo.offsetWidth;
      const styles = window.getComputedStyle(wrapper);
      const gapValue = parseFloat(styles.columnGap || styles.gap || '20');
      if (!isNaN(gapValue)) this.gap = gapValue;
    }
  }

  private updateArrowState() {
    const wrapper = this.brandsWrapper?.nativeElement;
    if (!wrapper) return;

    const scrollLeft = wrapper.scrollLeft;
    const maxScroll = wrapper.scrollWidth - wrapper.clientWidth;

    this.canScrollLeft = scrollLeft > 5;
    this.canScrollRight = scrollLeft < maxScroll - 5;
  }

  onScroll() { this.updateArrowState(); }

  scrollLeft() {
    const wrapper = this.brandsWrapper.nativeElement;
    const amount = (this.cardWidth + this.gap) * this.SCROLL_AMOUNT;
    wrapper.scrollBy({ left: -amount, behavior: 'smooth' });
    setTimeout(() => this.updateArrowState(), 400);
  }

  scrollRight() {
    const wrapper = this.brandsWrapper.nativeElement;
    const amount = (this.cardWidth + this.gap) * this.SCROLL_AMOUNT;
    wrapper.scrollBy({ left: amount, behavior: 'smooth' });
    setTimeout(() => this.updateArrowState(), 400);
  }
}