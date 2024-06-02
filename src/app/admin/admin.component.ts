import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../components/header/header.component';
import { UserZoo } from '../../models/user-zoo.model';
import { Service } from '../../models/service.model';
import { Habitat } from '../../models/habitat.model';
import { Animal } from '../../models/animal.model';
import { Race } from '../../models/race.model';
import { ToastrService } from 'ngx-toastr';

interface UserWithRole extends UserZoo {
  label: string;
}

interface HabitatWithImage extends Habitat {
  imageBase64: string;
}

export interface AnimalWithImage extends Animal {
  imageBase64: string;
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [HeaderComponent, CommonModule, RouterModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  users: UserWithRole[] = [];
  services: Service[] = [];
  habitats: Habitat[] = [];
  animals: Animal[] = [];
  races: Race[] = [];
  newAnimal: Partial<Animal> = {
    name: '',
    habitatid: 0,
    status: '',
    raceid: 0,
    rapportveterinaire: null
  };
  newUser: UserZoo = {
    username: '',
    password: '',
    lastname: '',
    firstname: '',
    label: 'Employé'
  };

  newService: Service = {
    serviceid: 0,
    name: '',
    description: ''
  };

  newHabitat: HabitatWithImage = {
    habitatid: 0,
    name: '',
    description: '',
    comment: '',
    animal: [],
    habitatimagerelation: [],
    imageBase64: ''
  };

  newRace: Partial<Race> = {
    label: '',
    description: ''
  };

  selectedFile: File | null = null;

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  ngOnInit() {
    this.getUsers();
    this.getServices();
    this.getHabitats();
    this.getAnimals();
    this.getRaces();
  }

  getAnimals(): void {
    this.http.get<Animal[]>('https://localhost:7277/api/Animals').subscribe(data => {
      this.animals = data;
    });
  }

  getRaces(): void {
    this.http.get<Race[]>('https://localhost:7277/api/Races').subscribe(data => {
      this.races = data;
    });
  }

  getUsers() {
    this.http.get<UserWithRole[]>('https://localhost:7277/api/users').subscribe(data => {
      this.users = data;
    });
  }

  getServices() {
    this.http.get<Service[]>('https://localhost:7277/api/services').subscribe(data => {
      this.services = data.sort((a, b) => a.serviceid - b.serviceid);
    });
  }

  getHabitats() {
    this.http.get<Habitat[]>('https://localhost:7277/api/habitats').subscribe(data => {
      this.habitats = data.sort((a, b) => a.habitatid - b.habitatid);
    });
  }

  addUser() {
    const user = { ...this.newUser };
    this.http.post('https://localhost:7277/api/users', user).subscribe(() => {
      this.getUsers();
      this.newUser = { username: '', password: '', lastname: '', firstname: '', label: 'Employé' };
      this.toastr.success('Utilisateur ajouté avec succès');
    }, error => {
      this.toastr.error('Erreur lors de l\'ajout de l\'utilisateur');
    });
  }

  addService() {
    const service = { ...this.newService };
    this.http.post('https://localhost:7277/api/services', service).subscribe(() => {
      this.getServices();
      this.newService = { serviceid: 0, name: '', description: '' };
      this.toastr.success('Service ajouté avec succès');
    }, error => {
      this.toastr.error('Erreur lors de l\'ajout du service');
    });
  }

  addHabitat() {
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageData = reader.result as string;
        const base64Data = imageData.split(',')[1];
        const habitatWithImage: HabitatWithImage = {
          ...this.newHabitat,
          imageBase64: base64Data
        };

        this.http.post<Habitat>('https://localhost:7277/api/habitats', habitatWithImage).subscribe(() => {
          this.getHabitats();
          this.newHabitat = {
            habitatid: 0,
            name: '',
            description: '',
            comment: '',
            habitatimagerelation: [],
            imageBase64: ''
          };
          this.selectedFile = null;
          this.toastr.success('Habitat ajouté avec succès');
        }, error => {
          console.error('Error adding habitat:', error);
          this.toastr.error('Erreur lors de l\'ajout de l\'habitat');
        });
      };
      reader.readAsDataURL(this.selectedFile!);
    } else {
      console.error('No file selected');
      this.toastr.error('Aucun fichier sélectionné');
    }
  }

  addAnimal(): void {
    const animalData = {
      rapportveterinaireid: null,
      name: this.newAnimal.name,
      habitatid: this.newAnimal.habitatid,
      status: "",
      raceid: this.newAnimal.raceid
    };
  
    if (!this.selectedFile) {
      this.sendAnimal(animalData);
      return;
    }
  
    const reader = new FileReader();
    reader.onload = () => {
      const imageData = reader.result as string;
      const base64Data = imageData.split(',')[1];
  
      const animalWithImage = {
        ...animalData,
        imageBase64: base64Data
      };
  
      this.sendAnimal(animalWithImage);
    };
    reader.readAsDataURL(this.selectedFile!);
  }
  
  sendAnimal(animal: any): void {
    this.http.post<Animal>('https://localhost:7277/api/Animals', animal).subscribe(newAnimal => {
      this.animals.push(newAnimal);
      this.resetNewAnimal();
      this.toastr.success('Animal ajouté avec succès');
    }, error => {
      this.toastr.error('Erreur lors de l\'ajout de l\'animal');
    });
  }

  resetNewAnimal(): void {
    this.newAnimal = {
      animalid: 0,
      rapportveterinaireid: 0,
      name: '',
      habitatid: 0,
      status: '',
      raceid: 0,
      rapportveterinaire: null,
      animalimagerelation: []
    };
    this.selectedFile = null;
  }

  addRace(): void {
    const raceData = {
      label: this.newRace.label,
      description: this.newRace.description
    };

    this.http.post('https://localhost:7277/api/Races/AddRace', raceData).subscribe(
      () => {
        this.getRaces();
        this.resetNewRace();
        this.toastr.success('Race ajoutée avec succès');
      },
      error => {
        this.toastr.error('Erreur lors de l\'ajout de la race');
      }
    );
  }

  resetNewRace(): void {
    this.newRace = {
      label: '',
      description: ''
    };
  }

  deleteUser(username: string) {
    this.http.delete(`https://localhost:7277/api/users/${username}`).subscribe(() => {
      this.getUsers();
      this.toastr.success('Utilisateur supprimé avec succès');
    }, error => {
      this.toastr.error('Erreur lors de la suppression de l\'utilisateur');
    });
  }

  deleteService(serviceid: number) {
    this.http.delete(`https://localhost:7277/api/services/${serviceid}`).subscribe(() => {
      this.getServices();
      this.toastr.success('Service supprimé avec succès');
    }, error => {
      this.toastr.error('Erreur lors de la suppression du service');
    });
  }

  deleteHabitat(habitatid: number) {
    this.http.delete(`https://localhost:7277/api/habitats/${habitatid}`).subscribe(() => {
      this.getHabitats();
      this.toastr.success('Habitat supprimé avec succès');
    }, error => {
      this.toastr.error('Erreur lors de la suppression de l\'habitat');
    });
  }

  deleteAnimal(animalId: number): void {
    this.http.delete(`https://localhost:7277/api/Animals/${animalId}`).subscribe(() => {
      this.animals = this.animals.filter(a => a.animalid !== animalId);
      this.toastr.success('Animal supprimé avec succès');
    }, error => {
      this.toastr.error('Erreur lors de la suppression de l\'animal');
    });
  }

  updateService(service: Service) {
    this.http.put(`https://localhost:7277/api/services/${service.serviceid}`, service).subscribe(() => {
      this.getServices();
      this.toastr.success('Service mis à jour avec succès');
    }, error => {
      this.toastr.error('Erreur lors de la mise à jour du service');
    });
  }

  updateHabitat(habitat: Habitat) {
    this.http.put(`https://localhost:7277/api/habitats/${habitat.habitatid}`, habitat).subscribe(() => {
      this.getHabitats();
      this.toastr.success('Habitat mis à jour avec succès');
    }, error => {
      this.toastr.error('Erreur lors de la mise à jour de l\'habitat');
    });
  }

  updateAnimal(animal: Animal): void {
    this.http.put(`https://localhost:7277/api/Animals/${animal.animalid}`, animal).subscribe(() => {
      this.toastr.success('Animal mis à jour avec succès');
    }, error => {
      this.toastr.error('Erreur lors de la mise à jour de l\'animal');
    });
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  get selectedRaceId(): number {
    return this.newAnimal.raceid ?? 0;
  }

  set selectedRaceId(value: number) {
    this.newAnimal.raceid = value;
  }
}
