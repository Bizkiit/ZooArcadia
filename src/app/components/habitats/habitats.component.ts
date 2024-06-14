import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Habitat } from '../../../models/habitat.model';
import { HeaderComponent } from '../header/header.component';
import { AnimauxParHabitatComponent } from './animaux-par-habitat/animaux-par-habitat.component';

@Component({
  selector: 'app-habitats',
  templateUrl: './habitats.component.html',
  styleUrls: ['./habitats.component.scss'],
  standalone: true,
  imports: [CommonModule, HttpClientModule, HeaderComponent, AnimauxParHabitatComponent]
})
export class HabitatsComponent implements OnInit {
  habitats: Habitat[] = [];
  selectedHabitatId: number | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getHabitats().subscribe(data => {
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
    });
  }

  getHabitats(): Observable<Habitat[]> {
    return this.http.get<Habitat[]>('https://localhost:7277/api/Habitats');
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
    console.log(this.habitats)
    if (this.selectedHabitatId === habitatId) {
      this.selectedHabitatId = null;
    } else {
      this.selectedHabitatId = habitatId;
    }
  }
}
