import { Component } from '@angular/core';
import { NgIf, NgFor, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../services/ApiService';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIf, NgFor, HeaderComponent, FooterComponent],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  contact = {
    title: '',
    description: '',
    email: ''
  };

  constructor(private apiService: ApiService, private toastr: ToastrService, private router: Router) { }

  onSubmit(): void {
    this.apiService.post('Contact', this.contact)
      .subscribe(
        response => {
          this.toastr.success('Votre message a été envoyé avec succès !');
          this.contact = {
            title: '',
            description: '',
            email: ''
          };
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 3000);
        },
        error => {
          this.toastr.error(`Une erreur est survenue lors de l'envoi du message : ${error.message}`);
          console.error('Error:', error);
        }
      );
  }
}
