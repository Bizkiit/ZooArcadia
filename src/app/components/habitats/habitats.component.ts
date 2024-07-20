import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Habitat } from '../../../models/habitat.model';
import { HeaderComponent } from '../header/header.component';
import { AnimauxParHabitatComponent } from './animaux-par-habitat/animaux-par-habitat.component';
import { ApiService } from '../../services/ApiService';
import { BannerTitleComponent } from '../banner-title/banner-title.component';
import { HabitatDataService } from '../../services/HabitatDataService';
import { Animal } from '../../../models/animal.model';
import { AnimalDataService } from '../../services/AnimalDataService';



@Component({
  selector: 'app-habitats',
  templateUrl: './habitats.component.html',
  styleUrls: ['./habitats.component.scss'],
  standalone: true,
  imports: [CommonModule, BannerTitleComponent, HttpClientModule, HeaderComponent, AnimauxParHabitatComponent]
})
export class HabitatsComponent implements OnInit {
  habitats: Habitat[] = [];
  selectedHabitatId: number | null = null;
  animalsByHabitat: { [key: number]: Animal[] } = {};

  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    private habitatDataService: HabitatDataService,
    private animalDataService: AnimalDataService
  ) {}

  ngOnInit(): void {
    const cachedHabitats = this.habitatDataService.getHabitats();
    if (cachedHabitats && cachedHabitats.length > 0) {
      this.habitats = cachedHabitats;
    } else {
      this.getHabitats();
    }
  }

  getHabitats(): void {
    this.apiService.get<Habitat[]>('Habitats')
      .subscribe(
        data => {
          this.habitats = data.map(habitat => ({
            ...habitat,
            habitatimagerelation: (habitat.habitatimagerelation ?? []).map(relation => ({
              ...relation,
              image: {
                ...relation.image,
                imagedata: this.getImageSrc(relation.image.imagedata)
              }
            }))
          }));
          this.habitatDataService.setHabitats(this.habitats);
        },
        error => console.error('There was an error!', error)
      );
  }

  getImageSrc(imageData: string | Uint8Array): string {
    let base64String: string;
    if (imageData instanceof Uint8Array) {
      const binaryString = Array.from(imageData)
        .map(byte => String.fromCharCode(byte))
        .join('');
      base64String = btoa(binaryString);
    } else {
      base64String = imageData;
    }
    return `data:image/jpeg;base64,${base64String}`;
  }

  toggleAnimals(habitatId: number): void {
    if (this.selectedHabitatId === habitatId) {
      this.selectedHabitatId = null;
    } else {
      this.selectedHabitatId = habitatId;
      this.loadAnimalsForHabitat(habitatId);
    }
  }

  loadAnimalsForHabitat(habitatId: number): void {
    const cachedAnimals = this.animalDataService.getAnimals().filter(animal => animal.habitatid === habitatId);
    if (cachedAnimals.length > 0) {
      this.animalsByHabitat[habitatId] = cachedAnimals;
    } else {
      this.apiService.get<Animal[]>(`Animals/GetAnimalsByHabitat/${habitatId}`)
        .subscribe(
          data => {
            this.animalsByHabitat[habitatId] = data;
            this.animalDataService.setAnimals([...this.animalDataService.getAnimals(), ...data]);
          },
          error => console.error('There was an error!', error)
        );
    }
  }
}
