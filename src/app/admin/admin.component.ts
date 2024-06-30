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
import { ApiService } from '../services/ApiService';
import { AnimalMongoDb } from '../../models/animal-mongo-db.model';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartOptions, ChartType, ChartTypeRegistry } from 'chart.js';

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
  imports: [HeaderComponent, CommonModule, RouterModule, FormsModule, NgChartsModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  clickStatistics: AnimalMongoDb[] = [];
  users: UserWithRole[] = [];
  services: Service[] = [];
  habitats: Habitat[] = [];
  animals: AnimalWithImage[] = [];
  races: Race[] = [];

  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1
        }
      }
    }
  };
  public barChartLabels: string[] = [];
  public barChartLegend: boolean = true;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data']['datasets'] = [
    { data: [], label: 'Nombre de clics', backgroundColor: '#D2691E' }
  ];

  newAnimal: Partial<AnimalWithImage> = {
    name: '',
    habitatid: 0,
    status: '',
    raceid: 0
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

  constructor(private http: HttpClient, private toastr: ToastrService, private apiService: ApiService) {}

  ngOnInit() {
    this.getUsers();
    this.getServices();
    this.getHabitats();
    this.getAnimals();
    this.getRaces();
    this.getClickStatistics();
  }

  getAnimals(): void {
    this.apiService.get<AnimalWithImage[]>('Animals').subscribe(data => {
      this.animals = data;
    });
  }

  getRaces(): void {
    this.apiService.get<Race[]>('Races').subscribe(data => {
      this.races = data;
    });
  }

  getUsers() {
    this.apiService.get<UserWithRole[]>('users').subscribe(data => {
      this.users = data;
    });
  }

  getServices() {
    this.apiService.get<Service[]>('services').subscribe(data => {
      this.services = data.sort((a, b) => a.serviceid - b.serviceid);
    });
  }

  getHabitats() {
    this.apiService.get<Habitat[]>('habitats').subscribe(data => {
      this.habitats = data.sort((a, b) => a.habitatid - b.habitatid);
    });
  }

  addUser() {
    const user = { ...this.newUser };
    this.apiService.post('users', user).subscribe(() => {
      this.getUsers();
      this.newUser = { username: '', password: '', lastname: '', firstname: '', label: 'Employé' };
      this.toastr.success('Utilisateur ajouté avec succès');
    }, error => {
      this.toastr.error('Erreur lors de l\'ajout de l\'utilisateur');
    });
  }

  addService() {
    const service = { ...this.newService };
    this.apiService.post('services', service).subscribe(() => {
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

        this.apiService.post<Habitat>('habitats', habitatWithImage).subscribe(() => {
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
    if (!this.newAnimal.name || !this.newAnimal.raceid || !this.newAnimal.habitatid) {
      this.toastr.error('Veuillez remplir tous les champs');
      return;
    }

    const animalData = {
      name: this.newAnimal.name,
      habitatid: this.newAnimal.habitatid,
      status: this.newAnimal.status || '',
      raceid: this.newAnimal.raceid,
      imageBase64: this.newAnimal.imageBase64 || ''
    };

    if (!this.selectedFile) {
      this.sendAnimal(animalData);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const imageData = reader.result as string;
      const base64Data = imageData.split(',')[1];
      animalData.imageBase64 = base64Data;
      this.sendAnimal(animalData);
    };
    reader.readAsDataURL(this.selectedFile!);
  }

  sendAnimal(animal: any): void {
    this.apiService.post<AnimalWithImage>('Animals', animal).subscribe(newAnimal => {
      this.animals.push(newAnimal);
      this.resetNewAnimal();
      this.toastr.success('Animal ajouté avec succès');
    }, error => {
      this.toastr.error('Erreur lors de l\'ajout de l\'animal');
    });
  }

  resetNewAnimal(): void {
    this.newAnimal = {
      name: '',
      habitatid: 0,
      status: '',
      raceid: 0,
      imageBase64: ''
    };
    this.selectedFile = null;
  }

  addRace(): void {
    const raceData = {
      label: this.newRace.label,
      description: this.newRace.description
    };

    this.apiService.post('AddRace', raceData).subscribe(
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
    this.apiService.delete(`users/${username}`).subscribe(() => {
      this.getUsers();
      this.toastr.success('Utilisateur supprimé avec succès');
    }, error => {
      this.toastr.error('Erreur lors de la suppression de l\'utilisateur');
    });
  }

  deleteService(serviceid: number) {
    this.apiService.delete(`services/${serviceid}`).subscribe(() => {
      this.getServices();
      this.toastr.success('Service supprimé avec succès');
    }, error => {
      this.toastr.error('Erreur lors de la suppression du service');
    });
  }

  deleteHabitat(habitatid: number) {
    this.apiService.delete(`habitats/${habitatid}`).subscribe(() => {
      this.getHabitats();
      this.toastr.success('Habitat supprimé avec succès');
    }, error => {
      this.toastr.error('Erreur lors de la suppression de l\'habitat');
    });
  }

  deleteAnimal(animalId: number): void {
    this.apiService.delete(`Animals/${animalId}`).subscribe(() => {
      this.animals = this.animals.filter(a => a.animalid !== animalId);
      this.toastr.success('Animal supprimé avec succès');
    }, error => {
      this.toastr.error('Erreur lors de la suppression de l\'animal');
    });
  }

  updateService(service: Service) {
    this.apiService.put(`services/${service.serviceid}`, service).subscribe(() => {
      this.getServices();
      this.toastr.success('Service mis à jour avec succès');
    }, error => {
      this.toastr.error('Erreur lors de la mise à jour du service');
    });
  }

  updateHabitat(habitat: Habitat) {
    this.apiService.put(`habitats/${habitat.habitatid}`, habitat).subscribe(() => {
      this.getHabitats();
      this.toastr.success('Habitat mis à jour avec succès');
    }, error => {
      this.toastr.error('Erreur lors de la mise à jour de l\'habitat');
    });
  }

  updateAnimal(animal: AnimalWithImage): void {
    const animalData = {
      ...animal,
      imageBase64: animal.imageBase64 || ''
    };

    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageData = reader.result as string;
        const base64Data = imageData.split(',')[1];
        animalData.imageBase64 = base64Data;
        console.log(animalData);

        this.sendUpdatedAnimal(animalData);
      };
      reader.readAsDataURL(this.selectedFile!);
    } else {
      this.sendUpdatedAnimal(animalData);
    }
  }

  sendUpdatedAnimal(animal: AnimalWithImage): void {
    this.apiService.put(`Animals/${animal.animalid}`, animal).subscribe(() => {
      this.toastr.success('Animal mis à jour avec succès');
    }, error => {
      this.toastr.error('Erreur lors de la mise à jour de l\'animal');
    });
  }

  onFileChange(event: any, animal?: AnimalWithImage) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const base64Data = (reader.result as string).split(',')[1];
        if (animal) {
          animal.imageBase64 = base64Data;
        } else {
          this.newAnimal.imageBase64 = base64Data;
        }
      };
      reader.readAsDataURL(file);
      this.selectedFile = file;
    }
  }

  getClickStatistics() {
    this.apiService.get<AnimalMongoDb[]>(`Animals/clickStatistics`).subscribe(data => {
      this.clickStatistics = data;
      this.barChartLabels = this.clickStatistics.map(stat => stat.name).filter((name): name is string => !!name);
      this.barChartData[0].data = this.clickStatistics.map(stat => stat.clickcount);
    });
  }

  get selectedRaceId(): number {
    return this.newAnimal.raceid ?? 0;
  }

  set selectedRaceId(value: number) {
    this.newAnimal.raceid = value;
  }
}
