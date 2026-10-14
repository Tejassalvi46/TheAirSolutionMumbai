// contact-us.ts
import {
  Component,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './contact-us.html',
  styleUrls: ['./contact-us.css'],
})
export class ContactUsComponent implements AfterViewInit, OnDestroy {
  // ----- Hardcoded admin credentials -----
  private readonly ADMIN_USERNAME = 'Admin';
  private readonly ADMIN_PASSWORD = 'Admin@123';

  @ViewChild('contactPage', { static: false })
  contactPageRef!: ElementRef<HTMLElement>;

  // ----- Form data -----
  formData = {
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  };

  savedRequests: any[] = [];
  isSubmitted = false;

  // ----- Admin login state -----
  isAdminLoggedIn = false;
  showAdminModal = false;
  adminUsername = '';
  adminPassword = '';
  loginError = '';

  // ----- Reveal / observer state -----
  private observer: IntersectionObserver | null = null;
  private revealElements: HTMLElement[] = [];
  private isBrowser = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.loadRequests();
  }

  // =========================================
  // REVEAL ON SCROLL (same as About/Services)
  // =========================================
  ngAfterViewInit(): void {
    if (!this.isBrowser) return;

    const host = this.contactPageRef?.nativeElement;
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

  // =====================
  // STORAGE
  // =====================
  loadRequests(): void {
    if (!this.isBrowser) return;
    const stored = localStorage.getItem('contact_requests');
    this.savedRequests = stored ? JSON.parse(stored) : [];
  }

  saveRequests(): void {
    if (!this.isBrowser) return;
    localStorage.setItem(
      'contact_requests',
      JSON.stringify(this.savedRequests)
    );
  }

  // =====================
  // FORM SUBMIT
  // =====================
  onSubmit(): void {
    if (!this.formData.name || !this.formData.email) {
      alert('Please fill in at least Name and Email.');
      return;
    }

    this.savedRequests.push({
      ...this.formData,
      date: new Date().toLocaleString(),
    });
    this.saveRequests();

    this.isSubmitted = true;
    this.formData = {
      name: '',
      email: '',
      phone: '',
      service: '',
      message: '',
    };

    setTimeout(() => (this.isSubmitted = false), 3000);
  }

  // =====================
  // DOWNLOAD / CLEAR
  // =====================
  downloadNote(): void {
    if (this.savedRequests.length === 0) {
      alert('No notes to download.');
      return;
    }

    let text = '===== CONTACT REQUESTS =====\n\n';
    this.savedRequests.forEach((req, i) => {
      text += `#${i + 1} (${req.date})\n`;
      text += `Name: ${req.name}\nEmail: ${req.email}\nPhone: ${req.phone || 'N/A'}\n`;
      text += `Service: ${req.service || 'N/A'}\nMessage: ${req.message || 'N/A'}\n\n`;
    });

    const blob = new Blob([text], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'contact-requests.txt';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  clearRequests(): void {
    if (confirm('Delete all saved notes?')) {
      this.savedRequests = [];
      localStorage.removeItem('contact_requests');
    }
  }

  // =====================
  // ADMIN LOGIN LOGIC
  // =====================
  openAdminModal(): void {
    if (this.isAdminLoggedIn) {
      alert('Admin mode is already active. Notes are visible.');
      return;
    }
    this.adminUsername = '';
    this.adminPassword = '';
    this.loginError = '';
    this.showAdminModal = true;
  }

  closeAdminModal(): void {
    this.showAdminModal = false;
    this.loginError = '';
    this.adminUsername = '';
    this.adminPassword = '';
  }

  attemptAdminLogin(): void {
    const user = this.adminUsername.trim();
    const pass = this.adminPassword.trim();

    if (user === this.ADMIN_USERNAME && pass === this.ADMIN_PASSWORD) {
      this.isAdminLoggedIn = true;
      this.showAdminModal = false;
      this.adminUsername = '';
      this.adminPassword = '';
      this.loginError = '';
    } else {
      this.loginError = 'Invalid username or password.';
      this.adminPassword = '';
    }
  }

  onModalOverlayClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.closeAdminModal();
    }
  }
}