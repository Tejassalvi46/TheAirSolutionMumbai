import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './contact-us.html',
  styleUrls: ['./contact-us.css']
})
export class ContactUsComponent {
  // ----- Hardcoded admin credentials -----
  private readonly ADMIN_USERNAME = 'Admin';
  private readonly ADMIN_PASSWORD = 'Admin@123';

  // ----- Form data -----
  formData = {
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  };

  savedRequests: any[] = [];
  isSubmitted = false;

  // ----- Admin login state -----
  isAdminLoggedIn = false;
  showAdminModal = false;
  adminUsername = '';
  adminPassword = '';
  loginError = '';

  constructor() {
    this.loadRequests();
  }

  // =====================
  // STORAGE
  // =====================
  loadRequests(): void {
    const stored = localStorage.getItem('contact_requests');
    this.savedRequests = stored ? JSON.parse(stored) : [];
  }

  saveRequests(): void {
    localStorage.setItem('contact_requests', JSON.stringify(this.savedRequests));
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
      date: new Date().toLocaleString()
    });
    this.saveRequests();

    this.isSubmitted = true;
    this.formData = {
      name: '',
      email: '',
      phone: '',
      service: '',
      message: ''
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

  // Close modal when clicking on the dark overlay (outside modal content)
  onModalOverlayClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.closeAdminModal();
    }
  }
}