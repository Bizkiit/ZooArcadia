import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { UserZoo } from '../../models/user-zoo.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../components/header/header.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, HeaderComponent]
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  lastname: string = '';
  firstname: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    const userZoo: UserZoo = {
      username: this.username,
      password: this.password,
      lastname: this.lastname,
      firstname: this.firstname
    };

    this.authService.login(userZoo).subscribe(response => {
      console.log('Login successful', response);
      switch (response.roleid) {
        case 1:
          this.router.navigate(['/admin']);
          break;
        case 2:
          this.router.navigate(['/veto']);
          break;
        case 3:
          this.router.navigate(['/employe']);
          break;
        default:
          console.error('Unknown roleid');
          break;
      }
    }, (error: any) => {
      console.error('Login failed', error);
    });
  }
}
