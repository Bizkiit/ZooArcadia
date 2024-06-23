import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ApiService } from '../../services/ApiService';
import { Service } from '../../../models/service.model';
import { CommonModule } from '@angular/common';
import { BannerTitleComponent } from '../banner-title/banner-title.component';

@Component({
  selector: 'app-zooservices',
  standalone: true,
  imports: [HeaderComponent, CommonModule, BannerTitleComponent],
  templateUrl: './zooservices.component.html',
  styleUrl: './zooservices.component.scss'
})
export class ZooservicesComponent implements OnInit{
  services: Service[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getServices();
  }

  getServices(): void {
    this.apiService.get<Service[]>('Services')
      .subscribe(
        data => this.services = data,
        error => console.error('There was an error!', error)
      );
  }

}
