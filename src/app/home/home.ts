import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements AfterViewInit, OnDestroy {
  @ViewChild('brandsWrapper') brandsWrapper!: ElementRef<HTMLDivElement>;

  private readonly SCROLL_AMOUNT = 4;
  private cardWidth = 0;
  private gap = 20;
  private resizeTimer: any;

  canScrollLeft = false;
  canScrollRight = true;

  ngAfterViewInit() {
    setTimeout(() => {
      this.measureLogoWidth();
      this.updateArrowState();
    }, 100);
  }

  ngOnDestroy() {
    if (this.resizeTimer) clearTimeout(this.resizeTimer);
  }

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

  onScroll() {
    this.updateArrowState();
  }

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