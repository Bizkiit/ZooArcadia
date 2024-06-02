import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-habitats',
  templateUrl: './habitats.component.html',
  styleUrl: './habitats.component.scss',
  standalone: true,
  imports: [CommonModule]
})
export class HabitatsComponent {
  constructor(private router: Router) {}

  navigateToAnimalByHabitat(habitatType: string): void {
    this.router.navigate(['/animaux-par-habitat', habitatType]);
  }
}
