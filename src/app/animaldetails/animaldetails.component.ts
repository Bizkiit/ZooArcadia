import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/ApiService';
import { Animal } from '../../models/animal.model';
import { CommonModule, Location } from '@angular/common';
import { HeaderComponent } from '../components/header/header.component';

@Component({
  selector: 'app-animal-detail',
  templateUrl: '../animaldetails/animaldetails.component.html',
  styleUrls: ['../animaldetails/animaldetails.component.scss'],
  standalone: true,
  imports: [CommonModule, HeaderComponent]
})
export class AnimalDetailComponent implements OnInit {
  animal: Animal | undefined;

  constructor(private route: ActivatedRoute, private apiService: ApiService, private location: Location) { }

  ngOnInit(): void {
    this.getAnimalDetail();
  }

  goBack(): void {
    this.location.back();
  }

  getAnimalDetail(): void {
    const animalId = this.route.snapshot.paramMap.get('id');
    if (animalId) {
      this.apiService.get<Animal>(`Animals/${animalId}`)
        .subscribe(
          data => this.animal = data,
          error => console.error('There was an error!', error)
        );
    }
  }
}
