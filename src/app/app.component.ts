import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BannerTitleComponent } from './components/banner-title/banner-title.component';
import { AccueilComponent } from './components/accueil/accueil.component';
import { AdminComponent } from './admin/admin.component';
import { AvisComponent } from './avis/avis.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    HeaderComponent,
    FooterComponent,
    BannerTitleComponent,
    AccueilComponent,
    AvisComponent
  ]
})
export class AppComponent {
  @ViewChild(AvisComponent) avisComponent!: AvisComponent;

  constructor(private router: Router) {}

  scrollToAvis() {
    if (this.avisComponent) {
      this.avisComponent.scrollToElement();
    }
  }
}
