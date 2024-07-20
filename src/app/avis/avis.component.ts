import { Component, ElementRef, OnInit } from '@angular/core';
import { Avis } from '../../models/avis.model';
import { ApiService } from '../services/ApiService';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-avis',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './avis.component.html',
  styleUrls: ['./avis.component.scss']
})
export class AvisComponent implements OnInit {
  avis: Avis[] = [];
  visibleAvis: Avis[] = [];
  avisLimit: number = 10;
  currentIndex: number = 0;
  newAvis: Avis = {
    avisid: 0,
    pseudo: '',
    comment: '',
    isvisible: false
  };

  constructor(private apiService: ApiService, private toastr: ToastrService, public elementRef: ElementRef) {}

  ngOnInit(): void {
    this.loadAvis();
  }

  loadAvis(): void {
    this.apiService.get<Avis[]>('avis').subscribe(
      (data) => {
        this.avis = data.filter(avi => avi.isvisible);
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

  submitAvis(): void {
    this.apiService.post<Avis>('avis', this.newAvis).subscribe(
      (response) => {
        this.toastr.success('Avis soumis avec succès ! Il sera visible après approbation.');
        this.newAvis = {
          avisid: 0,
          pseudo: '',
          comment: '',
          isvisible: false
        };
      },
      (error) => {
        this.toastr.error('Erreur lors de la soumission de l\'avis');
      }
    );
  }
  scrollToElement(): void {
    this.elementRef.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
