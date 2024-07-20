import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Output() navigateToAvis = new EventEmitter<void>();

  constructor(private router: Router) {}

  onNavigateToAvis(): void {
    this.router.navigate(['/'], { fragment: 'avis-section' });
  }
  
}
