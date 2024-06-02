import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { BannerTitleComponent } from '../components/banner-title/banner-title.component';
import { AccueilComponent } from '../components/accueil/accueil.component';
import { FooterComponent } from '../components/footer/footer.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    BannerTitleComponent,
    AccueilComponent,
    FooterComponent
  ]
})
export class HomeComponent {

}
