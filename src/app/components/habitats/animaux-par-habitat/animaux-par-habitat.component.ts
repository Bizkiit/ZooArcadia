import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Animal } from '../../../../models/animal.model';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../../services/ApiService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-animaux-par-habitat',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './animaux-par-habitat.component.html',
  styleUrl: './animaux-par-habitat.component.scss'
})
export class AnimauxParHabitatComponent implements OnInit {
  @Input() habitatid!: number;
  animals: Animal[] = [];

  constructor(private http: HttpClient, private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.getAnimalsByHabitat();
  }

  getAnimalsByHabitat(): void {
    this.apiService.get<Animal[]>(`Animals/GetAnimalsByHabitat/${this.habitatid}`)
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

