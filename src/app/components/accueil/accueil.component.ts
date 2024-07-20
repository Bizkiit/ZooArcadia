import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Avis } from '../../../models/avis.model';
import { FooterComponent } from '../footer/footer.component';
import { AvisComponent } from "../../avis/avis.component";

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss'],
  standalone: true,
  imports: [CommonModule, FooterComponent, AvisComponent]
})
export class AccueilComponent  {


  constructor(private router: Router) {}


  navigateToHabitats(): void {
    this.router.navigate(['/habitats']);
  }

  navigateToAnimals(): void {
    this.router.navigate(['/animaux']);
  }

  navigateToServices(): void {
    this.router.navigate(['/zooservices']);
  }
}
