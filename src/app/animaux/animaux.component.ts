import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Animal } from '../../models/animal.model';
import { AppComponent } from '../app.component';
import { HeaderComponent } from '../components/header/header.component';
import { BannerTitleComponent } from '../components/banner-title/banner-title.component';

@Component({
  selector: 'app-animaux',
  templateUrl: './animaux.component.html',
  styleUrls: ['./animaux.component.scss'],
  standalone: true,
  imports: [CommonModule, HeaderComponent, BannerTitleComponent]
})
export class AnimauxComponent implements OnInit {
  animals: Animal[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getAnimals();
  }

  getAnimals(): void {
    this.http.get<Animal[]>('https://localhost:7277/api/Animals')
      .subscribe(
        data => this.animals = data,
        error => console.error('There was an error!', error)
      );
  }
}
