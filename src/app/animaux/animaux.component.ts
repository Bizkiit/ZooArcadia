import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Animal } from '../../models/animal.model';
import { HeaderComponent } from '../components/header/header.component';
import { BannerTitleComponent } from '../components/banner-title/banner-title.component';
import { ApiService } from '../services/ApiService';

@Component({
  selector: 'app-animaux',
  templateUrl: './animaux.component.html',
  styleUrls: ['./animaux.component.scss'],
  standalone: true,
  imports: [CommonModule, HeaderComponent, BannerTitleComponent]
})
export class AnimauxComponent implements OnInit {
  animals: Animal[] = [];

  constructor(private http: HttpClient, private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.getAnimals();
  }

  getAnimals(): void {
    this.apiService.get<Animal[]>('Animals')
      .subscribe(
        data => this.animals = data,
        error => console.error('There was an error!', error)
      );
  }

  viewDetails(animalId: number): void {
    this.apiService.post(`Animals/${animalId}/incrementClick`, {})
      .subscribe(
        () => this.router.navigate(['/animaldetails', animalId]),
        error => console.error('There was an error!', error)
      );
  }
}
