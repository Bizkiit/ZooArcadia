import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-banner-title',
  templateUrl: './banner-title.component.html',
  styleUrl: './banner-title.component.scss',
  standalone: true,
  imports: [CommonModule]
})
export class BannerTitleComponent {

  @Input() title: string = 'Zoo Arcadia';
  @Input() subtitle: string = '';

  constructor(private router: Router) {}

  navigateToReviews() {
    this.router.navigate(['/reviews']);
  }
}
