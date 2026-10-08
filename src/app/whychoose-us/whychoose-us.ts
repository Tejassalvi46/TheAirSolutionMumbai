import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-whychoose-us',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './whychoose-us.html',
  styleUrl: './whychoose-us.css',
})
export class WhychooseUs {
  // Array of features to render dynamically
  features = [
    {
      title: '24/7 Emergency Service',
      description: 'Our expert technicians are on standby day and night, ready to fix any cooling breakdown instantly.',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#033a21" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`
    },
    {
      title: 'Certified & Experienced',
      description: 'All our technicians are HVAC-certified with years of hands-on experience, ensuring safe and professional work.',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#033a21" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l-3.5 3.5-5-.5L4 9l-2.5 4.5L4 18l-1.5 4.5 5-.5L12 24l3.5-3.5 5 .5L20 18l2.5-4.5L20 9l1.5-4.5-5 .5L12 2z"/><path d="M12 5c1.7 0 3 1.3 3 3s-1.3 3-3 3-3-1.3-3-3 1.3-3 3-3z"/></svg>`
    },
    {
      title: 'Transparent & Affordable',
      description: 'We offer competitive pricing with no hidden fees. Get high-quality service that fits your budget perfectly.',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#033a21" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v12"/><path d="M8 10h6"/></svg>`
    },
    {
      title: 'Lightning-Fast Response',
      description: 'Our fleet is strategically located to reach your property quickly, minimizing downtime and discomfort.',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#033a21" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10"/></svg>`
    },
    {
      title: 'Premium Quality Parts',
      description: 'We use only OEM-grade components and energy-efficient units to guarantee long-lasting performance.',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#033a21" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L3 5v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V5L12 2z"/><path d="M8 12l2 2 4-4"/></svg>`
    },
    {
      title: '100% Satisfaction Guarantee',
      description: 'We stand by our work. If you are not completely happy, we will come back and make it right—no questions asked.',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="#033a21" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 6l-1.5 6h5.5l-7 11 1.5-5h-5.5l4.5-8.5 2-3.5z"/></svg>`
    }
  ];
}