import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Animal } from '../../../../models/animal.model';
import { HttpClient } from '@angular/common/http';

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

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getAnimalsByHabitat();
  }

  getAnimalsByHabitat(): void {
    this.http.get<Animal[]>(`https://localhost:7277/api/Animals/GetAnimalsByHabitat/${this.habitatid}`)
      .subscribe(
        data => this.animals = data,
        error => console.error('There was an error!', error)
      );
  }
}
