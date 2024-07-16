import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Habitat } from '../../models/habitat.model';

@Injectable({
  providedIn: 'root'
})
export class HabitatDataService {
  private habitatsSource = new BehaviorSubject<Habitat[]>([]);
  habitats$ = this.habitatsSource.asObservable();

  setHabitats(habitats: Habitat[]): void {
    this.habitatsSource.next(habitats);
  }

  getHabitats(): Habitat[] {
    return this.habitatsSource.getValue();
  }
}
