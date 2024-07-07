import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FooterService } from '../../services/FooterService';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  standalone: true,
  imports: [CommonModule]
})

export class FooterComponent implements OnInit {
  footerData: any;

  constructor(private footerService: FooterService) {}

  ngOnInit() {
    this.footerService.footerData$.subscribe(data => {
      this.footerData = data;
    });
  }
}
