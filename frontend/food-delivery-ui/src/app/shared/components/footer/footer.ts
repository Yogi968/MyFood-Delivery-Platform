import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FooterFeature, FooterLink } from './models/footer.models';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [MatIconModule, RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class AppFooter {

  /** Current year displayed in the copyright section. */
  readonly currentYear = new Date().getFullYear();

  /** Features highlighting the MyFood service. */
  readonly footerFeatures: FooterFeature[] = [
    {
      id: 1,
      icon: 'restaurant',
      title: 'Handpicked restaurants',
      description: "Only the places you'll love",
    },
    {
      id: 2,
      icon: 'delivery_dining',
      title: 'Delivered with care',
      description: 'Fresh, from kitchen to doorstep',
    },
    {
      id: 3,
      icon: 'headset_mic',
      title: 'Here when you need us',
      description: 'A little help, just a tap away',
    },
  ];

  /** Footer navigation links. */
  readonly footerLinks: FooterLink[] = [
    {
      id: 1,
      label: 'About us',
      route: '/about',
    },
    {
      id: 2,
      label: 'Help & support',
      route: '/help',
    },
    {
      id: 3,
      label: 'Privacy policy',
      route: '/privacy-policy',
    },
    {
      id: 4,
      label: 'Terms & conditions',
      route: '/terms',
    },
  ];
}
