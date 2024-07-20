import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Animal } from '../../models/animal.model';

@Injectable({
  providedIn: 'root'
})
export class AnimalDataService {
  private animalsSource = new BehaviorSubject<Animal[]>([]);
  animals$ = this.animalsSource.asObservable();

  setAnimals(animals: Animal[]): void {
    this.animalsSource.next(animals);
  }

  getAnimals(): Animal[] {
    return this.animalsSource.getValue();
  }
}
