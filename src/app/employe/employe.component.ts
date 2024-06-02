import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../components/header/header.component';
import { Service } from '../../models/service.model';
import { Animal } from '../../models/animal.model';
import { Avis } from '../../models/avis.model';
import { AnimalFeeding } from '../../models/animal-feeding';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employe',
  standalone: true,
  imports: [HeaderComponent, CommonModule, RouterModule, FormsModule],
  templateUrl: './employe.component.html',
  styleUrls: ['./employe.component.scss']
})
export class EmployeComponent implements OnInit {
  services: Service[] = [];
  animals: Animal[] = [];
  reviews: Avis[] = [];
  newService: Service = {
    serviceid: 0,
    name: '',
    description: ''
  };
  newFeeding: Partial<AnimalFeeding> = {
    animalid: 0,
    feedingdate: '',
    feedingtime: '',
    foodtype: '',
    quantity: 0
  };

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  ngOnInit() {
    this.getServices();
    this.getAnimals();
    this.getReviews();
  }

  getServices() {
    this.http.get<Service[]>('https://localhost:7277/api/services').subscribe(data => {
      console.log('Services received:', data);  // Log the received data
      this.services = data.sort((a, b) => a.serviceid - b.serviceid);
    }, error => {
      console.error('Error fetching services:', error);
    });
  }

  getAnimals() {
    this.http.get<Animal[]>('https://localhost:7277/api/Animals').subscribe(data => {
      this.animals = data;
    });
  }

  getReviews() {
    this.http.get<Avis[]>('https://localhost:7277/api/Avis').subscribe(data => {
      this.reviews = data;
    });
  }

  updateService(service: Service) {
    this.http.put(`https://localhost:7277/api/services/${service.serviceid}`, service).subscribe(() => {
      this.getServices();
      this.toastr.success('Service mis à jour avec succès');
    });
  }

  addFeeding() {
    if (this.newFeeding.feedingdate && this.newFeeding.feedingtime) {
      const feedingDateTime = `${this.newFeeding.feedingdate}T${this.newFeeding.feedingtime}:00`;
      const feeding = {
        ...this.newFeeding,
        feedingdate: new Date(feedingDateTime).toISOString()  // Convert to ISO string in UTC
      };
      this.http.post('https://localhost:7277/api/AnimalFeedings', feeding).subscribe(() => {
        this.newFeeding = {
          animalid: 0,
          feedingdate: '',
          feedingtime: '',
          foodtype: '',
          quantity: 0
        };
        this.toastr.success('Nourriture ajoutée avec succès');
      });
    } else {
      console.error('Feeding date and time are required');
    }
  }  

  toggleReviewVisibility(review: Avis) {
    const updateAvis = {
      avisid: review.avisid,
      isvisible: !review.isvisible
    };
  
    this.http.put('https://localhost:7277/api/Avis', updateAvis).subscribe(() => {
      review.isvisible = !review.isvisible;
      this.toastr.success('Visibilité de l\'avis modifiée avec succès');
    });
  }
}  
