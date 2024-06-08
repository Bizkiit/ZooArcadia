import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../components/header/header.component';
import { Animal } from '../../models/animal.model';
import { Habitat } from '../../models/habitat.model';
import { AnimalFeeding } from '../../models/animal-feeding';
import { RapportVeterinaire } from '../../models/rapport-veterinaire.model';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-veto',
  standalone: true,
  imports: [HeaderComponent, CommonModule, RouterModule, FormsModule],
  templateUrl: './veto.component.html',
  styleUrls: ['./veto.component.scss']
})
export class VetoComponent implements OnInit {
  animals: Animal[] = [];
  habitats: Habitat[] = [];
  animalFeedings: AnimalFeeding[] = [];
  selectedAnimalId: number | null = null;

  newReport: Partial<RapportVeterinaire> = {
    rapportveterinaireid: 0,
    date: undefined,
    detail: '',
    quantity: 0,
    foodtype: '',
    status: '',
    animal: {
      animalid: 0,
      rapportveterinaireid: 0,
      habitatid: 0,
      name: '',
      status: '',
      raceid: 0
    }
  };

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  ngOnInit() {
    this.getAnimals();
    this.getHabitats();
  }

  getAnimals() {
    this.http.get<Animal[]>('https://localhost:7277/api/Animals').subscribe(data => {
      this.animals = data;
    });
  }

  getHabitats() {
    this.http.get<Habitat[]>('https://localhost:7277/api/Habitats').subscribe(data => {
      this.habitats = data;
    });
  }

  addReport() {
    if (this.newReport.date && this.newReport.animal) {
      const report = {
        ...this.newReport,
        date: new Date(this.newReport.date).toISOString(),  // Convert to ISO string in UTC
        animalId: this.newReport.animal.animalid
      };
      delete report.animal;
      this.http.post('https://localhost:7277/api/RapportVeterinaires', report)
        .pipe(
          catchError(error => {
            console.error('Error adding report:', error);
            if (error.error && error.error.errors) {
              console.error('Validation errors:', error.error.errors);
            }
            this.toastr.error('Erreur lors de l\'ajout du rapport vétérinaire.');
            return throwError(error);
          })
        )
        .subscribe(() => {
          this.newReport = {
            rapportveterinaireid: 0,
            date: undefined,
            detail: '',
            quantity: 0,
            foodtype: '',
            status: '',
            animal: {
              animalid: 0,
              rapportveterinaireid: 0,
              habitatid: 0,
              name: '',
              status: '',
              raceid: 0
            }
          };
          this.toastr.success('Rapport vétérinaire ajouté avec succès');
          this.getAnimals();
        });
    } else {
      this.toastr.error('La date et l\'animal sont obligatoires');
    }
  }

  loadAnimalFeedings() {
    if (this.selectedAnimalId !== null) {
      const url = `https://localhost:7277/api/AnimalFeedings?animalId=${this.selectedAnimalId}`;
      this.http.get<AnimalFeeding[]>(url)
        .pipe(
          catchError(error => {
            console.error('Error fetching animal feedings:', error);
            this.toastr.error('Erreur lors de la récupération des informations sur l\'alimentation de l\'animal.');
            return throwError(error);
          })
        )
        .subscribe(data => {
          this.animalFeedings = data.sort((a, b) => new Date(b.feedingdate).getTime() - new Date(a.feedingdate).getTime());
        });
    }
  }
  
  

  updateHabitatComment(habitat: Habitat) {
    if (habitat.comment) {
        const updatedHabitat = {
            ...habitat,
            animals: habitat.animal || [],
            habitatImageRelations: habitat.habitatimagerelation || []
        };
        this.http.put(`https://localhost:7277/api/RapportVeterinaires/UpdateHabitatComment`, updatedHabitat)
            .pipe(
                catchError(error => {
                    console.error('Error updating habitat comment:', error);
                    if (error.error && error.error.errors) {
                        console.error('Validation errors:', error.error.errors);
                    }
                    this.toastr.error('Erreur lors de la mise à jour du commentaire de l\'habitat.');
                    return throwError(error);
                })
            )
            .subscribe(() => {
                this.toastr.success('Commentaire de l\'habitat mis à jour avec succès');
            });
    } else {
        this.toastr.error('Le commentaire est obligatoire');
    }
  }
}
