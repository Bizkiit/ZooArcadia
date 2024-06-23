import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/ApiService';
import { ToastrService } from 'ngx-toastr';
import { Avis } from '../../../models/avis.model';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class AccueilComponent implements OnInit {
  avis: Avis[] = [];
  visibleAvis: Avis[] = [];
  avisLimit: number = 10;
  currentIndex: number = 0;

  constructor(private apiService: ApiService, private toastr: ToastrService, private router: Router) {}

  ngOnInit(): void {
    this.loadAvis();
  }

  loadAvis(): void {
    this.apiService.get<Avis[]>('avis').subscribe(
      (data) => {
        this.avis = data;
        this.updateVisibleAvis();
      },
      (error) => {
        this.toastr.error('Erreur lors de la récupération des avis');
      }
    );
  }

  updateVisibleAvis(): void {
    this.visibleAvis = this.avis.slice(0, this.currentIndex + this.avisLimit);
  }

  showMore(): void {
    this.currentIndex += this.avisLimit;
    this.updateVisibleAvis();
  }

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
