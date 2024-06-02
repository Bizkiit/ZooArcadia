import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { HabitatsComponent } from '../habitats/habitats.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.scss',
  standalone: true,
  imports: [CommonModule,
    HabitatsComponent
  ]
})
export class AccueilComponent {
  showHabitats = false;
  onButtonClick(index: number) {
    console.log('Bouton', index, 'cliqué');
  }

  toggleHabitats(): void {
    this.showHabitats = !this.showHabitats;
  }

}
